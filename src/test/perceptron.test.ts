import assert = require('assert')
import { perceptron, Logical, PerceptronBase } from '../index'

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
      assert(Logical.not(true) === false)
      assert(Logical.not(false) === true)
    })

    it('and', () => {
      assert(Logical.and(true, true) === true)
      assert(Logical.and(true, false) === false)
      assert(Logical.and(false, true) === false)
      assert(Logical.and(false, false) === false)
    })

    it('or', () => {
      assert(Logical.or(true, true) === true)
      assert(Logical.or(true, false) === true)
      assert(Logical.or(false, true) === true)
      assert(Logical.or(false, false) === false)
    })

    it('xor', () => {
      assert(Logical.xor(true, true) === false)
      assert(Logical.xor(true, false) === true)
      assert(Logical.xor(false, true) === true)
      assert(Logical.xor(false, false) === false)
    })
  })

  describe('more general than', () => {
    const set = [1, 2, 3, 4, 5]

    it('more general than or equal to', () => {
      const hj = x => true
      const hk = x => true

      assert(Logical.more_general_than_or_equal_to(set, hj, hk) === true)
    })

    it('more general than', () => {
      const hj = x => true
      const hk = x => x === 1

      assert(Logical.more_general_than_or_equal_to(set, hj, hk) === true)
      assert(Logical.more_general_than_or_equal_to(set, hk, hj) === false)
      assert(Logical.more_general_than(set, hj, hk) === true)
    })
  })

  describe('perceptron and logical', () => {
    it('perceptron A is more_general_than perceptron B', () => {
      const X = [
        [0, 0]
        [1, 1],
        [2, 2]
      ]

      const A = perceptron(1, 2, 1)
      const B = perceptron(0, 2, 1)

      assert(Logical.more_general_than_or_equal_to(X, A, B) === true)
      assert(Logical.more_general_than(X, A, B) === true)
    })
  })
})
