(() => {
    const {Given, Then, When, setDefaultTimeout} = require('cucumber');
    const {forEach} = require('p-iteration');

    setDefaultTimeout(60 * 1000);

    const client = new (require('../pos/client.po'))();

    Given(/^I open the dev interface$/, openDevInterface);

    When(/^I select scenario (.*) for mock with name (.*)$/, selectScenario);

    When(/^I update the delay to (.*) for mock with name (.*)$/, delayResponse);

    When(/^I enable echoing for mock with name (.*)$/, enableEchoing);

    Then(/^the (.*) tab is active$/, tabIsActive);

    Then(/^the following mocks are present:$/, checkMocksPresent);

    Then(/^the following mocks state is set:$/, checkMockState);

    Then(/^the selected scenario for mock with name (.*) is changed to (.*)$/, checkSelectedScenario);

    Then(/^the delay for mock with name (.*) is changed to (.*)$/, checkDelayResponse);

    Then(/^echoing for mock with name (.*) is enabled$/, checkEchoingEnabled);

    async function checkMocksPresent(dataTable) {
        await forEach(dataTable.rows(), async (row, index) => {
            const mockRow = await client.tabs.mocks.row(index);
            expect(await mockRow.name.getText()).to.equal(row[0]);
        });
    }

    async function checkMockState(dataTable) {
        await forEach(dataTable.rows(), async (row, index) => {
            const mockRow = await client.tabs.mocks.row(index);
            expect(await mockRow.name.getText()).to.equal(row[0]);
            expect(await mockRow.scenario.$$('option').filter((option) => option.isSelected()).first().getText()).to.equal(row[1]);
            expect(await mockRow.delay.getAttribute('value')).to.equal(row[2]);
        });
    }

    async function checkEchoingEnabled(name) {
        await browser.sleep(1000); // wait until the command has been finished
        const recordings = await ngApimock.getRecordings();
        const updateResponseRecordings = await recordings.recordings['updateResponse'];
        expect(updateResponseRecordings.length).to.equal(1);
        expect(updateResponseRecordings[0].request.body.name).to.equal(name);
        expect(updateResponseRecordings[0].request.body.echo).to.equal(true);
    }

    async function checkDelayResponse(name, delay) {
        await browser.sleep(1000); // wait until the command has been finished
        const recordings = await ngApimock.getRecordings();
        const updateResponseRecordings = await recordings.recordings['updateResponse'];
        expect(updateResponseRecordings.length).to.equal(1);
        expect(updateResponseRecordings[0].request.body.name).to.equal(name);
        expect(updateResponseRecordings[0].request.body.delay).to.equal(Number(delay));
    }

    async function checkSelectedScenario(name, scenario) {
        await browser.sleep(100); // wait until the command has been finished
        const recordings = await ngApimock.getRecordings();
        const updateResponseRecordings = await recordings.recordings['updateResponse'];
        expect(updateResponseRecordings.length).to.equal(1);
        expect(updateResponseRecordings[0].request.body.name).to.equal(name);
        expect(updateResponseRecordings[0].request.body.scenario).to.equal(scenario);
    }

    async function delayResponse(delay, name) {
        const delayEl = await client.tabs.mocks.find(name).delay;
        await delayEl.sendKeys(delay);
    }

    async function enableEchoing(name) {
        const echoEl = await client.tabs.mocks.find(name).echo;
        await echoEl.click();
    }

    async function openDevInterface() {
        await ngApimock.recordRequests(true);
        await client.open();
    }

    async function selectScenario(scenario, name) {
        const scenarioEl = await client.tabs.mocks.find(name).scenario;
        await scenarioEl.$(`[value='${scenario}']`).click();
    }

    async function tabIsActive(tab) {
        expect(await client.tabs[tab].isActive()).to.equal(true);
    }
})();