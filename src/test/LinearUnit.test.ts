import assert = require('assert')
import { learn, linearUnit, trainingError, updatedWeights } from '../LinearUnit'
import { trainingSet } from './common/training'

describe('Linear Unit', () => {
  it('[1] * [1] => 1', () => {
    assert(linearUnit(1)(1) === 1)
  })

  describe('learning and training', () => {
    it('updates weights', () => {
      const weights = [1.26, 1.26]
      const o = 1.26
      const eta = 0.1
      const trainingRecord = { x: [0, 1], t: 2 }

      const newWeights = updatedWeights(weights, o, eta, trainingRecord)
      assert(newWeights[0] === 1.26)
      assert(newWeights[1] === weights[1] + eta * (trainingRecord.t - o))
    })

    it('learns', () => {
      const initialWeights = [1, 1]
      const initialEta = 0.1
      const details = learn(initialWeights, initialEta, trainingSet)

      assert(details.length === 5)
      assert.deepStrictEqual(details, [
        {
          e: 1,
          iter: 0,
          o: 2,
          t: 3,
          weights: [1.1, 1.1],
        },
        {
          e: 1.5999999999999996,
          iter: 1,
          o: 4.4,
          t: 6,
          weights: [1.26, 1.26],
        },
        {
          e: 1.4399999999999995,
          iter: 2,
          o: 7.5600000000000005,
          t: 9,
          weights: [1.404, 1.404],
        },
        {
          e: 0.5960000000000001,
          iter: 3,
          o: 1.404,
          t: 2,
          weights: [1.404, 1.4188999999999998],
        },
        {
          e: 1.5662000000000003,
          iter: 4,
          o: 1.4337999999999997,
          t: 3,
          weights: [1.372676, 1.4815479999999999],
        },
      ])
    })

    it('calculates training error', () => {
      assert(trainingError([1, 1], trainingSet) === 9.5)
    })
  })

  describe('learning and training with random data', () => {
    const trainingSet = [
      {
        x: [24.708572488795085, 24.801089199101867],
        t: 74.31075088699882,
      },
      {
        x: [-86.36352853710977, -36.63523496882299],
        t: -159.63399847475574,
      },
    ]
    const initialWeights = [1, 1]
    const initialEta = 0.1

    it('leans', () => {
      const details = learn(initialWeights, initialEta, trainingSet)
      assert.deepStrictEqual(details, [
        {
          e: 24.801089199101867,
          iter: 0,
          o: 49.50966168789695,
          t: 74.31075088699882,
          weights: [62.27995102770813, 62.50940254618073],
        },
        {
          e: 7509.128979436588,
          iter: 1,
          o: -7668.762977911344,
          t: -159.63399847475574,
          weights: [-32363.463794192783, -13692.42582609669],
        },
      ])
    })
  })
})
