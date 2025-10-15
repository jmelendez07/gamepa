import { useState, useCallback, useRef } from 'react';
import { extend, useTick } from '@pixi/react';
import { Container, Sprite, Graphics, Text, TextStyle, Assets, Texture } from 'pixi.js';
import { router } from '@inertiajs/react';

extend({ Container, Sprite, Graphics, Text });

const configImage = "https://res.cloudinary.com/dvibz13t8/image/upload/v1758740375/config_yzleae.webp";

export default function ConfigUI() {
    const [showModal, setShowModal] = useState(false);
    const [configTexture, setConfigTexture] = useState<Texture | null>(null);
    const [animationProgress, setAnimationProgress] = useState(0);
    const [hoverMenu, setHoverMenu] = useState(false);
    const [hoverLogout, setHoverLogout] = useState(false);
    const [arrowProgressMenu, setArrowProgressMenu] = useState(0);
    const [arrowProgressLogout, setArrowProgressLogout] = useState(0);
    const [bgProgressMenu, setBgProgressMenu] = useState(0);
    const [bgProgressLogout, setBgProgressLogout] = useState(0);
    const modalRef = useRef<any>(null);
    const backgroundRef = useRef<any>(null);

    useState(() => {
        Assets.load(configImage).then(setConfigTexture);
    });

    useTick((ticker) => {
        if (showModal && animationProgress < 1) {
            setAnimationProgress(prev => Math.min(prev + ticker.deltaTime * 0.08, 1));
        } else if (!showModal && animationProgress > 0) {
            setAnimationProgress(prev => Math.max(prev - ticker.deltaTime * 0.1, 0));
        }

        if (modalRef.current) {
            const easeProgress = 1 - Math.pow(1 - animationProgress, 3);
            const startY = -200;
            const endY = window.innerHeight / 2;
            modalRef.current.y = startY + (endY - startY) * easeProgress;
            modalRef.current.alpha = animationProgress;
        }

        if (backgroundRef.current) {
            backgroundRef.current.alpha = animationProgress * 0.7;
        }

        // Animación de flecha para "Volver al menu"
        if (hoverMenu && arrowProgressMenu < 1) {
            setArrowProgressMenu(prev => Math.min(prev + ticker.deltaTime * 0.15, 1));
        } else if (!hoverMenu && arrowProgressMenu > 0) {
            setArrowProgressMenu(prev => Math.max(prev - ticker.deltaTime * 0.15, 0));
        }

        // Animación de flecha para "Cerrar sesión"
        if (hoverLogout && arrowProgressLogout < 1) {
            setArrowProgressLogout(prev => Math.min(prev + ticker.deltaTime * 0.15, 1));
        } else if (!hoverLogout && arrowProgressLogout > 0) {
            setArrowProgressLogout(prev => Math.max(prev - ticker.deltaTime * 0.15, 0));
        }

        // Animación de fondo para "Volver al menu"
        if (hoverMenu && bgProgressMenu < 1) {
            setBgProgressMenu(prev => Math.min(prev + ticker.deltaTime * 0.12, 1));
        } else if (!hoverMenu && bgProgressMenu > 0) {
            setBgProgressMenu(prev => Math.max(prev - ticker.deltaTime * 0.12, 0));
        }

        // Animación de fondo para "Cerrar sesión"
        if (hoverLogout && bgProgressLogout < 1) {
            setBgProgressLogout(prev => Math.min(prev + ticker.deltaTime * 0.12, 1));
        } else if (!hoverLogout && bgProgressLogout > 0) {
            setBgProgressLogout(prev => Math.max(prev - ticker.deltaTime * 0.12, 0));
        }
    });

    const handleConfigClick = useCallback(() => {
        setShowModal(prev => !prev);
    }, []);

    const handleCloseModal = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleModalBackgroundClick = useCallback(() => {
        setShowModal(false);
    }, []);

    const handleModalContentClick = useCallback((event: any) => {
        event.stopPropagation();
    }, []);

    const handleReturnToMenu = useCallback(() => {
        router.visit(route('gameplay.index'));
    }, []);

    const handleLogout = useCallback(() => {
        router.visit(route('logout'), { method: 'post' });
    }, []);

    const titleStyle = new TextStyle({
        fontFamily: 'Jersey 10, Arial, sans-serif',
        fontSize: 80,
        fontWeight: '500',
        fill: '#ffffff',
        align: 'center'
    });

    const menuItemStyle = new TextStyle({
        fontFamily: 'Jersey 10, Arial, sans-serif',
        fontSize: 70,
        fill: '#ffffff',
        align: 'center'
    });

    const closeButtonStyle = new TextStyle({
        fontFamily: 'Jersey 10, Arial, sans-serif',
        fontSize: 100,
        fontWeight: '100',
        fill: '#ffffff',
        align: 'center'
    });

    const arrowStyle = new TextStyle({
        fontFamily: 'Jersey 10, Arial, sans-serif',
        fontSize: 60,
        fill: '#8b5cf6',
        align: 'center'
    });

    return (
        <pixiContainer zIndex={1000}>
            {configTexture && (
                <pixiContainer
                    x={window.innerWidth - 80}
                    y={20}
                    interactive
                    cursor="pointer"
                    onClick={handleConfigClick}
                    zIndex={1000}
                >   
                    <pixiSprite
                        texture={configTexture}
                        anchor={0.5}
                        x={30}
                        y={30}
                        width={49.6}
                        height={54.4}
                        tint={0xffffff}
                    />
                </pixiContainer>
            )}

            {(showModal || animationProgress > 0) && (
                <pixiContainer>
                    <pixiGraphics
                        ref={backgroundRef}
                        draw={(g) => {
                            g.clear();
                            g.beginFill(0x000000, 1);
                            g.drawRect(0, 0, window.innerWidth, window.innerHeight);
                            g.endFill();
                        }}
                        interactive={true}
                        onClick={handleModalBackgroundClick}
                    />

                    <pixiContainer
                        ref={modalRef}
                        x={window.innerWidth / 2}
                        interactive
                        onClick={handleModalContentClick}
                    >
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                g.beginFill(0x2d1b69, 1);
                                g.lineStyle(3, 0x8b5cf6, 1);
                                g.drawRoundedRect(-350, -175, 700, 350, 10);
                                g.endFill();
                            }}
                        />

                        <pixiText
                            text="Configuración"
                            style={titleStyle}
                            anchor={0.5}
                            x={-135}
                            y={-130}
                            resolution={3}
                        />

                        <pixiContainer y={-70}>
                            <pixiContainer
                                y={50}
                                interactive
                                cursor="pointer"
                                onPointerDown={handleReturnToMenu}
                                onPointerOver={() => setHoverMenu(true)}
                                onPointerOut={() => setHoverMenu(false)}
                            >
                                <pixiGraphics
                                    draw={(g) => {
                                        g.clear();
                                        const alpha = 0.3 + (bgProgressMenu * 0.3);
                                        g.beginFill(0x8b5cf6, alpha);
                                        g.drawRoundedRect(-330, -25, 660, 70, 5);
                                        g.endFill();
                                    }}
                                />
                                <pixiText
                                    text="Volver al menu"
                                    style={menuItemStyle}
                                    anchor={0.5}
                                    x={0}
                                    y={5}
                                    resolution={2}
                                />
                                <pixiText
                                    text="→"
                                    style={arrowStyle}
                                    anchor={0.5}
                                    x={-280 + (arrowProgressMenu * 20)}
                                    y={5}
                                    alpha={arrowProgressMenu}
                                    resolution={2}
                                />
                            </pixiContainer>
                            <pixiContainer
                                y={140}
                                interactive
                                cursor="pointer"
                                onPointerDown={handleLogout}
                                onPointerOver={() => setHoverLogout(true)}
                                onPointerOut={() => setHoverLogout(false)}
                            >
                                <pixiGraphics
                                    draw={(g) => {
                                        g.clear();
                                        const alpha = 0.3 + (bgProgressLogout * 0.3);
                                        g.beginFill(0x8b5cf6, alpha);
                                        g.drawRoundedRect(-330, -25, 660, 70, 5);
                                        g.endFill();
                                    }}
                                />
                                <pixiText
                                    text="Cerrar sesión"
                                    style={menuItemStyle}
                                    anchor={0.5}
                                    x={0}
                                    y={5}
                                    resolution={2}
                                />
                                <pixiText
                                    text="→"
                                    style={arrowStyle}
                                    anchor={0.5}
                                    x={-280 + (arrowProgressLogout * 20)}
                                    y={5}
                                    alpha={arrowProgressLogout}
                                    resolution={2}
                                />
                            </pixiContainer>
                        </pixiContainer>

                        <pixiContainer
                            x={315}
                            y={-140}
                            interactive={true}
                            cursor="pointer"
                            onPointerDown={handleCloseModal}
                        >
                            <pixiText
                                text="x"
                                style={closeButtonStyle}
                                anchor={0.5}
                                x={0}
                                y={0}
                                resolution={3}
                            />
                        </pixiContainer>
                    </pixiContainer>
                </pixiContainer>
            )}
        </pixiContainer>
    );
}