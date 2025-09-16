import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Crown, Sparkles, Shield, Sword, Eye, EyeOff, User, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PublicLayout from '@/layouts/public-layout';
import { SharedData } from '@/types';

type RegisterForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Register() {
    const { name } = usePage<SharedData>().props;
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <PublicLayout>
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-purple-900 relative overflow-hidden">
                <Head title="Registro" />
                
                {/* Elementos decorativos de fondo */}
                <div className="absolute inset-0">
                    <div className="absolute top-10 right-10 text-indigo-300/20">
                        <Crown className="w-32 h-32 animate-pulse delay-500" />
                    </div>
                    <div className="absolute top-20 left-20 text-purple-400/20">
                        <Sword className="w-24 h-24 -rotate-45 animate-bounce delay-300" />
                    </div>
                    <div className="absolute bottom-20 right-20 text-indigo-300/20">
                        <Shield className="w-28 h-28 animate-pulse delay-700" />
                    </div>
                    <div className="absolute bottom-10 left-10 text-purple-400/20">
                        <Sparkles className="w-20 h-20 animate-spin" />
                    </div>
                    
                    {/* Partículas flotantes */}
                    <div className="absolute top-1/3 left-1/4">
                        <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse delay-200" />
                    </div>
                    <div className="absolute top-1/4 right-1/3">
                        <Sparkles className="w-3 h-3 text-purple-300 animate-pulse delay-700" />
                    </div>
                    <div className="absolute bottom-1/4 left-1/3">
                        <Sparkles className="w-5 h-5 text-indigo-500 animate-pulse delay-1200" />
                    </div>
                    <div className="absolute bottom-1/3 right-1/4">
                        <Sparkles className="w-4 h-4 text-purple-400 animate-pulse delay-900" />
                    </div>
                </div>

                <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
                    <div className="w-full max-w-md">
                        {/* Header épico */}
                        <div className="text-center mb-8">
                            <Link href={route('home')} className="flex items-center justify-center mb-4">
                                <Shield className="w-12 h-12 text-indigo-300 mr-3 animate-pulse" />
                                <h1 className="text-4xl font-bold text-white">{name}</h1>
                                <Sword className="w-12 h-12 text-purple-300 ml-3 animate-pulse" />
                            </Link>
                            <h2 className="text-2xl font-semibold text-indigo-200 mb-2">Forja tu Leyenda</h2>
                            <p className="text-purple-300">Crea tu cuenta y únete a la aventura épica</p>
                        </div>

                        {/* Card principal con efecto glassmorphism */}
                        <div className="bg-white/10 backdrop-blur-lg border border-indigo-300/30 rounded-2xl p-8 shadow-2xl">
                            <form className="space-y-6" onSubmit={submit}>
                                {/* Campo Nombre */}
                                <div className="space-y-2">
                                    <Label htmlFor="name" className="text-indigo-200 font-medium">
                                        Nombre de Héroe
                                    </Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                                        <Input
                                            id="name"
                                            type="text"
                                            required
                                            autoFocus
                                            tabIndex={1}
                                            autoComplete="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            disabled={processing}
                                            placeholder="Tu nombre de héroe"
                                            className="bg-white/20 border-indigo-300/50 text-white placeholder:text-purple-300 focus:border-indigo-400 focus:ring-indigo-400/50 rounded-xl h-12 pl-12"
                                        />
                                    </div>
                                    <InputError message={errors.name} />
                                </div>

                                {/* Campo Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-indigo-200 font-medium">
                                        Correo Electrónico
                                    </Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            tabIndex={2}
                                            autoComplete="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            disabled={processing}
                                            placeholder="correo@ejemplo.com"
                                            className="bg-white/20 border-indigo-300/50 text-white placeholder:text-purple-300 focus:border-indigo-400 focus:ring-indigo-400/50 rounded-xl h-12 pl-12"
                                        />
                                    </div>
                                    <InputError message={errors.email} />
                                </div>

                                {/* Campo Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-indigo-200 font-medium">
                                        Contraseña Secreta
                                    </Label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            disabled={processing}
                                            placeholder="Contraseña segura"
                                            className="bg-white/20 border-indigo-300/50 text-white placeholder:text-purple-300 focus:border-indigo-400 focus:ring-indigo-400/50 rounded-xl h-12 pl-12 pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                {/* Campo Password Confirmation */}
                                <div className="space-y-2">
                                    <Label htmlFor="password_confirmation" className="text-indigo-200 font-medium">
                                        Confirma tu Contraseña
                                    </Label>
                                    <div className="relative">
                                        <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-300" />
                                        <Input
                                            id="password_confirmation"
                                            type={showPasswordConfirmation ? "text" : "password"}
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            value={data.password_confirmation}
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            disabled={processing}
                                            placeholder="Repite la contraseña"
                                            className="bg-white/20 border-indigo-300/50 text-white placeholder:text-purple-300 focus:border-indigo-400 focus:ring-indigo-400/50 rounded-xl h-12 pl-12 pr-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPasswordConfirmation(!showPasswordConfirmation)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-300 hover:text-purple-200 transition-colors"
                                        >
                                            {showPasswordConfirmation ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                {/* Botón de Registro épico */}
                                <Button 
                                    type="submit" 
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/25 cursor-pointer h-12" 
                                    tabIndex={5} 
                                    disabled={processing}
                                >
                                    {processing ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <LoaderCircle className="h-5 w-5 animate-spin" />
                                            <span>Forjando tu cuenta...</span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center space-x-2">
                                            <Crown className="w-5 h-5" />
                                            <span>Crear mi Leyenda</span>
                                        </div>
                                    )}
                                </Button>

                                {/* Divider */}
                                <div className="relative my-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-indigo-300/30"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="bg-transparent px-4 text-indigo-300">o</span>
                                    </div>
                                </div>

                                {/* Link de login */}
                                <div className="text-center">
                                    <span className="text-indigo-300">¿Ya tienes una cuenta? </span>
                                    <TextLink 
                                        href={route('login')} 
                                        className="text-indigo-200 hover:text-white font-semibold transition-colors"
                                        tabIndex={6}
                                    >
                                        Inicia tu aventura
                                    </TextLink>
                                </div>
                            </form>
                        </div>

                        {/* Footer */}
                        <div className="text-center mt-8">
                            <p className="text-indigo-400 text-sm">
                                Tu aventura épica está a punto de comenzar
                            </p>
                        </div>
                    </div>
                </div>

                {/* Efecto de resplandor en las esquinas */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
            </div>
        </PublicLayout>
    );
}
