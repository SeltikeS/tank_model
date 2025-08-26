import { Ticker } from "pixi.js";

export class Tween {
  private readonly _id;
  private readonly _startTime;
  private readonly _duration;
  private readonly _target;
  private readonly _params;
  private _progress;
  private readonly _hooks;
  private _startValues;
  private _deltaValues;

  constructor(
    id: number,
    startTime: number,
    target: Record<string, any>,
    duration: number,
    params: Record<string, any>,
    hooks: { onStart?: () => void; onFinish?: () => void } = {},
  ) {
    this._id = id;
    this._startTime = startTime;
    this._duration = duration;
    this._target = target;
    this._params = params;
    this._progress = 0;
    this._hooks = hooks;

    // copy the start values which are equal to the current values of the target object
    this._startValues = Object.keys(this._params).reduce<Record<string, any>>((acc, key) => {
      acc[key] = this._target[key];
      return acc;
    }, {});

    // calculate a delta value for each property in params
    this._deltaValues = Object.keys(this._params).reduce<Record<string, any>>((acc, key) => {
      acc[key] = this._params[key] - this._startValues[key];
      return acc;
    }, {});
  }

  get id() {
    return this._id;
  }

  get isFinished() {
    return this._progress >= 1;
  }

  onStart() {
    if (this._hooks.onStart) {
      this._hooks.onStart();
    }
  }

  onFinish() {
    if (this._hooks.onFinish) {
      this._hooks.onFinish();
    }
  }

  update(currentTime: number) {
    // calculate delta time to see how much time has passed since last update
    const deltaTime = currentTime - this._startTime;
    // calculate progress and clamp it to 0 - 1;
    this._progress = Math.max(0, Math.min(1, deltaTime / this._duration));

    for (const key in this._params) {
      // set the current value to the target object taking into account the progress
      this._target[key] = this._startValues[key] + this._deltaValues[key] * this._progress;
    }
  }
}

export class TweenManager {
  private _tweens: Tween[];
  private readonly _ticker;

  constructor(ticker: Ticker) {
    this._tweens = [];
    this._ticker = ticker;
    this._ticker.add(this._update, this);
  }

  createTween(
    target: Record<string, any>,
    duration: number,
    params: Record<string, any>,
    hooks?: { onStart?: () => void; onFinish?: () => void },
  ) {
    const id = Math.floor(Math.random() * 10000);
    const tween = new Tween(id, this._ticker.lastTime, target, duration, params, hooks);
    this._tweens.push(tween);
    tween.onStart();
  }

  _update() {
    const tweensToDelete = this._tweens.filter((tween) => tween.isFinished);
    tweensToDelete.forEach((tween) => tween.onFinish());

    this._tweens = this._tweens.filter((tween) => !tween.isFinished);
    this._tweens.forEach((tween) => tween.update(this._ticker.lastTime));
  }
}
