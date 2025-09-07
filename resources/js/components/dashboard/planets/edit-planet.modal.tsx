import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, AlertCircle } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import Planet from '@/types/planet';

interface EditPlanetModalProps {
    isOpen: boolean;
    onClose: () => void;
    planet: Planet | null;
}

export default function EditPlanetModal({ 
    isOpen, 
    onClose, 
    planet 
}: EditPlanetModalProps) {
    const { data, setData, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (planet && isOpen) {
            setData({
                name: planet.name,
                description: planet.description || ''
            });
        }
    }, [planet, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!planet) return;

        put(route('planets.update', planet.id), {
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
                            className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'
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