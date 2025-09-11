import { extend } from '@pixi/react';
import { Assets, Container, Graphics, Point, Sprite, Text, Texture } from 'pixi.js';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { Answer } from './answer';
import IEnemy from '@/types/enemy';
import ICard from '@/types/card';
import IExercise from '@/types/exercise';

extend({ Container, Sprite, Text, Graphics, Point });

interface IExerciseProps {
    enemy: IEnemy;
    card: ICard;
    exercise: IExercise;
    onClose?: () => void;
    attack: () => void;
    onIsAttacking: (isAttacking: boolean) => void;
}

const assetSword = '/assets/sword.png';

export const Exercise = ({ enemy, card, exercise, onClose, onIsAttacking, attack }: IExerciseProps) => {
    const getRandomExercise = (card?: ICard | null) => {
        if (card && card.exercises && card.exercises.length > 0) {
            const idx = Math.floor(Math.random() * card.exercises.length);
            return card.exercises[idx];
        }
        return undefined;
    };

    const bgAsset = '/assets/ui/exercise-ui.png';
    const answersAsset = '/assets/ui/answers-ui.png';
    const [swordTexture, setSwordTexture] = useState<Texture | null>(null);
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [answersTexture, setAnswersTexture] = useState<Texture | null>(null);
    const [isAnswerIsDragging, setIsAnswerIsDragging] = useState(false);
    const [isOverTarget, setIsOverTarget] = useState(false); // Nuevo estado para la colisión
    const [isCancellingAnswer, setIsCancellingAnswer] = useState(false);
    const exerciseContainerX = window.innerWidth / 2 - (window.innerWidth * 0.5) / 2;
    const exerciseContainerY = window.innerHeight / 2 - (window.innerHeight * 0.8) / 2;
    const [answerSelectedPosition, setAnswerSelectedPosition] = useState<{ x: number; y: number } | null>(null);
    const width = window.innerWidth * 0.5;
    const height = window.innerHeight * 0.8;
    const containerX = window.innerWidth / 2 - width / 2;
    const containerY = window.innerHeight / 2 - height / 2;
    const answersWidth = window.innerWidth * 0.45;
    const centerXRelativeToContainer = (width - answersWidth) / 2;

    const [currentStep, setCurrentStep] = useState(0);

    const [playerAnswers, setPlayerAnswers] = useState<{ text: string; isCorrect: boolean }[]>([]);
    const answerTargetRef = useRef<Graphics>(null);
    const answersGraphicsRef = useRef<Graphics>(null);
    const draggingAnswerRef = useRef<Container | null>(null); // Ref para el contenedor arrastrado

    const handleAnswerDragStart = (answerContainer: Container | null) => {
        draggingAnswerRef.current = answerContainer;
    };

    const handleAnswerDragEnd = useCallback(
        (answerContainer: Container | null, answerValue: { text: string; isCorrect: boolean }) => {
            if (answerContainer && answerTargetRef.current && answersGraphicsRef.current) {
                const answerBounds = answerContainer.getBounds();

                // Comprobar si se soltó en el área de cancelación (respuestas)
                const answersBounds = answersGraphicsRef.current.getBounds();
                const isOverAnswersArea =
                    answerBounds.x < answersBounds.x + answersBounds.width &&
                    answerBounds.x + answerBounds.width > answersBounds.x &&
                    answerBounds.y < answersBounds.y + answersBounds.height &&
                    answerBounds.y + answerBounds.height > answersBounds.y;

                if (isOverAnswersArea) {
                    console.log('Answer cancelled.');
                } else {
                    const targetBounds = answerTargetRef.current.getBounds();
                    const isOverTargetArea =
                        answerBounds.x < targetBounds.x + targetBounds.width &&
                        answerBounds.x + answerBounds.width > targetBounds.x &&
                        answerBounds.y < targetBounds.y + targetBounds.height &&
                        answerBounds.y + answerBounds.height > targetBounds.y;

                    if (isOverTargetArea) {
                        console.log('Answer dropped in the exercise area!');
                        console.log('Selected answer:', answerValue);
                        setPlayerAnswers((prev) => [...prev, { text: answerValue.text, isCorrect: answerValue.isCorrect }]);

                        if (answerValue.isCorrect) {
                            const nextStep = currentStep + 1;
                            setCurrentStep(nextStep);

                            if (nextStep === exercise!.steps!.length) {
                                attack();
                                onIsAttacking(false);
                            }
                        }
                    } else {
                        console.log('Answer dropped outside target area.');
                    }
                }
            } else {
                console.log('Answer dropped outside target area.');
            }

            draggingAnswerRef.current = null;
            setIsOverTarget(false);
            setIsCancellingAnswer(false);
        },
        [currentStep, exercise, onIsAttacking], // ← Agregar dependencias
    );

    useEffect(() => {
        if (isAnswerIsDragging && draggingAnswerRef.current && answersGraphicsRef.current && answerTargetRef.current) {
            const answerBounds = draggingAnswerRef.current.getBounds();

            // 1. Comprobar colisión con el área de respuestas (pequeña)
            const answersBounds = answersGraphicsRef.current.getBounds();
            const isOverAnswersArea =
                answerBounds.x < answersBounds.x + answersBounds.width &&
                answerBounds.x + answerBounds.width > answersBounds.x &&
                answerBounds.y < answersBounds.y + answersBounds.height &&
                answerBounds.y + answerBounds.height > answersBounds.y;

            if (isOverAnswersArea) {
                // Si está sobre el área de respuestas, activa su borde y desactiva el del objetivo grande.
                setIsCancellingAnswer(true);
                setIsOverTarget(false);
                console.log('Over answers area, cancelling answer...');
            } else {
                // 2. Si no está sobre el área de respuestas, comprobar colisión con el área objetivo (grande)
                const targetBounds = answerTargetRef.current.getBounds();
                const isOverTargetArea =
                    answerBounds.x < targetBounds.x + targetBounds.width &&
                    answerBounds.x + answerBounds.width > targetBounds.x &&
                    answerBounds.y < targetBounds.y + targetBounds.height &&
                    answerBounds.y + answerBounds.height > targetBounds.y;

                // Activa el borde del objetivo grande y desactiva el del área de respuestas.
                setIsOverTarget(isOverTargetArea);
                setIsCancellingAnswer(false);
                console.log(isOverTargetArea ? 'Over target area!' : 'Not over target area.');
            }
        } else {
            // Si no se está arrastrando, resetear ambos estados
            setIsOverTarget(false);
            setIsCancellingAnswer(false);
        }
    }, [isAnswerIsDragging, answerSelectedPosition]); // Se ejecuta en cada movimiento

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

    useEffect(() => {
        Assets.load<Texture>(assetSword)
            .then((texture) => {
                setSwordTexture(texture);
            });

        return () => {
            swordTexture?.destroy();
        };
    }, []);

    return (
        <pixiContainer x={exerciseContainerX} y={exerciseContainerY}>
            {bgTexture && <pixiSprite texture={bgTexture} width={width} height={height} />}

            <pixiText
                text="✕"
                x={width - 50}
                y={50}
                anchor={0.5}
                zIndex={10}
                interactive={true}
                cursor="pointer"
                onClick={onClose}
                style={{
                    fontSize: 32,
                    fill: 0xffffff,
                    fontFamily: 'Arial',
                    fontWeight: 'bold',
                }}
            />

            <pixiContainer zIndex={10} x={width - 150} y={35.5}>
                <pixiText 
                    text={card?.stats}
                    x={0}
                    y={0}
                    style={{
                        fontSize: 28,
                        fill: 0xffffff,
                        fontFamily: 'Arial',
                    }}
                />
                {swordTexture && (
                    <pixiSprite 
                        texture={swordTexture}
                        x={30}
                        y={0}
                        width={45}
                        height={30}
                    />
                )}
            </pixiContainer>

            <pixiText
                text={getRandomExercise(card)?.operation || ''}
                x={100}
                y={50}
                anchor={0.5}
                zIndex={1}
                style={{
                    fontSize: 24,
                    fill: 0xffffff,
                    fontFamily: 'Arial',
                }}
            />
            {playerAnswers.map((step, index) => {
                return (
                    <Fragment key={index}>
                        <pixiGraphics
                            draw={(g) => {
                                g.clear();
                                g.roundRect(26, 21 + (index + 1) * (height / 10 + 10), width - 55, height / 10);
                                g.fill({ color: 0x000000, alpha: 0.01 });
                                g.stroke({ color: step.isCorrect ? 0x00ff00 : 0xff0000, width: 2 });
                            }}
                        />
                        <pixiText
                            text={step.text}
                            x={100}
                            y={60 + (index + 1) * (height / 10 + 10)}
                            anchor={0.5}
                            zIndex={1}
                            style={{
                                fontSize: 24,
                                fill: 0xffffff,
                                fontFamily: 'Arial',
                            }}
                        />
                    </Fragment>
                );
            })}
            {answersTexture && (
                <pixiContainer x={centerXRelativeToContainer} y={430} width={answersWidth} height={window.innerHeight * 0.2} zIndex={1}>
                    <pixiSprite texture={answersTexture} width={answersWidth} height={window.innerHeight * 0.2} />
                    {/* {answersOptions.map((option, index) => {
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
                    })} */}
                    {exercise &&
                        exercise.steps &&
                        exercise.steps[currentStep].options.map((opt, index) => {
                            const padding = 20; // Padding de 20 píxeles
                            const availableWidth = answersWidth - padding * 2;
                            const availableHeight = window.innerHeight * 0.2 - padding * 2;
                            const answerWidth = availableWidth / exercise.steps![currentStep].options.length;
                            const answerHeight = availableHeight;
                            const xPosition = padding + index * answerWidth;
                            const yPosition = padding;

                            return (
                                <Answer
                                    key={opt.id}
                                    text={opt.result}
                                    isCorrect={opt.is_correct}
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
                    {isAnswerIsDragging && (
                        <pixiGraphics
                            ref={answersGraphicsRef}
                            draw={(g) => {
                                g.clear();
                                g.rect(0, 0, answersWidth, window.innerHeight * 0.2);
                                // Cambia el color del borde según si está sobre el área o no
                                g.stroke({ color: isCancellingAnswer ? 0x00ff00 : 0x0000ff, width: 5 });
                            }}
                        />
                    )}
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
