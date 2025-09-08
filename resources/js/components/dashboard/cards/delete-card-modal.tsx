import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, AlertTriangle, Copy, Check, Sparkles, Sword, Shield, Heart, Zap } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Card from '@/types/card';
import { toast } from "sonner";

interface DeleteCardModalProps {
    isOpen: boolean;
    onClose: () => void;
    card: Card | null;
}

export default function DeleteCardModal({ 
    isOpen, 
    onClose, 
    card 
}: DeleteCardModalProps) {
    const [confirmationText, setConfirmationText] = useState('');
    const [copied, setCopied] = useState(false);
    
    const { delete: destroy, processing } = useForm();

    const isConfirmationValid = confirmationText === card?.name;

    useEffect(() => {
        if (isOpen) {
            setConfirmationText('');
            setCopied(false);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!card || !isConfirmationValid) return;

        destroy(route('cards.destroy', card.id), {
            onSuccess: () => {
                onClose();
                setConfirmationText('');
            },
            onError: () => {
                toast.error('Error al eliminar la carta');
            }
        });
    };

    const handleCancel = () => {
        onClose();
        setConfirmationText('');
        setCopied(false);
    };

    const handlePasteCardName = async () => {
        if (card?.name) {
            setConfirmationText(card.name);
            setCopied(true);
            
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getTypeIcon = (typeName: string) => {
        switch (typeName.toLowerCase()) {
            case 'ataque':
                return <Sword className="w-4 h-4 text-red-600" />;
            case 'defensa':
                return <Shield className="w-4 h-4 text-blue-600" />;
            case 'curación':
                return <Heart className="w-4 h-4 text-green-600" />;
            case 'potenciación':
                return <Zap className="w-4 h-4 text-yellow-600" />;
            default:
                return <Sparkles className="w-4 h-4 text-gray-600" />;
        }
    };

    const getTypeGradient = (typeName: string) => {
        switch (typeName.toLowerCase()) {
            case 'ataque':
                return 'from-red-400 to-red-600';
            case 'defensa':
                return 'from-blue-400 to-blue-600';
            case 'curación':
                return 'from-green-400 to-green-600';
            case 'potenciación':
                return 'from-yellow-400 to-yellow-600';
            default:
                return 'from-gray-400 to-gray-600';
        }
    };

    if (!card) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <span>Eliminar Carta</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">Carta a eliminar:</h4>
                        
                        <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden max-w-[200px] mx-auto">
                            <div className={`bg-gradient-to-r ${getTypeGradient(card.type.name)} p-2 relative`}>
                                <div className="flex items-center justify-between text-white text-sm">
                                    <span className="font-bold truncate">{card.name}</span>
                                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                                        <Zap className="w-3 h-3" />
                                        <span className="font-bold text-xs">{card.energy_cost}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-3 space-y-2">
                                <div className="flex items-center gap-1">
                                    {getTypeIcon(card.type.name)}
                                    <span className="text-xs font-medium">{card.type.name}</span>
                                </div>
                                
                                <div className="bg-gray-50 rounded-lg p-2 text-center">
                                    <div className="text-xs text-gray-500">Stats</div>
                                    <div className="font-bold text-lg">{card.stats}</div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 text-sm grid grid-cols-3 text-gray-600 text-center">
                            <div><strong>Tipo:</strong> {card.type.name}</div>
                            <div><strong>Energía:</strong> {card.energy_cost}</div>
                            <div><strong>Estadísticas:</strong> {card.stats}</div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                            Esta acción <strong>no se puede deshacer</strong>. Esto eliminará permanentemente la carta 
                            y toda la información asociada, incluyendo posibles mazos de jugadores que la contengan.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="confirmation" className='block'>
                                Para confirmar, escribe <strong>"{card.name}"</strong> en el campo a continuación:
                            </Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="confirmation"
                                    type="text"
                                    value={confirmationText}
                                    onChange={(e) => setConfirmationText(e.target.value)}
                                    placeholder={`Escribe "${card.name}" para confirmar`}
                                    className={`flex-1 ${!isConfirmationValid && confirmationText ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePasteCardName}
                                    className="px-3 size-8 shrink-0 cursor-pointer"
                                    title="Pegar nombre de la carta"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                </Button>
                            </div>
                            {!isConfirmationValid && confirmationText && (
                                <p className="text-sm text-red-600">
                                    El nombre no coincide. Debe escribir exactamente: "{card.name}"
                                </p>
                            )}
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
                                className="cursor-pointer disabled:cursor-not-allowed bg-red-600 hover:bg-red-700"
                            >
                                {processing ? 'Eliminando...' : 'Eliminar Carta'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}