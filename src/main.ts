import { Application, Assets, FederatedPointerEvent, Rectangle, Texture } from "pixi.js";
import { assetsMap, TankTexture } from "./assets/assetsMap.ts";
import { Tank } from "./classes/tank.ts";
import { TweenManager } from "./classes/tween.ts";
import { createSprite } from "./helpers/createSprite.ts";

(async () => {
  const app = new Application();
  await app.init({ background: "#fff", resizeTo: window });

  // Append the application canvas to the document body
  document.getElementById("pixi-container")!.appendChild(app.canvas);

  const centerX = app.screen.width / 2;
  const centerY = app.screen.height / 2;
  app.stage.position.set(centerX, centerY);

  const tankTextures: Record<TankTexture | "Background", Texture> = await Assets.load(
    assetsMap.sprites,
  );

  const background = createSprite(tankTextures.Background);
  background.setSize(app.screen.width, app.screen.height);
  app.stage.addChild(background);

  const runGame = () => {
    const tank = new Tank(tankTextures);
    app.stage.addChild(tank.view);

    const tweenManager = new TweenManager(app.ticker);

    const moveTank = (event: FederatedPointerEvent) => {
      const distanceToCenter = event.getLocalPosition(app.stage);
      const distanceToTank = event.getLocalPosition(tank.view);
      const angle = Math.atan2(distanceToTank.y, distanceToTank.x);

      let callAmount = 2;
      const move = () => {
        callAmount -= 1;
        if (callAmount <= 0) {
          tweenManager.createTween(
            tank,
            3000,
            { x: distanceToCenter.x, y: distanceToCenter.y },
            {
              onStart: () => tank.startTracks(),
              onFinish: () => tank.stopTracks(),
            },
          );
        }
      };

      tweenManager.createTween(
        tank,
        1000,
        { towerDirection: angle },
        {
          onFinish: () => move(),
        },
      );
      tweenManager.createTween(
        tank,
        2000,
        { bodyDirection: angle },
        {
          onStart: () => tank.startTracks(),
          onFinish: () => {
            tank.stopTracks();
            move();
          },
        },
      );
    };

    app.stage.on("pointerdown", moveTank, undefined);
    app.stage.interactive = true;
    app.stage.interactiveChildren = false;
    app.stage.hitArea = new Rectangle(-centerX, -centerY, app.screen.width, app.screen.height);
  };

  runGame();
})();
