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
        const child_process = require('child_process');
        const path = require('path');
        server = child_process.spawn('node',
            [path.join(__dirname, 'server.js')],
            {cwd: __dirname, stdio: 'inherit'});
        process.on('exit', () => server.kill());
    },

    onPrepare: async () => {
        require('ts-node').register({
            project: path.join(process.cwd(), 'test', 'tsconfig.e2e.json')
        });

        const chai = require('chai');
        global.chai = chai;
        global.expect = chai.expect;
    },
    afterLaunch: () => {
        server.kill();
    },
    SELENIUM_PROMISE_MANAGER: true,
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    cucumberOpts: {
        require: [
            path.join(__dirname, 'step_definitions', '*.steps.ts'),
            path.join(__dirname, 'cucumber.helper.ts')
        ],
        format: ['summary']
    }
};
