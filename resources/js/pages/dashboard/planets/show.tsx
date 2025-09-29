import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, PageProps } from "@/types";
import Planet, { Stage } from "@/types/planet";
import { Head, Link, usePage } from "@inertiajs/react";
import { MapPin, Edit, Plus, ChevronLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import CreateStageModal from "@/components/dashboard/planets/stages/create-stage-modal";
import EditStageModal from "@/components/dashboard/planets/stages/edit-stage-modal";
import DeleteStageModal from "@/components/dashboard/planets/stages/delete-stage-modal";
import { toast } from "sonner";

interface IPlanetsShowProps {
    planet: Planet;
}

export default function PlanetsShow({ planet }: IPlanetsShowProps) {
    const { flash } = usePage<PageProps>().props;
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedStage, setSelectedStage] = useState<Stage | null>(null);
    
    const [breadcrumbs] = useState<BreadcrumbItem[]>([
        {
            title: 'Panel de Control',
            href: route('dashboard'),
        },
        {
            title: 'Planetas',
            href: route('planets.index'),
        },
        {
            title: planet.name,
            href: route('planets.show', planet.id)
        }
    ]);

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    const handleEditStage = (stage: Stage) => {
        setSelectedStage(stage);
        setShowEditModal(true);
    };

    const handleDeleteStage = (stage: Stage) => {
        setSelectedStage(stage);
        setShowDeleteModal(true);
    };

    const handleModalSuccess = () => {
        // Recargar la página para mostrar los cambios
        window.location.reload();
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Gestionar Planeta | ${planet.name}`} />
            
            <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 mb-6">
                    <Link href={route('planets.index')}>
                        <Button variant="ghost" size="icon" className="cursor-pointer mr-1">
                            <ChevronLeft className="size-5" />
                        </Button>
                    </Link>
                    <h2 className="text-4xl font-bold">{planet.name}</h2>
                    <Link href={route('planets.edit', planet.id)} className="mt-1.5">
                        <Button size="icon" variant="ghost" className="cursor-pointer text-purple-600 hover:text-purple-700 hover:bg-purple-100">
                            <Edit className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-8 mb-10">
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-64 h-64 2xl:size-120 rounded-full overflow-hidden border-8 border-purple-300 bg-white shadow-lg flex items-center justify-center">
                            {planet.image_url ? (
                                <img
                                    src={planet.image_url}
                                    alt={planet.name}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="flex items-center justify-center w-full h-full text-purple-300">
                                    <MapPin className="w-24 h-24" />
                                </div>
                            )}
                        </div>
                        <div className="mt-4 text-center">
                            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-1 rounded-full font-semibold text-lg">
                                {planet.galaxy?.name}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 items-start gap-4 place-items-start">
                        <h1 className="text-8xl text-purple-900 font-bold">{planet.name}</h1>
                        <p className="text-lg text-purple-900 bg-purple-50 rounded-lg p-4 shadow">
                            {planet.description || "Este planeta aún no tiene descripción."}
                        </p>
                        <span className="text-sm font-medium ml-2">
                            ID: <span className="font-mono text-purple-600">{planet.id}</span>
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6 lg:px-4">
                    <h2 className="text-2xl font-bold">
                        Sitios / Lugares 
                        <span className="text-lg font-normal text-gray-500 ml-2">
                            ({planet.stages.length})
                        </span>
                    </h2>
                    <Button 
                        onClick={() => setShowCreateModal(true)}
                        className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        <Plus className="w-4 h-4 mr-0.5" /> Nuevo Lugar
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:px-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {planet.stages.length === 0 ? (
                        <div className="col-span-full text-center py-16 text-purple-400">
                            <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                            <h3 className="text-xl font-semibold mb-2">No hay lugares creados</h3>
                            <p className="text-lg mb-6">Comienza creando el primer lugar para este planeta</p>
                            <Button 
                                onClick={() => setShowCreateModal(true)}
                                className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Crear Primer Lugar
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div className="mt-6">
                                <Card 
                                    className="group aspect-[4/3] relative overflow-hidden rounded-2xl border-2 border-dashed border-purple-300 bg-purple-50/50 hover:bg-purple-50 hover:border-purple-400 transition-all duration-300 cursor-pointer"
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    <div className="h-full flex items-center justify-center">
                                        <div className="text-center text-purple-400 group-hover:text-purple-600 transition-colors">
                                            <Plus className="w-12 h-12 mx-auto mb-3" />
                                            <h3 className="font-semibold text-lg mb-1">Agregar Nuevo Lugar</h3>
                                            <p className="text-sm">Haz clic para crear un nuevo sitio</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                            {
                                planet.stages
                                    .sort((a, b) => a.number - b.number)
                                    .map(stage => (
                                        <Card 
                                            key={stage.id} 
                                            className="group relative pb-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] border-0"
                                        >
                                            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                                                <Link href={route('stages.show', stage.id)} className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                                    <span className="text-white text-xl font-bold bg-purple-700/80 px-6 py-2 rounded-full shadow-lg">
                                                        Abrir
                                                    </span>
                                                </Link>
                                                {stage.image_url ? (
                                                    <img
                                                        src={stage.image_url}
                                                        alt={stage.name}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-purple-400 via-purple-500 to-purple-600 flex items-center justify-center">
                                                        <MapPin className="w-16 h-16 text-white/80" />
                                                    </div>
                                                )}
                                                
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                                
                                                <div className="absolute top-3 right-3">
                                                    <div className="bg-white/90 backdrop-blur-sm text-purple-700 font-bold text-sm px-2.5 py-1 rounded-full shadow-lg">
                                                        #{stage.number}
                                                    </div>
                                                </div>
                                                
                                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                                    <h3 className="text-white font-bold text-2xl truncate">
                                                        {stage.name}
                                                    </h3>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <div className="text-white/80 text-sm font-medium">
                                                            Lugar #{stage.number}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <Button 
                                                                size="sm" 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEditStage(stage);
                                                                }}
                                                                className="cursor-pointer z-30 size-8 bg-white/20 hover:bg-white/30 hover:text-white text-white border-white/30 backdrop-blur-sm transition-all duration-200 hover:scale-105"
                                                                variant="outline"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </Button>
                                                            <Button 
                                                                size="sm" 
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleDeleteStage(stage);
                                                                }}
                                                                className="cursor-pointer z-30 size-8 bg-red-500/80 hover:bg-red-500 text-white transition-all duration-200 hover:scale-105"
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))     
                            }
                        </>
                    )}
                </div>
            </div>

            {/* Modales */}
            <CreateStageModal
                showModal={showCreateModal}
                setShowModal={setShowCreateModal}
                planetId={planet.id}
                planetName={planet.name}
                onSuccess={handleModalSuccess}
            />

            <EditStageModal
                showModal={showEditModal}
                setShowModal={setShowEditModal}
                stage={selectedStage}
                planetName={planet.name}
                onSuccess={handleModalSuccess}
            />

            <DeleteStageModal
                showModal={showDeleteModal}
                setShowModal={setShowDeleteModal}
                stage={selectedStage}
                planetName={planet.name}
                onSuccess={handleModalSuccess}
            />
        </AppLayout>
    );
}