export class PerceptronBase {
  weights: number[]

  constructor(...w: number[]) {
    this.weights = w
  }

  sign(...x: number[]): boolean
  sign(...x: boolean[]): boolean
  sign(...x: any[]): boolean {
    const [x0] = x

    let xArray = x

    if (typeof x0 === 'boolean') {
      xArray = x.map((value: boolean) => PerceptronBase.convertBooleanToNumber(value))
    }

    return PerceptronBase.sumProduct([1, ...xArray], this.weights) > 0
  }

  static sumProduct(a1: number[], a2: number[]) {
    return a1.map((n, i) => n * a2[i]).reduce((prev, next) => prev + next, 0)
  }

  static convertBooleanToNumber(b: boolean): number {
    return b ? 1 : -1
  }

  static m_of_n(criteria: (m: number, n: number) => boolean, ...x: boolean[]): boolean {
    return criteria(x.filter(xi => xi === true).length, x.length)
  }
}

export default class Perceptron {
  static not(x: boolean) {
    return new PerceptronBase(-0.5, -1).sign(x)
  }

  static and(x1: boolean, x2: boolean) {
    // return new PerceptronBase(-0.8, 0.5, 0.5).sign(x1, x2)
    return PerceptronBase.m_of_n((m, n) => m === n, x1, x2)
  }

  static or(x1: boolean, x2: boolean) {
    // return new PerceptronBase(0.3, 0.5, 0.5).sign(x1, x2)
    return PerceptronBase.m_of_n(m => m >= 1, x1, x2)
  }

  static xor(x1: boolean, x2: boolean) {
    return Perceptron.or(Perceptron.and(x1, Perceptron.not(x2)), Perceptron.and(Perceptron.not(x1), x2))
  }
}
