# ng-apimock/dev-interface [![npm](https://img.shields.io/npm/v/@ng-apimock/dev-interface?color=success)](https://www.npmjs.com/package/@ng-apimock/dev-interface) [![Build Status](https://github.com/ng-apimock/dev-interface/workflows/CI/badge.svg)](https://github.com/ng-apimock/dev-interface/actions?workflow=CI) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ng-apimock_dev-interface&metric=alert_status)](https://sonarcloud.io/dashboard?id=ng-apimock_dev-interface) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-success.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-success.svg)](https://github.com/semantic-release/semantic-release) [![Dependabot Status](https://img.shields.io/badge/Dependabot-active-success.svg?logo=dependabot)](https://dependabot.com) [![dependency Status](https://img.shields.io/david/ng-apimock/dev-interface.svg)](https://david-dm.org/ng-apimock/dev-interface) [![devDependency Status](https://img.shields.io/david/dev/ng-apimock/dev-interface.svg)](https://david-dm.org/ng-apimock/dev-interface#info=devDependencies) ![npm downloads](https://img.shields.io/npm/dm/@ng-apimock/dev-interface)
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
