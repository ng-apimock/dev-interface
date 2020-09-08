const { config } = require('./protractor.conf');

config.multiCapabilities = [{
    browserName: 'chrome',
    maxInstances: 5,
    shardTestFiles: true,
    chromeOptions: {
        args: ['--no-sandbox', '--test-type=browser'],
        prefs: {
            download: {
                prompt_for_download: false,
                directory_upgrade: true,
                default_directory: '/tmp'
            }
        }
    }
}];

config.seleniumAddress = 'http://localhost:4444/wd/hub';

exports.config = config;
