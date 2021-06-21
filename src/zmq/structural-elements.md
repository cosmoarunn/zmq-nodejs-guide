# Building blocks of the ZeroMQ Socket Universe

Let's discuss the basic building blocks of the ZMQ sockets. Since there are plenty of articles available on the internet we confine our reading to basics and get the most essense out of it.

## Sockets
Fundamental block of Core ZMQ Architecture employs protocols,

 - TCP (Transmission Control protocol )
 - INPROC (In-Process Communications protocol)
 - IPC (Inter Process Communications - on POSIX)
 - TIPC (a nice protocol from Ericsson)
 - PGM (reliable multicast)
 - NORM (one more reliable multicast)
 - SOCKS5 
 - TOR

 since version 4.2, libzmq supports UDP in Unicast and Multicast modes.

Eventhough as many protocols it can talk to, libzmq (the core ZMQ library) is most widely using and focussing TCP protocol - the 'lingua franca' of distributed computing.

A single socket may have many outgoing and many incoming connections. All connections happen in the background and ZeroMQ will automatically reconnect if the network connection is interrupted or lost. 

Here's a list of basic building blocks of core ZMQ architecture.

## Connections

A low level mechanism of sockets reaching out to themselves and initiate a communication among them. It's all taken care under-the-hood in the low level ZeroMQ library (libzmq) and we experience only the connections by just using a connect command.

  
        publisher.bind(`tcp://127.0.0.1:3000`)
        subscriber.connect(`tcp://127.0.0.1:3000`)
    

<mermaid>
graph LR
    id1(Rep server)-- Connection --> id2(Req Client)
    style id1 fill:#f9f,stroke:#333,stroke-width:4px
    style id2 fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
</mermaid>

## Messages
The information that is transported from one endpoint to another. The Message is bi-directional. If a client request something, it's still a Message. A standard ZMQ message contains three basic frames, viz., Identity Frame, Empty delimiter Frame and Data Frame. 


