import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import { useRef, useState, useEffect } from "react";
import { CloudUpload, Image as ImageIcon, Loader, X } from "lucide-react";
import Galaxy from "@/types/galaxy";

interface EditGalaxyModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    galaxy: Galaxy;
    onClose?: () => void;
}

export default function EditGalaxyModal({ open, setOpen, galaxy, onClose }: EditGalaxyModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>(galaxy.image_url);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: galaxy?.name || "",
        image: null as File | null,
        _method: 'PUT' as string,
    });

    useEffect(() => {
        setData({
            name: galaxy.name,
            image: null,
            _method: 'PUT',
        });
        setPreview(galaxy.image_url);
    }, [galaxy, open]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData("image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setData("image", null);
        setPreview('');
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!galaxy) return;
        post(route("galaxies.update", galaxy.id), {
            onSuccess: () => {
                setOpen(false);
                reset();
                onClose && onClose();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={o => {
            setOpen(o);
            if (!o && onClose) onClose();
        }}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Galaxia</DialogTitle>
                </DialogHeader>
                {galaxy && (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Imagen de la Galaxia</label>
                            <div
                                className="border-2 border-dashed border-purple-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer relative min-h-[120px] bg-purple-50"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                {!preview ? (
                                    <>
                                        <ImageIcon className="w-10 h-10 text-purple-400 mb-2" />
                                        <span className="text-xs text-muted-foreground text-center">
                                            Haz clic o arrastra una imagen para actualizar
                                        </span>
                                    </>
                                ) : (
                                    <div className="relative">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-28 h-28 object-cover rounded mx-auto"
                                        />
                                        <button
                                            type="button"
                                            onClick={e => {
                                                e.stopPropagation();
                                                handleRemoveImage();
                                            }}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
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
                        <DialogFooter className="gap-2 mt-4">
                            <Button className="cursor-pointer" type="button" variant="ghost" onClick={() => setOpen(false)}>
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white"
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <Loader className="size-4 mr-0.5 animate-spin" />
                                        Actualizando
                                    </>
                                ) : (
                                    <>
                                        <CloudUpload className="size-4 mr-0.5" />
                                        Actualizar
                                    </>
                                )}
                            </Button>
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}