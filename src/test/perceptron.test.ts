import assert = require('assert')
import Perceptron, { PerceptronBase } from '../index'

describe('perceptron', () => {
  describe('basic', () => {
    it('sign', () => {
      const p = new PerceptronBase(-0.5, -1)

      assert(p.sign(1) === false)
      assert(p.sign(-1) === true)
    })

    it('not', () => {
      assert(Perceptron.not(true) === false)
      assert(Perceptron.not(false) === true)
    })
  })
})
