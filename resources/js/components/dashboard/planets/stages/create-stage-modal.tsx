import { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Plus,
    Upload,
    AlertCircle,
    Sparkles,
    Type,
    MapPin,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

interface CreateStageModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    planetId: string;
    planetName: string;
    onSuccess?: () => void;
}

export default function CreateStageModal({ 
    showModal, 
    setShowModal, 
    planetId, 
    planetName,
}: CreateStageModalProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const { data, setData, post, processing, errors, clearErrors, reset } = useForm({
        name: '',
        planet_id: planetId,
        image: null as File | null,
    });

    const handleImageChange = (file: File | null) => {
        if (file) {
            setData('image', file);
            
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            
            if (errors.image) {
                clearErrors('image');
            }
        }
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageChange(e.dataTransfer.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('stages.store'), {
            preserveState: true,
            onSuccess: () => {
                reset();
                setImagePreview(null);
                setShowModal(false);
            }
        });
    };

    const handleClose = () => {
        reset();
        setImagePreview(null);
        clearErrors();
        setShowModal(false);
    };

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl">Crear Nuevo Lugar</DialogTitle>
                            <DialogDescription>
                                En el planeta: <span className="font-medium text-purple-600">{planetName}</span>
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div>
                        <Label htmlFor="stageName" className="text-gray-700 font-medium flex items-center space-x-0.5">
                            <Type className="w-4 h-4 text-purple-600" />
                            <span>Nombre del Lugar</span>
                        </Label>
                        <Input
                            id="stageName"
                            value={data.name}
                            onChange={(e) => {
                                setData('name', e.target.value);
                                if (errors.name) clearErrors('name');
                            }}
                            placeholder="Ej: Bosque de Algoritmos, Ciudad de Variables..."
                            className={`mt-2 border-2 focus:ring-0 ${
                                errors.name ? 'border-red-300 focus:border-red-400' : 'border-purple-200 focus:border-purple-400'
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1 flex items-center space-x-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{errors.name}</span>
                            </p>
                        )}
                    </div>

                    <div>
                        <Label className="text-gray-700 font-medium flex items-center space-x-0.5 mb-3">
                            <MapPin className="w-4 h-4 text-purple-600" />
                            <span>Imagen del Lugar</span>
                        </Label>
                        
                        <div
                            className={`relative border-2 border-dashed rounded-xl p-4 transition-all duration-300 ${
                                dragActive 
                                    ? 'border-purple-400 bg-purple-50' 
                                    : errors.image 
                                        ? 'border-red-300 bg-red-50' 
                                        : 'border-purple-300 bg-purple-50/50 hover:border-purple-400 hover:bg-purple-50'
                            }`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            {imagePreview ? (
                                <div className="text-center">
                                    <div className="relative inline-block">
                                        <img 
                                            src={imagePreview} 
                                            alt="Preview" 
                                            className="max-w-full max-h-40 rounded-lg shadow-md"
                                        />
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => {
                                                setImagePreview(null);
                                                setData('image', null);
                                            }}
                                            className="absolute -top-1 -right-1 cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded-full size-6 p-0"
                                        >
                                            <X className="w-3 h-3" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className={`w-8 h-8 mx-auto mb-3 ${
                                        errors.image ? 'text-red-400' : 'text-purple-400'
                                    }`} />
                                    <p className={`font-medium mb-1 ${
                                        errors.image ? 'text-red-600' : 'text-gray-700'
                                    }`}>
                                        Arrastra una imagen aquí o haz clic para seleccionar
                                    </p>
                                    <p className="text-gray-500 text-sm mb-3">
                                        PNG, JPG, WEBP hasta 5MB
                                    </p>
                                    <Button
                                        type="button"
                                        onClick={() => document.getElementById('imageInput')?.click()}
                                        className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-lg"
                                    >
                                        <Upload className="w-4 h-4 mr-1" />
                                        Seleccionar Imagen
                                    </Button>
                                </div>
                            )}
                            
                            <input
                                id="imageInput"
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
                                className="hidden"
                            />
                        </div>
                        
                        {errors.image && (
                            <p className="text-red-500 text-sm mt-2 flex items-center space-x-1">
                                <AlertCircle className="w-3 h-3" />
                                <span>{errors.image}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end space-x-3 pt-4 border-top">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleClose}
                            className="cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50"
                        >
                            {processing ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            ) : (
                                <Plus className="w-4 h-4 mr-0.5" />
                            )}
                            {processing ? 'Creando...' : 'Crear Lugar'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}