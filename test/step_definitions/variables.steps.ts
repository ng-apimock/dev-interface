import {Given, Then, When} from "@badeball/cypress-cucumber-preprocessor";
import {VariablesOverviewPo} from "../../src/app/variables/overview/overview.component.po";

Given(/^I open the variables page$/, () => {
    cy.recordRequests(true);
    VariablesOverviewPo.navigateTo('/dev-interface/#/variables');
});
When(/^I add variable (.*) with value (.*)$/, (key: string, value: string) => {
    VariablesOverviewPo.actions.add(key, value);

});
When(/^I update variable (.*) with (.*)$/, (key: string, value: string) => {
    VariablesOverviewPo.find(key).updateValue(value);
});
When(/^I delete variable (.*)$/, (key: string) => {
    VariablesOverviewPo.find(key).delete();
});
When(/^I search for variables matching (.*)$/, (query: string) => {
    VariablesOverviewPo.actions.search(query);
});
Then(/^the variables tab is active$/, () => {
    VariablesOverviewPo.isActive();
});
Then(/^the following variables are present with state:$/, (dataTable: any) => cy
    .then(() => {
        dataTable.hashes().forEach((h: Record<string, string>, index: number) => {
            VariablesOverviewPo.row(index).key.should('contain.text', h['key']);
            VariablesOverviewPo.row(index).value.should('contain.value', h['value']);
        });
    }));
Then(/^the variable (.*) with value (.*) is added$/, (key: string, value: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'add or update variable');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['add or update variable'][0].request.body[key]).to.equal(value);
    });
});
Then(/^the variable (.*) is updated with value (.*)$/, (key: string, value: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'add or update variable');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['add or update variable'][0].request.body[key]).to.equal(value);
    });
});
Then(/^the variable (.*) is deleted$/, (key: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'delete variable');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['delete variable'][0].request.url.endsWith(key)).to.equal(true);
    });
});
