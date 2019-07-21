import assert = require('assert')
import Perceptron, { PerceptronBase } from '../index'

describe('perceptron', () => {
  describe('basic math', () => {
    it('sum product', () => {
      assert(PerceptronBase.sumProduct([1, 1, 1, 1, 1], [2, 2, 2, 2, 2]) === 10)
    })

    it('sign', () => {
      const p = new PerceptronBase(-0.5, -1)

      assert(p.sign(1) === false)
      assert(p.sign(-1) === true)
    })
  })

  describe('basic', () => {
    it('not', () => {
      assert(Perceptron.not(true) === false)
      assert(Perceptron.not(false) === true)
    })

    it('and', () => {
      assert(Perceptron.and(true, true) === true)
      assert(Perceptron.and(true, false) === false)
      assert(Perceptron.and(false, true) === false)
      assert(Perceptron.and(false, false) === false)
    })

    it('or', () => {
      assert(Perceptron.or(true, true) === true)
      assert(Perceptron.or(true, false) === true)
      assert(Perceptron.or(false, true) === true)
      assert(Perceptron.or(false, false) === false)
    })

    it('xor', () => {
      assert(Perceptron.xor(true, true) === false)
      assert(Perceptron.xor(true, false) === true)
      assert(Perceptron.xor(false, true) === true)
      assert(Perceptron.xor(false, false) === false)
    })
  })
})
