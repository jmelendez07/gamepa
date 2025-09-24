import { useState, useCallback } from 'react';
import { extend } from '@pixi/react';
import { Container, Sprite, Graphics, Text, TextStyle, Assets, Texture } from 'pixi.js';
import { router } from '@inertiajs/react';
import { Stage } from '@/types/planet';

extend({ Container, Sprite, Graphics, Text });

const configImage = "https://res.cloudinary.com/dvibz13t8/image/upload/v1758740375/config_yzleae.webp";

interface GameplayMenuProps {
    canvasSize: { width: number; height: number };
}

export default function GameplayMenu({ canvasSize }: GameplayMenuProps) {
    const [showModal, setShowModal] = useState(false);
    const [configTexture, setConfigTexture] = useState<Texture | null>(null);

    useState(() => {
        Assets.load(configImage).then(setConfigTexture);
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
        fontSize: 40,
        fontWeight: '500',
        fill: '#ffffff',
        align: 'center'
    });

    const menuItemStyle = new TextStyle({
        fontFamily: 'Jersey 10, Arial, sans-serif',
        fontSize: 35,
        fill: '#ffffff',
        align: 'center'
    });

    const closeButtonStyle = new TextStyle({
        fontFamily: 'Jersey 10, Arial, sans-serif',
        fontSize: 60,
        fontWeight: '100',
        fill: '#ffffff',
        align: 'center'
    });

    return (
        <pixiContainer zIndex={1000}>
            {configTexture && (
                <pixiContainer
                    x={canvasSize.width - 80}
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

            {showModal && (
                <pixiContainer>
                    <pixiGraphics
                        draw={(g) => {
                            g.clear();
                            g.beginFill(0x000000, 0.7);
                            g.drawRect(0, 0, canvasSize.width, canvasSize.height);
                            g.endFill();
                        }}
                        interactive={true}
                        onClick={handleModalBackgroundClick}
                    />

                    <pixiContainer
                        x={canvasSize.width / 2}
                        y={canvasSize.height / 2}
                        interactive
                        onClick={handleModalContentClick}
                    >
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                g.beginFill(0x2d1b69, 0.95);
                                g.lineStyle(3, 0x8b5cf6, 1);
                                g.drawRoundedRect(-250, -140, 500, 260, 20);
                                g.endFill();
                            }}
                        />

                        <pixiText
                            text="Configuración"
                            style={titleStyle}
                            anchor={0.5}
                            x={-135}
                            y={-110}
                        />

                        <pixiContainer y={-70}>
                            <pixiContainer
                                y={50}
                                interactive
                                cursor="pointer"
                                onPointerDown={handleReturnToMenu}
                            >
                                <pixiGraphics
                                    draw={(g) => {
                                        g.clear();
                                        g.beginFill(0x8b5cf6, 0.3);
                                        g.drawRoundedRect(-230, -25, 460, 50, 10);
                                        g.endFill();
                                    }}
                                />
                                <pixiText
                                    text="Volver al menu"
                                    style={menuItemStyle}
                                    anchor={0.5}
                                    x={0}
                                    y={0}
                                />
                            </pixiContainer>
                            <pixiContainer
                                y={120}
                                interactive
                                cursor="pointer"
                                onPointerDown={handleLogout}
                            >
                                <pixiGraphics
                                    draw={(g) => {
                                        g.clear();
                                        g.beginFill(0x8b5cf6, 0.3);
                                        g.drawRoundedRect(-230, -25, 460, 50, 10);
                                        g.endFill();
                                    }}
                                />
                                <pixiText
                                    text="Cerrar sesión"
                                    style={menuItemStyle}
                                    anchor={0.5}
                                    x={0}
                                    y={0}
                                />
                            </pixiContainer>
                        </pixiContainer>

                        <pixiContainer
                            x={225}
                            y={-115}
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
                            />
                        </pixiContainer>
                    </pixiContainer>
                </pixiContainer>
            )}
        </pixiContainer>
    );
}