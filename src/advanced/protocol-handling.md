# Protocols & Programming

In this section, we will cover how to implement and use standard and custom protocols using ZeroMQ.

## Protocols :saxophone:

 - TCP (Transmission Control protocol )
 - INPROC (In-Process Communications protocol)
 - IPC (Inter Process Communications - on POSIX)
 - TIPC (a nice protocol from Ericsson)
 - PGM (reliable multicast)
 - NORM (one more reliable multicast)
 - SOCKS5 
 - TOR

::: tip UDP Protocol
since version 4.2, libzmq supports UDP in Unicast and Multicast modes. ZMQ provies a set of unicast transports (inproc, ipc and tcp) and multicast transports (epgm, pgm). Multicast is an advanced technique and will be dealt in the upcoming chapters.
:::

 ### TCP (Transmission Control protocol )

Eventhough as many protocols it can talk to, libzmq (the core ZMQ library) is most widely using and focussing TCP protocol - the 'lingua franca' of distributed computing. TCP is `disconnected TCP' transport which is elastic, portable and fast enough for most socket patterns. 

### IPC (Inter-Process Communication)


### INPROC protocol (in process)

If you have wandered on our examples page, you may have noticed sockets connecting to `inproc://{someName}` and wondered why such in-process is needed in socket programming. 

Let's recall some aspects from the structural elements of a basic network in ZeroMQ.

- A server node can bind to many endpoints (with a single socket):heavy_check_mark:
- Server can accept connections across different transports :heavy_check_mark: 
- Many clients can connect and talk to a server :heavy_check_mark:
- A client can connect to server any number of times eventhough it's already connected and dropped. :recycle:
- In all transport mechanisms server can bind to the same endpoint twice :x:

Unlike UDP, other transports won't allow binding twice to the same endpoint. but the `ipc` transport does. It is for the process to recover from a failure or a crash. 



