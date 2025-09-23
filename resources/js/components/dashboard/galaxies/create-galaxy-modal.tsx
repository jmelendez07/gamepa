import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { useState, useRef } from "react";
import { Plus, Image as ImageIcon, X, Loader, Component } from "lucide-react";

export default function CreateGalaxyModal() {
    const [open, setOpen] = useState(false); // Nuevo estado para el dialog
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        image: null as File | null,
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setData("image", null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route("galaxies.store"), {
            onSuccess: () => {
                setData({
                    name: "",
                    image: null,
                });
                setPreview(null);
                setOpen(false); // Cierra el dialog al crear
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="w-4 h-4 mr-0.5" /> Nueva Galaxia
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="grid grid-cols-[auto_1fr] gap-2 items-center">
                    <Component />
                    <DialogTitle>Crear nueva galaxia</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <Input
                            value={data.name}
                            onChange={e => setData("name", e.target.value)}
                            placeholder="Nombre de la galaxia"
                            required
                        />
                        {errors.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Imagen de la Galaxia</label>
                        <div
                            className="border-2 border-dashed border-purple-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer relative min-h-[240px] bg-purple-50"
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={e => e.preventDefault()}
                        >
                            {!preview ? (
                                <>
                                    <ImageIcon className="size-11 text-purple-400 mb-2" />
                                    <span className="text-sm text-muted-foreground text-center">
                                        Arrastra una imagen aquí o haz clic para seleccionar
                                    </span>
                                </>
                            ) : (
                                <>
                                    <img
                                        src={preview}
                                        alt="Preview"
                                        className="h-full object-cover absolute left-1/2 -translate-x-1/2 rounded mx-auto"
                                    />
                                    <button
                                        type="button"
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleRemoveImage();
                                        }}
                                        className="cursor-pointer z-1 absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                            <Input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </div>
                        {errors.image && <div className="text-red-500 text-xs mt-1">{errors.image}</div>}
                    </div>
                    <DialogFooter className="gap-2">
                        <DialogClose asChild>
                            <Button className="cursor-pointer" type="button" variant="ghost">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white" disabled={processing}>
                            {processing ? (
                                <>
                                    <Loader className="animate-spin" />
                                    Creando...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-4 h-4 mr-0.5" />
                                    Crear Galaxia
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}