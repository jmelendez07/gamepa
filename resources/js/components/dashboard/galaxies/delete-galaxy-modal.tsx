import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

interface DeleteGalaxyModalProps {
    galaxyId: string | number;
    galaxyName: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    onClose?: () => void;
}

export default function DeleteGalaxyModal({ galaxyId, galaxyName, open, setOpen, onClose }: DeleteGalaxyModalProps) {
    const { delete: destroy, processing } = useForm();
    const [confirmText, setConfirmText] = useState("");

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        destroy(route("galaxies.destroy", galaxyId), {
            onSuccess: () => {
                setOpen(false);
                setConfirmText("");
                onClose && onClose();
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={o => {
            setOpen(o);
            if (!o && onClose) onClose();
        }}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <div className="flex items-center gap-2 text-red-600 mb-2">
                        <AlertTriangle className="w-6 h-6" />
                        <DialogTitle className="text-red-600 text-lg">Eliminar Galaxia</DialogTitle>
                    </div>
                </DialogHeader>
                <div className="bg-muted rounded-lg p-4 mb-4">
                    <div className="font-semibold mb-1">Galaxia a eliminar:</div>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-purple-700 bg-purple-50 px-2 py-1 rounded">{galaxyName}</span>
                    </div>
                </div>
                <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm mb-4">
                    <span className="font-semibold">Esta acción no se puede deshacer.</span> Esto eliminará permanentemente la galaxia y toda la información asociada.
                </div>
                <form onSubmit={handleDelete}>
                    <div className="mb-4">
                        <label className="block text-sm mb-1">
                            Para confirmar, escribe <span className="font-semibold">&quot;{galaxyName}&quot;</span> en el campo a continuación:
                        </label>
                        <Input
                            value={confirmText}
                            onChange={e => setConfirmText(e.target.value)}
                            placeholder={`Escribe "${galaxyName}" para confirmar`}
                            autoFocus
                        />
                    </div>
                    <DialogFooter className="gap-2">
                        <Button className="cursor-pointer" type="button" variant="ghost" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="cursor-pointer bg-red-600 hover:bg-red-700 text-white"
                            disabled={processing || confirmText !== galaxyName}
                        >
                            Eliminar Galaxia
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}