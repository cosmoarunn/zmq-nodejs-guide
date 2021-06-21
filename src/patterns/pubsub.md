# Pubsub Pattern

A Publisher-Subscriber pattern. In this model, the Publisher doesn't wait for requests from a subscriber rather it goes on publishing things. Consider the radio station few decades ago. The programmes are broadcast and on the air any subscriber who wants to listen to the radio would turn on the radio and receive information. 

Here, the subscriber may come and go as they please. The Publisher's job is just to broadcast what they're told to.


:::: tabs

::: tab JScript
```
    // A simple PubSub pattern
    const zmq = require("zeromq")
    const publisher = new zmq.publisher
    const subscriber = new zmq.subscriber
    let count = 0;
    //
    async function runPublisher() { 
        await publisher.bind(`tcp://127.0.0.1:3000`)
        while(true) { 
            await publisher.send(["myChannel", `myChannel is broadcasting this message for ${count} times!`])
            await publisher.send(["yourChannel", "It's your channel!"])
        }
    }

    async function runSubscriber() { 
        await subscriber.connect(`tcp://127.0.0.1:3000`)
        //subscribe to channels
        Promise.all([
            subscriber.subscribe("myChannel")
        ])
    

        for await(const [topic, msg] of subscriber) {
            console.log(`received a message related to topic: ${topic}, containing message : ${msg.toString()}`)
            //once processed the message, check for interruption ctrl+x or ctrl+c
            if(interrupted) { 
                await subscriber.disconect()
                await subscriber.close()
                break;
            }
            await new Promise(resolve => setTimeout(resolve, 500));
        }

    }

    async function main() { 
        await Promise.all([
            runPublisher(),
            runSubscriber()
        ])
    }

    main()
        .catch(err => { 
            console.error(err)node
            process.exit()
        })
    
```
:::

::: tab TypeScript

:::

::::

::: tip Last Value Caching (LVC)
In Pubsub patterns, LVC is solves the problem of how a new subscriber catches up when  it joins the network. When the Publisher is notified that a new subscriber joined and subscribing to some topic, it rebroadcast the latest message for the topic, so the subscriber can get the Last Value of the topic.
:::
