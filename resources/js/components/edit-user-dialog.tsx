import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Edit, Save, X, Key, User, Mail, AlertCircle } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { router } from '@inertiajs/react';

interface User {
    id: string;
    name: string;
    email: string;
}

interface EditUserDialogProps {
    user: User;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isCurrentUser?: boolean;
}

export function EditUserDialog({ user, open, onOpenChange, isCurrentUser = false }: EditUserDialogProps) {
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        reset_password: false
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrors({});

        const newErrors: Record<string, string> = {};
        
        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido';
        }
        
        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El email no es válido';
        }

        if (formData.reset_password) {
            if (!formData.password) {
                newErrors.password = 'La contraseña es requerida';
            } else if (formData.password.length < 8) {
                newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
            }
            
            if (formData.password !== formData.password_confirmation) {
                newErrors.password_confirmation = 'Las contraseñas no coinciden';
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsSubmitting(false);
            return;
        }

        const submitData: any = {
            name: formData.name,
            email: formData.email,
        };

        if (formData.reset_password && formData.password) {
            submitData.password = formData.password;
            submitData.password_confirmation = formData.password_confirmation;
        }

        router.put(route('users.update', user.id), submitData, {
            onSuccess: () => {
                setIsSubmitting(false);
                onOpenChange(false);
                setFormData({
                    ...formData,
                    password: '',
                    password_confirmation: '',
                    reset_password: false,
                });
            },
            onError: (errors) => {
                setIsSubmitting(false);
                setErrors(errors as Record<string, string>);
            }
        });
    };

    const handleCancel = () => {
        setFormData({
            name: user.name,
            email: user.email,
            password: '',
            password_confirmation: '',
            reset_password: false
        });
        setErrors({});
        onOpenChange(false);
    };

    const content = (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Info */}
            <div className="flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20">
                    <Edit className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
            </div>

            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {isCurrentUser ? 'Editar mi perfil' : `Editar perfil de ${user.name}`}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Actualiza la información del usuario
                </p>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nombre completo
                </Label>
                <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    disabled={isSubmitting}
                    placeholder="Ingresa el nombre completo"
                />
                {errors.name && (
                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.name}
                    </p>
                )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Correo electrónico
                </Label>
                <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                    disabled={isSubmitting}
                    placeholder="usuario@ejemplo.com"
                />
                {errors.email && (
                    <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                        <AlertCircle className="h-3 w-3" />
                        {errors.email}
                    </p>
                )}
            </div>

            {/* Password Reset Section */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        id="reset_password"
                        checked={formData.reset_password}
                        onChange={(e) => setFormData(prev => ({ 
                            ...prev, 
                            reset_password: e.target.checked,
                            password: e.target.checked ? prev.password : '',
                            password_confirmation: e.target.checked ? prev.password_confirmation : ''
                        }))}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        disabled={isSubmitting}
                    />
                    <Label htmlFor="reset_password" className="flex items-center gap-2 cursor-pointer">
                        <Key className="h-4 w-4" />
                        {isCurrentUser ? 'Cambiar mi contraseña' : 'Resetear contraseña del usuario'}
                    </Label>
                </div>

                {formData.reset_password && (
                    <div className="space-y-4 pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                        {/* New Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Nueva contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                className={errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                                disabled={isSubmitting}
                                placeholder="Mínimo 8 caracteres"
                            />
                            {errors.password && (
                                <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={formData.password_confirmation}
                                onChange={(e) => setFormData(prev => ({ ...prev, password_confirmation: e.target.value }))}
                                className={errors.password_confirmation ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
                                disabled={isSubmitting}
                                placeholder="Repite la nueva contraseña"
                            />
                            {errors.password_confirmation && (
                                <p className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
                                    <AlertCircle className="h-3 w-3" />
                                    {errors.password_confirmation}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </form>
    );

    const footer = (
        <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 space-y-2 space-y-reverse sm:space-y-0">
            <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
            >
                <X className="h-4 w-4 mr-2" />
                Cancelar
            </Button>
            <Button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full sm:w-auto"
            >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
            </Button>
        </div>
    );

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Editar Usuario</DialogTitle>
                        <DialogDescription className="sr-only">
                            Formulario para editar la información del usuario
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
                    <DrawerTitle className="sr-only">Editar Usuario</DrawerTitle>
                    <DrawerDescription className="sr-only">
                        Formulario para editar la información del usuario
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
