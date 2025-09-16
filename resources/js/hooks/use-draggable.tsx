import { useState, useRef, useCallback, useEffect } from 'react';

interface Position {
    x: number;
    y: number;
}

interface UseDraggableOptions {
    initialPosition?: Position;
    bounds?: {
        top?: number;
        left?: number;
        right?: number;
        bottom?: number;
    };
}

export function useDraggable({ initialPosition = { x: 0, y: 0 }, bounds }: UseDraggableOptions = {}) {
    const [position, setPosition] = useState<Position>(initialPosition);
    const [isDragging, setIsDragging] = useState(false);
    const dragRef = useRef<HTMLDivElement>(null);
    const offsetRef = useRef<Position>({ x: 0, y: 0 });

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!dragRef.current) return;

        setIsDragging(true);
        const rect = dragRef.current.getBoundingClientRect();
        
        // ✅ Calcular offset considerando el scroll actual
        offsetRef.current = {
            x: e.clientX - rect.left - rect.width / 2,
            y: e.clientY - rect.top - rect.height / 2
        };

        e.preventDefault();
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging || !dragRef.current) return;

        // ✅ Calcular nueva posición considerando el scroll
        const newX = e.clientX - offsetRef.current.x;
        const newY = e.clientY - offsetRef.current.y + window.scrollY; // Agregar scrollY

        let constrainedX = newX;
        let constrainedY = newY;

        if (bounds) {
            const elementRect = dragRef.current.getBoundingClientRect();
            const elementWidth = elementRect.width;
            const elementHeight = elementRect.height;

            if (bounds.left !== undefined) {
                constrainedX = Math.max(bounds.left + elementWidth / 2, constrainedX);
            }
            if (bounds.right !== undefined) {
                constrainedX = Math.min(bounds.right - elementWidth / 2, constrainedX);
            }
            if (bounds.top !== undefined) {
                constrainedY = Math.max(bounds.top + elementHeight / 2 + window.scrollY, constrainedY);
            }
            if (bounds.bottom !== undefined) {
                constrainedY = Math.min(bounds.bottom - elementHeight / 2 + window.scrollY, constrainedY);
            }
        }

        setPosition({ x: constrainedX, y: constrainedY });
    }, [isDragging, bounds]);

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // ✅ Event listeners para mouse
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = 'none';
            document.body.style.cursor = 'grabbing';
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);

    // ✅ Soporte para touch (móvil)
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (!dragRef.current) return;

        setIsDragging(true);
        const touch = e.touches[0];
        const rect = dragRef.current.getBoundingClientRect();
        
        offsetRef.current = {
            x: touch.clientX - rect.left - rect.width / 2,
            y: touch.clientY - rect.top - rect.height / 2
        };

        e.preventDefault();
    }, []);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        if (!isDragging || !dragRef.current) return;

        const touch = e.touches[0];
        const newX = touch.clientX - offsetRef.current.x;
        const newY = touch.clientY - offsetRef.current.y + window.scrollY; // Agregar scrollY

        let constrainedX = newX;
        let constrainedY = newY;

        if (bounds) {
            const elementRect = dragRef.current.getBoundingClientRect();
            const elementWidth = elementRect.width;
            const elementHeight = elementRect.height;

            if (bounds.left !== undefined) {
                constrainedX = Math.max(bounds.left + elementWidth / 2, constrainedX);
            }
            if (bounds.right !== undefined) {
                constrainedX = Math.min(bounds.right - elementWidth / 2, constrainedX);
            }
            if (bounds.top !== undefined) {
                constrainedY = Math.max(bounds.top + elementHeight / 2 + window.scrollY, constrainedY);
            }
            if (bounds.bottom !== undefined) {
                constrainedY = Math.min(bounds.bottom - elementHeight / 2 + window.scrollY, constrainedY);
            }
        }

        setPosition({ x: constrainedX, y: constrainedY });
        e.preventDefault();
    }, [isDragging, bounds]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // ✅ Event listeners para touch
    useEffect(() => {
        if (isDragging) {
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleTouchEnd);
        }

        return () => {
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isDragging, handleTouchMove, handleTouchEnd]);

    return {
        dragRef,
        position,
        isDragging,
        handleMouseDown,
        handleTouchStart,
        setPosition
    };
}