import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import Planet from "@/types/planet";
import { Head, Link } from "@inertiajs/react";
import { MapPin, Edit, ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

// Simulación de stages, reemplaza por tu data real
interface Stage {
    id: string;
    name: string;
    description: string;
    image_url?: string;
}

interface IPlanetsShowProps {
    planet: Planet;
    stages?: Stage[];
}

export default function PlanetsShow({ planet, stages = [] }: IPlanetsShowProps) {
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Gestionar Planeta | ${planet.name}`} />
            <div className="max-w-5xl mx-auto py-8 px-4">
                <div className="flex items-center gap-2 mb-6">
                    <Link href={route('planets.index')}>
                        <Button variant="ghost" size="icon" className="mr-2">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <h1 className="text-4xl font-bold text-purple-800">{planet.name}</h1>
                    <Link href={route('planets.edit', planet.id)}>
                        <Button size="icon" variant="ghost" className="text-purple-600 hover:bg-purple-100 ml-2">
                            <Edit className="w-5 h-5" />
                        </Button>
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row gap-8 mb-10">
                    <div className="flex-shrink-0 flex flex-col items-center">
                        <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-purple-300 bg-white shadow-lg flex items-center justify-center">
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
                    <div className="flex-1 flex flex-col justify-center">
                        <h2 className="text-2xl font-semibold text-purple-700 mb-2">Descripción</h2>
                        <p className="text-lg text-purple-900 bg-purple-50 rounded-lg p-4 shadow">
                            {planet.description || "Este planeta aún no tiene descripción."}
                        </p>
                        <div className="mt-6">
                            <span className="text-sm text-muted-foreground">
                                ID: <span className="font-mono text-purple-600">{planet.id}</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-purple-800">Sitios / Stages</h2>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        <Plus className="w-4 h-4 mr-2" /> Nuevo Stage
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stages.length === 0 ? (
                        <div className="col-span-full text-center py-12 text-purple-400">
                            <MapPin className="w-12 h-12 mx-auto mb-2" />
                            <p className="text-lg">No hay stages registrados para este planeta.</p>
                        </div>
                    ) : (
                        stages.map(stage => (
                            <Card key={stage.id} className="bg-purple-50 border border-purple-200 shadow hover:shadow-lg transition">
                                <CardContent className="flex flex-col items-center p-6">
                                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-300 bg-white mb-3 flex items-center justify-center">
                                        {stage.image_url ? (
                                            <img
                                                src={stage.image_url}
                                                alt={stage.name}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : (
                                            <MapPin className="w-10 h-10 text-purple-300" />
                                        )}
                                    </div>
                                    <div className="font-bold text-purple-700 text-lg mb-1">{stage.name}</div>
                                    <div className="text-purple-800 text-sm text-center mb-2">{stage.description}</div>
                                    <div className="flex gap-2 mt-2">
                                        <Button size="sm" variant="ghost" className="text-purple-600 hover:bg-purple-100">
                                            <Edit className="w-4 h-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:bg-red-100">
                                            {/* Aquí podrías poner un ícono de eliminar */}
                                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"></path></svg>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </AppLayout>
    );
}