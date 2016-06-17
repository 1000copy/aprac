var foo =  require("fs")
foo.readFile('./src/readfile.js', function read(err, data) {
        console.log(data)
    });
  