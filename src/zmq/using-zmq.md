# Using ZMQ with NodeJS

## Why NodeJS?

When it comes to deciding to write models or messaging patterns in ZMQ, it's possible to choose & use a wide spectrum of programming languages. Eventhough originally written in C programming, ZMQ is today extended to almost all other languages such as C++, Python, Ruby etc

But to kick start the app and to see some actions in real time, NodeJS is one of the best choice.

NodeJS is an `asynchronous event-driven` JavaScript runtime. There it is, clearly says that it best suits ZMQ library and it's core functionalities. The extension of zmq using NodeJS is relatively simplified using the NodeJS way.

It doesn't mean it's limited to NodeJS, since almost every web application written in every other programming language uses sockets one way or the other in order to make content dynamic and provide a first class user experience. 

Other merits of NodeJS includes, 
- `JavaScript` - as we all know 'Java' is easy to learn and code!
-  relatively `simple & easy to learn` at get started
- `scalability` - a most important factor that governs major projects today
- `reliability` - stands on Google's V8 engine 
- `community driven` - several open source node modules (a block of code packaged and can be assembled together to serve specific tasks) with active community support 
- `Asynchronus I/O model` 
- `Module Caching`
- `Concurrency`
- ...many more

with that being said, NodeJS simplifies many complex routines of ZMQ and offers a relatively easy-to-use socket library.

## Typescript or Javascript?

Typescript is transpiler which provides a compiled output in Javascript. It's more traceable and convenient to code when you're switching to larger projects where a heavy typing is needed. It's better you start with Typescript. Javascript is easy to learn and use even for a someone new to the programming world and relatively 'go with examples' by copy-paste or to read and understand the code. We can start working with Javascript and slowly switch over to Typescript which provides a neat and better way of programming Javascript. As we all know, the final compiled Typescript code is just pure Javascript.

>Wish everything goes with Typescript than just Javascript!


## Pre-requisites

To get started,

- A windows 10 or linux machine installed with NodeJS and NVM (Node Virtual Machine)
- A handy IDE like VSCode, NetBeans or Eclipse etc
- A basic knowledge in programming Javascript/Typescript using NodeJS

::: warning Question: Can I write my own HTTP Server in ZeroMQ?
> **Of course, you can write your own HTTP Server in ZeroMQ. If any other socket can do the job, ZeroMQ can do it even much faster and better. ZeroMQ uses frames in message transport. It's the protocol. For instance, A HTTP protocol uses / as a delimiter where as ZeroMQ socket uses a number or the length of the frame. ZeroMQ provides an option called ZMQ_Router_RAW, with which you can read/write data without ZeroMQ framing.**
:::




