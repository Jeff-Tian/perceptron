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

  describe('basic logic', () => {
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

  describe('more general than', () => {
    const set = [1, 2, 3, 4, 5]

    it('more general than or equal to', () => {
      const hj = x => true
      const hk = x => true

      assert(Perceptron.more_general_than_or_equal_to(set, hj, hk) === true)
    })

    it('more general than', () => {
      const hj = x => true
      const hk = x => x === 1

      assert(Perceptron.more_general_than_or_equal_to(set, hj, hk) === true)
      assert(Perceptron.more_general_than_or_equal_to(set, hk, hj) === false)
      assert(Perceptron.more_general_than(set, hj, hk) === true)
    })
  })
})
