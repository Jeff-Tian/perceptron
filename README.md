# perceptron

> 感知器。如果不允许使用 &&, || 等逻辑运算，程序该怎么写？

[![npm download][download-image]][download-url]
[![NPM version](https://badge.fury.io/js/perceptron.png)](http://badge.fury.io/js/perceptron)
[![Build Status](https://travis-ci.com/Jeff-Tian/perceptron.svg?branch=master)](https://travis-ci.com/Jeff-Tian/perceptron)
[![Dependencies Status](https://david-dm.org/Jeff-Tian/perceptron.png)](https://david-dm.org/jeff-tian/perceptron)
[![Coverage Status](https://coveralls.io/repos/github/Jeff-Tian/perceptron/badge.svg?branch=master)](https://coveralls.io/github/Jeff-Tian/perceptron?branch=master)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/Jeff-Tian/perceptron)

[download-image]: https://img.shields.io/npm/dm/perceptron.svg?style=flat-square
[download-url]: https://npmjs.org/package/perceptron

## 安装

```shell
npm install @jeff-tian/perceptron
```

## 使用

```typescript
import Perceptron from '@jeff-tian/perceptron'
assert(Perceptron.not(true) === false)
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
