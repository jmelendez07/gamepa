import { useState } from "react";
import { useForm, router } from "@inertiajs/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2, LoaderCircle, Users, User } from "lucide-react";
import type { User as UserType } from "@/types";

interface DeleteTeacherModalProps {
    teachers: UserType | UserType[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onClose: () => void;
}

export default function DeleteTeacherModal({ teachers, open, onOpenChange, onClose }: DeleteTeacherModalProps) {
    const [processing, setProcessing] = useState(false);
    const isMultiple = Array.isArray(teachers);
    const teacherList = isMultiple ? teachers : [teachers];
    const teacherCount = teacherList.length;

    const { delete: deleteTeacher } = useForm();

    const handleDelete = () => {
        setProcessing(true);
        
        if (isMultiple) {
            const teacherIds = teacherList.map(teacher => teacher.id);
            router.post(route('teachers.bulk-destroy'), {
                teacher_ids: teacherIds,
            }, {
                onSuccess: () => {
                    handleClose();
                },
                onError: () => {
                    setProcessing(false);
                },
                onFinish: () => {
                    setProcessing(false);
                }
            });
        } else {
            deleteTeacher(route('teachers.destroy', teachers.id), {
                onSuccess: () => {
                    handleClose();
                },
                onError: () => {
                    setProcessing(false);
                },
                onFinish: () => {
                    setProcessing(false);
                }
            });
        }
    };

    const handleClose = () => {
        setProcessing(false);
        onClose();
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => isOpen ? onOpenChange(true) : handleClose()}>
            <DialogContent className="sm:max-w-md bg-white rounded-2xl border border-red-100 shadow-2xl">
                <DialogHeader className="space-y-4 pb-4">
                    <div className="flex items-center justify-center">
                        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl mr-3">
                            <AlertTriangle className="w-6 h-6 text-red-600" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-gray-900">
                            {isMultiple ? 'Eliminar Docentes' : 'Eliminar Docente'}
                        </DialogTitle>
                    </div>
                </DialogHeader>

                <div className="space-y-6">
                    {/* Advertencia */}
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                        <div className="flex items-start">
                            <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
                            <div>
                                <h3 className="text-sm font-semibold text-red-800 mb-1">
                                    ¡Advertencia! Esta acción no se puede deshacer
                                </h3>
                                <p className="text-sm text-red-700">
                                    {isMultiple 
                                        ? `Estás a punto de eliminar ${teacherCount} docente${teacherCount > 1 ? 's' : ''} permanentemente.`
                                        : `Estás a punto de eliminar el docente "${teachers.name}" permanentemente.`
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Lista de docentes a eliminar */}
                    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center mb-3">
                            {isMultiple ? (
                                <Users className="w-5 h-5 text-gray-600 mr-2" />
                            ) : (
                                <User className="w-5 h-5 text-gray-600 mr-2" />
                            )}
                            <h4 className="font-semibold text-gray-900">
                                {isMultiple ? `Docentes seleccionados (${teacherCount})` : 'Docente seleccionado'}
                            </h4>
                        </div>
                        
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {teacherList.map((teacher, index) => (
                                <div key={teacher.id} className="flex items-center p-2 bg-white rounded-lg border border-gray-100">
                                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 text-white text-sm font-semibold rounded-full mr-3">
                                        {teacher.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900 text-sm">{teacher.name}</div>
                                        <div className="text-xs text-gray-500">{teacher.email}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botones de acción */}
                    <div className="flex items-center justify-end gap-3 pt-4">
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
                            type="button"
                            onClick={handleDelete}
                            disabled={processing}
                            className="cursor-pointer bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                        >
                            {processing ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <LoaderCircle className="h-5 w-5 animate-spin" />
                                    <span>Eliminando...</span>
                                </div>
                            ) : (
                                <div className="flex items-center justify-center space-x-2">
                                    <span>{isMultiple ? `Eliminar ${teacherCount} Docentes` : 'Eliminar Docente'}</span>
                                </div>
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}