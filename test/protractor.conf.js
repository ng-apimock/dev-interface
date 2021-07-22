const path = require('path');

let server;

exports.config = {
    allScriptsTimeout: 5000,
    baseUrl: 'http://127.0.0.1:9999/',
    params: {
        default_directory: '/tmp'
    },
    specs: [
        path.join(__dirname, 'features', '**', '*.feature')
    ],
    plugins: [{
        package: '@ng-apimock/protractor-plugin',
    }],
    beforeLaunch: () => {
        const childProcess = require('child_process');
        server = childProcess.spawn('node',
            [path.join(__dirname, 'server.js')],
            {
                cwd: __dirname,
                stdio: 'inherit'
            });
        process.on('exit', () => server.kill());
    },
    afterLaunch: () => {
        server.kill();
    },
    SELENIUM_PROMISE_MANAGER: true,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        compiler: require('ts-node')
            .register({
                project: path.posix.join(process.cwd(), 'test', 'tsconfig.e2e.json')
            }),
        require: [
            path.join(__dirname, 'step_definitions', '*.steps.ts'),
            path.join(__dirname, 'cucumber.helper.ts')
        ],
        format: ['summary']
    }
};
