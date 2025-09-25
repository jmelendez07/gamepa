import { extend } from '@pixi/react';
import { Graphics, Text, TextStyle } from 'pixi.js';

extend({ Graphics, Text });

interface PortalUIProps {
    canvasSize: { width: number; height: number };
    isVisible: boolean;
    title?: string;
    subtitle?: string;
}

export const PortalUI = ({
    canvasSize,
    isVisible,
    title = '¡Portal Activado!',
    subtitle = 'Preparándote para el siguiente nivel...',
}: PortalUIProps) => {
    if (!isVisible) return null;

    const titleStyle = new TextStyle({
        fontFamily: 'Jersey 10, Arial, sans-serif',
        fontSize: 40,
        fontWeight: '500',
        fill: '#ffffff',
        align: 'center',
    });

    const subtitleStyle = new TextStyle({
        fontFamily: 'Jersey 10, Arial, sans-serif',
        fontSize: 28,
        fill: '#ffffff',
        align: 'center',
    });

    return (
        <pixiContainer>
            {/* Fondo semi-transparente */}
            <pixiGraphics
                draw={(g) => {
                    g.clear();
                    g.beginFill(0x000000, 0.7);
                    g.drawRect(0, 0, canvasSize.width, canvasSize.height);
                    g.endFill();
                }}
            />

            {/* Container centrado para el panel */}
            <pixiContainer x={canvasSize.width / 2} y={canvasSize.height / 2}>
                {/* Panel central con el mismo estilo del menú */}
                <pixiGraphics
                    draw={(g) => {
                        g.clear();
                        g.beginFill(0x2d1b69, 0.95);
                        g.stroke({ width: 3, color: 0x8b5cf6, alpha: 1 });
                        g.roundRect(-250, -100, 500, 200, 20);
                        g.fill();
                        g.stroke();
                    }}
                />

                {/* Título del panel */}
                <pixiText text={title} style={titleStyle} anchor={0.5} x={0} y={-50} />

                {/* Subtítulo del panel */}
                <pixiText text={subtitle} style={subtitleStyle} anchor={0.5} x={0} y={10} />

                {/* Indicador de carga opcional */}
                <pixiGraphics
                    y={50}
                    draw={(g) => {
                        g.clear();
                        g.beginFill(0x8b5cf6, 0.6);
                        g.roundRect(-100, -8, 200, 16, 8);
                        g.fill();

                        // Barra de progreso animada
                        g.beginFill(0xffffff, 0.8);
                        g.roundRect(-95, -3, 190, 6, 3);
                        g.fill();
                    }}
                />
            </pixiContainer>
        </pixiContainer>
    );
};
