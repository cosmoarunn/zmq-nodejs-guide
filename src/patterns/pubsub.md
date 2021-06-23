# Pubsub Pattern
In this article, you will learn how to implement a Publisher-Subscrber (PUBSUB) pattern using ZeroMQ sockets in NodeJS. 
- You will configure a project from the start to build and see the true nature of zmq sockets. 
ZeroMQ sockets have several advantages over conventional sockets such as lighting fast, accuracy, simplified message envelopes and so on.  
- Upon finishing the tutorial you will be able to run a PUBSUB for static resources serving on a tcp port. 
The ZeroMQ PubSub patterns provides a way to consistently supply data on a port of the host machine. 
You will be able to supply static resources such as news or stock price, you name it. 

- At the end of this tutorial, you will start a new project and configure NodeJS environment to learn step-by-step implementation of a PUBSUB pattern.

## Publisher-Subscriber pattern. 
A Publisher-Subscriber pattern is a famous and widely used pattern in almose all live projects involving dynamic content. In this pattern, the Publisher constantly streaming data on one endpoint and does not wait for requests from a client/subscriber rather it goes on publishing things. Consider the radio station few decades ago. The programmes are broadcast and on the air any subscriber who wants to listen to the radio would turn on the radio and receive information. 
Here, the subscriber may come and go as they please. The clients appear or vanish, it will have no effect on the Publisher. The Publisher's job is just to broadcast what it is asked to.

If you need millions of messages per second sent to thousands of subscribers, your choice should be a PubSub pattern and you will appreciate it. 

To visualize a sample 'Hello <-> World' between a publisher and a few subscribers,
<iframe width="560" height="315" src="https://www.youtube.com/embed/duOk2f_n28Q?autoplay=1&loop=1&playlist=PLDR3dNpIEUI_yW23UfE9cP7eAn2mmZuwY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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

### Step 3 — Writing a Publisher
In this step, you will learn how to write a Publisher that behaves as a source of information that is to be transported by identifying the clients and their requests. To define a Publisher, we use our usual local newspaper as a typical example. The newspaper publishes content without expecting anyone to read it. The subscribers buy it and read it if they want to. 

So, a basic publisher model shall have a source of information and `Publisher` Socket bound on a port of the local or remote machine.

Import the zmq library using,

```   
    const zmq = require("zeromq"),
    publisher = zmq.socket('pub')
```
Now, you have a publisher socket declared. At this point, it's important to know that NodeJS versions running on Node V8 engine provides a fantastic way of **async/await** feature. Before that, Node has to deal with Promises and function chaining. 

:bulb: **Tip**
::: tip  Async/Await
It is important that the any function `async` needs to be declared before awaiting for any function that returns a Promise object. 
:::

In this scenario, you need to wait for the publisher to initialize and then binding itself to the port to become available for the subscribers. To do that,

```
const zmq = require("zeromq"),
publisher = zmq.socket('pub')

const ENDPOINT = `tcp://127.0.0.1:4480`

async function startPublisher() { 
    console.log(`Staring Publisher..`)
    await publisher.bind(ENDPOINT)
}

startPublisher()
    .catch(e) { 
        console.trace(e)
    }
    
```

Did you notice that the `startPublisher()` function is chained with a `.then(()=> ...)` pattern? This is because, the async qualifier makes the declared function a promise and acts as one as well. Also, we can wait for any function to complete the task usint `await` keyword prepended to it. Go ahead, and run the script, if any error is caught, you will see a trace of it for debugging.


The publisher is started and active on the endpoint but it's not publishing anything. To publish a few things, we shall have an infinite loop using a `while` and send a message in a channel. To achieve this,

```
while(!interrupted) { // a continuous publishing loop
    await publisher.send(["myChannel", `myChannel is broadcasting this message for ${count++} times!`])
}
```
The above script is going to run the publisher and publish things continuoulsy until `interrupted`. Why we need this?

During development and debugging, you will run publishers and subscribers each time and every time you run, a publisher socket is bound to a port. You need to release the resources upon exit or you may have to do it manually that eats up a considerable amount of coding time. So, we may capture and use the `ctrl+c `. So we add a variable named `interrupted` and if it's true, we shut down our publisher. Sounds interesting? cool, we also add a `count` variable to know how many publishing has been made and to see where exactly a client started it's subscription. Just for informational use, nothing else.
Let's add this just below the `host` declaration. And it all looks like, 

```
const zmq = require("zeromq"),
publisher = zmq.socket('pub')

