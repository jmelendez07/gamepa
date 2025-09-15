import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, PageProps } from "@/types";
import Exercise, { Step, Option } from "@/types/exercise";
import { Head, useForm, router, Link, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { 
    Plus, 
    Trash2, 
    ChevronDown, 
    ChevronRight, 
    CheckCircle, 
    Circle, 
    FileText, 
    Target, 
    BarChart3,
    Edit3,
    X,
    ChevronLeft,
    ListCheck,
    GitPullRequestCreateArrow
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DeleteStepModal from "@/components/dashboard/steps/delete-step-modal";
import DeleteOptionModal from "@/components/dashboard/steps/options/delete-option-modal";
import EditOptionModal from "@/components/dashboard/steps/options/edit-option-modal";
import { Difficulties } from "@/enums/difficulties";

interface IExercisesShowProps {
    exercise: Exercise;
}

export default function ExercisesShow({ exercise }: IExercisesShowProps) {
    const { flash } = usePage<PageProps>().props;
    const [isCreatingStep, setIsCreatingStep] = useState(false);
    const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());
    const [stepToDelete, setStepToDelete] = useState<Step | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [optionToDelete, setOptionToDelete] = useState<Option | null>(null);
    const [isDeleteOptionModalOpen, setIsDeleteOptionModalOpen] = useState(false);
    const [optionToEdit, setOptionToEdit] = useState<Option | null>(null);
    const [isEditOptionModalOpen, setIsEditOptionModalOpen] = useState(false);
    const [stepOrderForOption, setStepOrderForOption] = useState<number>(0);

    const { data: stepData, setData: setStepData, post: postStep, put: putStep } = useForm({
        order: exercise.steps.length + 1,
        exercise_id: exercise.id,
    });

    const { data: optionData, setData: setOptionData, post: postOption, put: putOption } = useForm({
        result: '',
        is_correct: false as boolean,
        step_id: '',
    });

    const [breadcrumbs] = useState<BreadcrumbItem[]>([
        {
            title: 'Panel de Control',
            href: route('dashboard'),
        },
        {
            title: 'Ejercicios',
            href: route('exercises.index'),
        },
        {
            title: exercise.operation,
            href: route('exercises.show', exercise.id)
        }
    ]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case Difficulties.Easy.toLowerCase():
                return 'bg-green-100 text-green-800 border-green-200';
            case Difficulties.Medium.toLowerCase():
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case Difficulties.Hard.toLowerCase():
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const toggleStepExpansion = (stepId: string) => {
        const newExpanded = new Set(expandedSteps);
        if (newExpanded.has(stepId)) {
            newExpanded.delete(stepId);
        } else {
            newExpanded.add(stepId);
        }
        setExpandedSteps(newExpanded);
    };

    const handleCreateStep = () => {
        postStep(route('steps.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsCreatingStep(false);
                setStepData({
                    'order': stepData.order + 1,
                    'exercise_id': exercise.id,
                });
                router.reload();
            }
        });
    };

    const handleDeleteStep = (step: Step) => {
        setStepToDelete(step);
        setIsDeleteModalOpen(true);
    };

    const handleCreateOption = () => {
        postOption(route('options.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setOptionData({
                    'result': '',
                    'is_correct': false,
                    'step_id': '',
                })
                router.reload();
            }
        });
    };

    const handleDeleteOption = (option: Option, stepOrder: number) => {
        setOptionToDelete(option);
        setStepOrderForOption(stepOrder);
        setIsDeleteOptionModalOpen(true);
    };

    const handleEditOption = (option: Option, stepOrder: number) => {
        setOptionToEdit(option);
        setStepOrderForOption(stepOrder);
        setIsEditOptionModalOpen(true);
    };

    const sortedSteps = [...exercise.steps].sort((a, b) => a.order - b.order);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Gestionar Ejercicio | ${exercise.operation}`} />
            
            <div className="w-full p-6">
                <div className="bg-white rounded-lg hover:shadow-sm border p-6 mb-6 transition-all duration-200">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <div className="flex items-center gap-1">
                                <Link
                                    href={route('exercises.index')}
                                    className="w-8 h-8 text-purple-600 bg-purple-50 mt-1 rounded-lg flex items-center justify-center hover:bg-purple-200 transition-colors duration-200"
                                >
                                    <ChevronLeft size={18} />
                                </Link>
                                <h1 className="text-2xl font-bold text-gray-900">{exercise.operation}</h1>
                            </div>
                            <p className="text-gray-600 mt-1">Gestiona los pasos y opciones de este ejercicio</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(exercise.difficulty.name)}`}>
                                {exercise.difficulty.name}
                            </span>
                            <Button
                                onClick={() => setIsCreatingStep(true)}
                                className="cursor-pointer bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                            >
                                <Plus size={16} className="mr-0.5" />
                                Agregar Paso
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-6 text-gray-600">
                        <div className="flex items-center gap-2">
                            <Target size={20} className="text-purple-600" />
                            <span className="font-medium">{exercise.planet.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FileText size={16} />
                            <span className="text-sm">{exercise.steps.length} pasos configurados</span>
                        </div>
                    </div>
                </div>

                {isCreatingStep && (
                    <div className="bg-white rounded-lg shadow-sm border border-purple-200 p-6 mb-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Plus size={20} className="text-purple-600" />
                            <h3 className="text-lg font-semibold text-gray-800">Crear Nuevo Paso</h3>
                        </div>
                        <div className="flex items-end gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Orden del paso</label>
                                <input
                                    type="number"
                                    value={stepData.order}
                                    onChange={(e) => setStepData('order', parseInt(e.target.value))}
                                    className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    min="1"
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button
                                    onClick={handleCreateStep}
                                    className="cursor-pointer bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
                                >
                                    <ListCheck size={16} />
                                    Crear
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsCreatingStep(false);
                                        setStepData({
                                            'order': exercise.steps.length + 1,
                                            'exercise_id': exercise.id,
                                        });
                                    }}
                                    className="cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                                >
                                    <X size={16} />
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="space-y-4">
                    {sortedSteps.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <FileText size={32} className="text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-800 mb-2">No hay pasos configurados</h3>
                            <p className="text-gray-600 mb-6">Comienza agregando el primer paso para este ejercicio</p>
                            <button
                                onClick={() => setIsCreatingStep(true)}
                                className="flex items-center gap-2 mx-auto px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors duration-200"
                            >
                                <Plus size={20} />
                                Agregar Primer Paso
                            </button>
                        </div>
                    ) : (
                        sortedSteps.map((step) => (
                            <div key={step.id} className="bg-white rounded-lg hover:shadow-sm border overflow-hidden transition-all duration-200">
                                <div 
                                    className={`
                                        p-4 bg-gray-50 flex items-center justify-between
                                        ${expandedSteps.has(step.id) ? 'border-b' : 'border-b-0'}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => toggleStepExpansion(step.id)}
                                            className="cursor-pointer w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center hover:bg-purple-200 transition-colors duration-200"
                                        >
                                            {expandedSteps.has(step.id) ? 
                                                <ChevronDown size={16} /> : 
                                                <ChevronRight size={16} />
                                            }
                                        </button>
                                        <div className="w-8 h-8 bg-purple-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                            {step.order}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800">Paso {step.order}</h3>
                                            <p className="text-sm text-gray-600">{step.options.length} opciones</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleDeleteStep(step)}
                                            className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                            title="Eliminar paso"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                {expandedSteps.has(step.id) && (
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-6">
                                            <h4 className="font-medium text-gray-800 flex items-center gap-2">
                                                <Circle size={16} className="text-blue-600" />
                                                Opciones de respuesta
                                            </h4>
                                            <Button
                                                onClick={() => {
                                                    setOptionData('step_id', step.id);
                                                    setOptionData('result', '');
                                                    setOptionData('is_correct', false);
                                                }}
                                                className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors duration-200"
                                            >
                                                <Plus size={14} />
                                                Agregar Opción
                                            </Button>
                                        </div>

                                        {optionData.step_id === step.id && (
                                            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                                                <h5 className="font-medium text-gray-800 mb-4 flex items-center gap-2">
                                                    <Plus size={16} className="text-blue-600" />
                                                    Nueva Opción
                                                </h5>
                                                <div className="flex items-center gap-4">
                                                    <input
                                                        type="text"
                                                        placeholder={`Ingresa el resultado del paso ${step.order}`}
                                                        value={optionData.result}
                                                        onChange={(e) => setOptionData('result', e.target.value)}
                                                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <label className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg border border-gray-200">
                                                        <input
                                                            type="checkbox"
                                                            checked={optionData.is_correct}
                                                            onChange={(e) => setOptionData('is_correct', e.target.checked)}
                                                            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                                        />
                                                        <CheckCircle size={16} className="text-green-600" />
                                                        <span className="text-sm font-medium text-gray-700">Correcta</span>
                                                    </label>
                                                    <Button
                                                        onClick={() => handleCreateOption()}
                                                        disabled={!optionData.result.trim()}
                                                        className="cursor-pointer bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                                    >
                                                        <GitPullRequestCreateArrow size={16} />
                                                        Crear
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            setOptionData({
                                                                'result': '',
                                                                'is_correct': false,
                                                                'step_id': ''
                                                            });
                                                        }}
                                                        className="cursor-pointer bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
                                                    >
                                                        <X size={16} />
                                                        Cancelar
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        {step.options.length === 0 ? (
                                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                                                <Circle size={32} className="mx-auto mb-3 text-gray-300" />
                                                <p className="font-medium">No hay opciones para este paso</p>
                                                <p className="text-sm">Agrega al menos una opción para completar el paso</p>
                                            </div>
                                        ) : (
                                            <div className="space-y-3">
                                                {step.options.map((option) => (
                                                    <div
                                                        key={option.id}
                                                        className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                                                            option.is_correct 
                                                                ? 'border-green-200 bg-green-50' 
                                                                : 'border-gray-200 bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            {option.is_correct ? (
                                                                <CheckCircle size={20} className="text-green-600" />
                                                            ) : (
                                                                <Circle size={20} className="text-gray-400" />
                                                            )}
                                                            <span className="font-medium text-gray-800">{option.result}</span>
                                                            {option.is_correct && (
                                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                                                    Respuesta Correcta
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <button
                                                                onClick={() => handleEditOption(option, step.order)}
                                                                className="cursor-pointer p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                                                                title="Editar opción"
                                                            >
                                                                <Edit3 size={16} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteOption(option, step.order)}
                                                                className="cursor-pointer p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors duration-200"
                                                                title="Eliminar opción"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>

                {exercise.steps.length > 0 && (
                    <div className="bg-white rounded-lg hover:shadow-sm border p-6 mt-6 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-6">
                            <BarChart3 size={20} className="text-gray-600" />
                            <h3 className="font-semibold text-gray-800">Resumen del Ejercicio</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <FileText size={20} className="text-purple-600" />
                                    <span className="text-sm font-medium text-purple-800">Pasos configurados</span>
                                </div>
                                <div className="text-3xl font-bold text-purple-600">{exercise.steps.length}</div>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-6 border border-blue-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <Circle size={20} className="text-blue-600" />
                                    <span className="text-sm font-medium text-blue-800">Opciones totales</span>
                                </div>
                                <div className="text-3xl font-bold text-blue-600">
                                    {exercise.steps.reduce((total, step) => total + step.options.length, 0)}
                                </div>
                            </div>
                            <div className="bg-green-50 rounded-lg p-6 border border-green-100">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle size={20} className="text-green-600" />
                                    <span className="text-sm font-medium text-green-800">Respuestas correctas</span>
                                </div>
                                <div className="text-3xl font-bold text-green-600">
                                    {exercise.steps.reduce((total, step) => total + step.options.filter(opt => opt.is_correct).length, 0)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modales */}
            <DeleteStepModal
                isOpen={isDeleteModalOpen}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setStepToDelete(null);
                }}
                step={stepToDelete}
                siblingSteps={sortedSteps}
            />

            <DeleteOptionModal
                isOpen={isDeleteOptionModalOpen}
                onClose={() => {
                    setIsDeleteOptionModalOpen(false);
                    setOptionToDelete(null);
                    setStepOrderForOption(0);
                }}
                option={optionToDelete}
                stepOrder={stepOrderForOption}
            />

            <EditOptionModal
                isOpen={isEditOptionModalOpen}
                onClose={() => {
                    setIsEditOptionModalOpen(false);
                    setOptionToEdit(null);
                    setStepOrderForOption(0);
                }}
                option={optionToEdit}
                stepOrder={stepOrderForOption}
            />
        </AppLayout>
    );
}