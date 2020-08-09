import { PerceptronBase } from './index'

export const linearUnit = (...weights: number[]): ((...x: number[]) => number) => {
  return (...x: number[]) => PerceptronBase.sumProduct(weights, x)
}
