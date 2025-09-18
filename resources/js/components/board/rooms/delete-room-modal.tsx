import { AnimatePresence } from "motion/react";
import { motion } from "framer-motion";
import { AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Room from "@/types/room";
import { router } from "@inertiajs/react";

interface IDeleteRoomModalProps {
    showDeleteModal: boolean;
    setShowDeleteModal: (show: boolean) => void;
    room: Room;
}

export default function DeleteRoomModal({ showDeleteModal, setShowDeleteModal, room }: IDeleteRoomModalProps) {

    const handleDeleteRoom = () => {
        router.delete(route('rooms.destroy', room.id));
    };

    return (
        <AnimatePresence>
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-purple-800 border border-purple-500/50 rounded-2xl p-6 max-w-md w-full"
                    >
                        <div className="text-center">
                            <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">Eliminar Sala</h3>
                            <p className="text-gray-300 mb-6">
                                ¿Estás seguro de que quieres eliminar "<strong>{room.name}</strong>"? 
                                Esta acción no se puede deshacer.
                            </p>
                            <div className="flex space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteModal(false)}
                                    className="cursor-pointer flex-1 !border-purple-300/20 text-gray-300 hover:bg-gray-800"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    onClick={() => {
                                        handleDeleteRoom();
                                        setShowDeleteModal(false);
                                    }}
                                    className="cursor-pointer flex-1 bg-red-600 hover:bg-red-700 text-white"
                                >
                                    <Trash2 className="w-4 h-4 mr-2" />
                                    Eliminar
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}