import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { User, Mail, Eye, EyeOff, LoaderCircle, GraduationCap, LockKeyhole, LockKeyholeOpen } from "lucide-react";
import type { User as UserType } from "@/types";

type EditTeacherForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface EditTeacherModalProps {
    teacher: UserType;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
}

export default function EditTeacherModal({ teacher, open, onOpenChange, onClose }: EditTeacherModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, put, processing, errors, clearErrors, transform } = useForm<EditTeacherForm>({
        name: teacher.name,
        email: teacher.email,
        password: '',
        password_confirmation: '',
    });

    transform((data) => {
        if (!data.password) {
            return {
                name: data.name,
                email: data.email
            };
        }
        return data;
    });

    useEffect(() => {
        if (open && teacher) {
            setData({
                name: teacher.name,
                email: teacher.email,
                password: '',
                password_confirmation: '',
            });
            clearErrors();
        }
    }, [teacher, open]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        put(route('teachers.update', teacher.id), {
            onSuccess: () => {
                handleClose();
            }
        });
    };

    const handleClose = () => {
        onClose();
        setData({
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        });
        clearErrors();
        setShowPassword(false);
        setShowPasswordConfirmation(false);
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => isOpen ? onOpenChange(true) : handleClose()}>
            <DialogContent className="sm:max-w-md bg-white rounded-2xl border border-purple-100 shadow-2xl">
                <DialogHeader className="space-y-1 pb-4">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-3">
                            <GraduationCap className="w-6 h-6 text-purple-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            Editar Docente
                        </DialogTitle>
                    </div>
                    <p className="text-gray-600 text-center">
                        Modifica los datos del docente <span className="font-semibold text-purple-600">{teacher.name}</span>
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Campo Nombre */}
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-purple-900 font-medium">
                            Nombre Completo
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                disabled={processing}
                                placeholder="Nombre del docente"
                                className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                            />
                        </div>
                        <InputError message={errors.name} />
                    </div>

                    {/* Campo Email */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-purple-900 font-medium">
                            Correo Electrónico
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                            <Input
                                id="email"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                                placeholder="correo@ejemplo.com"
                                className="pl-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                            />
                        </div>
                        <InputError message={errors.email} />
                    </div>

                    {/* Divisor */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-purple-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-purple-600 font-medium">Cambiar Contraseña (Opcional)</span>
                        </div>
                    </div>

                    {/* Campo Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-purple-900 font-medium">
                            Nueva Contraseña
                        </Label>
                        <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Dejar en blanco para mantener la actual"
                                className="pl-10 pr-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* Campo Password Confirmation - Solo si hay contraseña */}
                    {data.password && (
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-purple-900 font-medium">
                                Confirmar Nueva Contraseña
                            </Label>
                            <div className="relative">
                                <LockKeyholeOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                                <Input
                                    id="password_confirmation"
                                    type={showPasswordConfirmation ? "text" : "password"}
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                    placeholder="Confirma la nueva contraseña"
                                    className="pl-10 pr-10 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl h-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-purple-600 transition-colors"
                                >
                                    {showPasswordConfirmation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            <InputError message={errors.password_confirmation} />
                        </div>
                    )}

                    <div className="flex items-center justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={processing}
                            className="cursor-pointer border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl"
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                        >
                            {processing ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <LoaderCircle className="h-5 w-5 animate-spin" />
                                    <span>Actualizando...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <span>Actualizar Docente</span>
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}