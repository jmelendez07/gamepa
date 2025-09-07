import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { type PageProps, type BreadcrumbItem } from '@/types';
import Planet from '@/types/planet';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreatePlanetModal from '@/components/dashboard/planets/create-planet-modal';
import { toast } from "sonner";
import EditPlanetModal from '@/components/dashboard/planets/edit-planet.modal';
import DeletePlanetModal from '@/components/dashboard/planets/delete-planet-modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
    },
    {
        title: 'Planetas',
        href: route('planets.index'),
    },
];

interface IPlanetsIndexProps {
    planets: Planet[];
}

export default function PlanetsIndex({ planets }: IPlanetsIndexProps) {
    const { flash } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: ''
    });

    const planetsList = planets || [];

    const filteredPlanets = planetsList.filter(planet =>
        planet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        planet.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEdit = (planet: Planet) => {
        setSelectedPlanet(planet);
        setIsEditModalOpen(true);
    };

    const handleDelete = (planet: Planet) => {
        setSelectedPlanet(planet);
        setIsDeleteModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('planets.store'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsModalOpen(false);
                clearErrors();
            },
        });
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setData({
            name: '',
            description: ''
        });
        clearErrors();
    };

    const handleEditCancel = () => {
        setIsEditModalOpen(false);
        setSelectedPlanet(null);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedPlanet(null);
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
            <Head title="Planetas" />
            
            <div className="grid grid-cols-1 gap-2 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">Planetas</h1>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                        <Plus className="w-5 h-5 mr-0.5" />
                        Agregar Planeta
                    </Button>
                </div>

                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Buscar planetas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                    {filteredPlanets.length > 0 ? (
                        filteredPlanets.map((planet) => (
                            <div
                                key={planet.id}
                                className="bg-white hover:bg-gray-50 grid grid-cols-1 grid-rows-[1fr_auto] rounded-lg hover:shadow-md transition-shadow duration-200 p-6 border border-gray-200"
                            >
                                <div className="mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        {planet.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {planet.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-100">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(planet)}
                                        className="cursor-pointer hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                        Editar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(planet)}
                                        className="cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className="text-center py-12">
                                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-12 h-12 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    {searchTerm ? 'No se encontraron planetas' : 'No hay planetas'}
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    {searchTerm 
                                        ? `No se encontraron planetas que coincidan con "${searchTerm}"`
                                        : 'Comienza agregando tu primer planeta.'
                                    }
                                </p>
                                <Button 
                                    className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200' 
                                    onClick={() => {
                                        if (searchTerm) {
                                            setData('name', searchTerm);
                                        }
                                        setIsModalOpen(true)
                                    }}
                                >
                                    <Plus className="w-5 h-5 mr-2" />
                                    Agregar Primer Planeta {searchTerm ? `Con "${searchTerm}"` : ''}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CreatePlanetModal
                isOpen={isModalOpen}
                onClose={handleCancel}
                formData={data}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                processing={processing}
                errors={errors}
            />

            <EditPlanetModal
                isOpen={isEditModalOpen}
                onClose={handleEditCancel}
                planet={selectedPlanet}
            />

            <DeletePlanetModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                planet={selectedPlanet}
            />
        </AppLayout>
    );
}