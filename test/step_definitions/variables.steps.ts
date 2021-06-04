import { Client } from '@ng-apimock/protractor-plugin';
import { expect } from 'chai';
import { Given, Then, When } from 'cucumber';

import { VariablesOverviewPo } from '../../src/app/variables/overview/overview.component.po';

const {forEach} = require('p-iteration');
declare const ngApimock: Client;

Given(/^I open the variables page$/, async (): Promise<void> => {
    await ngApimock.recordRequests(true);
    await VariablesOverviewPo.navigateTo();
});

When(/^I add variable (.*) with value (.*)$/, async (key: string, value: string): Promise<void> => {
    await VariablesOverviewPo.actions.add(key, value);
});
When(/^I update variable (.*) with (.*)$/, async (key: string, value: string): Promise<void> => {
    await VariablesOverviewPo.find(key).updateValue(value);
});
When(/^I delete variable (.*)$/, async (key: string): Promise<void> => {
    await VariablesOverviewPo.find(key).delete();
});
When(/^I search for variables matching (.*)$/, async (query: string): Promise<void> => {
    await VariablesOverviewPo.actions.search(query);
});

Then(/^the variables tab is active$/, async (): Promise<void> => {
    expect((await VariablesOverviewPo.isActive())).to.equal(true);
});
Then(/^the following variables are present with state:$/, async (dataTable: any): Promise<void> => {
    await forEach(dataTable.rows(), async (row, index) => {
        const variableRow = await VariablesOverviewPo.row(index);
        expect(await variableRow.key.getText()).to.equal(row[0]);
        expect(await variableRow.value.getAttribute('value')).to.equal(row[1]);
    });
});
Then(/^the variable (.*) with value (.*) is added$/, async (key: string, value: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['add or update variable'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body[key]).to.equal(value);
});
Then(/^the variable (.*) is updated with value (.*)$/, async (key: string, value: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['add or update variable'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body[key]).to.equal(value);
});
Then(/^the variable (.*) is deleted$/, async (key: string): Promise<void> => {
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['delete variable'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.url.endsWith(key)).to.equal(true);
});
