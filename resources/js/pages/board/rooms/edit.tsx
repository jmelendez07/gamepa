import { useState, useEffect } from "react";
import { Head, useForm, usePage, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Crown,
    Trash2,
    CheckCircle,
    AlertCircle,
    Users,
    Timer,
    Zap,
    Lightbulb,
    ChevronRight,
    ChevronLeft,
    Eye,
    Edit3,
    Copy,
    RefreshCw,
    MessageCircleQuestion,
    X,
    AlertTriangle,
    Save,
    ArrowLeft,
    CloudUpload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Room from "@/types/room";
import PublicLayout from "@/layouts/public-layout";

interface IRoomsEditProps {
    room: Room;
}

interface EditRoomForm {
    name: string;
    pin: string;
    questions: {
        id?: string;
        text: string;
        answers: {
            id?: string;
            text: string;
            is_correct: boolean;
        }[];
    }[];
    [key: string]: any;
}

// Definir tipo para errores
interface FormErrors {
    [key: string]: string;
}

export default function RoomsEdit({ room }: IRoomsEditProps) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [previewMode, setPreviewMode] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [copiedPin, setCopiedPin] = useState(false);
    
    // Obtener errores de la página con tipo específico
    const { errors, flash } = usePage().props as { 
        errors: FormErrors; 
        flash?: { success?: string; error?: string; };
        [key: string]: any;
    };

    // Función para copiar PIN al clipboard
    const copyPin = async () => {
        try {
            await navigator.clipboard.writeText(room.pin);
            setCopiedPin(true);
            setTimeout(() => setCopiedPin(false), 2000);
        } catch (err) {
            console.error('Error al copiar PIN:', err);
        }
    };

    // Inicializar formulario con datos de la sala existente
    const { data, setData, put, processing, errors: formErrors, clearErrors } = useForm<EditRoomForm>({
        name: room.name,
        pin: room.pin,
        questions: room.questions?.map(question => ({
            id: question.id,
            text: question.text,
            answers: question.answers?.map(answer => ({
                id: answer.id,
                text: answer.text,
                is_correct: answer.is_correct
            })) || []
        })) || []
    } as EditRoomForm);

    // Mostrar alerta de error cuando hay errores
    useEffect(() => {
        if (Object.keys(errors).length > 0 || errors.error) {
            setShowErrorAlert(true);
        }
    }, [errors]);

    const addQuestion = () => {
        setData({
            ...data,
            questions: [...data.questions, {
                text: '',
                answers: [
                    { text: '', is_correct: false },
                    { text: '', is_correct: false },
                    { text: '', is_correct: false },
                    { text: '', is_correct: false }
                ]
            }]
        });
        setCurrentQuestionIndex(data.questions.length);
    };

    const removeQuestion = (index: number) => {
        if (data.questions.length > 1) {
            const newQuestions = data.questions.filter((_, i) => i !== index);
            setData({
                ...data,
                questions: newQuestions
            });
            if (currentQuestionIndex >= newQuestions.length) {
                setCurrentQuestionIndex(newQuestions.length - 1);
            }
        }
    };

    const updateQuestion = (questionIndex: number, field: string, value: any) => {
        const newQuestions = [...data.questions];
        newQuestions[questionIndex] = { ...newQuestions[questionIndex], [field]: value };
        setData({
            ...data,
            questions: newQuestions
        });
        
        // Limpiar errores específicos de esta pregunta
        const errorKey = `questions.${questionIndex}.${field}`;
        if (errors[errorKey]) {
            (clearErrors as any)(errorKey);
        }
    };

    const updateAnswer = (questionIndex: number, answerIndex: number, field: string, value: any) => {
        const newQuestions = [...data.questions];
        const newAnswers = [...newQuestions[questionIndex].answers];
        
        if (field === 'is_correct' && value) {
            // Solo una respuesta correcta por pregunta
            newAnswers.forEach((answer, i) => {
                answer.is_correct = i === answerIndex;
            });
        } else {
            newAnswers[answerIndex] = { ...newAnswers[answerIndex], [field]: value };
        }
        
        newQuestions[questionIndex].answers = newAnswers;
        setData({
            ...data,
            questions: newQuestions
        });
        
        // Limpiar errores específicos de esta respuesta
        const answerErrorKey = `questions.${questionIndex}.answers.${answerIndex}.${field}`;
        const generalAnswersErrorKey = `questions.${questionIndex}.answers`;
        
        if (errors[answerErrorKey]) {
            (clearErrors as any)(answerErrorKey);
        }
        if (errors[generalAnswersErrorKey]) {
            (clearErrors as any)(generalAnswersErrorKey);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowErrorAlert(false);
        put(route('rooms.update', room.id), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const validateCurrentQuestion = () => {
        if (!data.questions[currentQuestionIndex]) return false;
        const question = data.questions[currentQuestionIndex];
        const hasText = question.text.trim() !== '';
        const hasAllAnswers = question.answers.every(answer => answer.text.trim() !== '');
        const hasCorrectAnswer = question.answers.some(answer => answer.is_correct);
        return hasText && hasAllAnswers && hasCorrectAnswer;
    };

    const canUpdateRoom = () => {
        return data.name.trim() !== '' && data.questions.every((_, index) => {
            const question = data.questions[index];
            const hasText = question.text.trim() !== '';
            const hasAllAnswers = question.answers.every(answer => answer.text.trim() !== '');
            const hasCorrectAnswer = question.answers.some(answer => answer.is_correct);
            return hasText && hasAllAnswers && hasCorrectAnswer;
        });
    };

    const currentQuestion = data.questions[currentQuestionIndex];

    // Función para obtener el error de un campo específico
    const getFieldError = (fieldName: string): string | undefined => {
        if (errors && errors[fieldName]) {
            return errors[fieldName];
        }
        
        const formErrorsObj = formErrors as FormErrors;
        if (formErrorsObj && formErrorsObj[fieldName]) {
            return formErrorsObj[fieldName];
        }
        
        return undefined;
    };

    // Función helper para limpiar errores con manejo de tipos
    const clearFieldError = (fieldName: string) => {
        try {
            (clearErrors as any)(fieldName);
        } catch (error) {
            console.warn('No se pudo limpiar el error:', fieldName);
        }
    };

    return (
        <PublicLayout>
            <Head title={`Editar ${room.name}`} />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                </div>

                {/* Alerta de errores */}
                <AnimatePresence initial={false}>
                    {showErrorAlert && (Object.keys(errors).length > 0 || errors.error) && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
                        >
                            <div className="bg-red-900/90 backdrop-blur-sm border border-red-500/50 rounded-xl p-4 shadow-xl">
                                <div className="flex items-start space-x-3">
                                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                                    <div className="flex-1">
                                        <h3 className="text-red-100 font-semibold text-sm mb-1">
                                            Error al actualizar la sala
                                        </h3>
                                        <div className="text-red-200 text-sm space-y-1">
                                            {errors.error && <p>{errors.error}</p>}
                                            {Object.entries(errors).map(([key, value]) => {
                                                if (key !== 'error' && typeof value === 'string') {
                                                    return <p key={key}>{value}</p>;
                                                }
                                                return null;
                                            })}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowErrorAlert(false)}
                                        className="text-red-300 hover:text-red-100 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Mensaje de éxito */}
                <AnimatePresence initial={false}>
                    {flash?.success && (
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
                        >
                            <div className="bg-green-900/90 backdrop-blur-sm border border-green-500/50 rounded-xl p-4 shadow-xl">
                                <div className="flex items-center space-x-3">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    <p className="text-green-100 font-medium">{flash.success}</p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="relative z-10 border-b border-purple-700/30 bg-purple-900/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.visit(route('rooms.show', room.id))}
                                    className="cursor-pointer text-purple-200 gap-0.5 hover:text-white hover:bg-purple-800/50 rounded-xl"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-0.5" />
                                    Volver a la Sala
                                </Button>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                                        <Edit3 className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">Editar Sala</h1>
                                        <p className="text-purple-200 text-sm">Modifica tu aventura matemática</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setPreviewMode(!previewMode)}
                                    className="cursor-pointer border-purple-400/50 text-purple-600 hover:text-purple-700 hover:bg-white/80 rounded-xl transition-all duration-300"
                                >
                                    <Eye className="w-4 h-4 mr-0.5" />
                                    {previewMode ? 'Editar' : 'Vista Previa'}
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    disabled={!canUpdateRoom() || processing}
                                    className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                                >
                                    <CloudUpload className="w-4 h-4 mr-0.5" />
                                    {processing ? 'Guardando...' : 'Guardar Cambios'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                    <AnimatePresence initial={false} mode="wait">
                        {previewMode ? (
                            /* Vista Previa */
                            <motion.div
                                key="preview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                {/* Header de la sala */}
                                <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-purple-300/30">
                                    <div className="text-center">
                                        <h2 className="text-3xl font-bold text-white mb-2">
                                            {data.name || 'Nombre de la Sala'}
                                        </h2>
                                        <div className="flex items-center justify-center space-x-6 text-purple-200">
                                            <div className="flex items-center space-x-2">
                                                <MessageCircleQuestion className="w-5 h-5" />
                                                <span>{data.questions.length} Preguntas</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Users className="w-5 h-5" />
                                                <span>Multijugador</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Timer className="w-5 h-5" />
                                                <span>Tiempo Real</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Preguntas */}
                                <div className="space-y-6">
                                    {data.questions.map((question, qIndex) => (
                                        <motion.div
                                            key={question.id || qIndex}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: qIndex * 0.1 }}
                                            className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30"
                                        >
                                            <div className="flex items-start space-x-4 mb-6">
                                                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-white font-bold">{qIndex + 1}</span>
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-xl font-semibold text-white mb-4">
                                                        {question.text || `Pregunta ${qIndex + 1}`}
                                                    </h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                        {question.answers.map((answer, aIndex) => (
                                                            <div
                                                                key={answer.id || aIndex}
                                                                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                                                                    answer.is_correct
                                                                        ? 'bg-green-500/20 border-green-500 text-green-100'
                                                                        : 'bg-purple-800/30 border-purple-600/50 text-purple-100'
                                                                }`}
                                                            >
                                                                <div className="flex items-center space-x-3">
                                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                                                                        answer.is_correct ? 'bg-green-500' : 'bg-purple-600'
                                                                    }`}>
                                                                        {String.fromCharCode(65 + aIndex)}
                                                                    </div>
                                                                    <span>{answer.text || `Respuesta ${aIndex + 1}`}</span>
                                                                    {answer.is_correct && <CheckCircle className="w-4 h-4 text-green-400" />}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            /* Modo de Edición */
                            <motion.div
                                key="edit"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                            >
                                {/* Panel izquierdo - Configuración de la sala */}
                                <div className="lg:col-span-1 space-y-6">
                                    {/* Información básica */}
                                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
                                        <div className="flex items-center space-x-3 mb-6">
                                            <Lightbulb className="w-6 h-6 text-purple-400" />
                                            <h2 className="text-xl font-bold text-white">Información Básica</h2>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {/* PIN de la Sala - Solo lectura */}
                                            <div>
                                                <Label className="text-purple-200 font-medium">
                                                    PIN de la Sala
                                                </Label>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <div className="text-2xl font-bold text-white tracking-wider">
                                                            {room.pin}
                                                        </div>
                                                        <span className="text-purple-300 text-sm">
                                                            (No modificable)
                                                        </span>
                                                    </div>
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={copyPin}
                                                        className="cursor-pointer text-purple-300 hover:text-white hover:bg-purple-800/50 rounded-lg h-8 w-8 p-0"
                                                        title="Copiar PIN"
                                                    >
                                                        <Copy className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                                {copiedPin && (
                                                    <p className="text-green-400 text-sm mt-1">
                                                        ✓ PIN copiado al portapapeles
                                                    </p>
                                                )}
                                            </div>
                                            
                                            <div>
                                                <Label htmlFor="roomName" className="text-purple-200 font-medium">
                                                    Nombre de la Sala
                                                </Label>
                                                <Input
                                                    id="roomName"
                                                    value={data.name}
                                                    onChange={(e) => {
                                                        setData({ ...data, name: e.target.value });
                                                        if (getFieldError('name')) {
                                                            clearFieldError('name');
                                                        }
                                                    }}
                                                    placeholder="Ej: Aventura Álgebra Épica"
                                                    className={`mt-2 bg-purple-900/50 border-2 !ring-0 text-white !placeholder-purple-300 focus:!border-purple-400 ${
                                                        getFieldError('name') ? 'border-red-500 focus:!border-red-400' : 'border-purple-600/50'
                                                    }`}
                                                />
                                                {getFieldError('name') && (
                                                    <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                                                        <AlertCircle className="w-3 h-3" />
                                                        <span>{getFieldError('name')}</span>
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
                                        <div className="flex items-center justify-between mb-6">
                                            <div className="flex items-center space-x-3">
                                                <MessageCircleQuestion className="w-6 h-6 text-purple-400" />
                                                <h2 className="text-xl font-bold text-white">Preguntas</h2>
                                            </div>
                                            <Button
                                                onClick={addQuestion}
                                                size="sm"
                                                className="cursor-pointer bg-purple-600 hover:bg-purple-700 size-8 text-white rounded-lg"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto overflow-x-hidden">
                                            {data.questions.map((question, index) => (
                                                <div
                                                    key={question.id || index}
                                                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                                                        currentQuestionIndex === index
                                                            ? 'bg-purple-600/30 border-purple-400'
                                                            : 'bg-purple-800/30 border-purple-600/50 hover:border-purple-500'
                                                    } ${
                                                        getFieldError(`questions.${index}.text`) || 
                                                        getFieldError(`questions.${index}.answers`) ? 
                                                        'border-red-500/50' : ''
                                                    }`}
                                                    onClick={() => setCurrentQuestionIndex(index)}
                                                >
                                                    <div className="grid grid-cols-[1fr_auto] gap-2 items-center justify-between">
                                                        <div className="grid grid-cols-[auto_1fr] items-center gap-x-3">
                                                            <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${
                                                                getFieldError(`questions.${index}.text`) || 
                                                                getFieldError(`questions.${index}.answers`) ? 
                                                                'bg-red-600' : 'bg-purple-600'
                                                            }`}>
                                                                <span className="text-white text-sm font-bold">{index + 1}</span>
                                                            </div>
                                                            <span className="text-white font-medium truncate">
                                                                {question.text || `Pregunta ${index + 1}`}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 shrink-0">
                                                            {validateCurrentQuestion() && currentQuestionIndex === index && 
                                                             !getFieldError(`questions.${index}.text`) && 
                                                             !getFieldError(`questions.${index}.answers`) && (
                                                                <CheckCircle className="w-4 h-4 text-green-400" />
                                                            )}
                                                            {(getFieldError(`questions.${index}.text`) || 
                                                              getFieldError(`questions.${index}.answers`)) && (
                                                                <AlertCircle className="w-4 h-4 text-red-400" />
                                                            )}
                                                            {data.questions.length > 1 && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        removeQuestion(index);
                                                                    }}
                                                                    className="cursor-pointer text-red-400 hover:text-red-500 hover:bg-red-900/10 w-8 h-8 p-0"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* Mostrar error específico de la pregunta */}
                                                    {(getFieldError(`questions.${index}.text`) || 
                                                      getFieldError(`questions.${index}.answers`)) && (
                                                        <div className="mt-2 text-red-400 text-xs">
                                                            {getFieldError(`questions.${index}.text`) || 
                                                             getFieldError(`questions.${index}.answers`)}
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                        {getFieldError('questions') && (
                                            <p className="text-red-400 text-sm mt-3 flex items-center space-x-1">
                                                <AlertCircle className="w-3 h-3" />
                                                <span>{getFieldError('questions')}</span>
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Panel derecho - Editor de pregunta actual */}
                                <div className="lg:col-span-2">
                                    <AnimatePresence initial={false} mode="wait">
                                        {currentQuestion && (
                                            <motion.div
                                                key={currentQuestionIndex}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -20 }}
                                                className="bg-white/15 backdrop-blur-sm rounded-2xl p-8 border border-purple-300/30 h-full"
                                            >
                                                <div className="flex items-center justify-between mb-8">
                                                    <div className="flex items-center space-x-3">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                                            getFieldError(`questions.${currentQuestionIndex}.text`) || 
                                                            getFieldError(`questions.${currentQuestionIndex}.answers`) ? 
                                                            'bg-red-600' : 'bg-purple-600'
                                                        }`}>
                                                            <span className="text-white font-bold">{currentQuestionIndex + 1}</span>
                                                        </div>
                                                        <h2 className="text-2xl font-bold text-white">
                                                            Pregunta {currentQuestionIndex + 1}
                                                        </h2>
                                                    </div>
                                                    
                                                    <div className="flex items-center space-x-0">
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                                                            disabled={currentQuestionIndex === 0}
                                                            className="cursor-pointer hover:bg-transparent text-purple-300 hover:text-white disabled:opacity-50"
                                                        >
                                                            <ChevronLeft className="size-5" />
                                                        </Button>
                                                        <div className="inline-flex items-center gap-2 text-purple-200 text-sm">
                                                            <span>{currentQuestionIndex + 1}</span>
                                                            de
                                                            <span>{data.questions.length}</span>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            onClick={() => setCurrentQuestionIndex(Math.min(data.questions.length - 1, currentQuestionIndex + 1))}
                                                            disabled={currentQuestionIndex === data.questions.length - 1}
                                                            className="cursor-pointer hover:bg-transparent text-purple-300 hover:text-white disabled:opacity-50"
                                                        >
                                                            <ChevronRight className="size-5" />
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className="space-y-6">
                                                    {/* Texto de la pregunta */}
                                                    <div>
                                                        <Label className="text-purple-200 font-medium flex items-center space-x-0.5">
                                                            <Edit3 className="w-4 h-4" />
                                                            <span>Pregunta</span>
                                                        </Label>
                                                        <Textarea
                                                            value={currentQuestion.text}
                                                            onChange={(e) => updateQuestion(currentQuestionIndex, 'text', e.target.value)}
                                                            placeholder="Escribe tu pregunta aquí..."
                                                            rows={4}
                                                            className={`mt-2 !ring-0 !ring-offset-0 border-2 bg-purple-900/50 text-white !placeholder-purple-300 focus:border-purple-400 rounded-xl resize-none ${
                                                                getFieldError(`questions.${currentQuestionIndex}.text`) ? 
                                                                'border-red-500 focus:border-red-400' : 'border-purple-600/50'
                                                            }`}
                                                        />
                                                        {getFieldError(`questions.${currentQuestionIndex}.text`) && (
                                                            <p className="text-red-400 text-sm mt-1 flex items-center space-x-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                <span>{getFieldError(`questions.${currentQuestionIndex}.text`)}</span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Respuestas */}
                                                    <div>
                                                        <Label className="text-purple-200 font-medium flex items-center space-x-0.5 mb-4">
                                                            <Zap className="w-4 h-4" />
                                                            <span>Respuestas (marca la correcta presionando A, B, C, D)</span>
                                                        </Label>
                                                        
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {currentQuestion.answers.map((answer, answerIndex) => (
                                                                <motion.div
                                                                    key={answer.id || answerIndex}
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: answerIndex * 0.1 }}
                                                                    className={`relative p-4 rounded-xl border-2 transition-all duration-300 ${
                                                                        answer.is_correct
                                                                            ? 'bg-green-500/20 border-green-500'
                                                                            : getFieldError(`questions.${currentQuestionIndex}.answers.${answerIndex}.text`) ?
                                                                            'bg-red-500/20 border-red-500' :
                                                                            'bg-purple-800/30 border-purple-600/50'
                                                                    }`}
                                                                >
                                                                    <div className="flex items-center space-x-3 mb-3">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => updateAnswer(currentQuestionIndex, answerIndex, 'is_correct', !answer.is_correct)}
                                                                            className={`cursor-pointer w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                                                                                answer.is_correct
                                                                                    ? 'bg-green-500 text-white'
                                                                                    : 'bg-purple-600 text-white hover:bg-purple-500'
                                                                            }`}
                                                                        >
                                                                            {String.fromCharCode(65 + answerIndex)}
                                                                        </button>
                                                                        {answer.is_correct && (
                                                                            <CheckCircle className="w-4 h-4 text-green-400" />
                                                                        )}
                                                                        {getFieldError(`questions.${currentQuestionIndex}.answers.${answerIndex}.text`) && (
                                                                            <AlertCircle className="w-4 h-4 text-red-400" />
                                                                        )}
                                                                    </div>
                                                                    
                                                                    <Input
                                                                        value={answer.text}
                                                                        onChange={(e) => updateAnswer(currentQuestionIndex, answerIndex, 'text', e.target.value)}
                                                                        placeholder={`Respuesta ${String.fromCharCode(65 + answerIndex)}`}
                                                                        className={`bg-transparent !text-lg border-none text-white !placeholder-purple-300 !ring-0 focus:ring-0 ${
                                                                            answer.is_correct ? 'text-green-100' : 
                                                                            getFieldError(`questions.${currentQuestionIndex}.answers.${answerIndex}.text`) ? 
                                                                            'text-red-100' : 'text-purple-100'
                                                                        }`}
                                                                    />
                                                                    {getFieldError(`questions.${currentQuestionIndex}.answers.${answerIndex}.text`) && (
                                                                        <p className="text-red-400 text-xs mt-1">
                                                                            {getFieldError(`questions.${currentQuestionIndex}.answers.${answerIndex}.text`)}
                                                                        </p>
                                                                    )}
                                                                </motion.div>
                                                            ))}
                                                        </div>
                                                        {getFieldError(`questions.${currentQuestionIndex}.answers`) && (
                                                            <p className="text-red-400 text-sm mt-3 flex items-center space-x-1">
                                                                <AlertCircle className="w-3 h-3" />
                                                                <span>{getFieldError(`questions.${currentQuestionIndex}.answers`)}</span>
                                                            </p>
                                                        )}
                                                    </div>

                                                    {/* Validación */}
                                                    <div className={`flex items-center justify-center p-4 rounded-xl border transition-colors ${
                                                        getFieldError(`questions.${currentQuestionIndex}.text`) || 
                                                        getFieldError(`questions.${currentQuestionIndex}.answers`) ?
                                                        'bg-red-800/30 border-red-600/50' : 
                                                        validateCurrentQuestion() ?
                                                        'bg-green-800/30 border-green-600/50' :
                                                        'bg-purple-800/30 border-purple-600/50'
                                                    }`}>
                                                        {getFieldError(`questions.${currentQuestionIndex}.text`) || 
                                                         getFieldError(`questions.${currentQuestionIndex}.answers`) ? (
                                                            <div className="flex items-center space-x-2 text-red-400">
                                                                <AlertCircle className="w-5 h-5" />
                                                                <span className="font-medium">Esta pregunta tiene errores que debes corregir</span>
                                                            </div>
                                                        ) : validateCurrentQuestion() ? (
                                                            <div className="flex items-center space-x-2 text-green-400">
                                                                <CheckCircle className="w-5 h-5" />
                                                                <span className="font-medium">Pregunta completada correctamente</span>
                                                            </div>
                                                        ) : (
                                                            <div className="flex items-center space-x-2 text-yellow-400">
                                                                <AlertCircle className="w-5 h-5" />
                                                                <span className="font-medium">
                                                                    Completa la pregunta, todas las respuestas y marca la correcta
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </PublicLayout>
    );
}