import { UserProfile } from "@/types";
import { Assets, Graphics, TextStyle, Texture } from "pixi.js";
import { useEffect, useState, useCallback } from "react";

const levelStyle = new TextStyle({
    fontFamily: 'Jersey 10',
    fontSize: 36,
    fontWeight: '400',
    fill: '#ffffff',
    align: 'left',
    stroke: '#000000',
});

const xpTextStyle = new TextStyle({
    fontFamily: 'Jersey 10',
    fontSize: 16,
    fontWeight: 'bold',
    fill: '#ffffff',
    align: 'center',
    stroke: { color: '#000000', width: 1 },
});

interface ProfileUIProps {
    userProfile: UserProfile | null;
}

export const ProfileUI = ({ userProfile }: ProfileUIProps) => {
    const [avatarFrameTexture, setAvatarFrameTexture] = useState<Texture | null>(null);
    const [avatarProfileTexture, setAvatarProfileTexture] = useState<Texture | null>(null);

    useEffect(() => {
        if (userProfile) {
            const avatarFrameUrl = userProfile.avatar_frame_url;
            const avatarUrl = userProfile.avatar_url;

            if (avatarFrameUrl) {
                Assets.load<Texture>(avatarFrameUrl).then((tex) => {
                    setAvatarFrameTexture(tex);
                });
            }

            if (avatarUrl) {
                Assets.load<Texture>(avatarUrl).then((tex) => {
                    setAvatarProfileTexture(tex);
                });
            }
        }
    }, [userProfile]);

    // Calcular porcentaje de XP correctamente
    const calculateXpPercentage = () => {
        if (!userProfile) return 0;
        
        const totalXp = userProfile.total_xp;
        const nextLevelXp = userProfile.level.next_level_xp ?? 1;
        
        // Calcular el porcentaje basado en el XP total requerido
        return Math.min((totalXp / nextLevelXp) * 100, 100);
    };

    const xpPercentage = calculateXpPercentage();

    // Calcular el XP actual a mostrar
    const getDisplayXp = () => {
        if (!userProfile) return { current: 0, max: 0 };
        
        const totalXp = userProfile.total_xp;
        const nextLevelXp = userProfile.level.next_level_xp ?? 1;
        
        return {
            current: totalXp,
            max: nextLevelXp
        };
    };

    const displayXp = getDisplayXp();

    // Dimensiones de la barra (más delgada)
    const barWidth = 200;
    const barHeight = 24;
    const innerBarWidth = 196;
    const innerBarHeight = 18;
    const actualBarWidth = 192;
    const borderRadius = 6;
    const innerBorderRadius = 4;

    // Barra de XP con diseño similar a stats-ui
    const drawXpBar = useCallback((g: Graphics) => {
        g.clear();
        
        const x = 160;
        const y = 80;
        
        // Sombra de la barra
        g.roundRect(x + 2, y + 2, barWidth, barHeight, borderRadius);
        g.fill({ color: 0x000000, alpha: 0.3 });

        // Borde exterior
        g.roundRect(x, y, barWidth, barHeight, borderRadius);
        g.fill({ color: 0x2c2c2c });
        g.stroke({ color: 0x444444, width: 1 });
        
    }, []);

    // Fondo interno de la barra
    const drawInnerBackground = useCallback((g: Graphics) => {
        g.clear();
        const x = 162;
        const y = 83;
        
        g.roundRect(x, y, innerBarWidth, innerBarHeight, innerBorderRadius);
        g.fill({ color: 0x1a1a1a });
    }, []);

    // Barra de progreso púrpura
    const drawProgress = useCallback((g: Graphics) => {
        g.clear();
        const x = 164;
        const y = 85;
        const barWidthFilled = actualBarWidth * (xpPercentage / 100);
        
        if (barWidthFilled > 0) {
            // Barra principal púrpura
            g.roundRect(x, y, barWidthFilled, 14, innerBorderRadius);
            g.fill({ color: 0x9333ea });
        }
    }, [xpPercentage]);

    // Brillo superior
    const drawHighlight = useCallback((g: Graphics) => {
        g.clear();
        const x = 164;
        const y = 85;
        const barWidthFilled = actualBarWidth * (xpPercentage / 100);
        
        if (barWidthFilled > 0) {
            g.roundRect(x, y, barWidthFilled, 5, innerBorderRadius);
            g.fill({ color: 0xb668ff, alpha: 0.6 });
        }
    }, [xpPercentage]);

    // Divisiones de la barra
    const drawSegments = useCallback((g: Graphics) => {
        g.clear();
        const segments = 4;
        const x = 162;
        const y = 83;
        
        for (let i = 1; i < segments; i++) {
            const segmentX = x + innerBarWidth * (i / segments);
            g.moveTo(segmentX, y);
            g.lineTo(segmentX, y + innerBarHeight);
            g.stroke({ color: 0x000000, width: 1, alpha: 0.3 });
        }
    }, []);

    // Efecto adicional cuando XP está alto
    const drawGlow = useCallback((g: Graphics) => {
        g.clear();
        if (xpPercentage > 80) {
            const x = 164;
            const y = 87;
            const barWidthFilled = actualBarWidth * (xpPercentage / 100);
            
            g.roundRect(x, y, barWidthFilled, 2, 2);
            g.fill({ color: 0xffffff, alpha: 0.4 });
        }
    }, [xpPercentage]);

    // Dimensiones del marco
    const frameSize = 128;
    const avatarSize = 100;

    return (
        <pixiContainer>
            {/* Avatar con marco */}
            {avatarProfileTexture && avatarFrameTexture && (
                <pixiSprite texture={avatarFrameTexture} x={20} y={20} width={frameSize} height={frameSize} zIndex={101}>
                    <pixiSprite
                        texture={avatarProfileTexture}
                        x={frameSize + 42}
                        y={frameSize + 32}
                        width={avatarSize}
                        height={avatarSize}
                        anchor={0.5}
                        zIndex={100}
                    />
                </pixiSprite>
            )}

            {/* Texto del nivel - a la derecha del avatar */}
            <pixiText 
                text={`Nivel ${userProfile?.level.order ?? 1}`} 
                style={levelStyle} 
                x={160} 
                y={30} 
                zIndex={102}
            />

            {/* Barra de XP - capa por capa como stats-ui */}
            <pixiGraphics draw={drawXpBar} zIndex={102} />
            <pixiGraphics draw={drawInnerBackground} zIndex={102} />
            <pixiGraphics draw={drawProgress} zIndex={102} />
            <pixiGraphics draw={drawHighlight} zIndex={102} />
            <pixiGraphics draw={drawSegments} zIndex={102} />
            <pixiGraphics draw={drawGlow} zIndex={103} />

            {/* Texto de XP sobre la barra */}
            <pixiText 
                text={`${userProfile?.total_xp} / ${userProfile?.level.next_level_xp} XP`} 
                style={xpTextStyle} 
                x={260} 
                y={92} 
                anchor={0.5}
                zIndex={104}
            />
        </pixiContainer>
    );
};