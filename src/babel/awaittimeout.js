const f = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(234);
    }, 20);
  });
};

const testAsync = async () => {
  try {
    const t = await f();
    console.log(t);
  } catch (err) {
    console.log(err);
  }
};

testAsync();
//  npm-run browserify -t babelify src/babel/awaittimeout.js | node
// const f1= () => {
//   return new Promise((resolve, reject) => {
//     var content;
//     var foo =  require('fs')
//     console.log(foo)
//     foo.readFile('awaittimeout.js', function read(err, data) {
//         if (err) {
//             reject(err);
//         }
//         resolve(data);
//     });
//   });
// };

// const testAsync1 = async () => {
//   try {
//     const t = await f1();
//     console.log(t);
//   } catch (err) {
//     console.log(err);
//   }
// };

// testAsync1();