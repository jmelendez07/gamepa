import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import Enemy, { EnemyType } from "@/types/enemy";
import Planet from "@/types/planet";
import { Head, router } from "@inertiajs/react";
import { useState } from "react";
import { Search, Plus, Edit2, Trash2, Shield, Zap, Heart, Filter, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DeleteEnemyModal from "@/components/dashboard/enemies/delete-enemy-modal";
import CreateEnemyModal from "@/components/dashboard/enemies/create-enemy-modal";
import EditEnemyModal from "@/components/dashboard/enemies/edit-enemy-modal";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
    },
    {
        title: 'Enemigos',
        href: route('enemies.index'),
    },
];

interface IEnemiesIndexProps {
    enemies: Enemy[];
    planets: Planet[];
    types: EnemyType[];
}

export default function EnemiesIndex({ enemies, planets, types }: IEnemiesIndexProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEnemy, setSelectedEnemy] = useState<Enemy | null>(null);

    const filteredEnemies = enemies.filter(enemy => {
        const matchesSearch = enemy.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(enemy.enemy_type_id);
        
        return matchesSearch && matchesType;
    });

    const handleEdit = (enemy: Enemy) => {
        setSelectedEnemy(enemy);
        setIsEditModalOpen(true);
    };

    const handleEditClose = () => {
        setIsEditModalOpen(false);
        setSelectedEnemy(null);
    };

    const handleDelete = (enemy: Enemy) => {
        setSelectedEnemy(enemy);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedEnemy(null);
    };

    const handleCreateOpen = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateClose = () => {
        setIsCreateModalOpen(false);
    };

    const toggleTypeFilter = (typeId: string) => {
        setSelectedTypes(prev => 
            prev.includes(typeId) 
                ? prev.filter(id => id !== typeId)
                : [...prev, typeId]
        );
    };

    const clearAllFilters = () => {
        setSelectedTypes([]);
        setSearchTerm("");
    };

    const getTypeColor = (typeId: string | null, typeName: string | null) => {
        if (!typeId || !typeName) return "bg-gray-200 text-gray-800";
        
        const name = typeName.toLowerCase();
        
        if (name.includes('minion') || name.includes('básico')) {
            return "bg-green-500 text-white";
        } else if (name.includes('normal') || name.includes('estándar')) {
            return "bg-yellow-500 text-white";
        } else if (name.includes('elite') || name.includes('élite')) {
            return "bg-orange-600 text-white";
        } else if (name.includes('boss') || name.includes('jefe')) {
            return "bg-red-700 text-white";
        } else {
            return "bg-blue-500 text-white";
        }
    };

    const getTypeFilterColor = (typeId: string, typeName: string, isSelected: boolean) => {
        const name = typeName.toLowerCase();
        
        let baseColor = "";
        if (name.includes('minion') || name.includes('básico')) {
            baseColor = "bg-green-100 text-green-800 border-green-200";
        } else if (name.includes('normal') || name.includes('estándar')) {
            baseColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
        } else if (name.includes('elite') || name.includes('élite')) {
            baseColor = "bg-orange-100 text-orange-800 border-orange-200";
        } else if (name.includes('boss') || name.includes('jefe')) {
            baseColor = "bg-red-100 text-red-800 border-red-200";
        } else {
            baseColor = "bg-blue-100 text-blue-800 border-blue-200";
        }
        
        if (isSelected) {
            if (name.includes('minion') || name.includes('básico')) {
                return "bg-green-600 hover:bg-green-600 text-white hover:text-white border-green-600 shadow-md";
            } else if (name.includes('normal') || name.includes('estándar')) {
                return "bg-yellow-600 hover:bg-yellow-600 text-white hover:text-white border-yellow-600 shadow-md";
            } else if (name.includes('elite') || name.includes('élite')) {
                return "bg-orange-600 hover:bg-orange-600 text-white hover:text-white border-orange-600 shadow-md";
            } else if (name.includes('boss') || name.includes('jefe')) {
                return "bg-red-700 hover:bg-red-700 text-white hover:text-white border-red-700 shadow-md";
            } else {
                return "bg-blue-600 hover:bg-blue-600 text-white hover:text-white border-blue-600 shadow-md";
            }
        } else {
            if (name.includes('minion') || name.includes('básico')) {
                return `${baseColor} hover:bg-green-200 hover:border-green-300`;
            } else if (name.includes('normal') || name.includes('estándar')) {
                return `${baseColor} hover:bg-yellow-200 hover:border-yellow-300`;
            } else if (name.includes('elite') || name.includes('élite')) {
                return `${baseColor} hover:bg-orange-200 hover:border-orange-300`;
            } else if (name.includes('boss') || name.includes('jefe')) {
                return `${baseColor} hover:bg-red-200 hover:border-red-300`;
            } else {
                return `${baseColor} hover:bg-blue-200 hover:border-blue-300`;
            }
        }
    };

    const getTypeName = (typeId: string | null) => {
        return types.find(type => type.id === typeId)?.name || "Sin tipo";
    };

    const activeFiltersCount = selectedTypes.length;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enemigos" />
            
            <div className="space-y-6 p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Gestión de Enemigos</h1>
                        <p className="text-gray-600 mt-1">Administra los enemigos del juego</p>
                    </div>
                    <Button 
                        onClick={handleCreateOpen}
                        className="cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4 mr-0.5" />
                        Nuevo Enemigo
                    </Button>
                </div>

                <div className="space-y-4">
                    <div className="space-y-3">
                        <div className="grid grid-cols-4">
                            {types.map((type, index) => (
                                <Button
                                    key={type.id}
                                    variant="outline"
                                    size="default"
                                    onClick={() => toggleTypeFilter(type.id)}
                                    className={`cursor-pointer text-sm h-24 grid grid-cols-1 place-items-start gap-0.5 p-4 font-medium transition-all duration-200 
                                        ${getTypeFilterColor(
                                            type.id, 
                                            type.name, 
                                            selectedTypes.includes(type.id)
                                        )} 
                                        ${index > 0 ? 'rounded-l-none' : ''}
                                        ${(index + 1) < types.length ? 'rounded-r-none' : ''}
                                    `}
                                >
                                    {type.name}
                                    <span className="font-medium text-2xl">20 en total</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <Input
                                    type="text"
                                    placeholder="Buscar enemigos por nombre..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 h-12 text-base"
                                />
                            </div>
                        </div>

                        {activeFiltersCount > 0 && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={clearAllFilters}
                                className="text-gray-600 cursor-pointer"
                            >
                                Limpiar filtros
                            </Button>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-gray-600">
                        Mostrando {filteredEnemies.length} de {enemies.length} enemigos
                    </p>
                </div>

                {filteredEnemies.length === 0 ? (
                    <Card>
                        <CardContent className="text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <Shield className="h-16 w-16 mx-auto" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-600 mb-2">
                                No se encontraron enemigos
                            </h3>
                            <p className="text-gray-500">
                                Intenta ajustar los filtros o crear un nuevo enemigo.
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredEnemies.map((enemy) => (
                            <Card key={enemy.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50">
                                <CardHeader className="pb-0">
                                    <div className="flex items-start justify-between mb-4">
                                        <Avatar className="size-24 border-3 border-gray-200 group-hover:shadow-lg transition-all duration-200">
                                            <AvatarImage 
                                                src={enemy.spritesheet} 
                                                alt={enemy.name}
                                                className="object-cover"
                                            />
                                            <AvatarFallback className="bg-gradient-to-br from-indigo-400 to-purple-500 text-white font-bold text-xl">
                                                <User className="h-10 w-10" />
                                            </AvatarFallback>
                                        </Avatar>
                                        
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleEdit(enemy)}
                                                className="cursor-pointer h-8 w-8 p-0 hover:bg-blue-100 hover:text-blue-600"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => handleDelete(enemy)}
                                                className="cursor-pointer h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-xl text-gray-900 line-clamp-1 mb-3">
                                            {enemy.name}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            <Badge 
                                                className={`${getTypeColor(enemy.enemy_type_id, getTypeName(enemy.enemy_type_id))} px-3 py-1 text-sm font-medium`}
                                            >
                                                {getTypeName(enemy.enemy_type_id)}
                                            </Badge>
                                            {enemy.is_hostile && (
                                                <Badge variant="destructive" className="px-3 py-1 text-sm font-medium">
                                                    Hostil
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="pt-4">
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-red-50 rounded-lg p-3 text-center">
                                            <div className="flex items-center justify-center mb-1">
                                                <Heart className="h-4 w-4 text-red-500 mr-1" />
                                                <span className="text-xs font-medium text-red-700">Vida</span>
                                            </div>
                                            <p className="text-xl font-bold text-red-600">
                                                {enemy.health || 0}
                                            </p>
                                        </div>
                                        <div className="bg-orange-50 rounded-lg p-3 text-center">
                                            <div className="flex items-center justify-center mb-1">
                                                <Zap className="h-4 w-4 text-orange-500 mr-1" />
                                                <span className="text-xs font-medium text-orange-700">Ataque</span>
                                            </div>
                                            <p className="text-xl font-bold text-orange-600">
                                                {enemy.basic_attack || 0}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <DeleteEnemyModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                enemy={selectedEnemy}
            />

            <CreateEnemyModal
                isOpen={isCreateModalOpen}
                onClose={handleCreateClose}
                types={types}
                planets={planets}
            />

            <EditEnemyModal
                isOpen={isEditModalOpen}
                onClose={handleEditClose}
                enemy={selectedEnemy}
                types={types}
                planets={planets}
            />
        </AppLayout>
    );
}