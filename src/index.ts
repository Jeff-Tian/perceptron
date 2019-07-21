export class PerceptronBase {
  w0: number
  w1: number
  w2: number

  constructor(w0: number, w1: number, w2: number = 0) {
    this.w0 = w0
    this.w1 = w1
    this.w2 = w2
  }

  sign(x1: number) {
    return this.w0 + this.w1 * x1 > 0 ? true : false
  }

  sign2(x1: number, x2: number) {
    return this.w0 + this.w1 * x1 + this.w2 * x2 > 0 ? true : false
  }
}

export default class Perceptron {
  static not(x: boolean) {
    return new PerceptronBase(-0.5, -1).sign(x ? 1 : -1)
  }

  static and(x1: boolean, x2: boolean) {
    return new PerceptronBase(-0.8, 0.5, 0.5).sign2(x1 ? 1 : -1, x2 ? 1 : -1)
  }
}
