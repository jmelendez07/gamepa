import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft,
    Crown,
    Users,
    Play,
    Pause,
    Square,
    Edit3,
    Trash2,
    Copy,
    Share2,
    Settings,
    Target,
    Timer,
    CheckCircle,
    AlertCircle,
    Eye,
    Gamepad2,
    Zap,
    BarChart3,
    Calendar,
    Clock,
    RefreshCw,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Room from "@/types/room";
import { RoomStatuses } from "@/enums/room-statuses";

interface IRoomsShowProps {
    room: Room;
}

export default function RoomsShow({ room }: IRoomsShowProps) {
    console.log(room);
    const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'settings'>('overview');
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [copiedPin, setCopiedPin] = useState(false);

    const handleStartRoom = () => {
        console.log('Iniciando sala...');
        // Aquí iría la lógica para iniciar la sala
    };

    const handleEditRoom = () => {
        router.visit(route('rooms.edit', room.id));
    };

    const handleDeleteRoom = () => {
        router.delete(route('rooms.destroy', room.id));
    };

    const copyPin = async () => {
        try {
            await navigator.clipboard.writeText(room.pin);
            setCopiedPin(true);
            setTimeout(() => setCopiedPin(false), 2000);
        } catch (err) {
            console.error('Error al copiar PIN:', err);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case RoomStatuses.ACTIVE:
                return 'bg-green-500';
            case RoomStatuses.DRAFT:
                return 'bg-purple-500';
            case RoomStatuses.COMPLETED:
                return 'bg-gray-500';
            default:
                return 'bg-purple-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case RoomStatuses.ACTIVE:
                return 'En Vivo';
            case RoomStatuses.DRAFT:
                return 'Borrador';
            case RoomStatuses.COMPLETED:
                return 'Completada';
            default:
                return 'Borrador';
        }
    };

    return (
        <>
            <Head title={`${room.name} - Sala de Juego`} />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                </div>

                {/* Header */}
                <div className="relative z-10 border-b border-purple-700/30 bg-purple-900/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.visit(route('rooms.index'))}
                                    className="text-purple-200 hover:text-white hover:bg-purple-800/50 rounded-xl"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Mis Salas
                                </Button>
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
                                        <Crown className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-white">{room.name}</h1>
                                        <div className="flex items-center space-x-3">
                                            <Badge className={`${getStatusColor(room.status.name)} text-white border-none`}>
                                                {getStatusText(room.status.name)}
                                            </Badge>
                                            <span className="text-purple-200 text-sm">
                                                PIN: {room.pin}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={copyPin}
                                    className="border-purple-400/50 text-purple-200 hover:bg-purple-800/50 rounded-xl"
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    {copiedPin ? 'Copiado!' : 'Copiar PIN'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleEditRoom}
                                    className="border-purple-400/50 text-purple-200 hover:bg-purple-800/50 rounded-xl"
                                >
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Editar
                                </Button>
                                <Button
                                    onClick={handleStartRoom}
                                    disabled={room.status.name === RoomStatuses.COMPLETED}
                                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                                >
                                    <Play className="w-4 h-4 mr-2" />
                                    {room.status.name === RoomStatuses.ACTIVE ? 'Continuar Sala' : 'Iniciar Sala'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navegación por pestañas */}
                <div className="relative z-10 border-b border-purple-700/30 bg-purple-900/30">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex space-x-8">
                            {[
                                { id: 'overview', label: 'Resumen', icon: Eye },
                                { id: 'questions', label: 'Preguntas', icon: Target },
                                { id: 'settings', label: 'Configuración', icon: Settings }
                            ].map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveTab(id as any)}
                                    className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                                        activeTab === id
                                            ? 'border-purple-400 text-white'
                                            : 'border-transparent text-purple-300 hover:text-white'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    <span className="font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8"
                            >
                                {/* Estadísticas principales */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <Target className="w-5 h-5 text-purple-400" />
                                            <span className="text-purple-200 text-sm font-medium">Preguntas</span>
                                        </div>
                                        <p className="text-3xl font-bold text-white">{room.questions?.length || 0}</p>
                                    </div>
                                    
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <Users className="w-5 h-5 text-blue-400" />
                                            <span className="text-purple-200 text-sm font-medium">Participantes</span>
                                        </div>
                                        <p className="text-3xl font-bold text-white">0</p>
                                    </div>
                                    
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <Calendar className="w-5 h-5 text-green-400" />
                                            <span className="text-purple-200 text-sm font-medium">Creada</span>
                                        </div>
                                        <p className="text-lg font-semibold text-white">
                                            {new Date(room.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                        <div className="flex items-center space-x-3 mb-2">
                                            <Zap className="w-5 h-5 text-yellow-400" />
                                            <span className="text-purple-200 text-sm font-medium">Estado</span>
                                        </div>
                                        <Badge className={`${getStatusColor(room.status.name)} text-white border-none text-lg px-3 py-1`}>
                                            {getStatusText(room.status.name)}
                                        </Badge>
                                    </div>
                                </div>

                                {/* Información del PIN */}
                                <div className="bg-gradient-to-r from-purple-600/20 to-purple-700/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-white mb-4">PIN de la Sala</h2>
                                        <div className="bg-white/10 rounded-2xl p-6 inline-block">
                                            <p className="text-6xl font-mono font-bold text-purple-300 mb-2">
                                                {room.pin}
                                            </p>
                                            <p className="text-purple-200 text-sm">
                                                Los estudiantes usarán este PIN para unirse
                                            </p>
                                        </div>
                                        <div className="mt-6 flex justify-center space-x-4">
                                            <Button
                                                onClick={copyPin}
                                                className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                                            >
                                                <Copy className="w-4 h-4 mr-2" />
                                                Copiar PIN
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="border-purple-400/50 text-purple-200 hover:bg-purple-800/50 rounded-xl"
                                            >
                                                <Share2 className="w-4 h-4 mr-2" />
                                                Compartir Sala
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Vista previa rápida de preguntas */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                    <h3 className="text-xl font-bold text-white mb-6">Vista Previa de Preguntas</h3>
                                    <div className="space-y-4">
                                        {room.questions?.slice(0, 3).map((question, index) => (
                                            <div key={question.id} className="bg-purple-800/30 rounded-xl p-4 border border-purple-600/50">
                                                <div className="flex items-center space-x-3 mb-2">
                                                    <div className="w-6 h-6 bg-purple-600 rounded-lg flex items-center justify-center">
                                                        <span className="text-white text-sm font-bold">{index + 1}</span>
                                                    </div>
                                                    <h4 className="text-white font-medium">{question.text}</h4>
                                                </div>
                                                <p className="text-purple-300 text-sm ml-9">
                                                    {question.answers?.length || 0} respuestas
                                                </p>
                                            </div>
                                        ))}
                                        {room.questions && room.questions.length > 3 && (
                                            <div className="text-center">
                                                <Button
                                                    variant="ghost"
                                                    onClick={() => setActiveTab('questions')}
                                                    className="text-purple-300 hover:text-white"
                                                >
                                                    Ver todas las {room.questions.length} preguntas
                                                </Button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'questions' && (
                            <motion.div
                                key="questions"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-white">
                                        Preguntas ({room.questions?.length || 0})
                                    </h2>
                                    <Button
                                        onClick={handleEditRoom}
                                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                                    >
                                        <Edit3 className="w-4 h-4 mr-2" />
                                        Editar Preguntas
                                    </Button>
                                </div>

                                {room.questions && room.questions.length > 0 ? (
                                    <div className="space-y-6">
                                        {room.questions.map((question, qIndex) => (
                                            <motion.div
                                                key={question.id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: qIndex * 0.1 }}
                                                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30"
                                            >
                                                <div className="flex items-start space-x-4 mb-6">
                                                    <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                                        <span className="text-white font-bold">{qIndex + 1}</span>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h3 className="text-xl font-semibold text-white mb-4">
                                                            {question.text}
                                                        </h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                            {question.answers?.map((answer, aIndex) => (
                                                                <div
                                                                    key={answer.id}
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
                                                                        <span>{answer.text}</span>
                                                                        {answer.is_correct && <CheckCircle className="w-4 h-4 text-green-400" />}
                                                                    </div>
                                                                </div>
                                                            )) || (
                                                                <p className="text-purple-300 italic">Sin respuestas definidas</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <AlertCircle className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-white mb-2">
                                            Sin preguntas definidas
                                        </h3>
                                        <p className="text-purple-300 mb-6">
                                            Agrega preguntas para que los estudiantes puedan jugar
                                        </p>
                                        <Button
                                            onClick={handleEditRoom}
                                            className="bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                                        >
                                            <Plus className="w-4 h-4 mr-2" />
                                            Agregar Preguntas
                                        </Button>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                key="settings"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-2xl font-bold text-white">Configuración de la Sala</h2>
                                
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {/* Información general */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                        <h3 className="text-lg font-semibold text-white mb-4">Información General</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-purple-200 text-sm">Nombre de la Sala</label>
                                                <p className="text-white font-medium">{room.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-purple-200 text-sm">PIN de Acceso</label>
                                                <div className="flex items-center space-x-2">
                                                    <p className="text-white font-mono text-lg">{room.pin}</p>
                                                    <Button
                                                        size="sm"
                                                        variant="ghost"
                                                        onClick={copyPin}
                                                        className="text-purple-300 hover:text-white"
                                                    >
                                                        <Copy className="w-3 h-3" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div>
                                                <label className="text-purple-200 text-sm">Estado</label>
                                                <div className="flex items-center space-x-2">
                                                    <div className={`w-2 h-2 rounded-full ${getStatusColor(room.status.name)}`}></div>
                                                    <p className="text-white">{getStatusText(room.status.name)}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Acciones */}
                                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                        <h3 className="text-lg font-semibold text-white mb-4">Acciones</h3>
                                        <div className="space-y-3">
                                            <Button
                                                onClick={handleEditRoom}
                                                className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 text-white border border-purple-500/50"
                                            >
                                                <Edit3 className="w-4 h-4 mr-3" />
                                                Editar Sala
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start border-blue-500/50 text-blue-300 hover:bg-blue-600/20"
                                            >
                                                <RefreshCw className="w-4 h-4 mr-3" />
                                                Reiniciar Progreso
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => setShowDeleteModal(true)}
                                                className="w-full justify-start border-red-500/50 text-red-300 hover:bg-red-600/20"
                                            >
                                                <Trash2 className="w-4 h-4 mr-3" />
                                                Eliminar Sala
                                            </Button>
                                        </div>
                                    </div>
                                </div>

                                {/* Estadísticas detalladas */}
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                    <h3 className="text-lg font-semibold text-white mb-4">Estadísticas Detalladas</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-purple-300">{room.questions?.length || 0}</p>
                                            <p className="text-purple-200 text-sm">Preguntas</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-blue-300">0</p>
                                            <p className="text-purple-200 text-sm">Participantes</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-green-300">0</p>
                                            <p className="text-purple-200 text-sm">Partidas</p>
                                        </div>
                                        <div className="text-center">
                                            <p className="text-2xl font-bold text-yellow-300">-</p>
                                            <p className="text-purple-200 text-sm">Promedio</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Modal de confirmación para eliminar */}
            <AnimatePresence>
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-gray-900 border border-red-500/50 rounded-2xl p-6 max-w-md w-full"
                        >
                            <div className="text-center">
                                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Eliminar Sala</h3>
                                <p className="text-gray-300 mb-6">
                                    ¿Estás seguro de que quieres eliminar "<strong>{room.name}</strong>"? 
                                    Esta acción no se puede deshacer.
                                </p>
                                <div className="flex space-x-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDeleteModal(false)}
                                        className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            handleDeleteRoom();
                                            setShowDeleteModal(false);
                                        }}
                                        className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}