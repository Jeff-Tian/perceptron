import assert from "assert"
import { trainingSet } from "./common/training"
import { trainLinearUnit } from "../GradientDescent"

describe("GradientDescent", () => {
    it("trains linear unit", () => {
        const details = trainLinearUnit(trainingSet, 0.05)
        assert(details.length === 5)
    })
})
