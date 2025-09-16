import { motion, AnimatePresence } from 'motion/react';
import { usePage, router } from '@inertiajs/react';
import { ReactNode, useState, useEffect } from 'react';

interface EpicPageTransitionProps {
    children: ReactNode;
}

export default function EpicPageTransition({ children }: EpicPageTransitionProps) {
    const { url } = usePage();
    const [transitioning, setTransitioning] = useState(false);

    useEffect(() => {
        const handleStart = () => setTransitioning(true);
        const handleFinish = () => setTransitioning(false);

        const offStart = router.on('start', handleStart);
        const offFinish = router.on('finish', handleFinish);

        return () => {
            offStart();
            offFinish();
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800">
            {/* Barra de progreso simple */}
            {transitioning && (
                <div className="fixed top-0 left-0 right-0 z-50 h-1">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                </div>
            )}

            <AnimatePresence mode="wait">
                <motion.div
                    key={url}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 1,
                        ease: "easeInOut"
                    }}
                    className="w-full min-h-screen"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                    }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}