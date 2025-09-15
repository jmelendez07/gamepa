import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Crown, Sparkles, Shield, Sword, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
            <Head title="Iniciar Sesión" />
            
            {/* Elementos decorativos de fondo */}
            <div className="absolute inset-0">
                <div className="absolute top-10 left-10 text-purple-300/20">
                    <Crown className="w-32 h-32 animate-pulse" />
                </div>
                <div className="absolute top-20 right-20 text-purple-400/20">
                    <Sword className="w-24 h-24 rotate-45 animate-bounce" />
                </div>
                <div className="absolute bottom-20 left-20 text-purple-300/20">
                    <Shield className="w-28 h-28 animate-pulse delay-1000" />
                </div>
                <div className="absolute bottom-10 right-10 text-purple-400/20">
                    <Sparkles className="w-20 h-20 animate-spin" />
                </div>
                
                {/* Partículas flotantes */}
                <div className="absolute top-1/4 left-1/3">
                    <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
                </div>
                <div className="absolute top-1/3 right-1/4">
                    <Sparkles className="w-3 h-3 text-purple-300 animate-pulse delay-500" />
                </div>
                <div className="absolute bottom-1/3 left-1/4">
                    <Sparkles className="w-5 h-5 text-purple-500 animate-pulse delay-1000" />
                </div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
                <div className="w-full max-w-md">
                    {/* Header épico */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center mb-4">
                            <Crown className="w-12 h-12 text-purple-300 mr-3 animate-pulse" />
                            <h1 className="text-4xl font-bold text-white">GamePA</h1>
                            <Crown className="w-12 h-12 text-purple-300 ml-3 animate-pulse" />
                        </div>
                        <h2 className="text-2xl font-semibold text-purple-200 mb-2">Bienvenido, Héroe</h2>
                        <p className="text-purple-300">Ingresa a tu reino épico</p>
                    </div>

                    {/* Card principal con efecto glassmorphism */}
                    <div className="bg-white/10 backdrop-blur-lg border border-purple-300/30 rounded-2xl p-8 shadow-2xl">
                        <form className="space-y-6" onSubmit={submit}>
                            {/* Campo Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-purple-200 font-medium">
                                    Correo Electrónico
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="correo@ejemplo.com"
                                        className="bg-white/20 border-purple-300/50 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400/50 rounded-xl h-12"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            {/* Campo Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-purple-200 font-medium">
                                        Contraseña
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink 
                                            href={route('password.request')} 
                                            className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                                            tabIndex={5}
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Contraseña"
                                        className="bg-white/20 border-purple-300/50 text-white placeholder:text-purple-300 focus:border-purple-400 focus:ring-purple-400/50 rounded-xl h-12 pr-12"
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

                            {/* Checkbox Remember */}
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    checked={data.remember}
                                    onClick={() => setData('remember', !data.remember)}
                                    tabIndex={3}
                                    className="border-purple-300/50 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <Label htmlFor="remember" className="text-purple-200 cursor-pointer">
                                    Recuérdame
                                </Label>
                            </div>

                            {/* Botón de Login épico */}
                            <Button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 cursor-pointer h-12" 
                                tabIndex={4} 
                                disabled={processing}
                            >
                                {processing ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <LoaderCircle className="h-5 w-5 animate-spin" />
                                        <span>Accediendo...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center space-x-2">
                                        <Shield className="w-5 h-5" />
                                        <span>Iniciar Aventura</span>
                                    </div>
                                )}
                            </Button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-purple-300/30"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-transparent px-4 text-purple-300">o</span>
                                </div>
                            </div>

                            {/* Link de registro */}
                            <div className="text-center">
                                <span className="text-purple-300">¿No tienes una cuenta? </span>
                                <TextLink 
                                    href={route('register')} 
                                    className="text-purple-200 hover:text-white font-semibold transition-colors"
                                    tabIndex={5}
                                >
                                    Únete a la aventura
                                </TextLink>
                            </div>
                        </form>

                        {/* Status message */}
                        {status && (
                            <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-xl">
                                <div className="text-center text-sm font-medium text-green-300">{status}</div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8">
                        <p className="text-purple-400 text-sm">
                            Prepárate para una experiencia épica
                        </p>
                    </div>
                </div>
            </div>

            {/* Efecto de resplandor en las esquinas */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
    );
}
