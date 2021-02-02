import assert = require('assert')
import { learn, linearUnit } from '../LinearUnit'

describe('Linear Unit', () => {
  it('[1] * [1] => 1', () => {
    assert(linearUnit(1)(1) === 1)
  })

  it('learns', () => {
    const initialWeights = [1, 1]
    const initialEta = 0.1
    const trainingSet = [
      {
        x: [1, 1],
        t: 1,
      },
      {
        x: [2, 2],
        t: 4,
      },
    ]

    const details = learn(initialWeights, initialEta, trainingSet)

    assert(details.length === 2)
    assert.deepStrictEqual(details, [
      {
        e: -1,
        iter: 0,
        o: 2,
        t: 1,
        weights: [1, 1],
      },
      {
        e: 0.3999999999999999,
        iter: 1,
        o: 3.6,
        t: 4,
        weights: [0.9, 0.9],
      },
    ])
  })
})
