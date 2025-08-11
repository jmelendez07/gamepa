// Minimal type declarations for @pixi/react v8 "extend" JSX intrinsic elements
// This lets TS understand tags like <pixiContainer /> and <pixiSprite /> without pulling React types
import type { Texture } from 'pixi.js';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      pixiContainer: any;
      pixiSprite: { texture?: Texture; width?: number; height?: number; [key: string]: any };
    }
  }
}

export {};
