import { sigmoidThresholdUnit } from './SigmoidThresholdUnit'
import { PerceptronBase } from './index'

const learnOneStep = (network: INetwork, eta: number, alpha: number = 0) => (input, index) => {
  forwardProp(input, network)
  backwardProp(input.t, network)
  updateWeights(input.x, eta, network, alpha)

  network.weightsHistory.push({ index, weights: snapshotWeights(network.layers) })
}

export const backPropFor2LevelSigmoidUnitForwardNetwork = (
  trainingExamples: ITrainingExample[] = [
    {
      x: [1, 0],
      t: 1,
    },
    {
      x: [0, 1],
      t: 0,
    },
  ],
  eta: number = 0.3,
  alpha: number = 0,
  numberOfInput: number = 2,
  numberOfOutput: number = 1,
  numberOfHiddenLayers: number = 1,
) => {
  const network: INetwork = {
    layers: [
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

  network.weightsHistory.push({ index: -1, weights: snapshotWeights(network.layers) })

  let epoch = 0
  while (epoch++ < 1) {
    trainingExamples.forEach(learnOneStep(network, eta, alpha))
  }

  return network
}

const snapshotWeights = (layers: ILayer[]): number[][][] => layers.map(layer => layer.units.map(u => [...u.weights]))

const updateWeights = (x: number[], eta: number, network: INetwork, alpha: number = 0) => {
  const [hiddenLayer, outputLayer] = network.layers

  hiddenLayer.units.forEach(u => {
    x.forEach((xji, index) => {
      u.deltas[index] = eta * u.delta * xji + alpha * u.deltas[index]
      u.weights[index] = u.weights[index] + u.deltas[index]
    })
  })

  outputLayer.units.forEach(u => {
    hiddenLayer.units.forEach((xji, index) => {
      u.deltas[index] = eta * u.delta * xji.output + alpha * u.deltas[index]
      u.weights[index] = u.weights[index] + u.deltas[index]
    })
  })
}

const backwardProp = (target: number, network: INetwork) => {
  const [hiddenLayer, outputLayer] = network.layers

  outputLayer.units.forEach(u => {
    u.delta = u.output * (1 - u.output) * (target - u.output)
  })


  hiddenLayer.units.forEach(u => {
    u.delta =
      u.output *
      (1 - u.output) *
      PerceptronBase.sumProduct(
        [u.weights[0]],
        outputLayer.units.map(({ delta }) => delta),
      )
  })
}

const forwardProp = (input: ITrainingExample = { x: [1, 0], t: 1 }, network: INetwork) => {
  const [hiddenLayer, outputLayer] = network.layers

  hiddenLayer.units.forEach(u => {
    u.output = sigmoidThresholdUnit(u.weights)(input.x)
  })

  outputLayer.units.forEach(u => {
    u.output = sigmoidThresholdUnit(u.weights)([hiddenLayer.units[0].output])
  })
}

export interface ITrainingExample {
  x: number[]
  t: number
}

export interface INetwork {
  layers: ILayer[]
  weightsHistory: Array<{ index: number; weights: number[][][] }>
}

export interface ILayer {
  units: IUnit[]
}

export interface IUnit {
  delta: number
  deltas: number[]
  output: number
  weights: number[]
}

const emptyNode: IUnit = {
  weights: [],
  delta: 0,
  deltas: [0, 0],
  output: 0,
}

const duplicateNode = (n: number) => (node: IUnit) => new Array(n).fill({ ...node })

export const build3LayerNetwork = (numberOfInput: number, numberOfHidden: number, numberOfOutput: number): INetwork => {

  const network: INetwork = { layers: [], weightsHistory: [] }

  const inputLayer: ILayer = {
    units: duplicateNode(numberOfInput)({ ...emptyNode, weights: new Array(numberOfInput).fill(1) }),
  }

  const hiddenLayer: ILayer = {
    units: duplicateNode(numberOfHidden)({ ...emptyNode, weights: new Array(numberOfInput + 1).fill(0.1) }),
  }

  const outputLayer: ILayer = {
    units: duplicateNode(numberOfOutput)({ ...emptyNode, weights: new Array(numberOfHidden + 1).fill(0.1) }),
  }

  network.layers.push(inputLayer)
  network.layers.push(hiddenLayer)
  network.layers.push(outputLayer)

  return network
}

export const build8x3x8 = (): INetwork => build3LayerNetwork(8, 3, 8)