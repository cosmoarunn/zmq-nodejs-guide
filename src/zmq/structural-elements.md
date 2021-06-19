# Building blocks of the ZeroMQ Socket Universe

Let's discuss the basic building blocks of the ZMQ sockets. Since there are plenty of articles available we confine our reading to basics and get the most essense out of it.

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

A low level mechanism of socets reaching out to themselves and initiate a communication among them. It's all taken care in the ZeroMQ library (libzmq) and we experience only the connections by just using a connect command.

## Request Sockets - REQ 

A Request socket implements zmq_connect() in a node and requests to a server which is usually implements zmq_bind(). Request sockets transforms themselves in to `client` and connects to an endpoint server.(even if it implements zmq_bind() on a different port and acts as a `server`). 

Request sockets are synchronous in nature and hence a mishandled socket connection could lead to undesired `deadlock` situation.

## Reply Sockets - REP

Reply sockets are usually `server` nodes which accepts connections from request sockets and answers the requests. When a Reply socket bound to an endpoint it starts accepting connections automatically. 

## Router & Dealer Sockets

A Router-Dealer is a most powerful socket combination. In contrast, it provides asynchronous clients talking to asynchronous servers, where both sides have full control over the message formats. When you handle the message formats between Router and Dealer, you eventually become a `Protocol Designer`. proud moment, yeah?

### Dealers

A Dealer is simply an asynchronous client that can talk to multiple Reply sockets (servers) and handle the response. Unlike Request sockets, a Dealer socket never waits for a reply from a Reply Socket. Any number of requests can be sent thus avoiding the deadlock.

::: tip
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


# Aliases 

## Subscribers

## Brokers

## Topology

An arrangment of a network using several combinations of ZMQ sockets that performs a specific set of tasks.


> ***Points to Ponder***
- A Dealer or Worker is nothing but an asynchronous Request (REQ) socket.
- A Router is basically a server which accepts connections from any request socket and serves the request
