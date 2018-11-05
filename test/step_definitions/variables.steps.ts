import {Given, Then, When} from 'cucumber';
import {expect} from 'chai';
import {VariablesOverviewPo} from '../../src/app/variables/overview/overview.component.po';
import {browser} from 'protractor';
import {NgApimock} from '../ngapimock';

const { forEach } = require('p-iteration');
declare const ngApimock: NgApimock;

Given(/^I open the variables page$/, openVariablesPage);

When(/^I add variable (.*) with value (.*)$/, addVariable);
When(/^I update variable (.*) with (.*)$/, updateVariable);
When(/^I delete variable (.*)$/, deleteVariable);
When(/^I search for variables matching (.*)$/, search);

Then(/^the variables tab is active$/, checkVariablesTabIsActive);
Then(/^the following variables are present with state:$/, checkVariablesState);
Then(/^the variable (.*) with value (.*) is added$/, checkAddedValue);
Then(/^the variable (.*) is updated with value (.*)$/, checkUpdatedValue);
Then(/^the variable (.*) is deleted$/, checkDeleted);

async function addVariable(key: string, value: string): Promise<void> {
    await VariablesOverviewPo.actions.add(key, value);
}

async function checkAddedValue(key: string, value: string): Promise<void> {
    await browser.sleep(1000); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['add or update variable'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body[key]).to.equal(value);
}

async function checkDeleted(key: string): Promise<void> {
    await browser.sleep(1000); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['delete variable'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.url.endsWith(key)).to.equal(true);
}

async function checkUpdatedValue(key: string, value: string): Promise<void> {
    await browser.sleep(1000); // wait until the command has been finished
    const recordings = await ngApimock.getRecordings();
    const updateResponseRecordings = await recordings.recordings['add or update variable'];
    expect(updateResponseRecordings.length).to.equal(1);
    expect(updateResponseRecordings[0].request.body[key]).to.equal(value);
}

async function checkVariablesState(dataTable: any): Promise<void> {
    await forEach(dataTable.rows(), async (row, index) => {
        const variableRow = await VariablesOverviewPo.row(index);
        expect(await variableRow.key.getText()).to.equal(row[0]);
        expect(await variableRow.value.getAttribute('value')).to.equal(row[1]);
    });
}

async function checkVariablesTabIsActive(): Promise<void> {
    expect((await VariablesOverviewPo.isActive())).to.equal(true);
}

async function deleteVariable(key: string): Promise<void> {
    await VariablesOverviewPo.find(key).delete();
}

async function openVariablesPage(): Promise<void> {
    await ngApimock.recordRequests(true);
    await VariablesOverviewPo.navigateTo();
}

async function search(query: string): Promise<void> {
    await VariablesOverviewPo.actions.search(query);
}

async function updateVariable(key: string, value: string): Promise<void> {
    await VariablesOverviewPo.find(key).updateValue(value);
}
