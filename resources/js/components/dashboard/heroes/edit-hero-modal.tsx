import React, { useEffect, useRef, useState } from 'react';
import { useForm } from '@inertiajs/react';
import { User, Heart, Upload, X, ImagePlus } from 'lucide-react';
import Hero from '@/types/hero';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IEditHeroModalProps {
    isOpen: boolean;
    onClose: () => void;
    hero: Hero | null;
}

export default function EditHeroModal({ isOpen, onClose, hero }: IEditHeroModalProps) {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        health: 0,
        spritesheet: null as File | null,
        _method: 'PUT'
    });

    const [previewUrl, setPreviewUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (hero) {
            setData({
                name: hero.name,
                health: hero.health,
                spritesheet: null,
                _method: 'PUT'
            });
            
            if (hero.spritesheet) {
                setPreviewUrl(hero.spritesheet);
            } else {
                setPreviewUrl('');
            }
        }
    }, [hero]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!hero) return;

        post(route('heroes.update', hero.id), {
            onSuccess: () => {
                onClose();
                reset();
                setPreviewUrl('');
            },
        });
    };

    const handleInputChange = (field: keyof typeof data, value: string | number | File | null) => {
        setData(field, value);
        if (errors[field]) {
            clearErrors(field);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleInputChange('spritesheet', file);
            
            // Crear URL de vista previa
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
        }
    };

    const handleRemoveImage = () => {
        handleInputChange('spritesheet', null);
        setPreviewUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            reset();
            clearErrors();
            setPreviewUrl('');
            onClose();
        }
    };

    const handleFileAreaClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <User className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold">
                                Editar Héroe
                            </DialogTitle>
                            <DialogDescription>
                                Modifica los datos del héroe seleccionado
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-2">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Nombre del Héroe
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={data.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={errors.name ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-purple-500'}
                            placeholder="Ingresa el nombre del héroe"
                            disabled={processing}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-600">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="health" className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500" />
                            Puntos de Vida
                        </Label>
                        <Input
                            id="health"
                            type="number"
                            value={data.health}
                            onChange={(e) => handleInputChange('health', parseInt(e.target.value) || 0)}
                            className={errors.health ? 'border-red-500 focus-visible:ring-red-500' : 'focus-visible:ring-purple-500'}
                            placeholder="100"
                            disabled={processing}
                        />
                        {errors.health && (
                            <p className="text-sm text-red-600">{errors.health}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2">
                            <ImagePlus className="h-4 w-4" />
                            Imagen del Héroe
                        </Label>
                        
                        <div
                            onClick={handleFileAreaClick}
                            className={`
                                relative border-2 border-dashed rounded-lg p-6 cursor-pointer transition-colors
                                ${errors.spritesheet ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-purple-400 hover:bg-purple-50'}
                                ${processing ? 'pointer-events-none opacity-50' : ''}
                            `}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={processing}
                            />
                            
                            {previewUrl ? (
                                <div className="flex items-center justify-center">
                                    <div className="relative">
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className="w-24 h-24 object-contain rounded-lg border bg-white"
                                        />
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleRemoveImage();
                                            }}
                                            className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
                                            disabled={processing}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                    <p className="text-sm text-gray-600 font-medium mb-1">
                                        Haz clic para subir una imagen
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        PNG, JPG, GIF hasta 2MB
                                    </p>
                                </div>
                            )}
                        </div>
                        
                        {errors.spritesheet && (
                            <p className="text-sm text-red-600">{errors.spritesheet}</p>
                        )}
                    </div>

                    <DialogFooter className="flex space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => handleOpenChange(false)}
                            className="cursor-pointer"
                            disabled={processing}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-purple-600 hover:bg-purple-700 focus-visible:ring-purple-500"
                        >
                            {processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Actualizando...
                                </>
                            ) : (
                                <>
                                    Actualizar Enemigo
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}