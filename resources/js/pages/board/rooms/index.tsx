import { useState, useEffect } from "react";
import { Head, usePage, router, Link } from "@inertiajs/react";
import {
    Plus,
    Play,
    Crown,
    Hand,
    Swords,
    ShieldPlus,
    Zap,
    LogOut,
    ChevronDown,
    Copy,
    Check,
    Users,
    Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Room, { RoomStatus } from "@/types/room";
import PublicLayout from "@/layouts/public-layout";
import { SharedData } from "@/types";
import { RoomStatuses } from "@/enums/room-statuses";
import { AnimatePresence, motion, usePresenceData } from "motion/react";
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';
import Typewriter from "@/components/typewriter";

interface IRoomsIndexProps {
    rooms: Room[];
}

export default function RoomsIndex({ rooms }: IRoomsIndexProps) {
    const { auth } = usePage<SharedData>().props;
    const [direction, setDirection] = useState<1 | -1>(1)
    const [selectedFilter, setSelectedFilter] = useState<string>(RoomStatuses.ALL);
    // ✅ Estado para el orden de las salas
    const [orderedRooms, setOrderedRooms] = useState<Room[]>(rooms);

    // ✅ Filtrar usando orderedRooms
    const filteredRooms = orderedRooms.filter(room => {
        if (selectedFilter === RoomStatuses.ALL) return true;
        return room.status.name === selectedFilter;
    });

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const getAvatarInitial = (name: string): string => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    // ✅ Definir filtros usando orderedRooms
    const filters = [
        { key: RoomStatuses.ALL, label: 'Todas', count: orderedRooms.length },
        { key: RoomStatuses.ACTIVE, label: 'En Vivo', count: orderedRooms.filter(r => r.status.name === RoomStatuses.ACTIVE).length },
        { key: RoomStatuses.DRAFT, label: 'Borradores', count: orderedRooms.filter(r => r.status.name === RoomStatuses.DRAFT).length },
        { key: RoomStatuses.COMPLETED, label: 'Completadas', count: orderedRooms.filter(r => r.status.name === RoomStatuses.COMPLETED).length }
    ];

    // ✅ Función para manejar cambio de filtro con dirección correcta
    const handleFilterChange = (newFilterKey: string) => {
        const currentIndex = filters.findIndex(f => f.key === selectedFilter);
        const newIndex = filters.findIndex(f => f.key === newFilterKey);
        
        // Calcular dirección: 1 si vamos hacia la derecha, -1 si vamos hacia la izquierda
        const newDirection = newIndex > currentIndex ? 1 : -1;
        
        setDirection(newDirection);
        setSelectedFilter(newFilterKey);
    };

    // ✅ Manejar reordenamiento con react-easy-sort
    const onSortEnd = (oldIndex: number, newIndex: number) => {
        const filteredIds = new Set(filteredRooms.map(r => r.id));
        const reorderedFilteredRooms = arrayMoveImmutable(filteredRooms, oldIndex, newIndex);
        
        // ✅ Actualizar el orden completo manteniendo las no filtradas
        const updatedRooms = [...orderedRooms];
        let reorderedIndex = 0;
        
        for (let i = 0; i < updatedRooms.length; i++) {
            if (filteredIds.has(updatedRooms[i].id)) {
                updatedRooms[i] = reorderedFilteredRooms[reorderedIndex];
                reorderedIndex++;
            }
        }
        
        setOrderedRooms(updatedRooms);
    };

    // ✅ Actualizar orderedRooms cuando cambien las rooms desde el servidor
    useEffect(() => {
        setOrderedRooms(rooms);
    }, [rooms]);

    return (
        <PublicLayout>
            <Head title="Salas de Juego" />

            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 relative overflow-hidden">
                {/* Decorativos... (mantener igual) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-20 left-20 text-purple-300/10">
                        <Zap className="w-32 h-32" />
                    </div>
                    <div className="absolute top-32 right-32 text-indigo-300/10">
                        <ShieldPlus className="w-24 h-24" />
                    </div>
                    <div className="absolute bottom-32 left-1/4 text-purple-300/10">
                        <Swords className="w-24 h-24" />
                    </div>
                    <div className="absolute bottom-10 right-1/3 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                </div>

                {/* Header... (mantener igual) */}
                <header className="relative z-10 p-6">
                    <nav className="flex items-center justify-between max-w-7xl mx-auto">
                        <div className="flex items-center space-x-3 transition-all duration-1000">
                            <Crown className="w-10 h-10 text-purple-300 animate-pulse" />
                            <h1 className="text-2xl md:text-3xl font-bold text-white">
                                Hola{" "}
                                <Typewriter
                                    text={auth.user?.name}
                                    speed={50}
                                />
                            </h1>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <Button
                            onClick={() => router.visit(route('rooms.create'))}
                            className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full shadow-lg px-8 py-3 text-lg font-bold flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-indigo-500/25"
                        >
                            <Plus className="w-6 h-6" />
                            Nueva Sala
                        </Button>
                            <div className="text-white text-lg font-semibold">
                                Mis Salas
                            </div>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative h-10 w-10 rounded-full bg-purple-600 hover:bg-purple-500 transition-colors duration-200"
                                    >
                                        <div className="flex items-center justify-center w-full h-full text-white font-semibold">
                                            {auth.user?.avatar ? (
                                                <img
                                                    src={auth.user.avatar}
                                                    alt={auth.user.name || 'Usuario'}
                                                    className="w-full h-full rounded-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-sm">
                                                    {getAvatarInitial(auth.user?.name || '')}
                                                </span>
                                            )}
                                        </div>
                                        <ChevronDown className="absolute -bottom-1 -right-1 w-3 h-3 text-white bg-purple-700 rounded-full p-0.5" />
                                    </Button>
                                </DropdownMenuTrigger>
                                
                                <DropdownMenuContent 
                                    className="w-60 mt-1 bg-white/95 backdrop-blur-sm border border-purple-200 shadow-lg" 
                                    align="end"
                                >
                                    <div className="px-3 py-2 border-b border-purple-100">
                                        <p className="text-base font-semibold text-purple-900 truncate">
                                            {auth.user?.name}
                                        </p>
                                        <p className="text-sm text-purple-600 truncate">
                                            {auth.user?.email}
                                        </p>
                                    </div>
                                    
                                    <DropdownMenuItem 
                                        onClick={handleLogout}
                                        className="cursor-pointer mt-0.5 text-red-600 hover:!text-red-700 hover:bg-red-50 focus:bg-red-50"
                                    >
                                        <LogOut className="mr-2 h-4 w-4 text-red-600" />
                                        Cerrar Sesión
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </nav>
                </header>

                {/* ✅ Filtros */}
                <div className="flex items-center justify-between max-w-7xl mb-10 z-10 relative mx-auto px-4">
                    {/* Filtros existentes */}
                    <div className="flex items-center space-x-4">
                        {filters.map((filter) => (
                            <button
                                key={filter.key}
                                onClick={() => handleFilterChange(filter.key)}
                                className={`cursor-pointer px-8 py-3 rounded-full font-semibold text-lg transition-all duration-300 shadow-md
                                    ${selectedFilter === filter.key
                                        ? 'bg-white text-purple-800 shadow-lg'
                                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
                                    }`}
                            >
                                {filter.label} <span className="font-bold">({filter.count})</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* ✅ Área de salas con SortableList */}
                <main className="relative z-10 flex flex-col items-center">
                    <div className="max-w-7xl w-full mx-auto">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <Hand className="w-6 h-6 text-white" />
                            <p className="text-purple-200 text-base">
                                Arrastra las salas para organizarlas como prefieras
                            </p>
                        </div>
                        <AnimatePresence
                            custom={direction}
                            initial={false}
                            mode="wait"
                        >
                            <PresenceDataAnimation key={selectedFilter}>
                                {filteredRooms.length === 0 ? (
                                    <button 
                                        className="cursor-pointer w-full relative grid grid-rows-1 min-h-[600px] bg-white/5 rounded-3xl backdrop-blur-sm border-2 hover:border-dashed border-white/10 hover:border-white/50 p-10 shadow-2xl"
                                    >
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-28 h-28 bg-purple-500/20 rounded-full flex items-center justify-center mb-8">
                                                <Plus className="w-14 h-14 text-purple-300" />
                                            </div>
                                            <h3 className="text-3xl font-bold text-white mb-2">
                                                ¡Comienza tu primera aventura!
                                            </h3>
                                            <p className="text-purple-200 text-lg">
                                                Crea una sala para que tus estudiantes se unan a la diversión matemática
                                            </p>
                                        </div>
                                    </button>
                                ) : (
                                    <div className="relative grid grid-rows-1 min-h-[600px] bg-white/5 rounded-3xl backdrop-blur-sm border border-white/10 p-10 shadow-2xl">
                                        {/* ✅ Usar un contenedor wrapper normal en lugar de aplicar grid directamente al SortableList */}
                                        <SortableList
                                            onSortEnd={onSortEnd}
                                            className="w-full" // ✅ Quitar el grid de aquí
                                            draggedItemClassName="opacity-50 scale-105 rotate-2 z-50"
                                            allowDrag={true} // ✅ Asegurarse de que el drag esté habilitado
                                        >
                                            {/* ✅ Usar un div wrapper para el grid */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                                                {filteredRooms.map((room, index) => (
                                                    <SortableItem key={room.id}>
                                                        <div className="w-full"> {/* ✅ Wrapper adicional */}
                                                            <SimpleRoomCard
                                                                room={room}
                                                                onStart={(room: Room) => console.log('Iniciando sala:', room)}
                                                            />
                                                        </div>
                                                    </SortableItem>
                                                ))}
                                            </div>
                                        </SortableList>
                                    </div>
                                )}
                            </PresenceDataAnimation>
                        </AnimatePresence>
                    </div>
                </main>
            </div>
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

interface SimpleRoomCardProps {
    room: Room;
    onStart: (room: Room) => void;
}

// ✅ SimpleRoomCard con handle de drag
const SimpleRoomCard = ({ room, onStart }: SimpleRoomCardProps) => {
    const [copiedPin, setCopiedPin] = useState<boolean>(false);

    const getStatusColor = (status: RoomStatus): string => {
        switch (status.name) {
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

    const getStatusText = (status: RoomStatus): string => {
        switch (status.name) {
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

    const handleCopyPin = async () => {
        if (!room.pin) return;
        
        try {
            await navigator.clipboard.writeText(room.pin);
            setCopiedPin(true);
            setTimeout(() => setCopiedPin(false), 2000);
        } catch (err) {
            const textArea = document.createElement('textarea');
            textArea.value = room.pin;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopiedPin(true);
            setTimeout(() => setCopiedPin(false), 2000);
        }
    };

    return (
        <div className="w-full cursor-grab active:cursor-grabbing max-w-sm mx-auto select-none">
            <div className="group bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex flex-col items-start relative">
                <div className="flex items-center gap-4 mb-4 w-full pr-12"> {/* ✅ Más espacio para el handle */}
                    <h3 className="text-white font-semibold text-xl text-start truncate flex-1 group-hover:text-purple-200 transition-colors">
                        {room.name || 'Sala Sin Nombre'}
                    </h3>
                    <div className="flex items-center gap-3 flex-shrink-0">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(room.status)}`}></div>
                        <span className="text-white/90 truncate font-medium text-xs bg-white/25 px-3 py-1 rounded-full">
                            {getStatusText(room.status)}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-6 w-full mb-6">
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                        <span className="text-white/80 text-sm">PIN:</span>
                        <span className="text-white font-mono text-lg font-bold">
                            {room.pin || '------'}
                        </span>
                        {room.pin && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                    e.preventDefault(); // ✅ Prevenir interferencia con drag
                                    e.stopPropagation();
                                    handleCopyPin();
                                }}
                                className="h-6 w-6 p-0 hover:bg-white/20 text-white hover:text-purple-200 transition-colors"
                                title="Copiar PIN"
                            >
                                {copiedPin ? (
                                    <Check className="w-3 h-3 text-green-400" />
                                ) : (
                                    <Copy className="w-3 h-3" />
                                )}
                            </Button>
                        )}
                    </div>
                    <div className="grid grid-cols-[auto_1fr] items-center gap-1.5">
                        <Users className="w-5 h-5 text-white/70" />
                        <span className="text-white/80 text-lg">
                            0
                        </span>
                    </div>
                </div>

                <div className="w-full grid grid-cols-[1fr_auto] gap-3 items-center z-1">
                    <Button
                        onClick={(e) => {
                            e.preventDefault(); // ✅ Prevenir interferencia con drag
                            e.stopPropagation();
                            onStart(room);
                        }}
                        className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-md hover:shadow-purple-500/25 transition-all duration-300 text-base font-semibold py-2"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        {room.status.name === RoomStatuses.ACTIVE ? 'Continuar' : (room.status.name === RoomStatuses.DRAFT ? 'Iniciar' : 'Ver Resultados')}
                    </Button>
                    <Link href={route('rooms.show', room.id)} className="text-purple-200 hover:underline hover:bg-white/20 size-8 grid place-items-center place-content-center transition-all duration-300 rounded-md">
                        <Settings className="size-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
};