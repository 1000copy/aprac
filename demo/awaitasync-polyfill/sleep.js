
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

// start();
var mongoose = require('mongoose');
  
var a = ()=>{
  mongoose.connect('mongodb://localhost/test');
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
  });

  var kittySchema = mongoose.Schema({
      name: String
  });
  mongoose.model('Kitten', kittySchema);
}

function b(){
  var Kitten = mongoose.model('Kitten');
  
  var fluffy = new Kitten({ name: 'fluffy' });
  // fluffy.speak(); // "Meow name is fluffy"

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    // fluffy.speak();
  });


  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens.length);
  })
  Kitten.find({ name: /^fluff/ }, (err,kittens)=>{
    if (err) return console.error(err);
    // console.log()
    console.log(kittens.length);
  });
}
a()
b()