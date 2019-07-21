import assert = require('assert')
import { findS } from '../index'

describe('smoke', () => {
  it('works', () => {
    assert(true)
  })
})

describe('find-s', () => {
  const samples = [
    {
      Sky: 'Sunny',
      AirTemp: 'Warm',
      Humidity: 'Normal',
      Wind: 'Strong',
      Water: 'Warm',
      Forecast: 'Same',
      EnjoySport: 'Yes'
    },

    {
      Sky: 'Sunny',
      AirTemp: 'Warm',
      Humidity: 'High',
      Wind: 'Strong',
      Water: 'Warm',
      Forecast: 'Same',
      EnjoySport: 'Yes'
    },

    {
      Sky: 'Rainy',
      AirTemp: 'Cold',
      Humidity: 'High',
      Wind: 'Strong',
      Water: 'Warm',
      Forecast: 'Change',
      EnjoySport: 'No'
    },

    {
      Sky: 'Sunny',
      AirTemp: 'Warm',
      Humidity: 'High',
      Wind: 'Strong',
      Water: 'Cool',
      Forecast: 'Change',
      EnjoySport: 'Yes'
    }
  ]

  describe('get h', () => {
    it('empty', () => {
      const res = findS(samples, 'EnjoySport', ['Sky', 'AirTemp', 'Humidity', 'Wind', 'Water', 'Forecast'])

      assert.deepStrictEqual(res, {
        Sky: 'Sunny',
        AirTemp: 'Warm',
        Humidity: '?',
        Wind: 'Strong',
        Water: '?',
        Forecast: '?'
      })
    })
  })
})
