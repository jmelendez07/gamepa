import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import Card, { TypeCard } from '@/types/card';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { Plus, Search, Sword, Shield, Heart, Zap, Filter, Sparkles, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import CreateCardModal from '@/components/dashboard/cards/create-card-modal';
import EditCardModal from '@/components/dashboard/cards/edit-card-modal';
import DeleteCardModal from '@/components/dashboard/cards/delete-card-modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
    },
    {
        title: 'Cartas',
        href: route('cards.index'),
    },
];

interface ICardsIndexProps {
    cards: Card[];
    types: TypeCard[];
}

export default function CardsIndex({ cards, types }: ICardsIndexProps) {
    const { flash } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        energy_cost: '',
        stats: '',
        type_id: ''
    });

    const cardsList = cards || [];
    const typesList = types || [];

    const filteredCards = cardsList.filter(card => {
        const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.type.name.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = selectedType === null || card.type.id === selectedType;
        
        return matchesSearch && matchesType;
    });

    const getTypeColor = (typeName: string) => {
        switch (typeName.toLowerCase()) {
            case 'ataque':
                return 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200';
            case 'defensa':
                return 'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200';
            case 'curación':
                return 'bg-green-100 text-green-800 border-green-200 hover:bg-green-200';
            case 'potenciación':
                return 'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200';
        }
    };

    const getTypeGradient = (typeName: string) => {
        switch (typeName.toLowerCase()) {
            case 'ataque':
                return 'from-red-400 to-red-600';
            case 'defensa':
                return 'from-blue-400 to-blue-600';
            case 'curación':
                return 'from-green-400 to-green-600';
            case 'potenciación':
                return 'from-yellow-400 to-yellow-600';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    const getTypeIcon = (typeName: string) => {
        switch (typeName.toLowerCase()) {
            case 'ataque':
                return <Sword className="w-4 h-4" />;
            case 'defensa':
                return <Shield className="w-4 h-4" />;
            case 'curación':
                return <Heart className="w-4 h-4" />;
            case 'potenciación':
                return <Zap className="w-4 h-4" />;
            default:
                return <Sparkles className="w-4 h-4" />;
        }
    };

    const getCardCountByType = (typeId: string) => {
        return cardsList.filter(card => card.type.id === typeId).length;
    };

    const handleTypeClick = (typeId: string) => {
        if (selectedType === typeId) {
            setSelectedType(null);
        } else {
            setSelectedType(typeId);
        }
    };

    const handleClearFilters = () => {
        setSelectedType(null);
        setSearchTerm('');
    };

    const handleEdit = (card: Card) => {
        setSelectedCard(card);
        setIsEditModalOpen(true);
    };

    const handleDelete = (card: Card) => {
        setSelectedCard(card);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('cards.store'), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset();
                clearErrors();
            },
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        reset();
        clearErrors();
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setSelectedCard(null);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedCard(null);
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
            <Head title="Cartas" />
            
            <div className="space-y-6 p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Cartas de Batalla</h1>
                        <p className="text-gray-600 mt-1">Gestiona las cartas del sistema de combate</p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                    >
                        <Plus className="w-5 h-5 mr-0.5" />
                        Nueva Carta
                    </Button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    <div 
                        className={`bg-white rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
                            selectedType === null ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:shadow-md'
                        }`}
                        onClick={() => setSelectedType(null)}
                    >
                        <div className="text-2xl font-bold text-emerald-600">{cardsList.length}</div>
                        <div className="text-sm text-gray-600">Total</div>
                    </div>

                    {typesList.map((type) => {
                        const count = getCardCountByType(type.id);
                        const isSelected = selectedType === type.id;
                        const colorClass = getTypeColor(type.name);
                        const icon = getTypeIcon(type.name);
                        
                        return (
                            <div
                                key={type.id}
                                className={`bg-white rounded-lg border p-4 cursor-pointer transition-all duration-200 ${
                                    isSelected ? 'ring-2 ring-emerald-500 bg-emerald-50' : 'hover:shadow-md'
                                }`}
                                onClick={() => handleTypeClick(type.id)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-2xl font-bold text-gray-800">{count}</div>
                                    <div className="flex items-center gap-1">
                                        {icon}
                                        <Badge 
                                            variant="outline" 
                                            className={`${colorClass} text-xs`}
                                        >
                                            {type.name}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-600">Cartas</div>
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
                                placeholder="Buscar por nombre o tipo de carta..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 h-12 text-base"
                            />
                        </div>
                    </div>

                    {(selectedType || searchTerm) && (
                        <div className="flex items-center gap-2">
                            {selectedType && (
                                <Badge variant="secondary" className="flex items-center gap-1">
                                    <Filter className="w-3 h-3" />
                                    {typesList.find(t => t.id === selectedType)?.name}
                                </Badge>
                            )}
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClearFilters}
                                className="text-gray-600"
                            >
                                Limpiar filtros
                            </Button>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        {selectedType ? (
                            <>Mostrando {filteredCards.length} cartas de tipo "{typesList.find(t => t.id === selectedType)?.name}"</>
                        ) : (
                            <>Mostrando {filteredCards.length} de {cardsList.length} cartas</>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredCards.length > 0 ? (
                        filteredCards.map((card) => {
                            const colorClass = getTypeColor(card.type.name);
                            const gradientClass = getTypeGradient(card.type.name);
                            const icon = getTypeIcon(card.type.name);
                            
                            return (
                                <div
                                    key={card.id}
                                    className="bg-white relative rounded-2xl border-2 border-gray-200 hover:border-emerald-300 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    <div className={`bg-gradient-to-r ${gradientClass} p-4 relative`}>
                                        <div className="flex items-center justify-between text-white">
                                            <h3 className="font-bold text-lg truncate pr-2">{card.name}</h3>
                                            <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                                                <Zap className="w-4 h-4" />
                                                <span className="font-bold text-sm">{card.energy_cost}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="absolute -right-4 -top-4 w-16 h-16 bg-white/10 rounded-full"></div>
                                        <div className="absolute -right-2 -bottom-2 w-12 h-12 bg-white/5 rounded-full"></div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-2 mb-4">
                                            <div className={`p-2 rounded-lg ${colorClass.replace('hover:', '').replace('text-', 'text-').replace('bg-', 'bg-').replace('border-', 'border-')}`}>
                                                {icon}
                                            </div>
                                            <Badge 
                                                variant="outline" 
                                                className={`${colorClass} font-medium`}
                                            >
                                                {card.type.name}
                                            </Badge>
                                        </div>

                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                                            <div className="text-center">
                                                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                                                    Estadísticas
                                                </div>
                                                <div className="text-3xl font-bold text-gray-800">
                                                    {card.stats}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center relative z-1 justify-between gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(card)}
                                                className="cursor-pointer flex-1 text-emerald-600 hover:text-emerald-800 hover:bg-emerald-50"
                                            >
                                                <Edit className="w-4 h-4 mr-1" />
                                                Editar
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(card)}
                                                className="cursor-pointer flex-1 text-red-600 hover:text-red-800 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-4 h-4 mr-1" />
                                                Eliminar
                                            </Button>
                                        </div>
                                    </div>
                                    <Link href={route('cards.show', card.id)} className='absolute inset-0' />
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full">
                            <div className="text-center py-16">
                                <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                    {searchTerm || selectedType ? (
                                        <Search className="w-12 h-12 text-emerald-400" />
                                    ) : (
                                        <Sparkles className="w-12 h-12 text-emerald-400" />
                                    )}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {searchTerm || selectedType ? 'No se encontraron cartas' : 'No hay cartas'}
                                </h3>
                                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                                    {searchTerm || selectedType
                                        ? 'Intenta ajustar los filtros de búsqueda para encontrar más resultados.'
                                        : 'Comienza creando tu primera carta para el sistema de batalla.'
                                    }
                                </p>
                                {!(searchTerm || selectedType) && (
                                    <Button
                                        onClick={() => setIsModalOpen(true)}
                                        className="bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer"
                                    >
                                        <Plus className="w-5 h-5 mr-2" />
                                        Crear Primera Carta
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CreateCardModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                formData={data}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                processing={processing}
                errors={errors}
                types={typesList}
            />

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