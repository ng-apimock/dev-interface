const apimock = require('@ng-apimock/core');
const connect = require('connect');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const app = connect();
const testMocksDirectory = path.join(__dirname, 'features');

apimock.processor.process({src: testMocksDirectory, watch: true});

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
app.use('/dev-interface/', serveStatic(path.join(__dirname, '..', 'dist')));
app.listen(9999);
console.log('Server is running on port 9999');
console.log('dev-interface is accessible under http://localhost:9999/dev-interface');
