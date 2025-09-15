import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Step } from "@/types/exercise";
import { router } from "@inertiajs/react";
import { ArrowUpDown, Trash2, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DeleteStepModalProps {
    isOpen: boolean;
    onClose: () => void;
    step: Step | null;
    siblingSteps: Step[];
}

export default function DeleteStepModal({ 
    isOpen, 
    onClose, 
    step,
    siblingSteps 
}: DeleteStepModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!step) return null;

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('steps.destroy', [step.id]), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                router.reload();
            },
            onFinish: () => {
                setIsDeleting(false);
            }
        });
    };

    const stepsAffected = siblingSteps.filter(s => s.order > step.order).length;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>
                        Eliminar Paso {step.order}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                        <p>
                            ¿Estás seguro de que quieres eliminar este paso? Esta acción no se puede deshacer.
                        </p>
                        
                        {step.options.length > 0 && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                <p className="text-sm text-amber-800">
                                    <strong>Advertencia:</strong> Este paso tiene {step.options.length} opción(es) 
                                    que también se eliminarán.
                                </p>
                            </div>
                        )}

                        {stepsAffected > 0 && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                                <p className="text-sm text-blue-800 mb-2">
                                    <strong>Nota:</strong> Hay {stepsAffected} paso(s) después de este que serán 
                                    afectados en la numeración.
                                </p>
                                <div className="flex items-center gap-2 text-xs text-blue-700">
                                    <ArrowUpDown size={14} />
                                    <span>Los pasos siguientes se reordenarán automáticamente</span>
                                </div>
                            </div>
                        )}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel 
                        onClick={onClose}
                        className="cursor-pointer w-full sm:w-auto"
                    >
                        Cancelar
                    </AlertDialogCancel>
                    
                    <div className="flex gap-2 w-full sm:w-auto">
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="cursor-pointer flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white"
                        >
                            {isDeleting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Eliminando...
                                </>
                            ) : (
                                <>
                                    <Trash2 size={16} className="mr-0.5" />
                                    { stepsAffected > 0 ? 'Eliminar y Reordenar' : 'Eliminar' }
                                </>
                            )}
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}