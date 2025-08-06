import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Mail, Calendar, ShieldCheck, Monitor, Smartphone, Globe, Clock, Share2, Copy, Check, MoreVertical, Trash2, UserX, Edit } from 'lucide-react';
import { useState } from 'react';
import { DeleteUserDialog } from '@/components/delete-user-dialog';

interface User {
    id: string;
    name: string;
    email: string;
    roles?: Array<{
        name: string;
    }>;
    created_at: string;
    updated_at?: string;
}

interface Session {
    id: string;
    ip_address: string;
    browser: string;
    operating_system: string;
    last_activity: string;
    is_active: boolean;
}

interface Props {
    user: User;
    sessions: Session[];
    isCurrentUser: boolean;
}

export default function UserShow({ user, sessions, isCurrentUser }: Props) {
    const [copied, setCopied] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Panel de Control',
            href: '/dashboard',
        },
        {
            title: 'Usuarios',
            href: '/usuarios',
        },
        {
            title: user.name,
            href: '#',
        },
    ];

    const getRoleBadgeColor = (roleName: string) => {
        switch (roleName.toLowerCase()) {
            case 'administrador':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            case 'estudiante':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    const getDeviceIcon = (os: string) => {
        const osLower = os.toLowerCase();
        if (osLower.includes('android') || osLower.includes('ios')) {
            return <Smartphone className="h-4 w-4" />;
        }
        return <Monitor className="h-4 w-4" />;
    };

    const formatLastActivity = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return 'Ahora mismo';
        } else if (diffInMinutes < 60) {
            return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? 's' : ''}`;
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return `Hace ${days} día${days > 1 ? 's' : ''}`;
        }
    };

    const shareProfile = async () => {
        const profileUrl = `${window.location.origin}/usuarios/${user.id}`;
        
        // Solo usar Web Share API si está disponible y es un contexto seguro
        if (navigator.share && window.location.protocol === 'https:') {
            try {
                await navigator.share({
                    title: `Perfil de ${user.name}`,
                    text: `Revisa el perfil de ${user.name} en GamePA`,
                    url: profileUrl,
                });
                return; // Si el share fue exitoso, no hacer nada más
            } catch (error) {
                // Si el usuario canceló el share o hubo error, continuar con fallback
                console.log('Share cancelled or failed:', error);
            }
        }
        
        // Fallback: copiar al portapapeles
        copyToClipboard(profileUrl);
    };

    const copyToClipboard = async (text: string) => {
        try {
            // Primero intentar con la API moderna
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(text);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
                return;
            }
            
            // Fallback para navegadores más antiguos o contextos no seguros
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                const successful = document.execCommand('copy');
                if (successful) {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                } else {
                    throw new Error('execCommand failed');
                }
            } catch (execError) {
                console.error('Fallback copy failed:', execError);
                // Como último recurso, mostrar el enlace para que el usuario lo copie manualmente
                prompt('Copia este enlace:', text);
            } finally {
                document.body.removeChild(textArea);
            }
        } catch (error) {
            console.error('Error al copiar al portapapeles:', error);
            // Mostrar el enlace para copia manual
            prompt('No se pudo copiar automáticamente. Copia este enlace:', text);
        }
    };

    const handleDeleteAccount = () => {
        setDropdownOpen(false);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        return new Promise((resolve, reject) => {
            router.delete(route('users.destroy', user.id), {
                onSuccess: () => {
                    resolve(true);
                    if (!isCurrentUser) {
                        router.visit('/usuarios');
                    }
                },
                onError: (errors) => {
                    console.error('Error al eliminar usuario:', errors);
                    reject(new Error('Error al eliminar el usuario'));
                }
            });
        });
    };

    const handleEditUser = () => {
        setDropdownOpen(false);
        router.visit(route('users.edit', user.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Perfil de ${user.name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl p-4 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <Link href={route('users.index')} className="flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver a Usuarios
                        </Link>
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={shareProfile}
                            className="cursor-pointer inline-flex items-center px-2 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4" />
                                </>
                            ) : (
                                <>
                                    <Share2 className="h-4 w-4" />
                                </>
                            )}
                        </button>
                        
                        {/* Dropdown Menu */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="cursor-pointer inline-flex items-center px-2 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                <MoreVertical className="h-4 w-4" />
                            </button>
                            
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                                    <div className="py-1">
                                        <button
                                            onClick={handleEditUser}
                                            className="w-full cursor-pointer text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center transition-colors"
                                        >
                                            <Edit className="h-4 w-4 mr-3 text-blue-500" />
                                            Editar Usuario
                                        </button>
                                        
                                        <button
                                            onClick={() => copyToClipboard(`${window.location.origin}/usuarios/${user.id}`)}
                                            className="w-full cursor-pointer text-left px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center transition-colors"
                                        >
                                            { copied ? (
                                                <Check className="h-4 w-4 mr-3 text-gray-500" />
                                            ) : (
                                                <Copy className="h-4 w-4 mr-3 text-gray-500" />
                                            )}
                                            Copiar Enlace del Perfil
                                        </button>
                                        
                                        <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                                        
                                        <button
                                            onClick={handleDeleteAccount}
                                            className="w-full cursor-pointer text-left px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4 mr-3 shrink-0" />
                                            Eliminar Cuenta
                                        </button>
                                    </div>
                                </div>
                            )}
                            
                            {/* Overlay para cerrar dropdown al hacer clic fuera */}
                            {dropdownOpen && (
                                <div 
                                    className="fixed inset-0 z-5"
                                    onClick={() => setDropdownOpen(false)}
                                ></div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-900 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-8">
                    <div className="flex flex-col sm:flex-row items-center sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <div className="flex-shrink-0">
                            <div className="h-32 w-32 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                                <span className="text-6xl font-bold text-white">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        </div>
                        
                        <div className="flex-1 text-center sm:text-left">
                            <div className="space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                                            {user.name}
                                        </h2>
                                        
                                        {user.roles && user.roles.length > 0 && (
                                            <div className="flex justify-center sm:justify-start">
                                                <span className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full ${getRoleBadgeColor(user.roles[0].name)}`}>
                                                    <ShieldCheck className="h-4 w-4 mr-1" />
                                                    {user.roles[0].name}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-lg">
                                    Miembro desde {new Date(user.created_at).toLocaleDateString('es-ES', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-blue-500" />
                            Información de Contacto
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Correo Electrónico
                                </label>
                                <p className="text-gray-900 dark:text-gray-100 mt-1">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                            <Calendar className="h-5 w-5 mr-2 text-green-500" />
                            Información de Cuenta
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Fecha de Registro
                                </label>
                                <p className="text-gray-900 dark:text-gray-100 mt-1">
                                    {new Date(user.created_at).toLocaleDateString('es-ES', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            {user.updated_at && (
                                <div>
                                    <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                        Última Actualización
                                    </label>
                                    <p className="text-gray-900 dark:text-gray-100 mt-1">
                                        {new Date(user.updated_at).toLocaleDateString('es-ES', { 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                            <Globe className="h-5 w-5 mr-2 text-indigo-500" />
                            Sesiones Activas y Recientes
                        </h3>
                        <div className="space-y-4">
                            {sessions.length > 0 ? (
                                <div className="space-y-3">
                                    {sessions.slice(0, 5).map((session) => (
                                        <div key={session.id} className={`p-3 rounded-lg border ${
                                            session.is_active 
                                                ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                                                : 'bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                                        }`}>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`p-2 rounded-full ${
                                                        session.is_active 
                                                            ? 'bg-green-100 text-green-600 dark:bg-green-800 dark:text-green-300' 
                                                            : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                                                    }`}>
                                                        {getDeviceIcon(session.operating_system)}
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                                                {session.browser} en {session.operating_system}
                                                            </p>
                                                            {session.is_active && (
                                                                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                                                                    Activa
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                                        <Clock className="h-3 w-3 mr-1" />
                                                        {formatLastActivity(session.last_activity)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {sessions.length > 5 && (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                                            Y {sessions.length - 5} sesión{sessions.length - 5 > 1 ? 'es' : ''} más...
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 italic">
                                    No hay sesiones recientes
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Roles & Permissions */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl border border-sidebar-border/70 dark:border-sidebar-border p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                            <ShieldCheck className="h-5 w-5 mr-2 text-purple-500" />
                            Roles y Permisos
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Roles Asignados
                                </label>
                                <div className="mt-2 flex flex-wrap gap-2">
                                    {user.roles && user.roles.length > 0 ? (
                                        user.roles.map((role, index) => (
                                            <span
                                                key={index}
                                                className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getRoleBadgeColor(role.name)}`}
                                            >
                                                <ShieldCheck className="h-4 w-4 mr-1" />
                                                {role.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-gray-500 dark:text-gray-400 italic">
                                            No tiene roles asignados
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <DeleteUserDialog
                user={user}
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
                isCurrentUser={isCurrentUser}
            />
        </AppLayout>
    );
}
