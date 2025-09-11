import { extend } from '@pixi/react';
import { Assets, Container, Point, Sprite, Texture } from 'pixi.js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

extend({ Container, Sprite });

interface TricksProps {
    onClose?: () => void;
}

export const Tricks = ({onClose}: TricksProps) => {
    const assetBg = '/assets/ui/tricks-ui.png';
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const containerRef = useRef<Container>(null);

    useEffect(() => {
        let cancelled = false;
        Assets.load<Texture>(assetBg).then(() => {
            if (!cancelled) setBgTexture(Assets.get(assetBg));
        });
        return () => {
            cancelled = true;
        };
    }, []);

    useLayoutEffect(() => {
        const updateGlobalPosition = () => {
            const c = containerRef.current;
            if (!c || !c.parent) return;
            const globalX = 0;
            const globalY = window.innerHeight / 3;
            const local = c.parent.toLocal(new Point(globalX, globalY));
            c.position.copyFrom(local);
        };
        updateGlobalPosition();
        window.addEventListener('resize', updateGlobalPosition);
        return () => window.removeEventListener('resize', updateGlobalPosition);
    }, []);

    return (
        <pixiContainer ref={containerRef} zIndex={9999}>
            {bgTexture && (
                <pixiSprite
                    texture={bgTexture}
                    x={0}
                    y={window.innerHeight / 3 - 100}
                    width={window.innerWidth}
                    height={window.innerHeight / 3 + 100}
                />
            )}
            <pixiText
                text="X"
                cursor="pointer"
                interactive={true}
                onClick={onClose}
                x={window.innerWidth - 50}
                y={window.innerHeight / 3 - 90}
                zIndex={10000}
                style={{
                    fontSize: 32,
                    fill: 0xffffff,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                }}
            />
        </pixiContainer>
    );
};
