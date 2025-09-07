import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, AlertTriangle, Copy, Check, Calculator, Globe, Target } from 'lucide-react';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Exercise from '@/types/exercise';
import { toast } from "sonner";

interface DeleteExerciseModalProps {
    isOpen: boolean;
    onClose: () => void;
    exercise: Exercise | null;
}

export default function DeleteExerciseModal({ 
    isOpen, 
    onClose, 
    exercise 
}: DeleteExerciseModalProps) {
    const [confirmationText, setConfirmationText] = useState('');
    const [copied, setCopied] = useState(false);
    
    const { delete: destroy, processing } = useForm();

    const isConfirmationValid = confirmationText === exercise?.operation;

    useEffect(() => {
        if (isOpen) {
            setConfirmationText('');
            setCopied(false);
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!exercise || !isConfirmationValid) return;

        destroy(route('exercises.destroy', exercise.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                setConfirmationText('');
            },
            onError: () => {
                toast.error('Error al eliminar el ejercicio');
            }
        });
    };

    const handleCancel = () => {
        onClose();
        setConfirmationText('');
        setCopied(false);
    };

    const handlePasteOperation = async () => {
        if (exercise?.operation) {
            setConfirmationText(exercise.operation);
            setCopied(true);
            
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'fácil':
            case 'facil':
                return 'text-green-600';
            case 'medio':
            case 'intermedio':
                return 'text-yellow-600';
            case 'difícil':
            case 'dificil':
            case 'hard':
                return 'text-red-600';
            default:
                return 'text-gray-600';
        }
    };

    if (!exercise) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-5 w-5 text-red-600" />
                            <span>Eliminar Ejercicio</span>
                        </div>
                    </DialogTitle>
                </DialogHeader>
                
                <div className="space-y-6">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium text-gray-800 mb-3">Ejercicio a eliminar:</h4>
                        <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                                <Calculator className="w-4 h-4 text-purple-600" />
                                <span className="font-mono bg-white px-2 py-1 rounded border">
                                    {exercise.operation}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-blue-600" />
                                <span>{exercise.planet.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-orange-600" />
                                <span className={getDifficultyColor(exercise.difficulty.name)}>
                                    {exercise.difficulty.name}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-sm text-red-800">
                            Esta acción <strong>no se puede deshacer</strong>. Esto eliminará permanentemente el ejercicio 
                            y toda la información asociada, incluyendo posibles resultados de estudiantes.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="confirmation" className="block">
                                Para confirmar, escribe <strong>"{exercise.operation}"</strong> en el campo a continuación:
                            </Label>
                            <div className="flex items-center space-x-2">
                                <Input
                                    id="confirmation"
                                    type="text"
                                    value={confirmationText}
                                    onChange={(e) => setConfirmationText(e.target.value)}
                                    placeholder={`Escribe "${exercise.operation}" para confirmar`}
                                    className={`flex-1 font-mono ${!isConfirmationValid && confirmationText ? 'border-red-500 focus:border-red-500' : ''}`}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePasteOperation}
                                    className="cursor-pointer size-8 shrink-0"
                                    title="Pegar operación del ejercicio"
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
                                    La operación no coincide. Debe escribir exactamente: "{exercise.operation}"
                                </p>
                            )}
                        </div>

                        <DialogFooter className="flex space-x-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleCancel}
                                disabled={processing}
                                className="cursor-pointer"
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing || !isConfirmationValid}
                                className="cursor-pointer bg-red-600 hover:bg-red-700"
                            >
                                {processing ? 'Eliminando...' : 'Eliminar Ejercicio'}
                            </Button>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
}