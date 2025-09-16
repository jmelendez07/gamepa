import { useState } from "react";
import { useForm } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { Plus, User, Mail, Eye, EyeOff, LoaderCircle, GraduationCap, Key, LockKeyhole, LockKeyholeOpen } from "lucide-react";

type CreateTeacherForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

interface CreateTeacherModalProps {
    children?: React.ReactNode;
}

export default function CreateTeacherModal({ children }: CreateTeacherModalProps) {
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const { data, setData, post, processing, errors, clearErrors } = useForm<CreateTeacherForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        post(route('teachers.store'), {
            onSuccess: () => {
                setOpen(false);
                setData({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation: '',
                });
                clearErrors();
            }
        });
    };

    const handleClose = () => {
        setOpen(false);
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
        <Dialog open={open} onOpenChange={(isOpen) => isOpen ? setOpen(true) : handleClose()}>
            <DialogTrigger asChild>
                {children || (
                    <Button className="cursor-pointer bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                        <Plus className="w-4 h-4 mr-0.5" />
                        Agregar
                    </Button>
                )}
            </DialogTrigger>
            
            <DialogContent className="sm:max-w-md bg-white rounded-2xl border border-purple-100 shadow-2xl">
                <DialogHeader className="space-y-1 pb-4">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-3">
                            <GraduationCap className="w-6 h-6 text-purple-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            Crear Nuevo Docente
                        </DialogTitle>
                    </div>
                    <p className="text-gray-600 text-center">
                        Ingresa los datos del nuevo docente para agregarlo al sistema
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

                    {/* Campo Password */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-purple-900 font-medium">
                            Contraseña
                        </Label>
                        <div className="relative">
                            <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                disabled={processing}
                                placeholder="Contraseña segura"
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

                    {/* Campo Password Confirmation */}
                    <div className="space-y-2">
                        <Label htmlFor="password_confirmation" className="text-purple-900 font-medium">
                            Confirmar Contraseña
                        </Label>
                        <div className="relative">
                            <LockKeyholeOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                            <Input
                                id="password_confirmation"
                                type={showPasswordConfirmation ? "text" : "password"}
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                disabled={processing}
                                placeholder="Confirma la contraseña"
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

                    <div className="flex items-center justify-end gap-3 pt-2">
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
                                    <span>Creando...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <span>Crear Docente</span>
                                </div>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}