const ENDPOINT = `tcp://127.0.0.1:4480`
let count = 0, interrupted = false;

process.on('SIGINT', function() {
    interrupted = true;
})

async function startPublisher() { 
    console.log(`Staring Publisher..`)
    await publisher.bind(ENDPOINT)
    console.log(`Publisher started..`)

    while(true) { // a prominent continuous publishing loop
        await publisher.send(["myChannel", `myChannel is broadcasting this message for ${count++} times!`])
        await publisher.send(["yourChannel", "It's your channel!"])
        await new Promise(resolve => setTimeout(resolve, 1000));  //time delay a second between each publishing
    }
}

startPublisher()
    .catch(e) { 
        console.trace(e)
    }
    
```
notice that, 
```
await publisher.send(["myChannel", `myChannel is broadcasting this message for ${count++} times!`])
```
The publisher is sending two channels namely "myChannel" and "yourChannel". The subscribers mention this to listen to the channel on the first argument and the message on the second argument. Now, the subscriber can identify the channel or topic and extract only the message from it. We will see that in the Subscriber part.

### Step 4 — Writing a Subscriber
In this step, you will learn how an ZeroMQ socket acts as a subscriber and how it connects to a publisher in order receive the synced information.

The Subscriber's main function is to initialize and connect to a port where a Publisher's bound and publishing. In order to do that, let use the readily availble "sub" socket using `zmq.socket('sub')` and run an async function to connect and subscribe.

```
const zmq = require("zeromq")
      subscriber = zmq.socket("sub")

const ENDPOINT = `tcp://127.0.0.1:4480`
let interrupted = false

async function runSubscriber() { 
    await subscriber.connect(ENDPOINT)
    await subscriber.subscribe("myChannel")
}
```

Quite simple - Isn't it? Yes, the subscriber is an entity which can connect to a publisher socket and listen to a specific channel. Here, `await subscriber.subscribe("myChannel")` entitles the subscriber to listen to only "myChannel" from the endpoint.

In order to visualize the message that is received on the subscriber,

try {
    subscriber.on('message', async(topic, msg) => { 
        console.log(`received a message related to topic: ${topic}, containing message: ${msg.toString() }`)
    })
}catch(err) { 
    console.log(`timeout expired waiting for channel`)
    console.error(err)
    shutDown()
}
To let the subscriber wait and kill itself if there's no channel, we use an async timer for one second or 1000ms (earlier on the Publisher we set a 1000ms which is a sync for the subscriber as well) and hence the subscriber is synced with the publisher. You should use `msg.toString()` to see the message in human readable form because the data sent/received is a "Integer buffer" on socket levels. We use the same shutDown procedure we used for the Publisher.

### Step 5 — Bringing it all together
In this step, you will run the Publisher & Subscriber to see how the messaging pattern working and how to improve the messaging using security and synchronization techniques

To bring it all together, open the terminal and type,
```
    node publisher.js
