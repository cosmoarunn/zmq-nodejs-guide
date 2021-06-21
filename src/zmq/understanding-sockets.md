# Understanding Sockets

Sockets are portals of network messaging and distributed computing. It's the definite endpoint of a two-way communication between two programs running on the network. A server opens a socket and wait on a port where all clients could connect to and tap the data that is transported. 
Clients may also use sockets to communicate themselves. It's all depending upon the configuration and pattern of the sockets involved. 


Any messaging library is just building or giving a way to build sockets and let them connect the networks. Without sockets, communication isn't that attractive. 

## The Socket Universe

ZeroMQ (ZMQ) is a brilliant messaging library that empowers programmers with a network of sockets for communication across a wide range of transport protocols. A most versatile concurrency framework written originally in 'C' language and made available in almost every programming language as of today. 

::: tip  Heterogeneity
Heterogeneity - a mouthful but 'bona fide' term to define ZMQ Sockets, because it offers an universe Sockets that can be assembled, decoupled or reconnected in patterns such as fan-out, pubsub, task distribution and last but not the least, traditional request-reply pattern.


