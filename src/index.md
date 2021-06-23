---
home: true
heroImage: /pieter-hintgens.jpg
tagline: A comprehensive guide to socket programming in NodeJS
description: A comprehensive guide to programming sockets using ZeroMQ in NodeJS
actionText: Get Started! →
actionLink: /zmq/
features:
- title: Why ZeroMQ-NodeJS? 
  details: ZeroMQ Socket library promises and fulfills endless possibilities for programming network messaging and distributed computing using most versatile sockets. Both ZeroMQ & NodeJS are simple, easy to learn and use and most importantly event driven. 
- title: Who use ZeroMQ?
  details: Microsoft, Digital Ocean, Facebook, Spotify, AT&T, Samsung and may others including Bitcoin! ZeroMQ - Developed at iMatix and slead by Pieter Hintgens (http://hintjens.com/)
- title: Community
  details: Believe me, the ZeroMQ community is colossal and invisible to ordinary programmers. Everyday there's something new out there better than one existed yesterday!
footer: Made by Arun Panneerselvam using VuePress with ❤️ 

comment: false 
# comments: false
---
<div class="flex">
<div>
<mermaid>
flowchart LR
    subgraph BROKER
      direction TB
      subgraph B1
          direction RL
          w1[\Worker\] -->d1(Dealer)
          w2[\Worker\] -->d2(Dealer)
      end
      subgraph B2
          direction BT
          w3[\Worker\] -->d3(Dealer)
      end
    end
    subgraph TITANIC
      subgraph S1
        direction LR
        subgraph c1
          w4[\Worker\] --> DISK
          w5[\Worker\] --> DISK
        end
        subgraph c2
          direction RL
            w6[\Worker\] -->c1
            w7[\Worker\] --> s1
        end
      end
    end
  REQUEST --> BROKER --> TITANIC --> RESPONSE
  B1 --> B2
</mermaid> 
</div>
<div style="display:none">
  <pre>
flowchart LR
    subgraph BROKER
      direction TB
      subgraph B1
          direction RL
          w1[\Worker\] -->d1(Dealer)
          w2[\Worker\] -->d2(Dealer)
      end
      subgraph B2
          direction BT
          w3[\Worker\] -->d3(Dealer)
      end
    end
    subgraph TITANIC
      subgraph S1
        direction LR
        subgraph c1
          w4[\Worker4\] --> DISK
          w5[\Worker5\] --> DISK
        end
        subgraph c2
          direction RL
            w6[\Worker6\] -->c1
            w7[\Worker7\] --> c2
        end
      end
    end
  REQUEST --> BROKER --> TITANIC --> RESPONSE
  B1 --> B2
  </pre>
</div>
</div>
