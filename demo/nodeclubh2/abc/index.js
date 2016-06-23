
'use strict'
const fs = require('fs')
const Hapi = require('hapi')
const Http2 = require('http2')
var path = require('path');

let listener = Http2.createServer({
 key: fs.readFileSync(path.resolve(__dirname, './localhost.key')),
        cert: fs.readFileSync(path.resolve(__dirname, './localhost.crt'))
})

if (!listener.address) {
  listener.address = function() {
    return this._server.address()
  }
}


const Inert = require('inert');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    }
});
server.connection({ listener:listener,port: 3000 });

server.register(Inert, () => {});

server.route({
    method: 'GET',
    path: '/ajax/topics',
    handler: function (request, reply) {
        var url ="./img/88caadc211781b5ba82d07e435443213"
        a(function(err,topics){
            if (!err){
              
              reply(topics);    
            }
            else
                reply(err)
        })
    }
});
server.route({
    method: 'GET',
    path: '/ajax/1',
    handler: function (request, reply) {
        a(function(err,topics){
            if (!err)
                reply(topics);    
            else
                reply(err)
        })
        
        
    }
});
// cb (err,topics)
function a (cb){
    var url ="./img/88caadc211781b5ba82d07e435443213"
    var a = [
               { title: 'Learn JavaScript' ,replys : 1111,visits:3,avatar:url},
             ] 
    var Topic = require("./node/proxy/topic")
    var User = require("./node/proxy/user")
    var query  ={} //all
    var options = { skip: 0, limit: 10, sort: '-top -last_reply_at'};
    Topic.getTopicsByQuery(query, options, function(err,topics){
        if (err == null){
          var _          = require('lodash');
          topics = topics.map(function (topic) {
            return _.pick(topic, ['id', 'tab', 'title', 'reply_count', 'visit_count', 'create_at','author_id']);
          });
            var EventProxy = require("eventproxy")
            var ep = new EventProxy();
            ep.after('got_avatar', topics.length, function (list) {
                console.log(topics)
                cb(null,topics)
            });
            for (var i = 0; i < topics.length; i++) {
                var topic = topics[i]
                User.getUserById(topic.author_id,function(err,user){
                    // console.log(err,user,topic.author_id)
                    if(err == null){
                         topic.avatar = User.getGravatar(user)
                         ep.emit('got_avatar', topic);
                    }
                })
            }
          // topics = topics.map(function (topic) {

          //   User.getUserById(topic.author_id,function(err,user){
          //       // console.log(err,user,topic.author_id)
          //       if(err == null){
          //           topic.avatar = User.getGravatar(user)
          //           return topic
          //       }
          //   })
          // });
          // console.log(topics)
          
        }else
          cb(err)

    });
}
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