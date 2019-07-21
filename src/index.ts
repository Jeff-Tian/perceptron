export class PerceptronBase {
  w0: number
  w1: number

  constructor(w0: number, w1: number) {
    this.w0 = w0
    this.w1 = w1
  }

  sign(x1: number) {
    return this.w0 + this.w1 * x1 > 0 ? true : false
  }
}

export default class Perceptron {
  static not(x: boolean) {
    return new PerceptronBase(-0.5, -1).sign(x ? 1 : -1)
  }
}
