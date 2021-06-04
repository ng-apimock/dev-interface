import { Client } from '@ng-apimock/protractor-plugin';
import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';

import { CreatePresetPo } from '../../src/app/presets/create-preset/create-preset-component.po';
import { PresetsOverviewPo } from '../../src/app/presets/overview/overview.component.po';

const {forEach} = require('p-iteration');

declare const ngApimock: Client;

Given(/^I open the presets page$/, async (): Promise<void> => {
    await ngApimock.recordRequests(true);
    await PresetsOverviewPo.navigateTo();
});

When(/^I create preset (.*) with mocks and variables$/, async (name: string): Promise<void> => {
    await PresetsOverviewPo.actions.createPreset(name, false, false);
});
When(/^I create preset (.*) without mocks$/, async (name: string): Promise<void> => {
    await PresetsOverviewPo.actions.createPreset(name, true, false);
});
When(/^I create preset (.*) without variables$/, async (name: string): Promise<void> => {
    await PresetsOverviewPo.actions.createPreset(name, false, true);
});
When(/^I create preset (.*) without mocks and variables$/, async (name: string): Promise<void> => {
    await PresetsOverviewPo.actions.createPreset(name, true, true);
});
When(/^I search for presets matching (.*)$/, async (query: string): Promise<void> => {
    await PresetsOverviewPo.actions.search(query);
});
When(/^I select preset with name (.*)$/, async (name: string): Promise<void> => {
    await PresetsOverviewPo.find(name).selectPreset();
});

Then(/^the following presets are present:$/, async (dataTable: any): Promise<void> => {
    await forEach(dataTable.rows(), async (row, index) => {
        const presetRow = await PresetsOverviewPo.row(index);
        expect(await presetRow.name.getText()).to.equal(row[0]);
    });
});
Then(/^the presets tab is active$/, async (): Promise<void> => {
    expect((await PresetsOverviewPo.isActive())).to.equal(true);
});
Then(/^the selected preset with name (.*) is selected$/, async (name: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const selectPresetRecordings = await recordings.recordings['select preset'];
    expect(selectPresetRecordings.length).to.equal(1);
    expect(selectPresetRecordings[0].request.body.name).to.equal(name);
});

Then(/^the preset (.*) is created with mocks and variables$/, async (name: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const selectPresetRecordings = await recordings.recordings['create preset'];
    expect(selectPresetRecordings.length).to.equal(1);
    expect(selectPresetRecordings[0].request.body.name).to.equal(name);
    expect(selectPresetRecordings[0].request.body.mocks).to.not.eql({});
    expect(selectPresetRecordings[0].request.body.variables).to.not.eql({});
});

Then(/^the preset (.*) is created with variables but without mocks$/, async (name: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const selectPresetRecordings = await recordings.recordings['create preset'];
    expect(selectPresetRecordings.length).to.equal(2);
    expect(selectPresetRecordings[1].request.body.name).to.equal(name);
    expect(selectPresetRecordings[1].request.body.mocks).to.eql({});
    expect(selectPresetRecordings[1].request.body.variables).to.not.eql({});
});

Then(/^the preset (.*) is created with mocks but without variables$/, async (name: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const selectPresetRecordings = await recordings.recordings['create preset'];
    expect(selectPresetRecordings.length).to.equal(3);
    expect(selectPresetRecordings[2].request.body.name).to.equal(name);
    expect(selectPresetRecordings[2].request.body.mocks).to.not.eql({});
    expect(selectPresetRecordings[2].request.body.variables).to.eql({});
});

Then(/^An error with message '(.*)' has occured$/, async (message: string) => {
    expect(await CreatePresetPo.error().getText()).to.equal(message);
});
