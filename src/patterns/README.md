
# The Architecture

Core ZeroMQ library is built to mean the building blocks of network messaging and distributed computing named as 'Sockets'. Sockets communicate with each other with standard protocols defined in the core architecture.

The message (bytes of decorated data) being sent by the sockets could be a request or reply based on the type of socket employed on each end. In short, sockets are the terminal where everything happens. 

To learn more about the building blocks of ZeroMQ architecture, see [Structural Elements](/zmq/structural-elements.html)

## Socket Patterns

By placing the sockets appropriately and tweaking them to the need a fast, reliable and efficient network of sockets called as 'Socket Patterns' can be achieved. These socket patterns provide a structure to the entire distributed computing or simply network. 

ZeroMQ (ZMQ) is a brilliant messaging library that empowers programmers with a network of sockets for communication across a wide range of transport protocols. A most versatile concurrency framework written originally in 'C' language and made available in almost every programming language as of today. 


 **Heterogeneity** - a mouthful but a bona fide term to define ZMQ Sockets, because it furnishes magical sockets that can be assembled, decoupled or reconnected in patterns such as fan-out, pubsub, task distribution and last but not the least, traditional request-reply pattern.


A vivid feature of ZMQ sockets and patterns derived from it, is that it empolys asynchronus I/O model for a lightning fast message transport across inproc, IPC, TCP, UDP, TIPC, multicast and Websocket. 

ZMQ is actively used by Microsoft, Samsung, AT&T, Facebook, Digital Ocean and many other major communication & software companies.

The built-in core ZeroMQ patterns are:

**Request-reply**, which connects a set of clients to a set of services. This is a remote procedure call and task distribution pattern.

**Pub-sub**, which connects a set of publishers to a set of subscribers. This is a data distribution pattern.

**Pipeline**, which connects nodes in a fan-out/fan-in pattern that can have multiple steps and loops. This is a parallel task distribution and collection pattern.

**Exclusive pair**, which connects two sockets exclusively. This is a pattern for connecting two threads in a process, not to be confused with “normal” pairs of sockets.

::: tip
**Message oriented Middlware** -
a phrase to describe use of messages and sockets which are the de facto standard API for network programming.