## Message Envelope
To keep track of the activities of sockets and debugging, a protocol is needed to send the messages across the sockets. The message is added with chunks of data to form an envelope which identifies the requesting socket and the responding server. To achieve a message envelope, a set of frames are used as a Message Envelope.
<mermaid>
erDiagram
    MESSAGE ||--o{ SOCKET : allows
    MESSAGE {
        string identity
        string empty-delimiter
        string data
    }
    REPLY ||--o{ SOCKET : is
    REPLY {
        string delimiter
        string Data
    }
</mermaid>

### Frames
- Frame 1: identity of the connection in string form such as 'ABC'
- Frame 2: an empty delimiter frame (usually '0')
- Frame 3: the original data that is communicated (data frame)

On occasions, a minimal envelope, just a delimiter and data frame would suffice the requirement. But when it is debugging time in a heavy topology, we don't want hassle.

## Request Sockets - REQ 

A Request socket implements zmq_connect() in a node and requests to a server which is usually implements zmq_bind(). Request sockets transforms themselves in to `client` and connects to an endpoint server.(even if it implements zmq_bind() on a different port and acts as a `server`). 

::: danger Mishandling ZMQ Sockets
Request sockets are synchronous in nature and hence a mishandled socket connection could lead to undesired results or `deadlock` situation.
:::

## Reply Sockets - REP

Reply sockets are usually `server` nodes which accepts connections from request sockets and answers the requests. When a Reply socket bound to an endpoint it starts accepting connections automatically. 

## Router & Dealer Sockets

A Router-Dealer is a most powerful socket combination. In contrast, it provides asynchronous clients talking to asynchronous servers, where both sides have full control over the message formats. When you handle the message formats between Router and Dealer, you eventually become a `Protocol Designer`. proud moment, yeah?

### Dealers

A Dealer is simply an asynchronous client that can talk to multiple Reply sockets (servers) and handle the response. Unlike Request sockets, a Dealer socket never waits for a reply from a Reply Socket. Any number of requests can be sent thus avoiding the deadlock.

::: warning Dealer Should emulate the enveolop of a REQ socket
 A Dealer socket should emulate the envelope that the conventional REQ socket would've sent, or the REP socket will sure discard the message as invalid request. Usually sending an empty message with 'MORE' flag set and sending the message body is a better practice.
:::

### Routers

 - think of it like a internet router
 - a proxy that switches messages between frontend and backend sockets.

### extensions & limitations

In a network **Topology** Any number of combinations can exist, such as,
- REQ to Router
- Dealer to Router
- Dealer to Dealer
- Router to Router

some combinations are invalid and not to be used in order to avoid undesired results in the network. Conside the following combinations,

- REQ to REQ (Just close your eyes and think you order pizza to the pizzeria and pizzeria orders pizza to you)
- REQ to Dealer: you could in theory do this, but it would break if you added a second REQ because DEALER has no way of sending a reply to the original peer. Thus the REQ socket would get confused, and/or return messages meant for another client.
- REP to REP: both sides would wait for the other to send the first message.
- REP to Router: the ROUTER socket can in theory initiate the dialog and send a properly-formatted request, if it knows the REP socket has connected and it knows the identity of that connection. It’s messy and adds nothing over DEALER to ROUTER.

## Brokers

A Broker socket is a well decorated Router that keeps track of Dealer/Worker sockets and Client/Request sockets to dispatch the requests once they're ready and available. It's mainly uses a network proxy that handles the requests and dispatch them to respective Dealer or Worker sockets. It accepts connections from both clients and worker sockets readily and holds the requests in a single queue. When the Broker receives replies from the workers, it then sends the replies back to respective clients.

Broker can connect and communicate another broker as well. And thus, load distribution is handled and scalability is achieved as the requirements grow.

#### Load Balancing Broker

Load Balancing Brokers comprises of a Frontend Router which identifies and accepts client requests and proxy requests to a Backend Router which dispatches the request to worker and proxy the results back. The proxy that acts between the Frontend Router and Backend Router is the **Load Balancer**
<mermaid>
flowchart TB
  subgraph LOAD BALANCING BROKER
    direction TB
    subgraph CLIENTS
        direction LR
        subgraph C1
            direction TB
            c1(Client) -->r1(Request)
        end
        direction TB
        subgraph C2
            direction TB
            c2(Client) -->r2(Request)
        end
        direction TB
        subgraph C3
            direction TB
            c3(Client) -->r3(Request)
        end
    end
    subgraph LOAD_BALANCER
        direction BT
        i(Proxy) -->be(Router BackEnd)
        be(Router BackEnd) -->i(Proxy)
        i(Load Balancing Proxy) -->fe(Router FrontEnd)
        fe(Router FrontEnd) --> i(Load Balancing Proxy)
        style i fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5
    end
    subgraph WORKERS
        direction LR
        subgraph W1
            direction BT
            w1(Worker) --> rr1(Request)
            w1(Worker) --> rp2(Reply)
        end
        direction TB
        subgraph W2
            direction BT
            w2(Worker)  --> rr2(Request/Reply)
        end
        direction TB
        subgraph W3
            direction BT
            w3(Worker)  --> rr3(Request/Reply)
        end
    end
  end
  CLIENTS --> LOAD_BALANCER --> WORKERS
  WORKERS --> LOAD_BALANCER --> CLIENTS
</mermaid>

# Publishers & Subcribers

Publishers are much like a radio or TV station or even NewsPapers. The subscribers are clients who start the channel would receive live broadcast events and miss everything that the publisher did broadcast before. It's a complex one Reply to many Requests scenario but there is no request made to the Publisher. Many things could go wrong. So, a Publisher doesn't hold any responsibility for who's connecting to it and who's leaving the network. 

The Publisher has many channels of which interested Subscriber can connect and receive live data. It's Subscriber's responsibilty to ensure connectivity and verify the data it received. 

There are several different types of Publisher exists with several differnt issues to be resolved. We will learn more about some of them in out [Patterns](http://localhost:5500/patterns/pubsub.html) section.



## Topology

An arrangment of a network using several combinations of ZMQ sockets that performs a specific set of tasks. A network is a global term which still can define many topologies together under a single roof. Topology mainly defines the number of structural elements used in a context and the arrangement of these elements and routes and connections made amongst them.


> ***Points to Ponder***
- A Dealer or Worker is nothing but an asynchronous Request (REQ) socket.
- A Router is basically a server which accepts connections from any request socket and serves the request
