import { extend } from '@pixi/react';
import { Assets, Container, Graphics, Point, Sprite, Text, Texture } from 'pixi.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Answer } from './answer';

extend({ Container, Sprite, Text, Graphics, Point });

interface IExerciseProps {
    enemy: string;
}

export const Exercise = ({ enemy }: IExerciseProps) => {
    const bgAsset = '/assets/ui/exercise-ui.png';
    const answersAsset = '/assets/ui/answers-ui.png';
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [answersTexture, setAnswersTexture] = useState<Texture | null>(null);
    const [isAnswerIsDragging, setIsAnswerIsDragging] = useState(false);
    const [isOverTarget, setIsOverTarget] = useState(false); // Nuevo estado para la colisión
    const exerciseContainerX = window.innerWidth / 2 - (window.innerWidth * 0.5) / 2;
    const exerciseContainerY = window.innerHeight / 2 - (window.innerHeight * 0.8) / 2;
    const [answerSelectedPosition, setAnswerSelectedPosition] = useState<{ x: number; y: number } | null>(null);
    const width = window.innerWidth * 0.5;
    const height = window.innerHeight * 0.8;
    const containerX = window.innerWidth / 2 - width / 2;
    const containerY = window.innerHeight / 2 - height / 2;
    const answersWidth = window.innerWidth * 0.45;
    const centerXRelativeToContainer = (width - answersWidth) / 2;
    const [answersOptions, setAnswersOptions] = useState<{ text: string; isCorrect: boolean }[]>([
        { text: '1', isCorrect: false },
        { text: '2', isCorrect: true },
        { text: '3', isCorrect: false },
        { text: '4', isCorrect: false },
    ]);
    const answerTargetRef = useRef<Graphics>(null);
    const draggingAnswerRef = useRef<Graphics | null>(null); // Ref para el contenedor arrastrado

    const handleAnswerDragStart = (answerContainer: Graphics | null) => {
        draggingAnswerRef.current = answerContainer;
    };

    const handleAnswerDragEnd = useCallback(
        (answerContainer: Graphics | null) => {
          console.log(isOverTarget);
            if (isOverTarget) {
                console.log('Answer dropped in target area!');
                // Lógica para respuesta correcta
            } else {
                console.log('Answer dropped outside target area.');
            }
            draggingAnswerRef.current = null;
            setIsOverTarget(false);
        },
        [isOverTarget],
    );

    useEffect(() => {
        if (isAnswerIsDragging && draggingAnswerRef.current && answerTargetRef.current) {
            const answerBounds = draggingAnswerRef.current.getBounds();
            const targetBounds = answerTargetRef.current.getBounds();

            const collision =
                answerBounds.x < targetBounds.x + targetBounds.width &&
                answerBounds.x + answerBounds.width > targetBounds.x &&
                answerBounds.y < targetBounds.y + targetBounds.height &&
                answerBounds.y + answerBounds.height > targetBounds.y;

            console.log(collision);

            setIsOverTarget(collision);
        }
    }, [answerSelectedPosition, isAnswerIsDragging]); // Se ejecuta en cada movimiento

    useEffect(() => {
        let cancelled = false;

        Assets.load<Texture>(bgAsset)
            .then((tex) => {
                if (!cancelled) {
                    setBgTexture(tex);
                }
            })
            .catch((err) => {
                console.error('Failed to load background texture:', err);
            });

        Assets.load<Texture>(answersAsset)
            .then((tex) => {
                if (!cancelled) {
                    setAnswersTexture(tex);
                }
            })
            .catch((err) => {
                console.error('Failed to load answers texture:', err);
            });

        return () => {
            cancelled = true;
            bgTexture?.destroy();
            answersTexture?.destroy();
        };
    }, [bgAsset]);

    return (
        <pixiContainer x={exerciseContainerX} y={exerciseContainerY}>
            {bgTexture && <pixiSprite texture={bgTexture} width={width} height={height} />}
            <pixiText
                text="f´(x) = 2x + 5"
                x={100}
                y={60}
                anchor={0.5}
                zIndex={1}
                style={{
                    fontSize: 24,
                    fill: 0xffffff,
                    fontFamily: 'Arial',
                }}
            />
            {answersTexture && (
                <pixiContainer x={centerXRelativeToContainer} y={430} width={answersWidth} height={window.innerHeight * 0.2} zIndex={1}>
                    <pixiSprite texture={answersTexture} width={answersWidth} height={window.innerHeight * 0.2} />
                    {answersOptions.map((option, index) => {
                        const padding = 20; // Padding de 20 píxeles
                        const availableWidth = answersWidth - padding * 2;
                        const availableHeight = window.innerHeight * 0.2 - padding * 2;
                        const answerWidth = availableWidth / answersOptions.length;
                        const answerHeight = availableHeight;
                        const xPosition = padding + index * answerWidth;
                        const yPosition = padding;

                        return (
                            <Answer
                                key={index}
                                text={option.text}
                                isCorrect={option.isCorrect}
                                x={xPosition}
                                y={yPosition}
                                width={answerWidth}
                                height={answerHeight}
                                containerX={containerX}
                                containerY={containerY}
                                onIsDraggingChange={setIsAnswerIsDragging}
                                onAnswerPositionChange={setAnswerSelectedPosition}
                                onDragStart={handleAnswerDragStart}
                                onDragEnd={handleAnswerDragEnd}
                            />
                        );
                    })}
                </pixiContainer>
            )}
            {isAnswerIsDragging && (
                <pixiGraphics
                ref={answerTargetRef}
                    draw={(g) => {
                        g.clear();
                        g.rect(0, 0, width, height);
                        // Cambia el color del borde según si está sobre el área o no
                        g.stroke({ color: isOverTarget ? 0x00ff00 : 0x0000ff, width: 5 });
                    }}
                />
            )}
        </pixiContainer>
    );
};
