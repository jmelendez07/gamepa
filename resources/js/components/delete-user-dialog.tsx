import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from '@/components/ui/drawer';
import { AlertTriangle, Mail, Trash2, X } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';

interface User {
    id: string;
    name: string;
    email: string;
}

interface DeleteUserDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    isCurrentUser?: boolean;
}

export function DeleteUserDialog({ user, open, onOpenChange, onConfirm, isCurrentUser = false }: DeleteUserDialogProps) {
    const [emailInput, setEmailInput] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleConfirmDelete = async () => {
        if (emailInput.toLowerCase() !== user.email.toLowerCase()) {
            return;
        }

        setIsDeleting(true);
        try {
            await onConfirm();
        } finally {
            setIsDeleting(false);
            setEmailInput('');
            onOpenChange(false);
        }
    };

    const handleCancel = () => {
        setEmailInput('');
        onOpenChange(false);
    };

    const isEmailValid = emailInput.toLowerCase() === user.email.toLowerCase();

    const content = (
        <div className="space-y-4">
            <div className="flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
                </div>
            </div>

            {/* Warning Message */}
            <div className="text-center space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {isCurrentUser ? '¿Eliminar tu cuenta?' : `¿Eliminar cuenta de ${user.name}?`}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    Esta acción <strong>NO se puede deshacer</strong>. Se eliminarán permanentemente:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside space-y-1 text-left mx-auto">
                    <li>{isCurrentUser ? 'Todos tus datos' : 'Todos los datos del usuario'}</li>
                    <li>{isCurrentUser ? 'Todas tus sesiones activas' : 'Todas las sesiones activas'}</li>
                    <li>{isCurrentUser ? 'Todo tu historial' : 'Todo el historial asociado'}</li>
                </ul>
                {isCurrentUser && (
                    <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                        <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                            ⚠️ Al eliminar tu cuenta serás desconectado automáticamente y no podrás acceder nuevamente.
                        </p>
                    </div>
                )}
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <Mail className="h-4 w-4 shrink-0" />
                    Para confirmar, escribe el correo electrónico del usuario:
                </div>
                <div className="space-y-2">
                    <Input
                        type="email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder={user.email}
                        className={`w-full ${
                            emailInput && !isEmailValid 
                                ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                                : ''
                        }`}
                        disabled={isDeleting}
                        autoComplete="off"
                    />
                    {emailInput && !isEmailValid && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                            El correo electrónico no coincide
                        </p>
                    )}
                </div>
            </div>
        </div>
    );

    const footer = (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0 w-full">
            <Button
                variant="outline"
                onClick={handleCancel}
                disabled={isDeleting}
                className="w-full sm:w-auto cursor-pointer"
            >
                Cancelar
            </Button>
            <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={!isEmailValid || isDeleting}
                className="w-full sm:w-auto cursor-pointer disabled:cursor-not-allowed"
            >
                <Trash2 className="h-4 w-4" />
                {isDeleting ? 'Eliminando...' : (isCurrentUser ? 'Eliminar Mi Cuenta Permanentemente' : 'Eliminar Cuenta Permanentemente')}
            </Button>
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Eliminar Cuenta de Usuario</DialogTitle>
                        <DialogDescription className="sr-only">
                            Confirma la eliminación permanente de la cuenta del usuario
                        </DialogDescription>
                    </DialogHeader>
                    {content}
                    <DialogFooter>
                        {footer}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle className="sr-only">Eliminar Cuenta de Usuario</DrawerTitle>
                    <DrawerDescription className="sr-only">
                        Confirma la eliminación permanente de la cuenta del usuario
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-4 pb-4">
                    {content}
                </div>
                <DrawerFooter>
                    {footer}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
