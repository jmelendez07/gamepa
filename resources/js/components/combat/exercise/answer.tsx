interface IAnswerProps {
  text: string;
  isCorrect: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
}

export const Answer = ({ text, isCorrect, x, y, width, height }: IAnswerProps) => {
    return (
        <pixiContainer>
            <pixiGraphics draw={(g) => {
                g.clear();
                g.roundRect(0, 0, width - 10 , height);
                g.stroke({ color: 0x5E5353, width: 2 });
            }} x={x} y={y} />
            <pixiText 
                text={text}
                x={x + width / 2}
                y={y + height / 2}
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