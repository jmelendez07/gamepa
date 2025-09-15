import { useForm } from "@inertiajs/react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import Enemy from "@/types/enemy";

interface DeleteEnemyModalProps {
    isOpen: boolean;
    onClose: () => void;
    enemy: Enemy | null;
}

export default function DeleteEnemyModal({ isOpen, onClose, enemy }: DeleteEnemyModalProps) {
    const { delete: destroy, processing, reset } = useForm();

    const handleDelete = () => {
        if (!enemy) return;

        destroy(route('enemies.destroy', enemy.id), {
            onSuccess: () => {
                onClose();
                reset();
            }
        });
    };

    useEffect(() => {
        if (!isOpen) {
            reset();
        }
    }, [isOpen, reset]);

    if (!enemy) return null;

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta acción eliminará permanentemente al enemigo "{enemy.name}".
                        Esta acción no se puede deshacer.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer" disabled={processing}>
                        Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={processing}
                        className="cursor-pointer bg-red-600 hover:bg-red-700 disabled:opacity-50"
                    >
                        {processing ? "Eliminando..." : "Eliminar"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}