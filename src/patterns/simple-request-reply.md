# Simple Request-Reply Socket Pattern

A very basic and easy to implement pattern and let's call it REQ-REP pattern. To lay out the principle, you order a pizza and the pizza is delivered to you by the Pizzeria.

Let's think this way. You are sitting in a pizzeria and ordering a pizza. Here, you're the **client** and the server of the Pizzeria is simply the **server**. Between you and pizzeria information is transferred such as,

- client (you) say 'Hello' 
- server (the server in pizzeria) says 'Hello, how can i serve you?'
- you make your choice  from the menu and order a pizza 
- server acknowledges receipt of your request 
- you wait until server gets you the pizza
- server brings you the pizza 
- request fulfilled with a reply!

Usually you say 'thanks', the request is fulfilled and server answers other client's call. But in our REQ-REP socket pattern, the reply server sockets continue to wait for request client sockets or at least in our code. Notice that I used 'sockets' instead of socket. Yes, in the underlying mechanism, there are a number of sockets created and destroyed to handle each specific tasks in various socket patterns.

This is a typical example of simple request-reply socket pattern. A request is made and a reply is given. 

Of course, in real socket messaging it won't be exactly like this. In order to protect the data transmitted over the network, after 'hand shaking', a message header may be used to identify the client. The messages transmitted over the network would be sure encrypted. ZMQ offers reliable and handy encryption methods such as **CurveServer**.

Between the server and the pizza that is served to you, one or more workers involved in the process. We can call them 'workers' or 'dealers' since they deal with the server's request and work on it. More on this later.

:::: tabs

::: tab javascript
#### Javascript implementation of a Req-Rep pattern
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
        //usual way of expecting a message from a socket
        try { 
            req.on('message', (res) => {
                console.log(res)
            })
        }catch(e) { 
            console.trace(e)
        }

    }

```
:::

::: tab typescript
#### Typescript implementation of a Req-Rep pattern
```
Typescript version
```
:::

::::

::: danger Deadlocks
** REQ-REP deadlock!!!
You should be aware of a phenomenon called REQ-REP deadlock. If you notice the Request server is enclosed in an async function. Implementation in languages such as C, C++, C# or such requires to handle async requests manually. Luckily, NodeJS takes care of that burden for us.

Hassels of a deadlock includes, 
- there is no such socket link-management interface exposed to user to test/reset the state of the FSA-to-FSA link in ZeroMQ framework.
- Loss of data transmitted or simply loss of connectivity between the REQ & REP.
- Impossible to recover either socket from a deadlock
- Impossible to reset the sockets when a deadlock happens
:::

::: tip Hands On
- run a reply server and console log the events' messages 