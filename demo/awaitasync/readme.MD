# 在node中使用await的方法

## demo code
  
  $touch 1.js 
  $vim 1.js
  $cat 1.js

  "use strict";
  async function foo() {
    var s = await bar();
    console.log(s);
  }
  function bar() {
    return "bar";
  }
  foo()

## 此时直接运行时不可以的

  node 1.js
  /Users/lcjun/github/await/1.js:2
    async function foo() {
          ^^^^^^^^

## package.json

  $npm init 

一路回车即可。

## 添加开发依赖

要使用await，包babel-polyfill是需要的：

npm i babel-core babel-polyfill babel-preset-es2015 babel-preset-stage-0 babel-loader --savedev
  
## .babelrc

  {
    "presets": [ "es2015", "stage-0" ]
  }


## webpack.config.js


  module.exports = {
    entry: ['babel-polyfill', './1.js'],


    output: {
      filename: 'bundle.js'       
    },


    module: {
      loaders: [
        { test: /\.jsx?$/, loader: 'babel', }
      ]
    }
  };

## then 

  $ webpack
  $ node bundle.js
输出：
  bar



