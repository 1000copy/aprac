const Path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ port: 3000 });

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/ajax/topics',
    handler: function (request, reply) {
        var url ="./img/88caadc211781b5ba82d07e435443213"
        reply([
               { title: 'Learn JavaScript' ,replys : 1111,visits:3,avatar:url},
               { title: 'Learn Vue.js' ,replys : 2,visits:2,avatar:url},
               { title: 'Build Something Awesome' ,replys : 3,visits:1,avatar:url}
             ]);
    }
});
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: '.',
            redirectToSlash: true,
            index: true
        }
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log('Server running at:', server.info.uri);
});