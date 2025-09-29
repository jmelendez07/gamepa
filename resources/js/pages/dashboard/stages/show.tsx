import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, PageProps } from "@/types";
import { Stage } from "@/types/planet";
import { Head, router, usePage } from "@inertiajs/react";
import { useState, useRef, useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface IStagesShowProps {
    stage: Stage;
}

type Point = { x: number; y: number };

export default function StagesShow({ stage }: IStagesShowProps) {
    const { flash } = usePage<PageProps>().props;
    const [breadcrumbs] = useState<BreadcrumbItem[]>(
        [
            { title: 'Panel de Control', href: route('dashboard') },
            { title: 'Planetas', href: route('planets.index') },
            { title: stage.planet.name, href: route('planets.show', stage.planet.id) },
            { title: stage.name, href: route('stages.show', stage.id) }
        ]
    );

    const [points, setPoints] = useState<Point[]>(stage.points || []);
    const [isPlacingPoints, setIsPlacingPoints] = useState(false);
    const [imgLoaded, setImgLoaded] = useState(false);
    const imgRef = useRef<HTMLImageElement>(null);

    const handleSavePoints = () => {
        router.post(route('stages.points.sync-many', stage.id), {
            points: points
        });
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
            <Head title={`Gestionar Lugar | ${stage.name}`} />
            <div className="p-4 flex flex-col items-center gap-8">
                <div className="w-full grid grid-cols-[1fr_auto] items-start">
                    <div className="">
                        <h1 className="text-2xl font-bold mb-2">{stage.name}</h1>
                            <div className="flex items-center gap-2">
                            <Switch
                                checked={isPlacingPoints}
                                onCheckedChange={setIsPlacingPoints}
                                id="mode-switch"
                                className={`${isPlacingPoints ? '!bg-purple-600' : 'bg-gray-200'}`}
                            />
                            <label htmlFor="mode-switch" className="text-sm font-medium">
                                {isPlacingPoints ? "Colocar puntos (Selecciona 4 puntos críticos/extremos haciendo click en la imagen)" : "Arrastrar imagen"}
                            </label>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Button
                            onClick={handleSavePoints}
                            disabled={points.length < 3}
                            className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
                        >
                            Guardar puntos críticos
                        </Button>
                        <Button
                            onClick={() => setPoints([])}
                            variant="outline"
                            className="cursor-pointer"
                        >
                            Limpiar puntos
                        </Button>
                    </div>
                </div>
                <TransformWrapper disabled={isPlacingPoints}>
                    {({ zoomIn, zoomOut, instance }) => {
                        const { scale } = instance.transformState;
                        return (
                            <div className="w-full border rounded-lg overflow-hidden bg-purple-400/30 flex items-center justify-center relative">
                                <div className="absolute z-10 left-4 top-4 flex items-center gap-2 mb-2">
                                    <Button onClick={() => zoomIn()} className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white">Zoom +</Button>
                                    <Button onClick={() => zoomOut()} className="cursor-pointer bg-purple-500 hover:bg-purple-600 text-white">Zoom -</Button>
                                </div>
                                <TransformComponent>
                                    <div
                                        className="relative w-full"
                                        onClick={isPlacingPoints ? (e) => {
                                            const rect = e.currentTarget.getBoundingClientRect();
                                            const clickX = (e.clientX - rect.left) / scale;
                                            const clickY = (e.clientY - rect.top) / scale;

                                            const img = imgRef.current;
                                            if (!img) return;
                                            const { naturalWidth, naturalHeight, width, height } = img;

                                            const relX = (clickX / width) * naturalWidth;
                                            const relY = (clickY / height) * naturalHeight;

                                            setPoints([...points, { x: relX, y: relY }]);
                                        } : undefined}
                                        style={{ cursor: isPlacingPoints ? "crosshair" : "grab" }}
                                    >
                                        <img
                                            ref={imgRef}
                                            src={stage.image_url}
                                            alt={stage.name}
                                            className="w-full h-full object-contain pointer-events-none"
                                            style={{ display: "block", width: "100%", height: "100%" }}
                                            onLoad={() => setImgLoaded(true)}
                                        />
                                        {imgLoaded && points.length >= 3 && (
                                            <svg
                                                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                                style={{ width: "100%", height: "100%" }}
                                                viewBox={`0 0 ${imgRef.current?.naturalWidth || 0} ${imgRef.current?.naturalHeight || 0}`}
                                            >
                                                <polygon
                                                    points={points.map(p => `${p.x},${p.y}`).join(" ")}
                                                    fill="rgba(168,85,247,0.3)"
                                                    stroke="#a855f7"
                                                    strokeWidth={10}
                                                />
                                            </svg>
                                        )}
                                        {points.map((point, idx) => (
                                            <div
                                                key={idx}
                                                onClick={isPlacingPoints ? (e) => {
                                                    e.stopPropagation(); // Evita que el click agregue otro punto
                                                    setPoints(points.filter((_, i) => i !== idx));
                                                } : undefined}
                                                style={{
                                                    position: "absolute",
                                                    left: `calc(${(point.x / (imgRef.current?.naturalWidth || 1)) * 100}% - 8px)`,
                                                    top: `calc(${(point.y / (imgRef.current?.naturalHeight || 1)) * 100}% - 8px)`,
                                                    width: 16,
                                                    height: 16,
                                                    borderRadius: "50%",
                                                    border: "2px solid white",
                                                    pointerEvents: isPlacingPoints ? "auto" : "none",
                                                    zIndex: 10,
                                                    cursor: isPlacingPoints ? "pointer" : "default"
                                                }}
                                                className="bg-[#a855f7] hover:bg-red-600"
                                                title={isPlacingPoints ? "Eliminar punto" : ""}
                                            >
                                                <span className="absolute left-0.5 top-4 text-white text-base font-semibold">{idx + 1}</span>
                                            </div>
                                        ))}
                                    </div>
                                </TransformComponent>
                            </div>
                        );
                    }}
                </TransformWrapper>
            </div>
        </AppLayout>
    );
}