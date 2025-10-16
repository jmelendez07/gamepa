import { useCallback, useEffect, useState } from 'react';

interface UseFullscreenReturn {
    isFullscreen: boolean;
    toggleFullscreen: () => Promise<void>;
    enterFullscreen: () => Promise<void>;
    exitFullscreen: () => Promise<void>;
    isSupported: boolean;
    canvasSize: { width: number; height: number };
}

export const useFullscreen = (element?: HTMLElement | null): UseFullscreenReturn => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [canvasSize, setCanvasSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    // Verificar si el navegador soporta Fullscreen API
    const isSupported = !!(
        document.fullscreenEnabled ||
        (document as any).webkitFullscreenEnabled ||
        (document as any).mozFullScreenEnabled ||
        (document as any).msFullscreenEnabled
    );

    // Función para calcular el tamaño del canvas
    const updateCanvasSize = useCallback(() => {
        setCanvasSize({
            width: window.innerWidth,
            height: window.innerHeight,
        });
    }, []);

    // Función para verificar el estado actual de fullscreen
    const checkFullscreenStatus = useCallback(() => {
        const fullscreenElement =
            document.fullscreenElement ||
            (document as any).webkitFullscreenElement ||
            (document as any).mozFullScreenElement ||
            (document as any).msFullscreenElement;

        setIsFullscreen(!!fullscreenElement);
        updateCanvasSize();
    }, [updateCanvasSize]);

    // Función para entrar en modo fullscreen
    const enterFullscreen = useCallback(async () => {
        if (!isSupported) {
            console.warn('Fullscreen API no está soportada en este navegador');
            return;
        }

        try {
            const targetElement = element || document.documentElement;

            if (targetElement.requestFullscreen) {
                await targetElement.requestFullscreen();
            } else if ((targetElement as any).webkitRequestFullscreen) {
                await (targetElement as any).webkitRequestFullscreen();
            } else if ((targetElement as any).mozRequestFullScreen) {
                await (targetElement as any).mozRequestFullScreen();
            } else if ((targetElement as any).msRequestFullscreen) {
                await (targetElement as any).msRequestFullscreen();
            }

            // Para dispositivos móviles, intentar bloquear la orientación
            if (screen.orientation && screen.orientation.lock) {
                try {
                    await screen.orientation.lock('landscape').catch(() => {
                        // Ignorar errores de orientación en algunos dispositivos
                    });
                } catch (error) {
                    // Ignorar errores de orientación
                }
            }
        } catch (error) {
            console.error('Error al entrar en modo fullscreen:', error);
        }
    }, [element, isSupported]);

    // Función para salir del modo fullscreen
    const exitFullscreen = useCallback(async () => {
        if (!isSupported) {
            return;
        }

        try {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
            } else if ((document as any).webkitExitFullscreen) {
                await (document as any).webkitExitFullscreen();
            } else if ((document as any).mozCancelFullScreen) {
                await (document as any).mozCancelFullScreen();
            } else if ((document as any).msExitFullscreen) {
                await (document as any).msExitFullscreen();
            }

            // Desbloquear orientación al salir
            if (screen.orientation && screen.orientation.unlock) {
                try {
                    screen.orientation.unlock();
                } catch (error) {
                    // Ignorar errores
                }
            }
        } catch (error) {
            console.error('Error al salir del modo fullscreen:', error);
        }
    }, [isSupported]);

    // Función para alternar entre fullscreen y normal
    const toggleFullscreen = useCallback(async () => {
        if (isFullscreen) {
            await exitFullscreen();
        } else {
            await enterFullscreen();
        }
    }, [isFullscreen, enterFullscreen, exitFullscreen]);

    // Escuchar cambios en el estado de fullscreen y resize
    useEffect(() => {
        const handleFullscreenChange = () => {
            checkFullscreenStatus();
        };

        const handleResize = () => {
            updateCanvasSize();
        };

        // Agregar listeners para diferentes navegadores
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('MSFullscreenChange', handleFullscreenChange);

        // Agregar listener para resize
        window.addEventListener('resize', handleResize);

        // Verificar estado inicial
        checkFullscreenStatus();

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
            document.removeEventListener('MSFullscreenChange', handleFullscreenChange);
            window.removeEventListener('resize', handleResize);
        };
    }, [checkFullscreenStatus, updateCanvasSize]);

    return {
        isFullscreen,
        toggleFullscreen,
        enterFullscreen,
        exitFullscreen,
        isSupported,
        canvasSize,
    };
};
