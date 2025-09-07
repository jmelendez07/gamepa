import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, AlertCircle } from 'lucide-react';

interface CreatePlanetModalProps {
    isOpen: boolean;
    onClose: () => void;
    formData: { name: string; description: string };
    onInputChange: (field: 'name' | 'description', value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    processing: boolean;
    errors: {
        name?: string;
        description?: string;
    };
}

export default function CreatePlanetModal({ 
    isOpen, 
    onClose, 
    formData, 
    onInputChange,
    onSubmit, 
    processing,
    errors
}: CreatePlanetModalProps) {
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
                            className='cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'
                        >
                            {processing ? 'Creando...' : 'Crear Planeta'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}