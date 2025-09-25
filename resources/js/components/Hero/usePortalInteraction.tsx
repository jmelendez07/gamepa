import { useCallback, useEffect, useState } from 'react';
import { checkProximity } from '../helpers/common';
import { IPosition } from '../types/common';
import { router } from '@inertiajs/react';
import { Stage } from '@/types/planet';
import type { Page as InertiaPage } from '@inertiajs/core';

interface UsePortalInteractionProps {
    heroPosition: IPosition;
    portalPosition: IPosition;
    enemiesCount: number;
    inCombat: boolean;
}

export const usePortalInteraction = ({ heroPosition, portalPosition, enemiesCount, inCombat }: UsePortalInteractionProps) => {
    const [showPortalGraphic, setShowPortalGraphic] = useState(false);
    const [nearPortal, setNearPortal] = useState(false);
    const [nextStage, setNextStage] = useState<Stage | null>(null);

    const checkPortalProximity = useCallback(() => {
        if (enemiesCount < 0 || inCombat) {
            setNearPortal(false);
            return;
        }

        const isNear = checkProximity(heroPosition, portalPosition, 1);
        setNearPortal(isNear);
    }, [heroPosition, portalPosition, enemiesCount, inCombat]);

    const activatePortal = useCallback(() => {
        setShowPortalGraphic(true);
    }, []);

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

    useEffect(() => {
        if (enemiesCount === 0) {
            router.post(route('gameplay.next-stage'), {}, {
                onSuccess: (response) => {
                    console.log(response.props);
                    setNextStage(response.props.next_stage);
                },
            });
        }
    }, [enemiesCount]);

    return {
        nearPortal,
        showPortalGraphic,
        nextStage
    };
};
