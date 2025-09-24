import { useForm } from "@inertiajs/react";
import {
    Trash2,
    AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Stage } from "@/types/planet";

interface DeleteStageModalProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    stage: Stage | null;
    planetName: string;
    onSuccess?: () => void;
}

export default function DeleteStageModal({ 
    showModal, 
    setShowModal, 
    stage,
    planetName,
    onSuccess 
}: DeleteStageModalProps) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = () => {
        if (!stage) return;

        destroy(route('stages.destroy', stage.id), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                setShowModal(false);
                if (onSuccess) onSuccess();
            }
        });
    };

    const handleClose = () => {
        setShowModal(false);
    };

    if (!stage) return null;

    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                            <Trash2 className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-xl text-red-600">Eliminar Lugar</DialogTitle>
                            <DialogDescription>
                                Esta acción no se puede deshacer
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                {stage.image_url ? (
                                    <img
                                        src={stage.image_url}
                                        alt={stage.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <Trash2 className="w-5 h-5 text-gray-400" />
                                    </div>
                                )}
                            </div>
                            <div>
                                <h5 className="font-medium text-gray-800">{stage.name}</h5>
                                <p className="text-gray-500 text-sm">Lugar #{stage.number}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <div>
                                <h4 className="font-medium text-red-800 mb-1">
                                    ¿Estás seguro de eliminar este lugar?
                                </h4>
                                <p className="text-red-700 text-sm mb-2">
                                    Se eliminará permanentemente:
                                </p>
                                <ul className="text-red-600 text-sm space-y-1">
                                    <li>• <strong>{stage.name}</strong></li>
                                    <li>• Lugar #{stage.number} del planeta {planetName}</li>
                                    <li>• Toda la información asociada</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleClose}
                            disabled={processing}
                            className="cursor-pointer text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                        >
                            Cancelar
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={processing}
                            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white disabled:opacity-50"
                        >
                            {processing ? (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            ) : (
                                <Trash2 className="w-4 h-4 mr-0.5" />
                            )}
                            {processing ? 'Eliminando...' : 'Sí, Eliminar'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}