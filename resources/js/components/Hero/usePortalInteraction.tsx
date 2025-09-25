import { useCallback, useEffect, useState } from 'react';
import { checkProximity } from '../helpers/common';
import { IPosition } from '../types/common';

interface UsePortalInteractionProps {
    heroPosition: IPosition;
    portalPosition: IPosition;
    enemiesCount: number;
    inCombat: boolean;
}

export const usePortalInteraction = ({ heroPosition, portalPosition, enemiesCount, inCombat }: UsePortalInteractionProps) => {
    const [showPortalGraphic, setShowPortalGraphic] = useState(false);
    const [nearPortal, setNearPortal] = useState(false);

    // Verificar proximidad al portal
    const checkPortalProximity = useCallback(() => {
        if (enemiesCount < 0 || inCombat) {
            setNearPortal(false);
            return;
        }

        const isNear = checkProximity(heroPosition, portalPosition, 1);
        setNearPortal(isNear);
    }, [heroPosition, portalPosition, enemiesCount, inCombat]);

    // Activar portal
    const activatePortal = useCallback(() => {
        setShowPortalGraphic(true);
        console.log('Portal activado!');
    }, []);

    // Manejar interacción con tecla F
    const handlePortalInteraction = useCallback(
        (e: KeyboardEvent) => {
            if (e.code === 'KeyF' && nearPortal && !inCombat) {
                activatePortal();
            }
        },
        [nearPortal, inCombat, activatePortal],
    );

    useEffect(() => {
        checkPortalProximity();
    }, [checkPortalProximity]);

    useEffect(() => {
        window.addEventListener('keydown', handlePortalInteraction);
        return () => {
            window.removeEventListener('keydown', handlePortalInteraction);
        };
    }, [handlePortalInteraction]);

    return {
        nearPortal,
        showPortalGraphic,
    };
};
