import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, AlertCircle, Image as ImageIcon } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Planet from '@/types/planet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Galaxy from '@/types/galaxy';

interface EditPlanetModalProps {
    isOpen: boolean;
    onClose: () => void;
    planet: Planet | null;
    galaxies: Galaxy[];
}

export default function EditPlanetModal({ 
    isOpen, 
    onClose, 
    planet,
    galaxies
}: EditPlanetModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string>(planet?.image_url || '');

    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: '',
        image: null as File | null,
        galaxy_id: '',
        _method: 'PUT' as string,
    });

    useEffect(() => {
        if (planet && isOpen) {
            setData({
                name: planet.name,
                description: planet.description || '',
                image: null,
                galaxy_id: planet.galaxy?.id || '',
                _method: 'PUT',
            });
            setPreview(planet.image_url || '');
        }
    }, [planet, isOpen]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData('image', file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setData('image', null);
        setPreview('');
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!planet) return;
        post(route('planets.update', planet.id), {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
                clearErrors();
            },
        });
    };

    const handleCancel = () => {
        onClose();
        reset();
        clearErrors();
    };

    const handleInputChange = (field: keyof typeof data, value: string) => {
        setData(field, value);
        if (errors[field]) {
            clearErrors(field);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">Editar Planeta</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="edit-name">
                            Nombre
                        </Label>
                        <Input
                            id="edit-name"
                            type="text"
                            value={data.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
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
                        <Label htmlFor="edit-description">Descripción</Label>
                        <Textarea
                            id="edit-description"
                            value={data.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
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
                        <Label>Imagen del planeta</Label>
                        <div
                            className="border-2 border-dashed border-purple-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer relative min-h-[120px] bg-purple-50"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            {!preview ? (
                                <>
                                    <ImageIcon className="w-10 h-10 text-purple-400 mb-2" />
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
                        {errors.image && (
                            <div className="flex items-center space-x-1 text-red-600 text-sm">
                                <AlertCircle className="h-4 w-4" />
                                <span>{errors.image}</span>
                            </div>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="galaxy_id">Galaxia</Label>
                        <Select
                            value={data.galaxy_id || ""}
                            onValueChange={value => setData('galaxy_id', value)}
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
                            onClick={handleCancel}
                            className='cursor-pointer'
                            disabled={processing}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className='cursor-pointer bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200'
                            disabled={processing}
                        >
                            {processing ? 'Actualizando...' : 'Actualizar Planeta'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}