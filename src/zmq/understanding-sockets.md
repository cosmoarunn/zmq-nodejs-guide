# Understanding Sockets

Sockets are portals of network messaging and distributed computing. It's the definite endpoint of a two-way communication between two programs running on the network. A server opens a socket and wait on a port where all clients could connect to and tap the data that is transported. 
Clients may also use sockets to communicate themselves. It's all depending upon the configuration and pattern of the sockets involved. 


Any messaging library is just building or giving a way to build sockets and let them connect the networks. Without sockets, communication isn't that attractive. 

## The Socket Universe

ZeroMQ (ZMQ) is a brilliant messaging library that empowers programmers with a network of sockets for communication across a wide range of transport protocols. A most versatile concurrency framework written originally in 'C' language and made available in almost every programming language as of today. 

::: tip  Heterogeneity
Heterogeneity - a mouthful but 'bona fide' term to define ZMQ Sockets, because it offers an universe Sockets that can be assembled, decoupled or reconnected in patterns such as fan-out, pubsub, task distribution and last but not the least, traditional request-reply pattern.
:::
### Socket types

The socket types and node typings for Typescript are up-to-date in latest zmq node packages (v5, v6 or latest) with the libzmq core socket types.

The recent versions of libzmq has typically includes,
| Socket Type   | Jscript            | Node Typing(ts)|
| ------------- |:-------------------:| --------------:|
| Request       | zmq.socket('req')   | zmq.Request    |
| Reply         | zmq.socket('rep')   | zmq.Reply      |
| Pull   | zmq.socket('pull')  | zmq.Pull       |
| Push   | zmq.socket('push')  | zmq.Push       |
| Pair   | zmq.socket('pair')  | zmq.Pair       |
| Router | zmq.socket('router')| zmq.Router     |
| Dealer | zmq.socket('dealer')| zmq.Dealer     |
| Publisher     | zmq.socket('pub')   | zmq.Publisher  |
| Subscriber     | zmq.socket('sub')   | zmq.Subscriber |
| Stream | zmq.socket('stream')| zmq.Stream     |
| XPublisher    | zmq.socket('xpub')  | zmq.XPublisher |
| XSubscriber     | zmq.socket('xsub')  | zmq.XSubscriber |
| Proxy | zmq.socket('proxy')| zmq.Proxy     |
| Xreq | zmq.socket('xreq')| zmq.Router     |

Some of these sockets and their operation is explained in great detail in our [Structural Elements](/zmq/structural-elements.html) section


