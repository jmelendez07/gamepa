import { Application } from '@pixi/react';
import { useCallback, useEffect, useState } from 'react';
import { calculateCanvasSize } from '../helpers/common';
import { MainContainer } from './MainContainer/MainContainer';

export const Experience = () => {
  const [isClient, setIsClient] = useState(false);
  const [canvasSize, setCanvasSize] = useState(calculateCanvasSize());

  const updateCanvasSize = useCallback(() => {
    setCanvasSize(calculateCanvasSize());
  }, []);

  useEffect(() => {
    setIsClient(true);
    window.addEventListener('resize', updateCanvasSize);
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, [updateCanvasSize]);

  return (
    <>
      {isClient && (
        <Application width={canvasSize.width} height={canvasSize.height}>
          <MainContainer canvasSize={canvasSize}>
            {/* Aquí puedes agregar otros componentes o elementos */}
          </MainContainer>
        </Application>
      )}
    </>
  );
};

