import { linearUnit } from "./LinearUnit"

export const trainLinearUnit = (trainingExamples, eta) => {
    let weights = new Array(trainingExamples[0].x.length).fill(0).map(() => Math.random())
    let deltaWeights = new Array(weights.length).fill(0)

    const details: any[] = []

    trainingExamples.forEach((example, iter) => {
        const o = linearUnit(...weights)(...example.x)

        weights.forEach((_w, i) => {
            deltaWeights[i] = deltaWeights[i] + eta * (example.t - o) * example.x[i]

            weights[i] = weights[i] + deltaWeights[i]
        })

        details.push({
            iter,
            weights: [...weights],
            o,
            t: example.t,
            e: example.t - o,
        })

    })

    return details
}