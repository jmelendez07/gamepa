import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, ExternalLink, User } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: '/dashboard',
    },
    {
        title: 'Usuarios',
        href: '/usuarios',
    },
];

interface User {
    id: string;
    name: string;
    email: string;
    roles?: Array<{
        name: string;
    }>;
    created_at: string;
}

interface Props {
    users: {
        data: User[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        next_page_url?: string;
    };
    auth: {
        user: User;
    };
}

export default function UsersIndex({ users: initialUsers, auth }: Props) {
    const [users, setUsers] = useState(initialUsers.data);
    const [hasMorePages, setHasMorePages] = useState(initialUsers.current_page < initialUsers.last_page);
    const [isLoading, setIsLoading] = useState(false);
    const [shouldObserve, setShouldObserve] = useState(false);
    const loadTriggerRef = useRef<HTMLDivElement>(null);

    const loadMoreUsers = () => {
        if (isLoading || !hasMorePages || !shouldObserve) return;

        setIsLoading(true);
        
        const nextPage = initialUsers.current_page + 1;
        
        router.visit(`/usuarios?page=${nextPage}`, {
            preserveState: true,
            preserveScroll: true,
            only: ['users'],
            onSuccess: (page) => {
                const newUsers = page.props.users as typeof initialUsers;
                setUsers(prevUsers => [...prevUsers, ...newUsers.data]);
                setHasMorePages(newUsers.current_page < newUsers.last_page);
                setIsLoading(false);
            },
            onError: () => {
                setIsLoading(false);
            }
        });
    };

    useEffect(() => {
        if (!shouldObserve) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMorePages && !isLoading && shouldObserve) {
                    loadMoreUsers();
                }
            },
            { threshold: 0.1 }
        );

        if (loadTriggerRef.current) {
            observer.observe(loadTriggerRef.current);
        }

        return () => observer.disconnect();
    }, [hasMorePages, isLoading, shouldObserve]);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const currentPageFromUrl = parseInt(urlParams.get('page') || '1');
        
        if (currentPageFromUrl > 1) {
            router.visit('/usuarios', { replace: true });
            return;
        }
        
        setShouldObserve(true);
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4 overflow-x-auto">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                            Usuarios
                        </h1>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Gestiona los usuarios del sistema
                        </p>
                    </div>
                    <Link href={route('users.create')}>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Nuevo Usuario
                        </Button>
                    </Link>
                </div>

                <div className="relative overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-800">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Usuario
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Rol
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Fecha de Registro
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                {users.length > 0 ? (
                                    users.map((user: User) => {
                                        const isCurrentUser = auth.user.id === user.id;
                                        return (
                                            <tr 
                                                key={user.id} 
                                                className={`hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                                    isCurrentUser ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' : ''
                                                }`}
                                            >
                                                <td className="px-6 py-4 whitespace-nowrap group">
                                                    <div className="flex items-center">
                                                        <Link 
                                                            href={route('users.show', user.id)}
                                                            className="flex items-center hover:opacity-80 transition-opacity"
                                                        >
                                                            <div className="flex-shrink-0 h-10 w-10 relative">
                                                                <div className={`h-10 w-10 rounded-full flex items-center border border-transparent justify-center group-hover:border-gray-400 dark:group-hover:border-gray-500 transition-colors ${
                                                                    isCurrentUser 
                                                                        ? 'bg-blue-500 text-white' 
                                                                        : 'bg-gray-300 dark:bg-gray-600'
                                                                }`}>
                                                                    <span className={`text-sm font-medium ${
                                                                        isCurrentUser 
                                                                            ? 'text-white' 
                                                                            : 'text-gray-700 dark:text-gray-300'
                                                                    }`}>
                                                                        {user.name.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                {isCurrentUser && (
                                                                    <div className="absolute -top-1 -right-1 bg-green-400 rounded-full p-1">
                                                                        <User className="h-3 w-3 text-green-800" />
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="ml-2">
                                                                <div className={`text-sm inline-flex items-center gap-1 font-medium transition-colors ${
                                                                    isCurrentUser 
                                                                        ? 'text-blue-700 dark:text-blue-300' 
                                                                        : 'text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                                                }`}>
                                                                    {user.name}
                                                                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                                    {isCurrentUser && (
                                                                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded-full">
                                                                            <User className="h-3 w-3 mr-1" />
                                                                            Tú
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {user.email}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                                        {user.roles?.[0]?.name || 'Sin rol'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(user.created_at).toLocaleDateString('es-ES')}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                    <div className="flex justify-end space-x-2">
                                                        <Link
                                                            href={route('users.edit', user.id)}
                                                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
                                                                    // Aquí puedes implementar la lógica de eliminación
                                                                    // router.delete(route('users.destroy', user.id))
                                                                }
                                                            }}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                        >
                                                            Eliminar
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center">
                                            <div className="flex flex-col items-center justify-center py-8">
                                                <PlaceholderPattern className="h-32 w-32 stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                                                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                                                    No hay usuarios registrados
                                                </p>
                                                <Link href={route('users.create')} className="mt-2">
                                                    <Button variant="outline" size="sm">
                                                        <Plus className="h-4 w-4 mr-2" />
                                                        Crear primer usuario
                                                    </Button>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    {(hasMorePages && !isLoading && shouldObserve) && (
                        <div 
                            ref={loadTriggerRef}
                            className="h-10 flex items-center justify-center"
                        >
                            <div className="text-xs text-gray-400">Desplázate para cargar más...</div>
                        </div>
                    )}
                </div>

                {users.length > 0 && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                            Mostrando {users.length} de {initialUsers.total} usuarios
                        </div>
                        
                        {isLoading && (
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Cargando más usuarios...</span>
                            </div>
                        )}
                        
                        {!hasMorePages && users.length > 0 && (
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                Todos los usuarios han sido cargados
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
