import assert from "assert"
import { trainingSet } from "./common/training"
import { train, trainLinearUnit } from "../GradientDescent"

describe("GradientDescent", () => {
    it("trains linear unit", () => {
        const details = trainLinearUnit(trainingSet, 0.05)
        assert(details.length === 5)
    })

    it("trains o = w0 + w1 x1 + w1 x1^2 + ... + w2 x2 + w2 x2^2", () => {
        const trainingExamples = trainingSet.map(t => ({
            x: [1, t.x[0] + t.x[0] * t.x[0], t.x[1] + t.x[1] * t.x[1]],
            t: t.t
        }))

        const details = train(trainingExamples, 0.05)((deltaWeight: number, eta: number, t: number, x: number, o: number) => deltaWeight + eta * (t - o) * x * (1 + x))
        assert(details.length === 5)
    })
})
