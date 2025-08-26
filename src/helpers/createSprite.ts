import { PointData, Sprite, Texture } from "pixi.js";

export interface SpriteOptions {
  position?: PointData;
  anchor?: number;
}

export const createSprite = (texture: Texture, options?: SpriteOptions) => {
  const sprite = new Sprite(texture);
  sprite.position.copyFrom(options?.position ?? { x: 0, y: 0 });
  sprite.anchor.set(options?.anchor ?? 0.5);
  return sprite;
};
