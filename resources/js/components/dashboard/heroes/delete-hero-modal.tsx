import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Trash2, AlertTriangle, Copy, Users } from 'lucide-react';
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

interface IDeleteHeroModalProps {
    isOpen: boolean;
    onClose: () => void;
    hero: Hero | null;
}

export default function DeleteHeroModal({ isOpen, onClose, hero }: IDeleteHeroModalProps) {
    const { delete: destroy, processing } = useForm();
    const [confirmationText, setConfirmationText] = useState("");
    const [showCopyFeedback, setShowCopyFeedback] = useState(false);

    const isConfirmationValid = hero && confirmationText === hero.name;

    const handleDelete = () => {
        if (!hero || !isConfirmationValid) return;

        destroy(route('heroes.destroy', hero.id), {
            onSuccess: () => {
                onClose();
                setConfirmationText("");
            },
        });
    };

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setConfirmationText("");
            onClose();
        }
    };

    const handlePasteName = () => {
        if (hero) {
            setConfirmationText(hero.name);
            setShowCopyFeedback(true);
            setTimeout(() => setShowCopyFeedback(false), 1500);
        }
    };

    const handleConfirmationChange = (value: string) => {
        setConfirmationText(value);
    };

    if (!hero) return null;

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Trash2 className="h-5 w-5 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-red-900">
                                Eliminar Héroe
                            </DialogTitle>
                            <DialogDescription>
                                Esta acción no se puede deshacer
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-center gap-3">
                            {hero.spritesheet ? (
                                <img
                                    src={hero.spritesheet}
                                    alt={hero.name}
                                    className="w-12 h-12 object-contain rounded-lg border bg-white"
                                />
                            ) : (
                                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center">
                                    <span className="text-lg font-bold text-purple-600">
                                        {hero.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <div>
                                <h3 className="font-semibold text-gray-900">
                                    {hero.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {hero.health} HP
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-red-900 mb-1">
                                        ¡Advertencia importante!
                                    </h4>
                                    <p className="text-sm text-red-800">
                                        Eliminar este héroe es una acción permanente que no se puede deshacer.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                            <div className="flex items-start gap-3">
                                <Users className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                                <div>
                                    <h4 className="font-medium text-orange-900 mb-1">
                                        Usuarios afectados
                                    </h4>
                                    <p className="text-sm text-orange-800">
                                        Los usuarios que tengan seleccionado este héroe se verán afectados. 
                                        Deberán seleccionar un nuevo héroe para continuar jugando.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-2">
                            <Label htmlFor="confirmation" className="text-sm font-medium text-gray-700">
                                Para confirmar la eliminación, escribe el nombre del héroe:
                            </Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="confirmation"
                                    type="text"
                                    value={confirmationText}
                                    onChange={(e) => handleConfirmationChange(e.target.value)}
                                    placeholder={`Escribe "${hero.name}" para confirmar`}
                                    className={`flex-1 ${
                                        confirmationText && !isConfirmationValid 
                                            ? 'border-red-500 focus-visible:ring-red-500' 
                                            : isConfirmationValid 
                                                ? 'border-green-500 focus-visible:ring-green-500'
                                                : 'focus-visible:ring-gray-500'
                                    }`}
                                    disabled={processing}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={handlePasteName}
                                    disabled={processing}
                                    className={`size-8 cursor-pointer ${showCopyFeedback ? 'bg-green-50 border-green-300' : ''}`}
                                    title="Pegar nombre del héroe"
                                >
                                    <Copy className="h-4 w-4" />
                                </Button>
                            </div>
                            {showCopyFeedback && (
                                <p className="text-xs text-green-600 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-green-600 rounded-full"></span>
                                    Nombre pegado correctamente
                                </p>
                            )}
                        </div>

                        <div className="text-xs">
                            {confirmationText && !isConfirmationValid && (
                                <p className="text-red-600 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-red-600 rounded-full"></span>
                                    El nombre no coincide
                                </p>
                            )}
                            {isConfirmationValid && (
                                <p className="text-green-600 flex items-center gap-1">
                                    <span className="w-1 h-1 bg-green-600 rounded-full"></span>
                                    Confirmación correcta
                                </p>
                            )}
                        </div>
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
                            type="button"
                            variant="destructive"
                            onClick={handleDelete}
                            disabled={processing || !isConfirmationValid}
                            className="cursor-pointer"
                        >
                            {processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Eliminando...
                                </>
                            ) : (
                                <>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Eliminar Héroe
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    );
}