```

<iframe width="560" height="315" src="https://www.youtube.com/embed/duOk2f_n28Q?autoplay=1&loop=1&playlist=PLDR3dNpIEUI_yW23UfE9cP7eAn2mmZuwY" title="YouTube video player" frameborder="0" autoplay="true" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Open a few more terminal for the `node subscriber.js` and see that the publisher continue to publish and the subscriber starts (the count) receiving message whenever it's connecting. Try to close one of the subscribers and see the others continue to receive it.

Whenever you start a new subscriber, you can see that the subcriber connects only to the specific channel and receive the broadcast. Also, the subscriber starts from the live message rather than any message previously broadcast. The Publisher uses LVC (Last Value Caching) to keep the subscriber informed about the most recent publishing.



### Step 6 — Related issues to resolve
In this step, you will learn about the issues that might arise in a network communication model.

- Authenticating a subscriber connection
- Tracking the subscribers
- Providing an index for the channel 
- Encrypting the messages for a secure communication 
- Using `ipc` or `inproc` protocol for the pubsub pattern

## Conclusion

A Publisher-Subscriber pattern can be very useful for constant streaming of data for the clients who dynamically connecting and requesting specific channels of data. A publisher might be able to keep track of and segregate the the subscribers and even learn their way of 'looking for a channel of information' behaviour and then it can identify even if there's a identification fault occurs. 

A publisher in a production environment faces a very hard battle than one in our example. A publisher sends each message to "all of many", and scalability is expected in a great deal. Publisher is dealing with a situation to send large volumes of data, rapidly to several recipients. A hub of Publishers can be interconnected to distribute the subscriber load under the hood.

In an advanced Publisher-Subscriber architecture, A Publisher can even commence a specific deep learning pattern of subscriber sockets and their behaviour and adjust or re-program itself to provide the subscribers.

## Script Implementation

:::: tabs

::: tab JScript
```
----------------------------------------------------
    // Publisher.js
----------------------------------------------------
const zmq = require("zeromq"),
      publisher = zmq.socket('pub')

let count = 0, interrupted = false;
//
async function startPublisher() { 
    await publisher.bind(`tcp://127.0.0.1:4480`)
    console.log(`Publisher started..`)
    while(true) { // a continuous publishing loop
        if(interrupted) 
            shutDown()
        await publisher.send(["myChannel", `myChannel is broadcasting this message for ${count++} times!`])
        await publisher.send(["yourChannel", "It's your channel!"])
        //delay a second between each publishing
        await new Promise(resolve => setTimeout(resolve, 1000)); 
    }
}

//handle ctl+x event
process.on('SIGINT', function() {
    interrupted = true
});

function shutDown() { 
    console.log('Interrupted with ctrl+c. Shutting down publisher...')
    Promise.all([
        publisher.close(),
        console.log(`done!`),
        process.exit()
    ])
}
// Run main publisher thread
startPublisher()
```
::: warning Async delays
This example 'Subscriber.js' is using resolved async promises to simulate a time delay
:::
```
------------------------------------------------------
// Subscriber.js
------------------------------------------------------

const zmq = require("zeromq"),
      subscriber = zmq.socket('sub')
let interrupted = false

async function runSubscriber() { 
    await subscriber.connect(`tcp://127.0.0.1:4480`)  
      
    await subscriber.subscribe("myChannel")

    try { 
        subscriber.on('message', async(topic, msg) => {  
          console.log(`received a message related to topic: ${topic}, containing message : ${msg.toString()}`)
          if(interrupted)  
                shutDown()
        })
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (err) { console.log(err)
        console.log(`timeout expired waiting for channel..`)
        shutDown()
      }
}

//handle ctl+x event
process.on('SIGINT', function() {
    interrupted = true
});

function shutDown() { 
    console.log('Interrupted with ctrl+c. Shutting down subscriber...')
    Promise.all([
        subscriber.close(),
        console.log(`done!`),
        process.exit()
    ])
    
}

runSubscriber()
    .catch((err) => { 
        console.trace(err)
    })
    
```
:::

::: tab TypeScript

:::

::::

::: tip Last Value Caching (LVC)
In Pubsub patterns, LVC is solves the problem of how a new subscriber catches up when  it joins the network. When the Publisher is notified that a new subscriber joined and subscribing to some topic, it rebroadcast the latest message for the topic, so the subscriber can get the Last Value of the topic.
:::
