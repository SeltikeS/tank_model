import { UnresolvedAsset } from "pixi.js";

export const TankTexture = {
  GunConnectorD: "GunConnectorD",
  HeavyGunB: "HeavyGunB",
  HeavyHullB: "HeavyHullB",
  HeavyTowerB: "HeavyTowerB",
  TrackCFrame1: "TrackCFrame1",
  TrackCFrame2: "TrackCFrame2",
  MediumShell: "MediumShell",
} as const;
export type TankTexture = (typeof TankTexture)[keyof typeof TankTexture];

export const assetsMap: AssetsMap = {
  sprites: [
    { alias: TankTexture.GunConnectorD, src: "assets/parts/gun_connectors/GunConnectorD.png" },
    { alias: TankTexture.HeavyGunB, src: "assets/parts/guns/HeavyGunB.png" },
    { alias: TankTexture.HeavyHullB, src: "assets/parts/hulls/HeavyHullB.png" },

    { alias: TankTexture.HeavyTowerB, src: "assets/parts/towers/HeavyTowerB.png" },

    { alias: TankTexture.TrackCFrame1, src: "assets/parts/tracks/TrackСFrame1.png" },
    { alias: TankTexture.TrackCFrame2, src: "assets/parts/tracks/TrackСFrame2.png" },

    { alias: TankTexture.MediumShell, src: "assets/parts/bullets/MediumShell.png" },

    { alias: "Background", src: "assets/background/grass.jpg" },
  ],
};

export type AssetsMap = {
  sprites: UnresolvedAsset[];
};
