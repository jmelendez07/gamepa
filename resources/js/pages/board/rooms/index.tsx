import { useState, useRef, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import { 
    Plus, 
    Users, 
    Clock, 
    Play,
    Copy, 
    Trash2, 
    Edit, 
    Crown,
    Zap,
    Target,
    Star,
    ChevronRight,
    GripVertical,
    Boxes,
    Component,
    Hand,
    MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Room, { RoomStatus } from "@/types/room";
import PublicLayout from "@/layouts/public-layout";
import { SharedData } from "@/types";
import { RoomStatuses } from "@/enums/room-statuses";

interface IRoomsIndexProps {
    rooms: Room[];
}

export default function RoomsIndex({ rooms }: IRoomsIndexProps) {
    const { auth } = usePage<SharedData>().props;
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const filteredRooms = rooms.filter(room => {
        if (selectedFilter === 'all') return true;
        return room.status.name === selectedFilter;
    });

    const handleCreateRoom = () => {
        // Navegar a crear sala
        window.location.href = route('rooms.create');
    };

    const handleStartRoom = (room: Room) => {
        // Iniciar sala
        console.log('Iniciando sala:', room);
    };

    const handleEditRoom = (room: Room) => {
        // Editar sala
        window.location.href = route('rooms.edit', room.id);
    };

    const handleDeleteRoom = (room: Room) => {
        // Eliminar sala
        console.log('Eliminando sala:', room);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <PublicLayout>
            <Head title="Salas de Juego" />

            <div 
                className="fixed w-4 h-4 bg-purple-400 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-100"
                style={{
                    left: mousePosition.x - 8,
                    top: mousePosition.y - 8,
                    transform: `scale(${mousePosition.x > 0 ? 1.2 : 1})`
                }}
            />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-10 left-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    
                    {/* Patrón de cuadrícula sutil */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
                </div>

                {/* Header */}
                <div className="relative z-10 p-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-8">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Crown className="text-white size-8" />
                                        <h1 className="text-4xl font-bold text-white">
                                            Hola {auth.user?.name}
                                        </h1>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-semibold text-white">Mis Salas</h3>
                            </div>
                            <p className="text-purple-200">
                                Crea y gestiona tus salas de aventuras matemáticas épicas
                            </p>
                        </div>

                        {/* Filtros */}
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-purple-200 font-medium">Mostrar:</span>
                            {[
                                { key: 'all', label: 'Todas', count: rooms.length },
                                { key: 'active', label: 'En Vivo', count: rooms.filter(r => r.status.name === 'active').length },
                                { key: 'draft', label: 'Borradores', count: rooms.filter(r => r.status.name === 'draft').length },
                                { key: 'completed', label: 'Completadas', count: rooms.filter(r => r.status.name === 'completed').length }
                            ].map(filter => (
                                <button
                                    key={filter.key}
                                    onClick={() => setSelectedFilter(filter.key)}
                                    className={`cursor-pointer px-6 py-2 rounded-2xl font-medium transition-all duration-300 ${
                                        selectedFilter === filter.key
                                            ? 'bg-white text-purple-800 shadow-lg'
                                            : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                                    }`}
                                >
                                    {filter.label} ({filter.count})
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Área de salas arrastrables */}
                <div className="relative z-10 px-8 pb-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="relative min-h-[600px] bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 p-8">
                            {filteredRooms.length === 0 ? (
                                <div className="flex items-center justify-center h-96">
                                    <div className="text-center">
                                        <div className="w-24 h-24 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Plus className="w-12 h-12 text-purple-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            ¡Comienza tu primera aventura!
                                        </h3>
                                        <p className="text-purple-200 mb-6">
                                            Crea una sala para que tus estudiantes se unan a la diversión matemática
                                        </p>
                                        <Button
                                            onClick={handleCreateRoom}
                                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl shadow-lg px-8 py-4"
                                        >
                                            <Plus className="w-5 h-5 mr-2" />
                                            Crear Mi Primera Sala
                                            <ChevronRight className="w-5 h-5 ml-2" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-8">
                                    <div className="flex items-center justify-center gap-2">
                                        <Hand className="w-5 h-5 text-white" />
                                        <p className="text-center text-purple-200 text-sm">
                                            Arrastra las salas para organizarlas como prefieras
                                        </p>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {filteredRooms.map((room, index) => (
                                            <RoomCard
                                                key={room.id}
                                                room={room}
                                                index={index}
                                                onEdit={handleEditRoom}
                                                onDelete={handleDeleteRoom}
                                                onStart={handleStartRoom}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}

const RoomCard = ({ room, index, onStart, onEdit, onDelete }: any) => {
    const getStatusColor = (status: RoomStatus): string => {
        switch (status.name) {
            case RoomStatuses.Active: 
                return 'bg-green-500';
            case RoomStatuses.Draft: 
                return 'bg-purple-500';
            case RoomStatuses.Completed: 
                return 'bg-gray-500';
            default: 
                return 'bg-purple-500';
        }
    };

    const getStatusText = (status: RoomStatus): string => {
        switch (status.name) {
            case RoomStatuses.Active: 
                return 'En Vivo';
            case RoomStatuses.Draft: 
                return 'Borrador';
            case RoomStatuses.Completed: 
                return 'Completada';
            default: 
                return 'Borrador';
        }
    };

    return (
        <div className="w-full max-w-sm">
            <div className="relative group bg-gradient-to-br from-purple-900 to-purple-800 border border-purple-100/40 rounded-xl transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                    <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8"></div>
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-1">
                            <h3 className="text-white font-semibold text-lg truncate">
                                {room.name || 'Sala Sin Nombre'}
                            </h3>
                            <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${getStatusColor(room.status)}`}></div>
                                <span className="text-white/90 font-medium text-xs bg-white/20 px-2 py-1 rounded-full">
                                    {getStatusText(room.status)}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 text-white/80">
                            <div className="flex items-center space-x-1">
                                <span className="text-xs">PIN: {room.pin || '------'}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <Users className="w-3 h-3" />
                                <span className="text-xs">0 jugadores</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Body */}
                <div className="p-4">
                    <div className="space-y-3">
                        {/* Estadísticas */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-purple-800/50 rounded-lg p-2 text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <Target className="w-3 h-3 text-purple-300" />
                                </div>
                                <span className="text-purple-100 text-xs font-medium">0 Preguntas</span>
                            </div>
                            <div className="bg-purple-800/50 rounded-lg p-2 text-center">
                                <div className="flex items-center justify-center mb-1">
                                    <Clock className="w-3 h-3 text-purple-300" />
                                </div>
                                <span className="text-purple-100 text-xs font-medium">30 min</span>
                            </div>
                        </div>

                        {/* Fecha de creación */}
                        <div className="text-purple-300 text-xs text-center">
                            Creada el {new Date(room.created_at).toLocaleDateString()}
                        </div>

                        {/* Acciones */}
                        <div className="flex items-center space-x-2 pt-2">
                            <Button
                                onClick={() => onStart(room)}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-purple-500/25 transition-all duration-300 text-sm font-medium"
                            >
                                <Play className="w-3 h-3 mr-1" />
                                {room.status.name === RoomStatuses.Active ? 'Continuar' : 'Iniciar'}
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onEdit(room)}
                                className="border-purple-400/50 text-purple-300 hover:bg-purple-700/50 hover:border-purple-400 rounded-lg w-9 h-9 p-0"
                            >
                                <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onDelete(room)}
                                className="border-red-400/50 text-red-300 hover:bg-red-700/50 hover:border-red-400 rounded-lg w-9 h-9 p-0"
                            >
                                <Trash2 className="w-3 h-3" />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Efecto hover */}
                <div className="absolute inset-0 bg-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
            </div>
        </div>
    );
};