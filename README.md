# ng-apimock/dev-interface
The development interface for ng-apimock. 

## Getting Started

```shell
npm install @ng-apimock/dev-interface --save-dev
```

Once the plugin has been installed, you can require it with this line of JavaScript:

```javascript
const devInterface = require('@ng-apimock/dev-interface');
```
 
## How does it work
The development interface is a small web application that connects to the @ng-apimock/core middelware and exposes all it's features in the ui.


## Usage
In order to use the development interface you can add it to your serve configuration like this:

```javascript
const connect = require('connect');
const app = connect();

app.use('/dev-interface/', serveStatic(devInterface));
```

The development interface can now be used by navigating to http://localhost:9000/dev-interface.

The development interface looks like this:

![alt tag](https://raw.githubusercontent.com/ng-apimock/dev-interface/master/images/dev-interface.png)