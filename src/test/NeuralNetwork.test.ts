import { backPropFor2LevelSigmoidUnitForwardNetwork, build8x3x8, build3LayerNetwork } from '../NeuralNetwork'
import assert = require('assert')

describe('Neural Network', () => {
  it('learns in a simple way', () => {
    const network = backPropFor2LevelSigmoidUnitForwardNetwork()

    assert.deepStrictEqual(network.layers.slice(1), [
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

    assert.deepStrictEqual(network.layers.slice(1), [
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

describe('8x3x8 network', () => {
  it('builds a 8x3x8 network', () => {
    const n = build8x3x8()
    const [inputLayer, hiddenLayer, outputLayer] = n.layers

    assert(inputLayer.units.length === 8)
    assert(hiddenLayer.units.length === 3)
    hiddenLayer.units.forEach(u => assert.deepStrictEqual(u.weights, new Array(9).fill(0.1)))
    assert(outputLayer.units.length === 8)
    outputLayer.units.forEach(u => assert.deepStrictEqual(u.weights, new Array(4).fill(0.1)))
  })
})

describe('3-layer-network', () => {
  it('builds a 2x1x1 network', () => {
    const n = build3LayerNetwork(2, 1, 1)

    const expectedNetwork = {
      layers: [
        {
          units: [
            { weights: [1], output: 0, delta: 0, deltas: [0, 0] },
            { weights: [1], output: 0, delta: 0, deltas: [0, 0] }
          ]
        },
        { units: [{ weights: [0.1, 0.1, 0.1], output: 0, delta: 0, deltas: [0, 0] }] },
        {
          units: [
            {
              weights: [0.1, 0.1],
              output: 0,
              delta: 0,
              deltas: [0, 0],
            },
          ],
        },
      ],
      weightsHistory: [],
    }

    const [expectedInputLayer, expectedHiddenLayer, expectedOutputLayer] = expectedNetwork.layers
    const [actualInputLayer, actualHiddenLayer, actualOutputLayer] = n.layers

    assert.deepStrictEqual(actualInputLayer, expectedInputLayer)
    assert.deepStrictEqual(actualHiddenLayer, expectedHiddenLayer)
    assert.deepStrictEqual(actualOutputLayer, expectedOutputLayer)
    assert.deepStrictEqual(n, expectedNetwork)
  })
})