# Simple REQ-REP 


```
// Hello World reply server in Node.js
// Connects REP socket to tcp://*:5560
// Expects "Hello" from client, replies with "World"

//reply.js

var zmq = require('zeromq')
  , rep = zmq.socket('rep');

rep.connect('tcp://127.0.0.1:5560');
rep.on('message', function(msg) {
  console.log('received request:', msg.toString());
  setTimeout(function() {
    responder.send("World");
  }, 1000);
});

Running the above scripts creats a reply server much like nginx or apache. 
```
The request client, 
```
//req.js : request client 

    var zmq       = require('zeromq')
    , requester = zmq.socket('req');

    const REPLY_SERVER_ENDPOINT = 'tcp://127.0.0.1:5560'

    async function request() { 
        const req = zmq.socket('req')
        req.connect(REPLY_SERVER_ENDPOINT)

        await(socket.send('Hello'))

        try { 
            req.on('message', (res) => {
                console.log(res)
            })
        }catch(e) { 
            console.trace(e)
        }

    }

```