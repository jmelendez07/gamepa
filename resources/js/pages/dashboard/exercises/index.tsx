import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type PageProps, type BreadcrumbItem } from '@/types';
import Exercise, { Difficulty } from '@/types/exercise';
import { useState, useEffect } from 'react';
import { Plus, Search, Calculator, Globe, Target, Edit, Trash2, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import CreateExerciseModal from '@/components/dashboard/exercises/create-exercise-modal';
import EditExerciseModal from '@/components/dashboard/exercises/edit-exercise-modal';
import DeleteExerciseModal from '@/components/dashboard/exercises/delete-exercise-modal';
import Planet from '@/types/planet';
import { Difficulties } from '@/enums/difficulties';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
    },
    {
        title: 'Ejercicios',
        href: route('exercises.index'),
    },
];

interface IExercisesIndexProps {
    exercises: Exercise[]; 
    difficulties: Difficulty[];
    planets: Planet[];
}

export default function ExercisesIndex({ exercises, difficulties, planets }: IExercisesIndexProps) {
    const { flash } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        operation: '',
        planet_id: '',
        difficulty_id: ''
    });

    const exercisesList = exercises || [];
    const difficultiesList = difficulties || [];
    const planetsList = planets || [];

    const filteredExercises = exercisesList.filter(exercise => {
        const matchesSearch = exercise.operation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.difficulty.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDifficulty = selectedDifficulty === null || exercise.difficulty.id === selectedDifficulty;
        
        return matchesSearch && matchesDifficulty;
    });

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case Difficulties.Easy.toLowerCase():
                return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
            case Difficulties.Medium.toLowerCase():
                return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
            case Difficulties.Hard.toLowerCase():
                return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
        }
    };

    const getExerciseCountByDifficulty = (difficultyId: string) => {
        return exercisesList.filter(exercise => exercise.difficulty.id === difficultyId).length;
    };

    const handleDifficultyClick = (difficultyId: string) => {
        if (selectedDifficulty === difficultyId) {
            setSelectedDifficulty(null);
        } else {
            setSelectedDifficulty(difficultyId);
        }
    };

    const handleClearFilters = () => {
        setSelectedDifficulty(null);
        setSearchTerm('');
    };

    const handleEdit = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setIsEditModalOpen(true);
    };

    const handleDelete = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('exercises.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                clearErrors();
            },
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setData({
            operation: '',
            planet_id: '',
            difficulty_id: ''
        });
        clearErrors();
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setSelectedExercise(null);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedExercise(null);
    };

    const handleInputChange = (field: keyof typeof data, value: string) => {
        setData(field, value);
        
        if (errors[field]) {
            clearErrors(field);
        }
    };

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
            <Head title="Ejercicios" />
            
            <div className="space-y-6 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Ejercicios</h1>
                        <p className="text-gray-600 mt-1">Gestiona los ejercicios matemáticos del sistema</p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-purple-600 hover:bg-purple-700 text-white cursor-pointer"
                    >
                        <Plus className="w-5 h-5 mr-0.5" />
                        Nuevo Ejercicio
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-4">
                    <div 
                        className={`bg-white rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
                            selectedDifficulty === null ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedDifficulty(null)}
                    >
                        <div className="text-2xl font-bold text-purple-600">{exercisesList.length}</div>
                        <div className="text-sm text-gray-600">Total</div>
                    </div>

                    {difficultiesList.map((difficulty) => {
                        const count = getExerciseCountByDifficulty(difficulty.id);
                        const isSelected = selectedDifficulty === difficulty.id;
                        const colorClass = getDifficultyColor(difficulty.name);
                        
                        return (
                            <div
                                key={difficulty.id}
                                className={`bg-white rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
                                    isSelected ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:shadow-md'
                                }`}
                                onClick={() => handleDifficultyClick(difficulty.id)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-2xl font-bold text-gray-800">{count}</div>
                                    <Badge 
                                        variant="outline" 
                                        className={`${colorClass} text-xs`}
                                    >
                                        {difficulty.name}
                                    </Badge>
                                </div>
                                <div className="text-sm text-gray-600">Ejercicios</div>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                type="text"
                                placeholder="Buscar por operación, planeta o dificultad..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-12 text-base"
                            />
                        </div>
                    </div>

                    {(selectedDifficulty || searchTerm) && (
                        <div className="flex items-center gap-2">
                            {selectedDifficulty && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Filter className="w-3 h-3" />
                                    {difficultiesList.find(d => d.id === selectedDifficulty)?.name}
                                </Badge>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearFilters}
                                className="text-gray-600 cursor-pointer"
                            >
                                Limpiar filtros
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        {selectedDifficulty ? (
                            <>Mostrando {filteredExercises.length} ejercicios de "{difficultiesList.find(d => d.id === selectedDifficulty)?.name}"</>
                        ) : (
                            <>Mostrando {filteredExercises.length} de {exercisesList.length} ejercicios</>
                        )}
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredExercises.length > 0 ? (
                        filteredExercises.map((exercise) => (
                            <div
                                key={exercise.id}
                                className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 p-6"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-4 mb-3">
                                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                                <Calculator className="w-6 h-6 text-purple-600" />
                                            </div>
                                            
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                    {exercise.operation}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <Globe className="w-4 h-4" />
                                                        <span>{exercise.planet.name}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Target className="w-4 h-4" />
                                                        <Badge 
                                                            variant="outline" 
                                                            className={`${getDifficultyColor(exercise.difficulty.name)} text-xs`}
                                                        >
                                                            {exercise.difficulty.name}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {exercise.planet.description && (
                                            <p className="text-gray-600 text-sm ml-16 mb-3 line-clamp-2">
                                                <span className="font-medium">Planeta:</span> {exercise.planet.description}
                                            </p>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1 ml-4">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(exercise)}
                                            className="cursor-pointer size-8 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                        >
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(exercise)}
                                            className="cursor-pointer size-8 text-red-600 hover:text-red-800 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-16">
                            <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                                {searchTerm || selectedDifficulty ? (
                                    <Search className="w-12 h-12 text-purple-400" />
                                ) : (
                                    <Calculator className="w-12 h-12 text-purple-400" />
                                )}
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                {searchTerm || selectedDifficulty ? 'No se encontraron ejercicios' : 'No hay ejercicios'}
                            </h3>
                            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                {searchTerm || selectedDifficulty
                                    ? 'Intenta ajustar los filtros de búsqueda para encontrar más resultados.'
                                    : 'Comienza creando tu primer ejercicio matemático para los estudiantes.'
                                }
                            </p>
                            {(searchTerm || selectedDifficulty) && (
                                <Button
                                    onClick={() => setIsModalOpen(true)}
                                    className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Crear Primer Ejercicio
                                </Button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <CreateExerciseModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                formData={data}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                processing={processing}
                errors={errors}
                planets={planetsList}
                difficulties={difficultiesList}
            />

            <EditExerciseModal
                isOpen={isEditModalOpen}
                onClose={handleEditCancel}
                exercise={selectedExercise}
                planets={planetsList}
                difficulties={difficultiesList}
            />

            <DeleteExerciseModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                exercise={selectedExercise}
            />
        </AppLayout>
    );
}