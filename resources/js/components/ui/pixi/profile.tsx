import { SharedData, UserProfile } from "@/types";
import { usePage } from "@inertiajs/react";
import { Assets, Graphics, TextStyle, Texture } from "pixi.js";
import { useEffect, useState, useCallback } from "react";

const levelStyle = new TextStyle({
    fontFamily: 'Jersey 10',
    fontSize: 50,
    fontWeight: '400',
    fill: '#ffffff',
    align: 'left',
    stroke: '#000000',
});

const xpTextStyle = new TextStyle({
    fontFamily: 'Jersey 10',
    fontSize: 26,
    fontWeight: '400',
    fill: '#ffffff',
    align: 'center',
    stroke: { color: '#000000', width: 1 },
});

export const ProfileUI = () => {
    const { auth } = usePage<SharedData>().props;
    const [avatarFrameTexture, setAvatarFrameTexture] = useState<Texture | null>(null);
    const [avatarProfileTexture, setAvatarProfileTexture] = useState<Texture | null>(null);

    useEffect(() => {
        if (auth.user?.profile) {
            const avatarFrameUrl = auth.user.profile.avatar_frame_url;
            const avatarUrl = auth.user.profile.avatar_url;

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
    }, [auth.user?.profile]);

    const calculateXpPercentage = () => {
        if (!auth.user?.profile) return 0;

        const totalXp = auth.user.profile.total_xp;
        const nextLevelXp = auth.user.profile.level.next_level_xp ?? 1;

        return Math.min((totalXp / nextLevelXp) * 100, 100);
    };

    const xpPercentage = calculateXpPercentage();

    const barWidth = 240;
    const barHeight = 30;
    const innerBarWidth = 236;
    const innerBarHeight = 26;
    const actualBarWidth = 236;
    const borderRadius = 6;
    const innerBorderRadius = 4;

    const drawXpBar = useCallback((g: Graphics) => {
        g.clear();
        
        const x = 145;
        const y = 80;
        
        g.roundRect(x + 2, y + 2, barWidth, barHeight, borderRadius);
        g.fill({ color: 0x000000, alpha: 0.3 });
        g.roundRect(x, y, barWidth, barHeight, borderRadius);
        g.fill({ color: 0x2c2c2c });
        g.stroke({ color: 0x444444, width: 1 });
        
    }, []);

    const drawInnerBackground = useCallback((g: Graphics) => {
        g.clear();
        const x = 147;
        const y = 83;
        
        g.roundRect(x, y, innerBarWidth, innerBarHeight, innerBorderRadius);
        g.fill({ color: 0x1a1a1a });
    }, []);

    const drawProgress = useCallback((g: Graphics) => {
        g.clear();
        const x = 147;
        const y = 85;
        const barWidthFilled = actualBarWidth * (xpPercentage / 100);
        
        if (barWidthFilled > 0) {
            g.roundRect(x, y, barWidthFilled, 14, innerBorderRadius);
            g.fill({ color: 0x9333ea });
        }
    }, [xpPercentage]);

    const drawHighlight = useCallback((g: Graphics) => {
        g.clear();
        const x = 147;
        const y = 85;
        const barWidthFilled = actualBarWidth * (xpPercentage / 100);
        
        if (barWidthFilled > 0) {
            g.roundRect(x, y, barWidthFilled, 5, innerBorderRadius);
            g.fill({ color: 0xb668ff, alpha: 0.6 });
        }
    }, [xpPercentage]);

    const drawSegments = useCallback((g: Graphics) => {
        g.clear();
        const segments = 4;
        const x = 147;
        const y = 83;
        
        for (let i = 1; i < segments; i++) {
            const segmentX = x + innerBarWidth * (i / segments);
            g.moveTo(segmentX, y);
            g.lineTo(segmentX, y + innerBarHeight);
            g.stroke({ color: 0x000000, width: 1, alpha: 0.3 });
        }
    }, []);

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

    const frameSize = 128;
    const avatarSize = 90;

    return (
        <pixiContainer zIndex={1}>
            {avatarFrameTexture && (
                <pixiSprite 
                    texture={avatarFrameTexture} 
                    x={10} 
                    y={20} 
                    width={frameSize} 
                    height={frameSize} 
                    zIndex={2}
                />
            )}

            {avatarProfileTexture && (
                <pixiSprite
                    x={29}
                    y={39}
                    texture={avatarProfileTexture}
                    width={avatarSize}
                    height={avatarSize}
                    zIndex={1}
                />
            )}

            <pixiText 
                text={auth.user?.name + " (Nivel " + (auth.user?.profile?.level.order ?? 1) + ")"} 
                style={levelStyle} 
                x={145} 
                y={30}
                resolution={1}
            />

            <pixiGraphics draw={drawXpBar} zIndex={102} />
            <pixiGraphics draw={drawInnerBackground} zIndex={102} />
            <pixiGraphics draw={drawProgress} zIndex={102} />
            <pixiGraphics draw={drawHighlight} zIndex={102} />
            <pixiGraphics draw={drawSegments} zIndex={102} />
            <pixiGraphics draw={drawGlow} zIndex={103} />

            <pixiText 
                text={`${auth.user?.profile?.total_xp} / ${auth.user?.profile?.level.next_level_xp} XP`} 
                style={xpTextStyle} 
                x={196} 
                y={94} 
                anchor={0.5}
                zIndex={104}
                resolution={2}
            />
        </pixiContainer>
    );
};