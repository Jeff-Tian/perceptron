import assert = require('assert')
import { linearUnit } from '../LinearUnit'

describe('Linear Unit', () => {
  it('[1] * [1] => 1', () => {
    assert(linearUnit(1)(1) === 1)
  })
})
