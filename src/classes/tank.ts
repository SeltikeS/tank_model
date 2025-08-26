import { Container, Texture } from "pixi.js";
import { TankTexture } from "../assets/assetsMap.ts";
import { createAnimatedSprite } from "../helpers/createAnimatedSprite.ts";
import { createSprite } from "../helpers/createSprite.ts";

export class Tank {
  private readonly _view;
  private readonly _textures: Record<TankTexture, Texture>;
  private readonly _trackLeft;
  private readonly _trackRight;
  private readonly _bodyContainer;
  private readonly _towerContainer;

  constructor(textures: Record<TankTexture, Texture>) {
    this._textures = textures;
    this._view = new Container();

    this._bodyContainer = new Container();
    this._towerContainer = new Container();
    this._view.addChild(this._bodyContainer, this._towerContainer);

    this._trackLeft = createAnimatedSprite(
      [this._textures.TrackCFrame1, this._textures.TrackCFrame2],
      { position: { x: 0, y: -80 } },
    );
    this._trackRight = createAnimatedSprite(
      [this._textures.TrackCFrame1, this._textures.TrackCFrame2],
      { position: { x: 0, y: 80 } },
    );

    this._bodyContainer.addChild(this._trackLeft, this._trackRight);
    this._bodyContainer.addChild(createSprite(this._textures.HeavyHullB));

    this._towerContainer.addChild(
      createSprite(this._textures.HeavyGunB, { position: { x: 140, y: -27 } }),
      createSprite(this._textures.HeavyGunB, { position: { x: 160, y: 29 } }),
    );
    this._towerContainer.addChild(
      createSprite(this._textures.GunConnectorD, { position: { x: 80, y: 0 } }),
    );
    this._towerContainer.addChild(createSprite(this._textures.HeavyTowerB));
  }

  get view() {
    return this._view;
  }

  set towerDirection(value: number) {
    this._towerContainer.rotation = value;
  }

  get towerDirection() {
    return this._towerContainer.rotation;
  }

  set bodyDirection(value: number) {
    this._bodyContainer.rotation = value;
  }

  get bodyDirection() {
    return this._bodyContainer.rotation;
  }

  set x(value: number) {
    this._view.position.x = value;
  }

  get x() {
    return this._view.position.x;
  }

  set y(value: number) {
    this._view.position.y = value;
  }

  get y() {
    return this._view.position.y;
  }

  startTracks() {
    this._trackLeft.play();
    this._trackRight.play();
  }

  stopTracks() {
    this._trackLeft.stop();
    this._trackRight.stop();
  }
}
