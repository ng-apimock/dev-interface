const { config } = require('./protractor.conf');

config.params = {
    environment: 'CI',
    default_directory: '/tmp'
};

config.sauceUser = process.env.SAUCE_USERNAME;
config.sauceKey = process.env.SAUCE_ACCESS_KEY;

config.multiCapabilities = [{
    browserName: 'chrome',
    name: 'ngApimock - protractor',
    'tunnel-identifier': process.env.GITHUB_RUN_ID,
    build: process.env.GITHUB_RUN_ID,
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

exports.config = config;
