import { useState } from "react";
import { Head, router } from "@inertiajs/react";
import { motion, AnimatePresence, usePresenceData } from "framer-motion";
import QRCode from "react-qr-code";
import {
    ArrowLeft,
    Crown,
    Users,
    Play,
    Edit3,
    Trash2,
    Copy,
    Settings,
    Target,
    CheckCircle,
    AlertCircle,
    Zap,
    Calendar,
    RefreshCw,
    Plus,
    ChartNoAxesCombined,
    MessageCircleQuestion,
    QrCode,
    Download,
    Smartphone,
    Maximize
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Room from "@/types/room";
import { RoomStatuses } from "@/enums/room-statuses";
import PublicLayout from "@/layouts/public-layout";
import DeleteRoomModal from "@/components/board/rooms/delete-room-modal";
import QrRoomModal from "@/components/board/rooms/qr-room-modal";
import QRCodeGenerator from 'qrcode';

interface IRoomsShowProps {
    room: Room;
}

const tabs = [
    { id: 'overview', label: 'Resumen', icon: ChartNoAxesCombined },
    { id: 'questions', label: 'Preguntas', icon: MessageCircleQuestion },
    { id: 'settings', label: 'Configuración', icon: Settings }
];

export default function RoomsShow({ room }: IRoomsShowProps) {
    const [activeTab, setActiveTab] = useState<'overview' | 'questions' | 'settings'>('overview');
    const [direction, setDirection] = useState<1 | -1>(1);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [copiedPin, setCopiedPin] = useState(false);
    const [copiedUrl, setCopiedUrl] = useState(false);
    const [showQRModal, setShowQRModal] = useState(false);

    const studentAccessUrl = route('rooms.join', { pin: room.pin });

    const handleStartRoom = () => {
        console.log('Iniciando sala...');
    };

    const handleEditRoom = () => {
        router.visit(route('rooms.edit', room.id));
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

    const copyUrl = async () => {
        try {
            await navigator.clipboard.writeText(studentAccessUrl);
            setCopiedUrl(true);
            setTimeout(() => setCopiedUrl(false), 2000);
        } catch (err) {
            console.error('Error al copiar URL:', err);
        }
    };

    const downloadQR = async () => {
        try {
            const qrCodeDataUrl = await QRCodeGenerator.toDataURL(studentAccessUrl, {
                type: 'image/png',
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                },
                width: 1024
            });
            
            const downloadLink = document.createElement('a');
            downloadLink.download = `qr-sala-${room.pin}.png`;
            downloadLink.href = qrCodeDataUrl;
            downloadLink.click();
        } catch (err) {
            console.error('Error al descargar QR:', err);
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

    const handleTabChange = (tab: 'overview' | 'questions' | 'settings') => {
        const currentIndex = tabs.findIndex(t => t.id === activeTab);
        const newIndex = tabs.findIndex(t => t.id === tab);
        setDirection(newIndex > currentIndex ? 1 : -1);
        setActiveTab(tab);
    }

    return (
        <PublicLayout>
            <Head title={`${room.name} - Sala de Juego`} />
            
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-indigo-800 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 border-b border-purple-500/30 bg-purple-900/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <Button
                                    variant="ghost"
                                    onClick={() => router.visit(route('rooms.index'))}
                                    className="cursor-pointer text-purple-200 hover:text-white hover:bg-purple-800/50 rounded-xl"
                                >
                                    <ArrowLeft className="w-5 h-5 mr-0.5" />
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
                                    onClick={() => setShowQRModal(true)}
                                    className="cursor-pointer !border-purple-400/50 text-purple-200 bg-black/20 hover:!bg-black/30 hover:!text-white hover:!border-purple-400/70 rounded-xl"
                                >
                                    <QrCode className="w-4 h-4 mr-0.5" />
                                    QR Code
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={copyPin}
                                    className="cursor-pointer !border-purple-400/50 text-purple-200 bg-black/20 hover:!bg-black/30 hover:!text-white hover:!border-purple-400/70 rounded-xl"
                                >
                                    <Copy className="w-4 h-4 mr-0.5" />
                                    {copiedPin ? 'Copiado!' : 'Copiar PIN'}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={handleEditRoom}
                                    className="cursor-pointer !border-purple-400/50 text-purple-200 bg-black/20 hover:!bg-black/30 hover:!text-white hover:!border-purple-400/70 rounded-xl"
                                >
                                    <Edit3 className="w-4 h-4 mr-0.5" />
                                    Editar
                                </Button>
                                <Button
                                    onClick={handleStartRoom}
                                    disabled={room.status.name === RoomStatuses.COMPLETED}
                                    className="cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50"
                                >
                                    <Play className="w-4 h-4 mr-0.5" />
                                    {room.status.name === RoomStatuses.ACTIVE ? 'Continuar Sala' : 'Iniciar Sala'}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 border-b border-purple-600/30 bg-purple-900/30">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex space-x-8">
                            {tabs.map(({ id, label, icon: Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => handleTabChange(id as 'overview' | 'questions' | 'settings')}
                                    className={`cursor-pointer flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                                        activeTab === id
                                            ? 'border-purple-400 text-white'
                                            : 'border-transparent text-purple-300 hover:text-white'
                                    }`}
                                >
                                    <Icon className="size-5" />
                                    <span className="font-medium">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
                    <AnimatePresence custom={direction} initial={false} mode="wait">
                        <PresenceDataAnimation key={activeTab}>
                            {activeTab === 'overview' && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Target className="w-5 h-5 text-purple-400" />
                                                <span className="text-purple-200 text-sm font-medium">Preguntas</span>
                                            </div>
                                            <p className="text-3xl font-bold text-white">{room.questions?.length || 0}</p>
                                        </div>
                                        
                                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Users className="w-5 h-5 text-blue-400" />
                                                <span className="text-purple-200 text-sm font-medium">Participantes</span>
                                            </div>
                                            <p className="text-3xl font-bold text-white">0</p>
                                        </div>
                                        
                                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Calendar className="w-5 h-5 text-green-400" />
                                                <span className="text-purple-200 text-sm font-medium">Creada</span>
                                            </div>
                                            <p className="text-lg font-semibold text-white">
                                                {new Date(room.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        
                                        <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <Zap className="w-5 h-5 text-yellow-400" />
                                                <span className="text-purple-200 text-sm font-medium">Estado</span>
                                            </div>
                                            <Badge className={`${getStatusColor(room.status.name)} text-white border-none text-lg px-3 py-1`}>
                                                {getStatusText(room.status.name)}
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        <div className="bg-gradient-to-r grid grid-cols-1 grid-rows-1 place-content-center place-items-center from-purple-600/20 to-purple-700/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                                            <div className="text-center">
                                                <h2 className="text-2xl font-bold text-white mb-4">PIN de Acceso</h2>
                                                <div className="bg-white/10 rounded-2xl p-6">
                                                    <p className="text-6xl tracking-[0.3em] text-center font-mono font-bold text-purple-100 mb-2">
                                                        {room.pin}
                                                    </p>
                                                    <p className="text-purple-200 text-sm">
                                                        Los estudiantes escriben este PIN
                                                    </p>
                                                </div>
                                                <div className="mt-6 flex justify-center space-x-3">
                                                    <Button
                                                        onClick={copyPin}
                                                        className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                                                    >
                                                        <Copy className="w-4 h-4 mr-0.5" />
                                                        {copiedPin ? 'Copiado!' : 'Copiar PIN'}
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-gradient-to-r from-indigo-600/20 to-indigo-700/20 backdrop-blur-sm rounded-2xl p-8 border border-indigo-500/30">
                                            <div className="grid grid-cols-1 place-content-center place-items-center">
                                                <h2 className="text-2xl inline-flex items-center font-bold text-white mb-4">
                                                    <QrCode className="w-7 h-7 inline mr-2" />
                                                    Código QR
                                                </h2>
                                                <div className="bg-white/10 rounded-2xl p-6 inline-block">
                                                    <div className="bg-white rounded-xl p-4 grid place-content-center place-items-center">
                                                        <QRCode
                                                            id="qr-code"
                                                            value={studentAccessUrl}
                                                            size={200}
                                                            level="H"
                                                        />
                                                    </div>
                                                    <p className="text-purple-200 text-sm mt-3">
                                                        <Smartphone className="w-4 h-4 inline mr-1" />
                                                        Escanea para acceder directamente
                                                    </p>
                                                </div>
                                                <div className="mt-6 flex justify-center space-x-3">
                                                    <Button
                                                        onClick={() => setShowQRModal(true)}
                                                        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                                                    >
                                                        <Maximize className="w-4 h-4 mr-0.5" />
                                                        Ver Grande
                                                    </Button>
                                                    <Button
                                                        onClick={downloadQR}
                                                        variant="outline"
                                                        className="cursor-pointer !border-black/10 !text-indigo-200 bg-black/30 hover:bg-black/50 rounded-xl"
                                                    >
                                                        <Download className="w-4 h-4 mr-0.5" />
                                                        Descargar
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30">
                                        <h3 className="text-xl font-bold text-white mb-6">Vista Previa de Preguntas</h3>
                                        <div className="space-y-4">
                                            {room.questions?.slice(0, 3).map((question, index) => (
                                                <div key={question.id} className="bg-white/10 rounded-xl p-4 border border-purple-600/50">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <div className="w-6 h-6 bg-purple-800 rounded-lg flex items-center justify-center">
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
                                                        className="cursor-pointer text-purple-200 hover:!bg-transparent hover:!text-white"
                                                    >
                                                        Ver todas las {room.questions.length} preguntas
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'questions' && (
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-white">
                                            Preguntas ({room.questions?.length || 0})
                                        </h2>
                                        <Button
                                            onClick={handleEditRoom}
                                            className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-xl"
                                        >
                                            <Edit3 className="w-4 h-4 mr-0.5" />
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
                                                    className="bg-white/15 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/30"
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
                                </div>
                            )}

                            {activeTab === 'settings' && (
                                <div className="space-y-6">
                                    <h2 className="text-2xl font-bold text-white">Configuración de la Sala</h2>
                                    
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                            <h3 className="text-lg font-semibold text-white mb-4">Información General</h3>
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="text-purple-200 text-sm">Nombre de la Sala</label>
                                                    <p className="text-white font-medium">{room.name}</p>
                                                </div>
                                                <div>
                                                    <label className="text-purple-200 text-sm">PIN de Acceso</label>
                                                    <div className="flex items-center space-x-1">
                                                        <p className="text-white font-mono text-lg">{room.pin}</p>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={copyPin}
                                                            className="cursor-pointer size-8 text-purple-300 hover:text-white"
                                                        >
                                                            <Copy className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label className="text-purple-200 text-sm">URL de Acceso</label>
                                                    <div className="flex items-center space-x-1">
                                                        <p className="text-white text-sm font-mono truncate">{studentAccessUrl}</p>
                                                        <Button
                                                            size="sm"
                                                            variant="ghost"
                                                            onClick={copyUrl}
                                                            className="cursor-pointer size-8 text-purple-300 hover:text-white"
                                                        >
                                                            <Copy className="w-3 h-3" />
                                                        </Button>
                                                    </div>
                                                    {copiedUrl && (
                                                        <p className="text-green-400 text-xs mt-1">✓ URL copiada</p>
                                                    )}
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

                                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
                                            <h3 className="text-lg font-semibold text-white mb-4">Acciones</h3>
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                                <Button
                                                    onClick={handleEditRoom}
                                                    className="
                                                        cursor-pointer w-full rounded-xl justify-center h-20 !bg-purple-400/20 hover:!bg-purple-400/30 text-white border !border-purple-500/50
                                                        text-lg
                                                    "
                                                >
                                                    <Edit3 className="size-6 mr-1" />
                                                    Editar Sala
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    className="
                                                        cursor-pointer w-full rounded-xl justify-center h-20 !border-blue-500/20 !text-white !bg-blue-400/20 hover:!bg-blue-600/20
                                                        text-lg transition-all duration-200
                                                    "
                                                >
                                                    <RefreshCw className="size-6 mr-1" />
                                                    Reiniciar Progreso
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => setShowDeleteModal(true)}
                                                    className="
                                                        cursor-pointer w-full rounded-xl justify-center h-20 !border-red-500/20 !text-white !bg-red-400/20 hover:!bg-red-600/20
                                                        text-lg transition-all duration-200
                                                    "
                                                >
                                                    <Trash2 className="size-6 mr-1" />
                                                    Eliminar Sala
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

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
                                </div>
                            )}
                        </PresenceDataAnimation>
                    </AnimatePresence>
                </div>
            </div>

            <DeleteRoomModal setShowDeleteModal={(value) => setShowDeleteModal(value)} showDeleteModal={showDeleteModal} room={room} />
            <QrRoomModal 
                room={room}
                copyUrl={copyUrl}
                downloadQR={downloadQR}
                copiedUrl={copiedUrl}
                showQRModal={showQRModal}
                studentAccessUrl={studentAccessUrl}
                setShowQRModal={(value) => setShowQRModal(value)} 
            />
        </PublicLayout>
    );
}

function PresenceDataAnimation ({ children }: { children: React.ReactNode }) {
    const direction = usePresenceData();

    return (
        <motion.div
            initial={{ opacity: 0, x: direction * 50}}
            animate={{
                opacity: 1,
                x: 0,
                transition: {
                    type: 'spring',
                    visualDuration: 0.2,
                    bounce: 0.15
                }
            }}
            exit={{ opacity: 0, x: direction * -50 }}
        >
            {children}
        </motion.div>
    );
}