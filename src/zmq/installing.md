# Installation & Configuration

The latest pre-built version of NodeJs can be found on the [NodeJS Website](https://nodejs.org/en/download/) Since NodeJS is opensource, you can also download the [source code](https://nodejs.org/dist/v14.17.1/node-v14.17.1.tar.gz) directly from the website and install it on the local machine.

To get started,

- A windows 10 or linux machine installed with NodeJS and NVM (Node Virtual Machine)
- A handy IDE like VSCode, NetBeans or Eclipse etc
- A basic knowledge in programming Javascript/Typescript using NodeJS



## Installing NodeJS
:::: tabs Installing NodeJS


::: tab windows
For 32-bit and 64-bit Windows operating systems,
visit NodeJS [Downloads Page] (https://nodejs.org/en/download/)

***node-gyp*** and windows requires Python 2.7 since version above 3.0 does not work. To make it work install Python 2.7.

:::

::: tab Linux
To compile from the source, download the source code directly [node-v14.17.1.tar.gz](https://nodejs.org/dist/v14.17.1/node-v14.17.1.tar.gz)

    ```
        mkdir /opt/downloads && /opt/downloads
        wget https://nodejs.org/dist/v14.17.1/node-v14.17.1.tar.gz
        tar -xzf node-v14.17.1.tar.gz 
        cd node-v14.17
        ./configure && make &&  make install

    ```
For ubuntu users, follow [How To Install Node.js on Ubuntu 18.04 | DigitalOcean] (https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-18-04)
:::

::: tab macOS
For MacOS distributions, follow **[How to Install Node.js and Create a Local Development Environment on macOS] (https://www.digitalocean.com/community/tutorials/how-to-install-node-js-and-create-a-local-development-environment-on-macos)**
:::

::::

::: tip Using Powershell on windows
Powershell enables you not just to automate tasks on cross-platform levels but using a command-line shell also helps you manage configurations, includes a scripting language. It runs on Windows, Linux and MacOS
Using Powershell to run the node scripts eliminates several issues and conflicts that arise using NodeJS on windows.  Learn more about [Powershell](https://docs.microsoft.com/en-us/powershell/powershell/scripting/overview?view=powershell-7.1). 

:::

## Typescript: Installing and setting up Typescript environment

### VS Code
Absolutely, Javascript is easy and go with examples by copy-paste or just to read and understand the code. First, We can start working with Javascript and slowly switch over to Typescript which provides a neat and better way of programming Javascript. As we all know, the final compiled Typescript code is just pure Javascript.

#### For Remote development
For a detailed remote installtion and how to use VS Code for Remote Development, refer [a DigitalOcean article](https://www.digitalocean.com/community/tutorials/how-to-use-visual-studio-code-for-remote-development-via-the-remote-ssh-plugin)

::: tip Visual Studio Code
For IDEs on Windows and Mac distributions, Visual Studio Code is suggested since it's more user-friendly and has multiple opensource extensions and other features to facilitate efficient coding environment.
::: 

## Installing ZMQ library


:::: tabs Create New Project

::: tab npm
        
        npm init
        #...answer the prompts to create a new project

        npm install zeromq@6.0.0 
:::

::: tab yarn

        yarn init
        #...answer the prompts to create a new project

        yarn add zeromq@6.0.0

:::
::::

this will create a a package.json file and install zermoq version 6.0.0