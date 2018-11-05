import {Given, Then, When} from 'cucumber';
import {MocksOverviewPo} from '../../src/app/mocks/overview/overview.component.po';
import {expect} from 'chai';
import {browser} from 'protractor';
import {NgApimock} from '../ngapimock';

const { forEach } = require('p-iteration');
declare const ngApimock: NgApimock;

Given(/^I open the mocks page$/, openMocksPage);

When(/^I select scenario (.*) for mock with name (.*)$/, selectScenario);
When(/^I update the delay to (.*) for mock with name (.*)$/, delayResponse);
When(/^I enable echoing for mock with name (.*)$/, toggleEchoing);
When(/^I disable echoing for mock with name (.*)$/, toggleEchoing);
When(/^I reset the mocks to defaults$/, resetToDefaults);
When(/^I set the mocks to passThroughs$/, setToPassThroughs);
When(/^I search for mocks matching (.*)$/, search);

Then(/^the mocks tab is active$/, checkMocksTabIsActive);
Then(/^the following mocks are present with state:$/, checkMocksState);
Then(/^the selected scenario for mock with name (.*) is changed to (.*)$/, checkSelectedScenario);
Then(/^the delay for mock with name (.*) is changed to (.*)$/, checkDelayResponse);
Then(/^echoing for mock with name (.*) is enabled$/, checkEchoingEnabled);
Then(/^echoing for mock with name (.*) is disabled/, checkEchoingDisabled);
Then(/^all mocks are reset to defaults$/, checkResetToDefaults);
Then(/^all mocks are set to passThrough$/, checkSetToPassThroughs);


async function checkDelayResponse(name: string, delay: string): Promise<void> {
    await browser.sleep(1000); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['update response'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body.name).to.equal(name);
    expect(updateResponseRecordings[0].request.body.delay).to.equal(Number(delay));
}

async function checkEchoingDisabled(name: string): Promise<void> {
    await browser.sleep(1000); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['update response'];
    expect(updateResponseRecordings.length).to.equal(2);
    expect(updateResponseRecordings[1].request.body.name).to.equal(name);
    expect(updateResponseRecordings[1].request.body.echo).to.equal(false);
}

async function checkEchoingEnabled(name: string): Promise<void> {
    await browser.sleep(1000); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['update response'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body.name).to.equal(name);
    expect(updateResponseRecordings[0].request.body.echo).to.equal(true);
}

async function checkResetToDefaults(): Promise<void> {
    await browser.sleep(1000); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const setToPassThroughRecordings = await recordings.recordings['reset to defaults'];
    expect(setToPassThroughRecordings.length).to.equal(1);
}

async function checkSetToPassThroughs(): Promise<void> {
    await browser.sleep(1000); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const setToPassThroughRecordings = await recordings.recordings['all to passThrough'];
    expect(setToPassThroughRecordings.length).to.equal(1);
}

async function checkMocksTabIsActive(): Promise<void> {
    expect((await MocksOverviewPo.isActive())).to.equal(true);
}

async function checkMocksState(dataTable: any): Promise<void> {
    await forEach(dataTable.rows(), async (row, index) => {
        const mockRow = await MocksOverviewPo.row(index);
        expect(await mockRow.name.getText()).to.equal(row[0]);
        expect(await mockRow.scenario.$$('option').filter((option) => option.isSelected()).first().getText()).to.equal(row[1]);
        expect(await mockRow.delay.getAttribute('value')).to.equal(row[2]);
    });
}

async function checkSelectedScenario(name: string, scenario: string): Promise<void> {
    await browser.sleep(100); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['update response'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body.name).to.equal(name);
    expect(updateResponseRecordings[0].request.body.scenario).to.equal(scenario);
}

async function delayResponse(delay: string, name: string): Promise<void> {
    await MocksOverviewPo.find(name).delayResponse(delay);
}

async function openMocksPage(): Promise<void> {
    await ngApimock.recordRequests(true);
    await MocksOverviewPo.navigateTo();
}

async function resetToDefaults(): Promise<void> {
    await MocksOverviewPo.actions.resetToDefaults();
}

async function search(query: string): Promise<void> {
    await MocksOverviewPo.actions.search(query);
}

async function setToPassThroughs(): Promise<void> {
    await MocksOverviewPo.actions.setToPassThroughs();
}

async function selectScenario(scenario: string, name: string): Promise<void> {
    await MocksOverviewPo.find(name).selectScenario(scenario);
}

async function toggleEchoing(name: string): Promise<void> {
    await MocksOverviewPo.find(name).toggleEcho();
}
