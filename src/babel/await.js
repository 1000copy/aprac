function timeout(ms,value) {
  return new Promise((resolve) => {
    setTimeout(function(){
    	resolve(value)
    }, ms);
  });
}

async function asyncPrint(value, ms) {
  var b = await timeout(ms,value);
  console.log(b)
}

asyncPrint('hello yo', 1);

// usage 

var f = `
npm i -g npm-run
npm i -D \
  browserify \
  babelify \
  babel-preset-es2015 \
  babel-preset-stage-3 \
  babel-runtime \
  babel-plugin-transform-runtime

echo '{
  "presets": ["es2015", "stage-3"],
  "plugins": ["transform-runtime"]
}' > .babelrc

cd ../..

 npm-run browserify -t babelify src/babel/await.js | node

`
