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
import { Option } from "@/types/exercise";
import { router } from "@inertiajs/react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteOptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    option: Option | null;
    stepOrder: number;
}

export default function DeleteOptionModal({ 
    isOpen, 
    onClose, 
    option,
    stepOrder
}: DeleteOptionModalProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    if (!option) return null;

    const handleDelete = () => {
        setIsDeleting(true);
        router.delete(route('options.destroy', [option.id]), {
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

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:duration-200 data-[state=open]:duration-200">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle size={20} className="text-red-600" />
                        </div>
                        Eliminar Opción
                    </AlertDialogTitle>
                    <AlertDialogDescription className="space-y-3">
                        <p>
                            ¿Estás seguro de que quieres eliminar esta opción del Paso {stepOrder}?
                        </p>
                        
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center gap-3">
                                {option.is_correct ? (
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                        <div className="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                ) : (
                                    <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                                )}
                                <div>
                                    <p className="font-medium text-gray-800">{option.result}</p>
                                    {option.is_correct && (
                                        <span className="inline-block mt-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                            Respuesta Correcta
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {option.is_correct && (
                            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                <p className="text-sm text-amber-800">
                                    <strong>Advertencia:</strong> Esta es la respuesta correcta del paso. 
                                    Asegúrate de tener otra opción marcada como correcta.
                                </p>
                            </div>
                        )}

                        <p className="text-sm text-gray-600">
                            Esta acción no se puede deshacer.
                        </p>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <AlertDialogCancel 
                        onClick={onClose}
                        className="cursor-pointer w-full sm:w-auto"
                        disabled={isDeleting}
                    >
                        Cancelar
                    </AlertDialogCancel>
                    
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="cursor-pointer w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                    >
                        {isDeleting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                Eliminando...
                            </>
                        ) : (
                            <>
                                <Trash2 size={16} className="mr-0.5" />
                                Eliminar Opción
                            </>
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}