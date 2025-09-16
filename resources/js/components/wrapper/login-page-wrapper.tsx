import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { Crown, Sparkles, Shield } from 'lucide-react';

interface LoginPageWrapperProps {
    children: ReactNode;
}

export default function LoginPageWrapper({ children }: LoginPageWrapperProps) {
    return (
        <motion.div
            initial={{ 
                opacity: 0, 
                scale: 0.8,
                filter: "blur(10px)",
                rotateX: -20
            }}
            animate={{ 
                opacity: 1, 
                scale: 1,
                filter: "blur(0px)",
                rotateX: 0
            }}
            transition={{
                duration: 1.2,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }}
            className="min-h-screen"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Efectos de entrada mágicos */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-10"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 1, duration: 1 }}
            >
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute"
                        style={{
                            left: `${20 + i * 7}%`,
                            top: `${15 + i * 6}%`,
                        }}
                        initial={{ 
                            opacity: 0, 
                            scale: 0,
                            rotate: 0
                        }}
                        animate={{ 
                            opacity: [0, 1, 0], 
                            scale: [0, 1.5, 0],
                            rotate: 360
                        }}
                        transition={{
                            duration: 2,
                            delay: i * 0.1,
                            ease: "easeOut"
                        }}
                    >
                        {i % 3 === 0 ? (
                            <Crown className="w-8 h-8 text-purple-400" />
                        ) : i % 3 === 1 ? (
                            <Sparkles className="w-6 h-6 text-indigo-400" />
                        ) : (
                            <Shield className="w-7 h-7 text-pink-400" />
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {children}
        </motion.div>
    );
}