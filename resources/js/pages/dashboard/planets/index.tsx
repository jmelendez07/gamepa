import AppLayout from '@/layouts/app-layout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { type PageProps, type BreadcrumbItem } from '@/types';
import Planet from '@/types/planet';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import CreatePlanetModal from '@/components/dashboard/planets/create-planet-modal';
import { toast } from "sonner";
import EditPlanetModal from '@/components/dashboard/planets/edit-planet.modal';
import DeletePlanetModal from '@/components/dashboard/planets/delete-planet-modal';
import Galaxy from '@/types/galaxy';

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
    galaxies: Galaxy[];
}

export default function PlanetsIndex({ planets, galaxies }: IPlanetsIndexProps) {
    const { flash } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        image: null as File | null,
        description: '',
        galaxy_id: ''
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
            image: null,
            description: '',
            galaxy_id: ''
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

    const handleInputChange = (field: keyof typeof data, value: string | File | null) => {
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
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-2">
                    <div>
                        <h1 className="text-3xl font-bold text-black">Planetas</h1>
                        <p className="text-muted-foreground text-base mt-1 max-w-xl">
                            Administra los planetas del sistema. Cada planeta puede tener un nombre, descripción e imagen.
                        </p>
                    </div>
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
                    >
                        <Plus className="w-5 h-5 mr-0.5" />
                        Agregar Planeta
                    </Button>
                </div>

                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-purple-400" />
                    </div>
                    <Input
                        type="text"
                        placeholder="Buscar planetas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 border-purple-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-4">
                    {filteredPlanets.length > 0 ? (
                        filteredPlanets.map((planet) => (
                            <div
                                key={planet.id}
                                className="relative bg-purple-50 hover:bg-purple-100 grid grid-cols-1 grid-rows-[1fr_auto] rounded-xl hover:shadow-lg transition-shadow duration-200 p-6 border border-purple-200"
                            >
                                <div className="mb-4 flex flex-col items-center">
                                    <div className="size-36 rounded-full overflow-hidden border-4 border-purple-300 bg-white mb-3 flex items-center justify-center">
                                        {planet.image_url ? (
                                            <img
                                                src={planet.image_url}
                                                alt={planet.name}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center w-full h-full text-purple-300">
                                                <Search className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-semibold text-purple-800 text-center">
                                        {planet.name}
                                    </h3>
                                    <p className="text-purple-700 text-sm leading-relaxed text-center">
                                        {planet.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-end space-x-2 pt-4 border-t border-purple-100">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleEdit(planet)}
                                        className="z-2 cursor-pointer hover:bg-purple-200 hover:text-purple-700 transition-colors duration-200"
                                    >
                                        <Pencil className="w-4 h-4 mr-1" />
                                        Editar
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(planet)}
                                        className="z-2 cursor-pointer text-red-600 hover:text-red-800 hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4 mr-1" />
                                        Eliminar
                                    </Button>
                                </div>
                                <Link href={route('planets.show', planet.id)} className="absolute inset-0" aria-label={`Ver detalles de ${planet.name}`}></Link>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full">
                            <div className="text-center py-12">
                                <div className="mx-auto w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-12 h-12 text-purple-400" />
                                </div>
                                <h3 className="text-lg font-medium text-purple-800 mb-2">
                                    {searchTerm ? 'No se encontraron planetas' : 'No hay planetas'}
                                </h3>
                                <p className="text-purple-700 mb-6">
                                    {searchTerm
                                        ? `No se encontraron planetas que coincidan con "${searchTerm}"`
                                        : 'Comienza agregando tu primer planeta.'
                                    }
                                </p>
                                <Button
                                    className='cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200'
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
                galaxies={galaxies}
                onSubmit={handleSubmit}
                processing={processing}
                errors={errors}
            />

            <EditPlanetModal
                isOpen={isEditModalOpen}
                onClose={handleEditCancel}
                planet={selectedPlanet}
                galaxies={galaxies}
            />

            <DeletePlanetModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                planet={selectedPlanet}
            />
        </AppLayout>
    );
}