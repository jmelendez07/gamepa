import { FederatedPointerEvent } from "pixi.js";
import { useCallback, useEffect, useRef, useState } from "react";

interface IAnswerProps {
  text: string;
  isCorrect: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  containerX: number;
  containerY: number;
  onDragStart?: () => void;
  onDragEnd?: () => void;
  onDragMove?: (event: FederatedPointerEvent) => void;
}

export const Answer = ({ text, isCorrect, x, y, width, height, containerX, containerY }: IAnswerProps) => {

    const [isDragging, setIsDragging] = useState(false);
    const [answerPosition, setAnswerPosition] = useState({ x, y });
    const [isClicked, setIsClicked] = useState(false);
    const originalPosition = useRef({ x, y });
    const dragOffset = useRef({ x: 0, y: 0 });
    const wasDragged = useRef(false); // Ref para rastrear si hubo movimiento

    const handlePointerMove = useCallback((event: PointerEvent) => {
        wasDragged.current = true; // Marcamos que un movimiento ocurrió
        setAnswerPosition({
            x: event.clientX - containerX - dragOffset.current.x,
            y: event.clientY - containerY - dragOffset.current.y
        });
    }, [containerX, containerY]);

    const handlePointerUp = useCallback(() => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);

        if (wasDragged.current) {
            // Lógica para cuando se suelta después de arrastrar
            console.log("Drag ended for:", text);
        } else {
            // Lógica para un click (sin arrastre)
            console.log("Clicked:", text);
            setIsClicked(prev => !prev);
        }
        
        setIsDragging(false);
        setAnswerPosition({ x: originalPosition.current.x, y: originalPosition.current.y });
    }, [handlePointerMove]); // Quitamos isDragging de las dependencias

    const handlePointerDown = (event: FederatedPointerEvent) => {
        // Prevenir comportamiento de drag-and-drop nativo del navegador
        event.preventDefault(); 
        wasDragged.current = false; // Reseteamos el estado de arrastre al iniciar
        
        // Guardamos la diferencia entre el punto de click y la esquina del componente
        dragOffset.current = {
            x: event.global.x - answerPosition.x - containerX,
            y: event.global.y - answerPosition.y - containerY
        };

        setIsDragging(true);

        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
    };

    return (
        <pixiContainer
            x={answerPosition.x}
            y={answerPosition.y}
            eventMode="static"
            onPointerDown={handlePointerDown}
        >
            <pixiGraphics 
                draw={(g) => {
                    g.clear();
                    g.roundRect(0, 0, width - 10 , height);
                    g.fill({ color: 0x000000, alpha: 0.01 });
                    g.stroke({ color: isClicked ? 0x070BA6 : 0x5E5353, width: 2 });
                }}  
                x={0} 
                y={0} 
                alpha={isDragging ? 0.5 : 1}  
            />
            <pixiText
                interactive={false}
                text={text}
                x={(width - 10) / 2}
                y={height / 2}
                anchor={0.5}
                style={{
                    fontSize: 20,
                    fill: 0xffffff,
                    fontFamily: "Arial"
                }}
            />
        </pixiContainer>
    )
}