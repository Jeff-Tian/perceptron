import { PerceptronBase } from './index'

export const linearUnit = (...weights: number[]): ((...x: number[]) => number) => (...x: number[]) =>
  PerceptronBase.sumProduct(weights, x)

export const updatedWeights = (weights: number[], o: number, eta, trainingRecord) => {
  const { x, t } = trainingRecord
  const delta = (i: number) => eta * (t - o) * x[i]

  return weights.map((w, i) => w + delta(i))
}

export const learn = (initialWeights: number[], initialEta, trainingSet) => {
  const learningDetails: any[] = []

  let weights = initialWeights
  trainingSet.forEach((trainingRecord, i) => {
    const o = linearUnit(...weights)(...trainingRecord.x)
    const t = trainingRecord.t

    learningDetails.push({
      iter: i,
      weights,
      o,
      t,
      e: t - o,
    })
    weights = updatedWeights(weights, o, initialEta / (i + 1), trainingRecord)
  })

  return learningDetails
}

export const trainingError = (weights: number[], trainingSet) => {
  return (
    trainingSet
      .map(trainingRecord => Math.pow(trainingRecord.t - linearUnit(...weights)(...trainingRecord.x), 2))
      .reduce((prev, next) => prev + next, 0) / 2
  )
}
