const sum = (a: number, b: number) => a + b;

export class Bowling {
  frames: number[][];
  constructor() {
    this.frames = [[]];
  }

  roll(pins: number) {
    const lastFrame = this.frames[this.frames.length - 1];
    lastFrame.push(pins);
    if (lastFrame.length === 1 && pins === 10) this.frames.push([]);
    if (lastFrame.length === 2) this.frames.push([]);
  }

  getFrames() {
    return this.frames;
  }

  getScore() {
    const frameScores = this.frames.map((frame, frameIndex) =>
      frame.reduce((frameScore, roll, rollIndex) => {
        if (frameIndex === 0) return frameScore + roll;
        const previousFrame = this.frames[frameIndex - 1];
        if (
          rollIndex === 0 &&
          previousFrame.reduce(sum) === 10 &&
          previousFrame.length === 2
        ) {
          return frameScore + 2 * roll;
        }
        if (previousFrame.reduce(sum) === 10 && previousFrame.length === 1) {
          // Double strike
          if (
            rollIndex === 0 &&
            frameIndex > 1 &&
            this.frames[frameIndex - 1][0] === 10
          ) {
            return frameScore + 3 * roll;
          }
          return frameScore + 2 * roll;
        }
        return frameScore + roll;
      }, 0)
    );
    return frameScores.reduce((score, frameScore) => score + frameScore, 0);
  }
}
