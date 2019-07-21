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

    const sum = PerceptronBase.sumProduct([1, ...xArray], this.weights)
    return sum > 0
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

export class Logical {
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
    return Logical.or(Logical.and(x1, Logical.not(x2)), Logical.and(Logical.not(x1), x2))
  }

  static more_general_than_or_equal_to(set: any, hj: (x: any) => boolean, hk: (x: any) => boolean): boolean
  static more_general_than_or_equal_to(hj: (x: any) => boolean, hk: (x: any) => boolean): boolean
  static more_general_than_or_equal_to(...args: any[]): boolean {
    if (args.length === 3) {
      const [set, hj, hk] = args;

      for (const x of set) {
        if (hk(x)) {
          if (!hj(x)) {
            return false
          }
        }
      }

      return true
    } else {
      const [hj, hk] = args;

      // TODO: How to infer by function definition only?

      return false
    }
  }


  static more_general_than(set: any, hj: (x: any) => boolean, hk: (x: any) => boolean): boolean
  static more_general_than(hj: (x: any) => boolean, hk: (x: any) => boolean): boolean
  static more_general_than(...args: any[]) {
    if (args.length === 3) {
      const [set, hj, hk] = args

      return Logical.more_general_than_or_equal_to(set, hj, hk) && Logical.not(Logical.more_general_than_or_equal_to(set, hk, hj))
    }

    if (args.length === 2) {
      const [hj, hk] = args

      return Logical.more_general_than_or_equal_to(hj, hk) && Logical.not(Logical.more_general_than_or_equal_to(hj, hk))
    }

    throw new Error('参数错误！')
  }
}

export const perceptron = (...weights: number[]): (...x: any[]) => boolean => {
  const p = new PerceptronBase(...weights)
  return x => p.sign.apply(p, x)
}