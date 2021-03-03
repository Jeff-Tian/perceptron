import { linearUnit } from "./LinearUnit"

export const trainLinearUnit = (trainingExamples, eta: number) => {
    return train(trainingExamples, eta)(computeLinearUnitDeltaWeight)
}

export function train(trainingExamples: any, eta: number) {
    return (computeDeltaWeight) => {
        let weights = new Array(trainingExamples[0].x.length).fill(0).map(() => Math.random())
        let deltaWeights = new Array(weights.length).fill(0)

        const details: any[] = []

        trainingExamples.forEach((example, iter) => {
            const o = linearUnit(...weights)(...example.x)

            weights.forEach((_w, i) => {
                deltaWeights[i] = computeDeltaWeight(deltaWeights[i], eta, example.t, example.x[i], o)

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
}

function computeLinearUnitDeltaWeight(deltaWeight: number, eta: number, t: number, x: number, o: number): any {
    return deltaWeight + eta * (t - o) * x
}
