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
            deltas: [0, -0.0010064209978596916],
            output: 0.549833997312478,
            weights: [0.10085128181864877, 0.09899357900214031, 0.1],
          },
        ],
      },
      {
        units: [
          {
            delta: -0.13439178714582642,
            deltas: [-0.02216795205970723, 0],
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

  it('learns with alpha', () => {
    const network = backPropFor2LevelSigmoidUnitForwardNetwork(undefined, undefined, 0.9)

    assert.deepStrictEqual(network.layers, [
      {
        units: [
          {
            delta: -0.0033547366595323056,
            deltas: [0.0007661536367838874, -0.0010064209978596916],
            output: 0.549833997312478,
            weights: [0.10161743545543266, 0.09899357900214031, 0.1],
          },
        ],
      },
      {
        units: [
          {
            delta: -0.13439178714582642,
            deltas: [-0.0051485940404455005, 0],
            output: 0.5412512661717976,
            weights: [0.1137618037587342, 0.1],
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
        weights: [[[0.10161743545543266, 0.09899357900214031, 0.1]], [[0.1137618037587342, 0.1]]],
      },
    ])
  })
})
