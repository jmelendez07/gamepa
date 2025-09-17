import { useEffect, useState } from 'react';

export const useResponsiveScale = () => {
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const screenScale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
            const minScale = 0.6;
            const maxScale = 1.0;
            setScale(Math.max(minScale, Math.min(maxScale, screenScale)));
        };

        updateScale();
        window.addEventListener('resize', updateScale);

        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return scale;
};
