# 在node中使用await的方法 by webpack

## demo code

echo '
  "use strict";
  async function foo() {
    var s = await bar();
    console.log(s);
  }
  function bar() {
    return "bar";
  }
  foo()' > 1.js

  
  

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

echo '
  {
    "presets": [ "es2015", "stage-0" ]
  }'>.babelrc


## webpack.config.js

  echo "
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
  };" >webpack.config.js

## then 

  $ webpack
  $ node bundle.js
输出：
  bar


## more practical example

scapy from https://thomashunter.name/blog/the-long-road-to-asyncawait-in-javascript/

echo "
publishLevel(12, {data: true}).then(function(level_data) {
  console.log(level_data);
});

async function publishLevel(user_id, level_data) {
  var user = await getUser(user_id);
  var can_create = await canCreate(user);

  if (can_create) {
    var level = await saveLevel(user, level_data);
    return level;  
  }else{
    return null;
  }
}

function getUser(user_id) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({
        id: user_id,
        nickname: 'tlhunter'
      });
    }, 100);
  });
}

function canCreate(user) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve(user.id === 12);
    }, 100);
  });
}

function saveLevel(user, data) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve({
        id: 100,
        owner: user.nickname,
        data: data
      });
    }, 100);
  });
}
"> 1.js 


##  regeneratorRuntime is not defined

http://stackoverflow.com/questions/33527653/babel-6-regeneratorruntime-is-not-defined-with-async-await


--require babel-polyfill

# by polyfill

http://think2011.net/2015/11/09/ES7-Async-Await/

### demo code
  echo "
  var sleep = function (time) {
      return new Promise((resolve, reject) =>{
          setTimeout( () => {
              resolve(time);
          }, time);
      })
  };

  var start = async function () {
      console.log('start');
      console.log(await sleep(1000));
      console.log('end');
  };

  start();"> sleep.js
## bootstrap.js
  echo "
  require('babel-core/register');
  require('babel-polyfill');

  require('./sleep');
  "> bootscrap.js

## package.json
 
 echo '{
  "name": "ES7-Async-Await-Demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node bootstrap.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel": "^6.0.15",
    "babel-core": "^6.1.2",
    "request": "^2.65.0"
  },
  "devDependencies": {
    "babel-polyfill": "^6.0.16",
    "babel-preset-es2015": "^6.1.2",
    "babel-preset-stage-0": "^6.1.2"
  }
}
'> package.json


## .babelrc
echo '
{
  "presets": ["es2015", "stage-0"]
}'>.babelrc



