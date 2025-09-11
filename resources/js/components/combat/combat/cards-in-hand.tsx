import ICard from "@/types/card";
import { Card } from "../card/card";

interface ICardsInHandProps {
    cards: ICard[];
    setIsCardHeldDown: (isHeldDown: boolean) => void;
    setCardPosition: (position: { x: number; y: number }) => void;
    isTargetAssigned: boolean;
    setIsAttacking: (isAttacking: boolean) => void;
    setSelectedCard: (card: ICard | null) => void;
    isDisabled: boolean;
}

export default function CardsInHand({ cards, setIsCardHeldDown, setCardPosition, isTargetAssigned, setIsAttacking, setSelectedCard, isDisabled }: ICardsInHandProps) {
    return (
        <>
            {cards.map((card, index) => {
                const cardSpacing = 240;
                const totalWidth = cards.length * cardSpacing - 20;
                const startX = (window.innerWidth - totalWidth) / 2;
                const baseYPosition = window.innerHeight - 320;
                const centerIndex = (cards.length - 1) / 2;
                const rotationAngle = (index - centerIndex) * 0.15;
                const isFirstCard = index === 0;
                const isLastCard = index === cards.length - 1;
                const isExtremeCard = isFirstCard || isLastCard;
                const elevationAmount = isExtremeCard ? 0 : -40;

                const cardPosition = {
                    x: startX + index * cardSpacing,
                    y: baseYPosition + elevationAmount,
                };

                return (
                    <Card
                        key={card.id}
                        card={card}
                        onHeldDownChange={isDisabled ? () => {} : setIsCardHeldDown}
                        onCardPositionChange={isDisabled ? () => {} : setCardPosition}
                        isTargetAssigned={isTargetAssigned}
                        onAttack={isDisabled ? () => {} : setIsAttacking}
                        initialPosition={cardPosition}
                        initialRotation={rotationAngle}
                        onSelectedCard={isDisabled ? () => {} : setSelectedCard}
                        isDisabled={isDisabled}
                    />
                );
            })}
        </>
    );
}