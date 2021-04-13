import { PerceptronBase } from './index'

const net = PerceptronBase.sumProduct
const sigma = (netOutput: number) => 1 / (1 + Math.pow(Math.E, -netOutput))

export const sigmoidThresholdUnit = (weights: number[]) => (input: number[]) => sigma(net(weights, [...input, 1]))
