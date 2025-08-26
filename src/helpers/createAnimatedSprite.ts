import { AnimatedSprite, Texture } from "pixi.js";
import { SpriteOptions } from "./createSprite.ts";

export interface AnimatedSpriteOptions extends SpriteOptions {
  animationSpeed?: number;
}

export const createAnimatedSprite = (textures: Texture[], options?: AnimatedSpriteOptions) => {
  const animatedSprite = new AnimatedSprite(textures);
  animatedSprite.position.copyFrom(options?.position ?? { x: 0, y: 0 });
  animatedSprite.anchor.set(options?.anchor ?? 0.5);
  animatedSprite.animationSpeed = options?.animationSpeed ?? 0.25;
  return animatedSprite;
};
