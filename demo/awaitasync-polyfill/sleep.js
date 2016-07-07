
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

  start();
