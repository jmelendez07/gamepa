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
import { Checkbox } from "@/components/ui/checkbox";
import { Option } from "@/types/exercise";
import { useForm } from "@inertiajs/react";
import { Edit3, Save, X, CheckCircle, Circle, RefreshCcw } from "lucide-react";
import { useEffect } from "react";

interface EditOptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    option: Option | null;
    stepOrder: number;
}

export default function EditOptionModal({ 
    isOpen, 
    onClose, 
    option,
    stepOrder
}: EditOptionModalProps) {
    const { data, setData, put, processing, reset, errors } = useForm({
        result: '',
        is_correct: false as boolean,
    });

    useEffect(() => {
        if (option) {
            setData({
                result: option.result,
                is_correct: option.is_correct,
            });
        }
    }, [option]);

    if (!option) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        put(route('options.update', option.id), {
            preserveScroll: true,
            onSuccess: () => {
                onClose();
                reset();
            }
        });
    };

    const handleClose = () => {
        onClose();
        reset();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="max-w-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:duration-200 data-[state=open]:duration-200">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Edit3 size={20} className="text-blue-600" />
                        </div>
                        Editar Opción - Paso {stepOrder}
                    </DialogTitle>
                    <DialogDescription>
                        Modifica el contenido y estado de esta opción de respuesta.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="result" className="text-sm font-medium text-gray-700">
                                Resultado de la opción
                            </Label>
                            <Input
                                id="result"
                                type="text"
                                placeholder="Ingresa el resultado de la opción"
                                value={data.result}
                                onChange={(e) => setData('result', e.target.value)}
                                className={`${errors.result ? 'border-red-500 focus:ring-red-500' : ''}`}
                                disabled={processing}
                            />
                            {errors.result && (
                                <p className="text-sm text-red-600">{errors.result}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border">
                            <Checkbox
                                id="is_correct"
                                checked={data.is_correct}
                                onCheckedChange={(checked) => setData('is_correct', checked as boolean)}
                                disabled={processing}
                                className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                            />
                            <div className="flex items-center gap-2">
                                <Label 
                                    htmlFor="is_correct" 
                                    className="text-sm font-medium text-gray-700 cursor-pointer"
                                >
                                    Marcar como respuesta correcta
                                </Label>
                            </div>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="text-sm font-medium text-blue-800 mb-3">Vista previa:</h4>
                            <div className="flex items-center gap-3">
                                {data.is_correct ? (
                                    <CheckCircle size={20} className="text-green-600" />
                                ) : (
                                    <Circle size={20} className="text-gray-400" />
                                )}
                                <div>
                                    <span className="font-medium text-gray-800">
                                        {data.result || 'Resultado vacío'}
                                    </span>
                                    {data.is_correct && (
                                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                            Respuesta Correcta
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <DialogFooter className="flex-col sm:flex-row gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={processing}
                            className="cursor-pointer w-full sm:w-auto"
                        >
                            <X size={16} className="mr-0.5" />
                            Cancelar
                        </Button>
                        
                        <Button
                            type="submit"
                            disabled={processing || !data.result.trim()}
                            className="cursor-pointer w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            {processing ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                    Guardando...
                                </>
                            ) : (
                                <>
                                    <RefreshCcw size={16} className="mr-0.5" />
                                    Guardar Cambios
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}