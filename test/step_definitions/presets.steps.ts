import {Given, Then, When} from 'cucumber';
import {PresetsOverviewPo} from '../../src/app/presets/overview/overview.component.po';
import {expect} from 'chai';
import {Client} from '@ng-apimock/protractor-plugin';
import {MocksOverviewPo} from '../../src/app/mocks/overview/overview.component.po';
import {browser} from 'protractor';

const { forEach } = require('p-iteration');

declare const ngApimock: Client;

Given(/^I open the presets page$/, openPresetsPage);

When(/^I search for presets matching (.*)$/, search);
When(/^I select preset with name (.*)$/, selectPreset);

Then(/^the following presets are present:$/, checkPresets);
Then(/^the presets tab is active$/, checkPresetsTabIsActive);
Then(/^the selected preset with name (.*) is selected$/, checkSelectedPreset);


async function checkPresetsTabIsActive(): Promise<void> {
    expect((await PresetsOverviewPo.isActive())).to.equal(true);
}

async function checkPresets(dataTable: any): Promise<void> {
    await forEach(dataTable.rows(), async (row, index) => {
        const presetRow = await PresetsOverviewPo.row(index);
        expect(await presetRow.name.getText()).to.equal(row[0]);
    });
}

async function checkSelectedPreset(name: string): Promise<void> {
    await browser.sleep(100); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const selectPresetRecordings = await recordings.recordings['select preset'];
    expect(selectPresetRecordings.length).to.equal(1);
    expect(selectPresetRecordings[0].request.body.name).to.equal(name);
}

async function openPresetsPage(): Promise<void> {
    await ngApimock.recordRequests(true);
    await PresetsOverviewPo.navigateTo();
}

async function search(query: string): Promise<void> {
    await PresetsOverviewPo.actions.search(query);
}

async function selectPreset(name: string): Promise<void> {
    await PresetsOverviewPo.find(name).selectPreset();
}
