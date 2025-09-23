import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import Galaxy from "@/types/galaxy";
import { Head, Link } from "@inertiajs/react";
import { Plus, Edit, Trash2, Image as ImageIcon, Search } from "lucide-react";
import { Button } from "@/components/ui/button"; // shadcn/ui
import { Input } from "@/components/ui/input"; // shadcn/ui
import { useState } from "react";
import CreateGalaxyModal from "@/components/dashboard/galaxies/create-galaxy-modal";
import DeleteGalaxyModal from "@/components/dashboard/galaxies/delete-galaxy-modal";
import EditGalaxyModal from "@/components/dashboard/galaxies/edit-galaxy-modal";

interface IGalaxiesIndexProps {
    galaxies: Galaxy[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
    },
    {
        title: 'Galaxias',
        href: route('galaxies.index'),
    },
];

export default function GalaxiesIndex({ galaxies }: IGalaxiesIndexProps) {
    const [search, setSearch] = useState("");
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [galaxyToEdit, setGalaxyToEdit] = useState<Galaxy | null>(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [galaxyToDelete, setGalaxyToDelete] = useState<{ id: string | number, name: string } | null>(null);
    const filteredGalaxies = galaxies.filter(g =>
        g.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Galaxias" />
            <div className="p-6 space-y-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-3xl font-bold">Galaxias</h1>
                        <p className="text-muted-foreground max-w-xl">
                            Administra las galaxias del sistema. Cada galaxia puede tener un nombre único y una imagen representativa.
                        </p>
                    </div>
                    <CreateGalaxyModal />
                </div>

                <div className="flex items-center mb-6 max-w-md">
                    <div className="relative w-full">
                        <Input
                            placeholder="Buscar galaxia por nombre..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-2 top-2.5 w-5 h-5 text-purple-400" />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredGalaxies.length === 0 && (
                        <div className="col-span-full text-center text-muted-foreground py-12">
                            No hay galaxias registradas.
                        </div>
                    )}
                    {filteredGalaxies.map((galaxy) => (
                        <div
                            key={galaxy.id}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition flex flex-col"
                        >
                            <div className="relative">
                                <div className="w-full h-50 bg-purple-100 flex items-center justify-center rounded-t-lg overflow-hidden">
                                    {galaxy.image_url ? (
                                        <img
                                            src={galaxy.image_url}
                                            alt={galaxy.name}
                                            className="object-cover w-full h-full"
                                        />
                                    ) : (
                                        <ImageIcon className="w-12 h-12 text-purple-400" />
                                    )}
                                </div>
                                <div className="absolute top-2 right-2 flex gap-1">
                                    <Button 
                                        size="icon" 
                                        variant="ghost"
                                        className="cursor-pointer bg-white/50 hover:bg-white text-purple-600 hover:text-purple-600"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setGalaxyToEdit(galaxy);
                                            setEditModalOpen(true);
                                        }}
                                    >
                                        <Edit className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="cursor-pointer text-red-600 hover:text-red-600 bg-white/60 hover:bg-white"
                                        onClick={e => {
                                            e.stopPropagation();
                                            setGalaxyToDelete({ id: galaxy.id, name: galaxy.name });
                                            setDeleteModalOpen(true);
                                        }}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4 flex-1 flex flex-col">
                                <h3 className="font-bold text-lg text-purple-700 mb-1">
                                    {galaxy.number}. {galaxy.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {galaxyToDelete && (
                    <DeleteGalaxyModal
                        galaxyId={galaxyToDelete.id}
                        galaxyName={galaxyToDelete.name}
                        open={deleteModalOpen}
                        setOpen={setDeleteModalOpen}
                        onClose={() => setGalaxyToDelete(null)}
                    />
                )}

                {galaxyToEdit && (
                    <EditGalaxyModal
                        open={editModalOpen}
                        setOpen={setEditModalOpen}
                        galaxy={galaxyToEdit}
                        onClose={() => setGalaxyToEdit(null)}
                    />
                )}
            </div>
        </AppLayout>
    );
}