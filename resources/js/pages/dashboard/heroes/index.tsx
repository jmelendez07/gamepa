import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import Hero from "@/types/hero";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { Search, Plus, Edit, Trash2, Heart, Calendar } from "lucide-react";
import EditHeroModal from "@/components/dashboard/heroes/edit-hero-modal";
import CreateHeroModal from "@/components/dashboard/heroes/create-hero-modal";
import DeleteHeroModal from "@/components/dashboard/heroes/delete-hero-modal";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
    },
    {
        title: 'Heroes',
        href: route('heroes.index'),
    },
];

interface IHeroesIndexProps {
    heroes: Hero[];
}

export default function HeroesIndex({ heroes }: IHeroesIndexProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [editingHero, setEditingHero] = useState<Hero | null>(null);
    const [deletingHero, setDeletingHero] = useState<Hero | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const filteredHeroes = heroes.filter(hero =>
        hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (hero: Hero) => {
        setEditingHero(hero);
        setIsEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setIsEditDialogOpen(false);
        setEditingHero(null);
    };

    const handleOpenCreateDialog = () => {
        setIsCreateDialogOpen(true);
    };

    const handleCloseCreateDialog = () => {
        setIsCreateDialogOpen(false);
    };

    const handleDelete = (hero: Hero) => {
        setDeletingHero(hero);
        setIsDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setIsDeleteDialogOpen(false);
        setDeletingHero(null);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Heroes" />
            
            <div className="space-y-6 p-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Buscar heroes..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                        />
                    </div>
                    
                    <button
                        onClick={handleOpenCreateDialog}
                        className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                    >
                        <Plus className="h-4 w-4" />
                        Crear Héroe
                    </button>
                </div>

                {filteredHeroes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredHeroes.map((hero) => (
                            <div
                                key={hero.id}
                                className="bg-white rounded-xl shadow-sm border border-purple-100 hover:shadow-md transition-shadow duration-200"
                            >
                                <div className="aspect-[16/12] relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 rounded-t-xl flex items-center justify-center">
                                    {hero.spritesheet ? (
                                        <img
                                            src={hero.spritesheet}
                                            alt={hero.name}
                                            className="object-none m-2 absolute w-full h-full inset-0"
                                            style={{
                                                width: '400%',
                                                height: '400%',
                                                objectPosition: '0px -135px',
                                                transform: 'scale(1.4)',
                                                transformOrigin: 'top left',
                                            }}
                                    />
                                    ) : (
                                        <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-bold text-purple-600">
                                                {hero.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-4 space-y-3">
                                    <div>
                                        <h3 className="font-semibold text-lg text-gray-900 mb-1">
                                            {hero.name}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Heart className="size-5 text-red-500" />
                                            <span>{hero.health} HP</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                        <Calendar className="size-4" />
                                        <span>Creado: {formatDate(hero.created_at)}</span>
                                    </div>

                                    {/* Acciones */}
                                    <div className="flex gap-2 pt-2">
                                        <button
                                            onClick={() => handleEdit(hero)}
                                            className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            <Edit className="size-4" />
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(hero)}
                                            className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            <Trash2 className="size-4" />
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto w-24 h-24 bg-purple-50 rounded-full flex items-center justify-center mb-4">
                            <Search className="h-8 w-8 text-purple-400" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            {searchTerm ? 'No se encontraron heroes' : 'No hay heroes'}
                        </h3>
                        <p className="text-gray-500 mb-6">
                            {searchTerm 
                                ? `No se encontraron heroes que coincidan con "${searchTerm}"`
                                : 'Comienza creando tu primer héroe'
                            }
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleOpenCreateDialog}
                                className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                            >
                                <Plus className="h-4 w-4" />
                                Crear Primer Héroe
                            </button>
                        )}
                    </div>
                )}

                {heroes.length > 0 && (
                    <div className="text-center text-sm text-gray-500">
                        Mostrando {filteredHeroes.length} de {heroes.length} heroes
                    </div>
                )}
            </div>

            <EditHeroModal
                isOpen={isEditDialogOpen}
                onClose={handleCloseEditDialog}
                hero={editingHero}
            />

            <CreateHeroModal
                isOpen={isCreateDialogOpen}
                onClose={handleCloseCreateDialog}
            />

            <DeleteHeroModal
                isOpen={isDeleteDialogOpen}
                onClose={handleCloseDeleteDialog}
                hero={deletingHero}
            />
        </AppLayout>
    );
}