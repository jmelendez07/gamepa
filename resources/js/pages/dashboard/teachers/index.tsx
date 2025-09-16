import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, PageProps, User } from "@/types";
import { Head, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { 
    Search, 
    Edit, 
    Trash2, 
    Users, 
    Mail, 
    Calendar,
    GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import CreateTeacherModal from "@/components/dashboard/teachers/create-teacher-modal";
import EditTeacherModal from "@/components/dashboard/teachers/edit-teacher-modal";
import DeleteTeacherModal from "@/components/dashboard/teachers/delete-teacher-modal";

interface ITeachersIndexProps {
    teachers: User[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Panel de Control',
        href: route('dashboard'),
    },
    {
        title: 'Docentes',
        href: route('teachers.index'),
    },
];

export default function TeachersIndex({ teachers }: ITeachersIndexProps) {
    const { flash } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
    const [editingTeacher, setEditingTeacher] = useState<User | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    
    // Estados para modal de eliminación
    const [deletingTeachers, setDeletingTeachers] = useState<User | User[] | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Función para filtrar docentes
    const filteredTeachers = teachers.filter(teacher =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Función para obtener iniciales del nombre
    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    // Función para manejar selección de docentes
    const toggleTeacherSelection = (teacherId: number) => {
        setSelectedTeachers(prev =>
            prev.includes(teacherId)
                ? prev.filter(id => id !== teacherId)
                : [...prev, teacherId]
        );
    };

    // Función para seleccionar todos
    const toggleSelectAll = () => {
        setSelectedTeachers(
            selectedTeachers.length === filteredTeachers.length
                ? []
                : filteredTeachers.map(teacher => teacher.id)
        );
    };

    // Función para abrir modal de edición
    const handleEditTeacher = (teacher: User) => {
        setEditingTeacher(teacher);
        setIsEditModalOpen(true);
    };

    // Función para eliminar un solo docente
    const handleDeleteTeacher = (teacher: User) => {
        setDeletingTeachers(teacher);
        setIsDeleteModalOpen(true);
    };

    // Función para eliminar múltiples docentes
    const handleDeleteSelectedTeachers = () => {
        const teachersToDelete = teachers.filter(teacher => 
            selectedTeachers.includes(teacher.id)
        );
        setDeletingTeachers(teachersToDelete);
        setIsDeleteModalOpen(true);
    };

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }

        if (flash?.error) {
            toast.error(flash.error);
        }
    }, [flash]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Docentes" />
            
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
                <div className="p-6">
                    {/* Header reorganizado */}
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            {/* Título y descripción */}
                            <div className="flex items-center">
                                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-xl mr-4">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">Docentes</h1>
                                    <p className="text-gray-600 mt-1">Gestiona los usuarios del sistema</p>
                                </div>
                            </div>

                            {/* Buscador y botón agregar */}
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Buscar docentes..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10 w-80 border-purple-200 focus:border-purple-400 focus:ring-purple-400/20 rounded-xl"
                                    />
                                </div>
                                <CreateTeacherModal />
                            </div>
                        </div>
                    </div>

                    {/* Barra de acciones solo si hay elementos seleccionados */}
                    {selectedTeachers.length > 0 && (
                        <div className="bg-white rounded-2xl shadow-sm border border-purple-100 p-4 mb-6">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">
                                    {selectedTeachers.length} seleccionados
                                </span>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={handleDeleteSelectedTeachers}
                                    className="cursor-pointer border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl"
                                >
                                    <Trash2 className="w-4 h-4 mr-0.5" />
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Tabla de docentes */}
                    <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
                        {/* Header de la tabla */}
                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 px-6 py-4 border-b border-purple-200">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={selectedTeachers.length === filteredTeachers.length && filteredTeachers.length > 0}
                                    onChange={toggleSelectAll}
                                    className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500 mr-4"
                                />
                                <div className="grid grid-cols-12 gap-4 flex-1 items-center">
                                    <div className="col-span-3">
                                        <span className="text-sm font-semibold text-purple-900 uppercase tracking-wide">Usuario</span>
                                    </div>
                                    <div className="col-span-3">
                                        <span className="text-sm font-semibold text-purple-900 uppercase tracking-wide">Email</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-sm font-semibold text-purple-900 uppercase tracking-wide">Rol</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-sm font-semibold text-purple-900 uppercase tracking-wide">Fecha de Registro</span>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-sm font-semibold text-purple-900 uppercase tracking-wide">Acciones</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cuerpo de la tabla */}
                        <div className="divide-y divide-purple-100">
                            {filteredTeachers.length === 0 ? (
                                <div className="px-6 py-12 text-center">
                                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay docentes</h3>
                                    <p className="text-gray-500">
                                        {searchTerm ? 'No se encontraron docentes con ese criterio de búsqueda.' : 'Comienza agregando tu primer docente.'}
                                    </p>
                                </div>
                            ) : (
                                filteredTeachers.map((teacher, index) => (
                                    <div
                                        key={teacher.id}
                                        className="px-6 py-4 hover:bg-purple-50/50 transition-colors duration-200"
                                    >
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={selectedTeachers.includes(teacher.id)}
                                                onChange={() => toggleTeacherSelection(teacher.id)}
                                                className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500 mr-4"
                                            />
                                            <div className="grid grid-cols-12 gap-4 flex-1 items-center">
                                                {/* Usuario */}
                                                <div className="col-span-3">
                                                    <div className="flex items-center">
                                                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 text-white font-semibold rounded-full mr-3 shadow-lg">
                                                            {getInitials(teacher.name)}
                                                        </div>
                                                        <div>
                                                            <div className="font-semibold text-gray-900">{teacher.name}</div>
                                                            <div className="text-sm text-gray-500">ID: {teacher.id}</div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Email */}
                                                <div className="col-span-3">
                                                    <div className="flex items-center text-gray-600">
                                                        <Mail className="w-4 h-4 mr-2 text-purple-500" />
                                                        <span className="text-sm">{teacher.email}</span>
                                                    </div>
                                                </div>

                                                {/* Rol */}
                                                <div className="col-span-2">
                                                    <Badge className="bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200 rounded-full">
                                                        <GraduationCap className="size-3 mr-1" />
                                                        Docente
                                                    </Badge>
                                                </div>

                                                {/* Fecha de Registro */}
                                                <div className="col-span-2">
                                                    <div className="flex items-center text-gray-600">
                                                        <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                                                        <span className="text-sm">
                                                            {teacher.created_at ? new Date(teacher.created_at).toLocaleDateString() : '15/9/2025'}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Acciones */}
                                                <div className="col-span-2">
                                                    <div className="flex items-center gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleEditTeacher(teacher)}
                                                            className="cursor-pointer border-purple-200 text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg h-8 w-8 p-0"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleDeleteTeacher(teacher)}
                                                            className="cursor-pointer border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg h-8 w-8 p-0"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Footer con estadísticas simplificado */}
                    <div className="mt-6 px-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <div className="text-sm text-gray-600">
                                    Mostrando <span className="font-semibold text-purple-600">{filteredTeachers.length}</span> de <span className="font-semibold">{teachers.length}</span> docentes
                                </div>
                                {selectedTeachers.length > 0 && (
                                    <div className="text-sm text-purple-600 font-medium">
                                        {selectedTeachers.length} seleccionados
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal de edición - Fuera del loop */}
                {editingTeacher && (
                    <EditTeacherModal 
                        teacher={editingTeacher}
                        open={isEditModalOpen}
                        onOpenChange={setIsEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setEditingTeacher(null);
                        }}
                    />
                )}

                {/* Modal de eliminación */}
                {deletingTeachers && (
                    <DeleteTeacherModal 
                        teachers={deletingTeachers}
                        open={isDeleteModalOpen}
                        onOpenChange={setIsDeleteModalOpen}
                        onClose={() => {
                            setIsDeleteModalOpen(false);
                            setDeletingTeachers(null);
                            // Limpiar selección si se eliminaron múltiples
                            if (Array.isArray(deletingTeachers)) {
                                setSelectedTeachers([]);
                            }
                        }}
                    />
                )}
            </div>
        </AppLayout>
    );
}