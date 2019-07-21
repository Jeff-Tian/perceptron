export class PerceptronBase {
  weights: number[]

  constructor(...w: number[]) {
    this.weights = w
  }

  sign(...x: number[]) {
    return PerceptronBase.sumProduct([1, ...x], this.weights) > 0
  }

  static sumProduct(a1: number[], a2: number[]) {
    return a1.map((n, i) => n * a2[i]).reduce((prev, next) => prev + next, 0)
  }
}

export default class Perceptron {
  static not(x: boolean) {
    return new PerceptronBase(-0.5, -1).sign(x ? 1 : -1)
  }

  static and(x1: boolean, x2: boolean) {
    return new PerceptronBase(-0.8, 0.5, 0.5).sign(x1 ? 1 : -1, x2 ? 1 : -1)
  }
}
