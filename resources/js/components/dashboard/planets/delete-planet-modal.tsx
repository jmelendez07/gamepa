import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, AlertTriangle, Copy, Check } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Planet from '@/types/planet';
import { toast } from "sonner";

interface DeletePlanetModalProps {
    isOpen: boolean;
    onClose: () => void;
    planet: Planet | null;
}

export default function DeletePlanetModal({ 
    isOpen, 
    onClose, 
    planet 
}: DeletePlanetModalProps) {
    const [confirmationText, setConfirmationText] = useState('');
    const [copied, setCopied] = useState(false);
    
    const { delete: destroy, processing } = useForm();

    const isConfirmationValid = confirmationText === planet?.name;

    useEffect(() => {
        if (isOpen) {
            setConfirmationText('');
            setCopied(false);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!planet || !isConfirmationValid) return;

        destroy(route('planets.destroy', planet.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                setConfirmationText('');
            },
            onError: () => {
                toast.error('Error al eliminar el planeta');
            }
        });
    };

    const handleCancel = () => {
        onClose();
        setConfirmationText('');
        setCopied(false);
    };

    const handlePasteName = async () => {
        if (planet?.name) {
            setConfirmationText(planet.name);
            setCopied(true);
        
            setTimeout(() => setCopied(false), 2000);
        }
    };

    if (!planet) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <span>Eliminar Planeta</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-4">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                            Esta acción <strong>no se puede deshacer</strong>. Esto eliminará permanentemente el planeta{' '}
                            <strong>"{planet.name}"</strong> y toda la información asociada.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="confirmation" className='text-start block'>
                                Para confirmar, escribe <strong>"{planet.name}"</strong> en el campo a continuación:
                            </Label>
                            <div className="grid grid-cols-[1fr_auto] gap-2 items-center">
                                <Input
                                    id="confirmation"
                                    type="text"
                                    value={confirmationText}
                                    onChange={(e) => setConfirmationText(e.target.value)}
                                    placeholder={`Escribe "${planet.name}" para confirmar`}
                                    className={`${!isConfirmationValid && confirmationText ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePasteName}
                                    title="Pegar nombre del planeta"
                                    className="cursor-pointer size-8 p-2"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        <DialogFooter className="flex space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={processing}
                                className='cursor-pointer'
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing || !isConfirmationValid}
                                className="cursor-pointer bg-red-600 hover:bg-red-700"
                            >
                                {processing ? 'Eliminando...' : 'Eliminar Planeta'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}