import assert = require('assert')
import { learn, linearUnit, trainingError, updatedWeights } from '../LinearUnit'

describe('Linear Unit', () => {
  it('[1] * [1] => 1', () => {
    assert(linearUnit(1)(1) === 1)
  })

  describe('learning and training', () => {
    const trainingSet = [
      {
        x: [1, 1],
        t: 3,
      },
      {
        x: [2, 2],
        t: 6,
      },
      {
        x: [3, 3],
        t: 9,
      },
      {
        x: [0, 1],
        t: 2,
      },
      {
        x: [-1, 2],
        t: 3,
      },
    ]

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
      assert(trainingError([1, 1], trainingSet) === 0.5)
    })
  })
})
