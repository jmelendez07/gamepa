import { useState, useEffect } from 'react';

interface TypewriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
}

export default function Typewriter({ 
    text, 
    speed = 50, 
    delay = 0, 
    className = "",
    onComplete 
}: TypewriterProps) {
    const [displayText, setDisplayText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (delay > 0) {
            const delayTimeout = setTimeout(() => {
                setCurrentIndex(0);
            }, delay);
            return () => clearTimeout(delayTimeout);
        }
    }, [delay]);

    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(text.slice(0, currentIndex + 1));
                setCurrentIndex(currentIndex + 1);
            }, speed);

            return () => clearTimeout(timeout);
        } else if (currentIndex === text.length && !isComplete) {
            setIsComplete(true);
            onComplete?.();
        }
    }, [currentIndex, text, speed, isComplete, onComplete]);

    return (
        <span className={className}>
            {displayText}
            {!isComplete && (
                <span className="animate-pulse">|</span>
            )}
        </span>
    );
}