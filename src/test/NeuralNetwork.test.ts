import { backPropFor2LevelSigmoidUnitForwardNetwork } from '../NeuralNetwork'
import * as assert from 'assert'

describe('Neural Network', () => {
  it('learns in a simple way', () => {
    const network = backPropFor2LevelSigmoidUnitForwardNetwork()

    assert.deepStrictEqual(network.layers, [
      {
        units: [
          {
            delta: -0.0033547366595323056,
            output: 0.549833997312478,
            weights: [0.10085128181864877, 0.09899357900214031, 0.1],
          },
        ],
      },
      {
        units: [
          {
            delta: -0.13439178714582642,
            output: 0.5412512661717976,
            weights: [0.09674244573947247, 0.1],
          },
        ],
      },
    ])
    assert.deepStrictEqual(network.weightsHistory, [
      {
        index: -1,
        weights: [[[0.1, 0.1, 0.1]], [[0.1, 0.1]]],
      },
      {
        index: 0,
        weights: [[[0.10085128181864877, 0.1, 0.1]], [[0.1189103977991797, 0.1]]],
      },
      {
        index: 1,
        weights: [[[0.10085128181864877, 0.09899357900214031, 0.1]], [[0.09674244573947247, 0.1]]],
      },
    ])
  })
})
