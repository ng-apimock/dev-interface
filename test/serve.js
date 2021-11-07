const path = require('path');

const apimock = require('@ng-apimock/core');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.set('port', 9999);

const mocksDirectory = path.join(__dirname, 'features');

apimock.processor.process({src: mocksDirectory, watch: true});

// use ng-apimock to test the web interface.
app.use(bodyParser.json());
app.use((request, response, next) => {
    if (request.url.startsWith('/ngapimock/')) {
        if (request.url !== '/ngapimock/recordings' &&
            request.url !== '/ngapimock/init' &&
            !(request.url === '/ngapimock/actions' && request.body.action === 'record')) {
            request.url = `/ngapimock-intercept/${request.url.substring(11)}`;
        }
        next();
    } else {
        next();
    }
});
app.use(apimock.middleware);
app.use('/dev-interface/', express.static(path.join(__dirname, '..', 'dist')));

app.listen(app.get('port'), () => {
    console.log('@ng-apimock/core running on port', app.get('port'));
    console.log('@ng-apimock/dev-interface is available under /dev-interface');
});
