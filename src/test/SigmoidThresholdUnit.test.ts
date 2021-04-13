import { sigmoidThresholdUnit } from '../SigmoidThresholdUnit'
import assert = require('assert')

describe('Sigmoid Threshold Unit', () => {
  it('input 1 and 0', () => {
    const res = sigmoidThresholdUnit([0.1, 0.1, 0.1])([1, 0])
    assert(res === 0.549833997312478)
  })
})
