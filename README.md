# find-s

> 寻找极大特殊假设

[![npm download][download-image]][download-url]
[![NPM version](https://badge.fury.io/js/find-s.png)](http://badge.fury.io/js/find-s)
[![Build Status](https://travis-ci.com/Jeff-Tian/find-s.svg?branch=master)](https://travis-ci.com/Jeff-Tian/find-s)
[![Dependencies Status](https://david-dm.org/Jeff-Tian/find-s.png)](https://david-dm.org/jeff-tian/find-s)
[![Coverage Status](https://coveralls.io/repos/github/Jeff-Tian/find-s/badge.svg?branch=master)](https://coveralls.io/github/Jeff-Tian/find-s?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/Jeff-Tian/find-s)

[download-image]: https://img.shields.io/npm/dm/find-s.svg?style=flat-square
[download-url]: https://npmjs.org/package/find-s

## FIND-S 算法

1. 将 h 初始化为 H 中最特殊假设
2. 对每个正例 x

  - 对 h 的每个属性约束 a<sub>i</sub>
      如果 x 满足 a<sub>i</sub>
      那么不做任何处理
      否则将 h 中 a<sub>i</sub> 替换为 x 满足的下一个更一般约束

3. 输出假设 h


## 安装

```shell
npm install find-s
```

## 使用
```typescript
import { findS } from 'find-s'

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

const res = findS(samples, 'EnjoySport', ['Sky', 'AirTemp', 'Humidity', 'Wind', 'Water', 'Forecast'])

assert.deepStrictEqual(res, {
        Sky: 'Sunny',
        AirTemp: 'Warm',
        Humidity: '?',
        Wind: 'Strong',
        Water: '?',
        Forecast: '?'
      })
```

## 开发

1. 修改代码后跑

   ```shell
   npm test
   ```

   确保测试通过。

2. `git commit`
3. `npm version patch/minor/major`
4. `npm publish`
