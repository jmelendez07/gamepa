import { Button } from "@/components/ui/button";
import Room from "@/types/room";
import { Copy, Download } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { motion } from "motion/react";
import QRCode from "react-qr-code";

interface IQrRoomModalProps {
    room: Room,
    showQRModal: boolean;
    studentAccessUrl: string;
    setShowQRModal: (show: boolean) => void;
    copyUrl: () => void;
    downloadQR: () => void;
    copiedUrl: boolean;
}

export default function QrRoomModal({ room, showQRModal, studentAccessUrl, setShowQRModal, copyUrl, downloadQR, copiedUrl }: IQrRoomModalProps) {
    return (
        <AnimatePresence>
            {showQRModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowQRModal(false)}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="bg-white/10 backdrop-blur-md border border-purple-500/50 rounded-3xl p-8 max-w-lg w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Código QR - {room.name}
                            </h2>
                            <p className="text-purple-200 mb-6">PIN: {room.pin}</p>
                            
                            <div className="bg-white rounded-2xl p-8 mb-6 inline-block">
                                <QRCode
                                    value={studentAccessUrl}
                                    size={350}
                                    level="H"
                                />
                            </div>
                            
                            <p className="text-purple-200 text-sm mb-6">
                                Los estudiantes pueden escanear este código para acceder directamente a la sala
                            </p>
                            
                            <div className="flex justify-center space-x-4">
                                <Button
                                    onClick={copyUrl}
                                    className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                                >
                                    <Copy className="w-4 h-4 mr-0.5" />
                                    {copiedUrl ? 'URL Copiada!' : 'Copiar URL'}
                                </Button>
                                <Button
                                    onClick={downloadQR}
                                    variant="outline"
                                    className="cursor-pointer !border-indigo-400/50 !text-indigo-200 bg-black/30 hover:bg-black/50 hover:border-indigo-400 rounded-xl"
                                >
                                    <Download className="w-4 h-4 mr-0.5" />
                                    Descargar QR
                                </Button>
                                <Button
                                    onClick={() => setShowQRModal(false)}
                                    variant="ghost"
                                    className="cursor-pointer text-purple-300 !bg-transparent hover:text-white rounded-xl"
                                >
                                    Cerrar
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}