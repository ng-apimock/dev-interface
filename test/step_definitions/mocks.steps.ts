import { Client } from '@ng-apimock/protractor-plugin';
import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';

import { MocksOverviewPo } from '../../src/app/mocks/overview/overview.component.po';

const {forEach} = require('p-iteration');
declare const ngApimock: Client;

Given(/^I open the mocks page$/, async (): Promise<void> => {
    await ngApimock.recordRequests(true);
    await MocksOverviewPo.navigateTo();
});

When(/^I select scenario (.*) for mock with name (.*)$/, async (scenario: string, name: string): Promise<void> => {
    await MocksOverviewPo.selectScenario(name, scenario);
});
When(/^I update the delay to (.*) for mock with name (.*)$/, async (delay: string, name: string): Promise<void> => {
    await MocksOverviewPo.find(name).delayResponse(delay);
});
When(/^I enable echoing for mock with name (.*)$/, async (name: string): Promise<void> => {
    await MocksOverviewPo.find(name).toggleEcho();
});
When(/^I disable echoing for mock with name (.*)$/, async (name: string): Promise<void> => {
    await MocksOverviewPo.find(name).toggleEcho();
});
When(/^I reset the mocks to defaults$/, async (): Promise<void> => {
    await MocksOverviewPo.actions.resetToDefaults();
});
When(/^I set the mocks to passThroughs$/, async (): Promise<void> => {
    await MocksOverviewPo.actions.setToPassThroughs();
});
When(/^I search for mocks matching (.*)$/, async (query: string): Promise<void> => {
    await MocksOverviewPo.actions.search(query);
});

Then(/^the mocks tab is active$/, async (): Promise<void> => {
    expect((await MocksOverviewPo.isActive())).to.equal(true);
});
Then(/^the following mocks are present with state:$/, async (dataTable: any): Promise<void> => {
    await forEach(dataTable.rows(), async (row, index) => {
        const mockRow = await MocksOverviewPo.row(index);
        expect(await mockRow.name).to.equal(row[0]);
        expect(await mockRow.scenario).to.equal(row[1]);
        expect(await mockRow.delay.getAttribute('value')).to.equal(row[2]);
    });
});
Then(/^the selected scenario for mock with name (.*) is changed to (.*)$/, async (name: string, scenario: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['update response'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body.name).to.equal(name);
    expect(updateResponseRecordings[0].request.body.scenario).to.equal(scenario);
});
Then(/^the delay for mock with name (.*) is changed to (.*)$/, async (name: string, delay: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['update response'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body.name).to.equal(name);
    expect(updateResponseRecordings[0].request.body.delay).to.equal(Number(delay));
});
Then(/^echoing for mock with name (.*) is enabled$/, async (name: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['update response'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body.name).to.equal(name);
    expect(updateResponseRecordings[0].request.body.echo).to.equal(true);
});
Then(/^echoing for mock with name (.*) is disabled/, async (name: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['update response'];
    expect(updateResponseRecordings.length).to.equal(2);
    expect(updateResponseRecordings[1].request.body.name).to.equal(name);
    expect(updateResponseRecordings[1].request.body.echo).to.equal(false);
});
Then(/^all mocks are reset to defaults$/, async (): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const setToPassThroughRecordings = await recordings.recordings['reset to defaults'];
    expect(setToPassThroughRecordings.length).to.equal(1);
});
Then(/^all mocks are set to passThrough$/, async (): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const setToPassThroughRecordings = await recordings.recordings['all to passThrough'];
    expect(setToPassThroughRecordings.length).to.equal(1);
});
