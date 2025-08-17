import { extend } from "@pixi/react";
import { Assets, Container, Sprite, Texture, Text } from "pixi.js";
import { useEffect, useState } from "react";
import { Answer } from "./answer";

extend({Container, Sprite, Text});

interface IExerciseProps {
  enemy: string;
}

export const Exercise = ({ enemy }: IExerciseProps) => {
    const bgAsset = '/assets/ui/exercise-ui.png';
    const answersAsset = '/assets/ui/answers-ui.png';
    const [bgTexture, setBgTexture] = useState<Texture | null>(null);
    const [answersTexture, setAnswersTexture] = useState<Texture | null>(null);
    const width = window.innerWidth * 0.5;
    const height = window.innerHeight * 0.80;
    const answersWidth = window.innerWidth * 0.45;
    const centerXRelativeToContainer = (width - answersWidth) / 2;
    const [answersOptions, setAnswersOptions] = useState<{ text: string; isCorrect: boolean }[]>([
        { text: "1", isCorrect: false },
        { text: "2", isCorrect: true },
        { text: "3", isCorrect: false },
        { text: "4", isCorrect: false }
    ]);

    useEffect(() => {
        let cancelled = false;

        Assets.load<Texture>(bgAsset)
            .then((tex) => {
                if(!cancelled) {
                    setBgTexture(tex);
                }
            }).catch((err) => {
                console.error("Failed to load background texture:", err);
            });

        Assets.load<Texture>(answersAsset)
            .then((tex) => {
                if(!cancelled) {
                    setAnswersTexture(tex);
                    answersTexture
                }
            }).catch((err) => {
                console.error("Failed to load answers texture:", err);
            });

        return () => {
            cancelled = true;
            bgTexture?.destroy();
            answersTexture?.destroy();
        };
    }, [bgAsset]);

    return (
      <pixiContainer 
        x={window.innerWidth / 2 - width / 2} 
        y={window.innerHeight / 2 - height / 2}
      >
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
            fontFamily: "Arial"
          }}
        />
        {answersTexture &&
          <pixiContainer
            x={centerXRelativeToContainer}
            y={430}
            width={answersWidth}
            height={window.innerHeight * 0.20}
            zIndex={1}
          >
            <pixiSprite texture={answersTexture} width={answersWidth} height={window.innerHeight * 0.20} />
            {answersOptions.map((option, index) => {
              const padding = 20; // Padding de 20 píxeles
              const availableWidth = answersWidth - (padding * 2);
              const availableHeight = (window.innerHeight * 0.20) - (padding * 2);
              const answerWidth = availableWidth / answersOptions.length;
              const answerHeight = availableHeight;
              const xPosition = padding + (index * answerWidth);
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
                />
              );
            })}
          </pixiContainer>
        }
      </pixiContainer>
    )
}
