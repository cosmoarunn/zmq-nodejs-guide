# Simple Request-Reply Socket Pattern
In this article, you will learn how to implement a simple Request-Reply pattern using ZeroMQ sockets in NodeJS. 
- You will configure a project from the start to build and see the true nature of zmq sockets. 
- Upon finishing the tutorial you will be able to run a Request-Reply for a sample message serving on a tcp port by the REP Server. 

- At the end of this tutorial, you will start a new project and configure NodeJS environment to learn step-by-step implementation of a Request-Reply pattern.

## The Principle
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

## Tutorial Outcome
To visualize a sample 'Request <-> Reply' between a Request client and a Reply server,
<iframe width="560" height="315" src="https://www.youtube.com/embed/pJPvQ5vpzIs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


## Prerequisites 

- A windows 10 or linux machine installed with NodeJS and NVM (Node Virtual Machine)
- A handy IDE like VSCode, ATOM, NetBeans or Eclipse etc
- A basic knowledge in programming Javascript/Typescript using NodeJS


## Outline

### Step 1 — Installing NodeJS in local and remote environments

The latest pre-built version of NodeJs can be found on the NodeJS Website (opens new window) Since NodeJS is opensource, you can also download the source code (opens new window) directly from the website and install it on the local machine. 

To learn how to install NodeJS and configure development environment follow [Installation & Configuration](https://zmq-nodejs.arunpanneerselvam.com/zmq/installing.html#installing-nodejs)

### Step 2 — Installing ZeroMQ library
To install ZeroMQ library on the local or remote machine, follow [Installing ZMQ library](https://zmq-nodejs.arunpanneerselvam.com/zmq/installing.html#installing-zmq-library

In this step, you will install the latest ZeroMQ library from Github, that works with the version of NodeJS we are using.

### Step 3 — Writing a Reply Server


### Step 4 - Writing a Request Client



### Step 5 - Putting it all together


## Conclusion



## Script Implementation
:::: tabs

::: tab javascript
#### Javascript implementation of a Req-Rep pattern
```
// Hello World reply server in Node.js
// Connects REP socket to tcp://*:5560
// Expects "Hello" from client, replies with "World"

//reqrep.server.js

var zmq = require('zeromq')
  , responder = zmq.socket('rep');
let interrupted = false;

//handle ctl+x event
process.on('SIGINT', function() {
  interrupted = true
});

responder.bind('tcp://127.0.0.1:5560');
responder.on('message', function(msg) {
  if(interrupted)  //check for interruptions 
    shutDown()
  console.log('received request:', msg.toString() );
  setTimeout(function() {
    responder.send("World");
  }, 1000);  
 
});

function shutDown() { 
  console.log('Interrupted with ctrl+c. Shutting down Reply server...')
    Promise.all([
      responder.close(),
        console.log(`done!`),
        process.exit()
    ])
}

```
The request client, 
```
//reqrep.client.js : request client 

    
    var zmq       = require('zeromq')
    , req = zmq.socket('req');

    const REPLY_SERVER_ENDPOINT = 'tcp://127.0.0.1:5560'
    
    async function request() { 
        const req = zmq.socket('req')
        req.connect(REPLY_SERVER_ENDPOINT)

        await(req.send('Hello'))
        //usual way of expecting a message from a socket
        try { 
            req.on('message', (res) => {
                console.log(`=> ${res.toString()}`)
            })
        }catch(e) { 
            console.trace(e)
        }

    }


    request()

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
REQ-REP deadlock!!!
You should be aware of such phenomenon. Did you notice the Request server is enclosed in an async function block? This is to wait for sequence of operations to be completed before commencing message transport. Implementation in languages such as C, C++, C# or such requires to handle async requests manually. Luckily, NodeJS takes care of that burden for us.

Hassels of a deadlock includes, 
- there is no such socket link-management interface exposed to user to test/reset the state of the FSA-to-FSA link in ZeroMQ framework.
- Loss of data transmitted or simply loss of connectivity between the REQ & REP.
- Impossible to recover either socket from a deadlock
- Impossible to reset the sockets when a deadlock happens
:::

::: tip Hands On
- run a reply server and console log the events' messages 