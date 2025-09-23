import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, AlertCircle } from 'lucide-react';
import { useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Galaxy from '@/types/galaxy';

interface CreatePlanetModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: { name: string; description: string; image?: File | null; galaxy_id?: string };
    onInputChange: (field: 'name' | 'description' | 'image' | 'galaxy_id', value: string | File | null) => void;
    onSubmit: (e: React.FormEvent) => void;
    processing: boolean;
    errors: {
        name?: string;
        description?: string;
        image?: string;
        galaxy_id?: string;
    };
    galaxies: Galaxy[];
}

export default function CreatePlanetModal({
    isOpen,
    onClose,
    formData,
    onInputChange,
    onSubmit,
    processing,
    errors,
    galaxies
}: CreatePlanetModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            onInputChange('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        onInputChange('image', null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        Crear Nuevo Planeta
                    </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Imagen del planeta</Label>
                        <div
                            className="border-2 border-dashed border-purple-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer relative min-h-[120px] bg-purple-50"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {!preview ? (
                                <>
                                    <span className="text-xs text-muted-foreground text-center">
                                        Haz clic o arrastra una imagen aquí
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
                                        className="cursor-pointer absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
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
                        {errors.image && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.image}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="name">
                            Nombre
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => onInputChange('name', e.target.value)}
                            placeholder="Ingresa el nombre del planeta"
                            className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.name && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.name}</span>
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => onInputChange('description', e.target.value)}
                            placeholder="Ingresa la descripción del planeta"
                            rows={4}
                            className={errors.description ? 'border-red-500 focus:border-red-500' : ''}
                        />
                        {errors.description && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.description}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="galaxy_id">Galaxia</Label>
                        <Select
                            value={formData.galaxy_id || ""}
                            onValueChange={value => onInputChange('galaxy_id', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una galaxia" />
                            </SelectTrigger>
                            <SelectContent>
                                {galaxies.map(galaxy => (
                                    <SelectItem key={galaxy.id} value={galaxy.id}>
                                        {galaxy.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.galaxy_id && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.galaxy_id}</span>
                            </div>
                        )}
                    </div>

                    <DialogFooter className="flex space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={processing}
                            className='cursor-pointer'
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className='cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200'
                        >
                            {processing ? 'Creando...' : 'Crear Planeta'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}