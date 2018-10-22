const apimock = require('@ng-apimock/core');
const connect = require('connect');
const path = require('path');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const app = connect();
const testMocksDirectory = path.join(__dirname, 'mocks');

apimock.processor.process({src: testMocksDirectory});
app.use(bodyParser.json());
// use ng-apimock to test the web interface.
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
app.use('/dev-interface/', serveStatic(path.join(__dirname, '..', 'dist'), {index: ['index.html']}));
app.use('/', serveStatic(path.join(require.resolve('@ng-apimock/test-application'), '..')));
app.listen(9900);
console.log('ng-apimock-angular-test-app is running on port 9900');