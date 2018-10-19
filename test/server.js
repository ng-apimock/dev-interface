const apimock = require('@ng-apimock/core');
const connect = require('connect');
const path = require('path');
const serveStatic = require('serve-static');
const app = connect();
const testApplicationMocksDirectory = path.join(require.resolve('@ng-apimock/test-application'), '..', '..', 'mocks');
const testMocksDirectory = path.join(__dirname, 'mocks');

apimock.processor.process({src: testApplicationMocksDirectory});
apimock.processor.process({src: testMocksDirectory});

// use ng-apimock to test the web interface.
app.use(function (request, response, next) {
    if (request.url.startsWith('/ngapimock/') &&
        request.url !== '/ngapimock/recordings' &&
        request.url !== '/ngapimock/actions') {
        request.url = `/ngapimock-intercept/${request.url.substring(11)}`;
    }
    next();
});
app.use(apimock.middleware);
app.use('/dev-interface/', serveStatic(path.join(__dirname, '..', 'dist'), {index: ['index.html']}));
app.use('/', serveStatic(path.join(require.resolve('@ng-apimock/test-application'), '..')));
app.listen(9900);
console.log('ng-apimock-angular-test-app is running on port 9900');