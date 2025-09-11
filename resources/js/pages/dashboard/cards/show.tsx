import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, PageProps } from "@/types";
import Card, { TypeCard } from "@/types/card";
import Exercise from "@/types/exercise";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { 
    Edit2, 
    Plus, 
    Search, 
    Zap, 
    CheckCircle,
    XCircle,
    Filter,
    Calculator,
    Globe,
    Hash,
    TrendingUp,
    Share2,
    Calendar,
    ChevronLeft,
    Trash2,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card as UICard, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import EditCardModal from "@/components/dashboard/cards/edit-card-modal";
import DeleteCardModal from "@/components/dashboard/cards/delete-card-modal";
import { toast } from "sonner";

interface ICardsShowProps {
    card: Card;
    availableExercises: Exercise[];
    types: TypeCard[];
}

export default function CardsShow({ card, availableExercises, types }: ICardsShowProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const { flash } = usePage<PageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Panel de Control',
            href: route('dashboard'),
        },
        {
            title: 'Cartas',
            href: route('cards.index'),
        },
        {
            title: card.name,
            href: route('cards.show', card.id)
        }
    ];

    const assignedExercises = card.exercises || [];
    const typesList = types || [];

    const getTypeColor = (typeName: string) => {
        const name = typeName.toLowerCase();
        if (name.includes('ataque') || name.includes('attack') || name.includes('fire')) {
            return "bg-red-500 text-white";
        } else if (name.includes('defensa') || name.includes('defense') || name.includes('ice')) {
            return "bg-blue-500 text-white";
        } else if (name.includes('curación') || name.includes('heal') || name.includes('nature')) {
            return "bg-green-500 text-white";
        } else if (name.includes('potenciación') || name.includes('boost') || name.includes('lightning')) {
            return "bg-yellow-500 text-white";
        }
        return "bg-gray-500 text-white";
    };

    const getDifficultyColor = (difficulty: string) => {
        const diff = difficulty.toLowerCase();
        if (diff.includes('fácil') || diff.includes('easy') || diff.includes('básico')) {
            return "bg-green-100 text-green-800";
        } else if (diff.includes('medio') || diff.includes('medium') || diff.includes('intermedio')) {
            return "bg-yellow-100 text-yellow-800";
        } else if (diff.includes('difícil') || diff.includes('hard') || diff.includes('avanzado')) {
            return "bg-red-100 text-red-800";
        }
        return "bg-gray-100 text-gray-800";
    };

    const handleAssignExercise = (exerciseId: string) => {
        router.post(route('cards.exercises.assign', [card.id, exerciseId]), {}, {
            preserveScroll: true,
        });
    };

    const handleUnassignExercise = (exerciseId: string) => {
        router.delete(route('cards.exercises.unassign', [card.id, exerciseId]), {
            preserveScroll: true,
        });
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `Carta: ${card.name}`,
                text: `Echa un vistazo a esta carta de ${card.type.name} con ${assignedExercises.length} ejercicios asignados.`,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                alert('Enlace copiado al portapapeles');
            });
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleEdit = (card: Card) => {
        setSelectedCard(card);
        setIsEditModalOpen(true);
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setSelectedCard(null);
    };

    const handleDelete = (card: Card) => {
        setSelectedCard(card);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedCard(null);
    };

    const assignedExerciseIds = assignedExercises.map(ex => ex.id);
    const filteredAvailableExercises = availableExercises
        .filter(exercise => !assignedExerciseIds.includes(exercise.id))
        .filter(exercise => exercise.operation.toLowerCase().includes(searchTerm.toLowerCase()));

    const filteredAssignedExercises = assignedExercises.filter(exercise =>
        exercise.operation.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
            <Head title={`Gestionar carta | ${card.name}`} />
            
            <div className="space-y-8 p-6">
                {/* Header con información de la carta */}
                <div className="bg-gradient-to-r group from-blue-50/50 to-indigo-100 rounded-xl p-8 border border-blue-300">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
                        <div className="space-y-4 flex-1">
                            <div>
                                <div className="mb-1 flex items-center gap-1">
                                    <Link href={route('cards.index')} className="text-gray-600 hover:text-gray-800 transition-colors duration-200">
                                        <ChevronLeft className="w-0 group-hover:w-7 h-7 transition-all duration-200 ease-in-out" />
                                    </Link>
                                    <h1 className="text-4xl font-bold text-gray-900">{card.name}</h1>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 mb-3">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">
                                        Creada el {formatDate(card.created_at)}
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-3 mb-3">
                                    <Badge className={`${getTypeColor(card.type.name)} px-4 py-2 text-base font-medium`}>
                                        {card.type.name}
                                    </Badge>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-600 font-medium">ID: {card.id}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-2 bg-yellow-100 px-4 py-3 rounded-lg border border-yellow-200">
                                    <Zap className="h-5 w-5 text-yellow-600" />
                                    <span className="font-semibold text-yellow-800">Energía: {card.energy_cost}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-purple-100 px-4 py-3 rounded-lg border border-purple-200">
                                    <TrendingUp className="h-5 w-5 text-purple-600" />
                                    <span className="font-semibold text-purple-800">Stats: {card.stats}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-green-100 px-4 py-3 rounded-lg border border-green-200">
                                    <Calculator className="h-5 w-5 text-green-600" />
                                    <span className="font-semibold text-green-800">{assignedExercises.length} Ejercicios</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center sm:flex-row gap-3">
                            <Button 
                                onClick={handleShare}
                                variant="outline"
                                className="cursor-pointer text-base px-6 py-3 border-gray-300 hover:bg-gray-50"
                                size="lg"
                            >
                                <Share2 className="h-5 w-5 mr-2" />
                                Compartir
                            </Button>
                            
                            <Button 
                                onClick={() => handleEdit(card)}
                                className="bg-blue-600 hover:bg-blue-700 cursor-pointer size-9.5 text-base px-3 py-3"
                            >
                                <Edit2 className="h-5 w-5" />
                            </Button>
                            <Button
                                onClick={() => handleDelete(card)}
                                className="bg-red-600 hover:bg-red-700 cursor-pointer size-9.5 text-base px-3 py-3"
                            >
                                <Trash2 className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                <Calculator className="h-7 w-7 text-blue-600" />
                                Gestión de Ejercicios
                            </h2>
                            <p className="text-gray-600 mt-2 text-lg">Asigna o quita ejercicios matemáticos a esta carta</p>
                        </div>
                        
                        <div className="relative w-full sm:w-96">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <Input
                                placeholder="Buscar ejercicios por operación..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-12 h-12 text-base"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                        <UICard className="border-green-200 gap-0 py-0 overflow-hidden shadow-lg">
                            <CardHeader className="bg-green-50 border-b border-green-200 px-6 py-4">
                                <CardTitle className="flex items-center justify-between text-lg">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="h-6 w-6 text-green-600" />
                                        <span className="text-green-800 font-semibold">Ejercicios Asignados</span>
                                    </div>
                                    <Badge className="bg-green-600 text-white px-3 py-1">{filteredAssignedExercises.length}</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="max-h-[500px] overflow-y-auto">
                                    {filteredAssignedExercises.length === 0 ? (
                                        <div className="text-center py-16 px-6 text-gray-500">
                                            <Calculator className="h-20 w-20 mx-auto mb-4 text-gray-300" />
                                            <p className="text-xl font-medium mb-2">No hay ejercicios asignados</p>
                                            <p className="text-base">Asigna ejercicios desde la lista de disponibles</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-green-100">
                                            {filteredAssignedExercises.map((exercise) => (
                                                <div
                                                    key={exercise.id}
                                                    className="p-5 hover:bg-green-50/50 transition-colors duration-200"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1 space-y-3">
                                                            <div className="flex items-center gap-2">
                                                                <Hash className="h-5 w-5 text-green-600" />
                                                                <h4 className="font-semibold text-gray-900 text-lg">{exercise.operation}</h4>
                                                            </div>
                                                            
                                                            <div className="flex items-center gap-2 text-gray-600">
                                                                <Globe className="h-4 w-4" />
                                                                <span>Planeta: {exercise.planet.name}</span>
                                                            </div>
                                                            
                                                            <div className="flex gap-2">
                                                                <Badge 
                                                                    className={`${getDifficultyColor(exercise.difficulty.name)}`}
                                                                    variant="secondary"
                                                                >
                                                                    {exercise.difficulty.name}
                                                                </Badge>
                                                                <Badge 
                                                                    className="bg-blue-100 text-blue-800"
                                                                    variant="secondary"
                                                                >
                                                                    {exercise.steps.length} pasos
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleUnassignExercise(exercise.id)}
                                                            className="ml-4 text-red-600 size-8 hover:text-red-700 hover:bg-red-50 border-red-200 cursor-pointer"
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </UICard>

                        <UICard className="border-blue-200 shadow-lg gap-0 py-0 overflow-hidden">
                            <CardHeader className="bg-blue-50 border-b border-blue-200 px-6 py-4">
                                <CardTitle className="flex items-center justify-between text-lg">
                                    <div className="flex items-center gap-3">
                                        <Plus className="h-6 w-6 text-blue-600" />
                                        <span className="text-blue-800 font-semibold">Ejercicios Disponibles</span>
                                    </div>
                                    <Badge className="bg-blue-600 text-white px-3 py-1">{filteredAvailableExercises.length}</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <div className="max-h-[500px] overflow-y-auto">
                                    {filteredAvailableExercises.length === 0 ? (
                                        <div className="text-center py-16 px-6 text-gray-500">
                                            <Filter className="h-20 w-20 mx-auto mb-4 text-gray-300" />
                                            <p className="text-xl font-medium mb-2">No hay ejercicios disponibles</p>
                                            <p className="text-base">Todos los ejercicios están asignados o ajusta tu búsqueda</p>
                                        </div>
                                    ) : (
                                        <div className="divide-y divide-blue-100">
                                            {filteredAvailableExercises.map((exercise) => (
                                                <div
                                                    key={exercise.id}
                                                    className="p-5 hover:bg-blue-50/50 transition-colors duration-200"
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1 space-y-1">
                                                            <div className="flex items-center gap-2">
                                                                <Hash className="h-5 w-5 text-blue-600" />
                                                                <h4 className="font-semibold text-gray-900 text-xl">{exercise.operation}</h4>
                                                            </div>
                                                            
                                                            <div className="flex items-center gap-2 text-gray-600 mb-2">
                                                                <Globe className="h-4 w-4" />
                                                                <span>Planeta: {exercise.planet.name}</span>
                                                            </div>
                                                            
                                                            <div className="flex gap-2">
                                                                <Badge 
                                                                    className={`${getDifficultyColor(exercise.difficulty.name)}`}
                                                                    variant="secondary"
                                                                >
                                                                    {exercise.difficulty.name}
                                                                </Badge>
                                                                <Badge 
                                                                    className="bg-blue-100 text-blue-800"
                                                                    variant="secondary"
                                                                >
                                                                    {exercise.steps.length} pasos
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        
                                                        <Button
                                                            size="sm"
                                                            onClick={() => handleAssignExercise(exercise.id)}
                                                            className="ml-4 bg-green-600 size-8 hover:bg-green-700 cursor-pointer"
                                                        >
                                                            <Plus className="size-5" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </UICard>
                    </div>
                </div>
            </div>
            <EditCardModal
                isOpen={isEditModalOpen}
                onClose={handleEditCancel}
                card={selectedCard}
                types={typesList}
            />

            <DeleteCardModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                card={selectedCard}
            />
        </AppLayout>
    );
}