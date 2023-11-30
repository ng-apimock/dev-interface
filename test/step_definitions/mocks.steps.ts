import {Given, Then, When} from '@badeball/cypress-cucumber-preprocessor';
import {MocksOverviewPo} from "../../src/app/mocks/overview/overview.component.po";

Given(/^I open the mocks page$/, () => {
    cy.recordRequests(true);
    MocksOverviewPo.navigateTo('/dev-interface/#/mocks');
});
When(/^I select scenario (.*) for mock with name (.*)$/, (scenario: string, name: string) => {
    MocksOverviewPo.selectScenario(name, scenario);
});
When(/^I update the delay to (.*) for mock with name (.*)$/, (delay: string, name: string) => {
    MocksOverviewPo.find(name).delayResponse(delay);
});
When(/^I enable echoing for mock with name (.*)$/, (name: string) => {
    MocksOverviewPo.find(name).toggleEcho();
});
When(/^I disable echoing for mock with name (.*)$/, (name: string) => {
    MocksOverviewPo.find(name).toggleEcho();
});
When(/^I reset the mocks to defaults$/, () => {
    MocksOverviewPo.actions.resetToDefaults();
});
When(/^I set the mocks to passThroughs$/, () => {
    MocksOverviewPo.actions.setToPassThroughs();
});
When(/^I search for mocks matching (.*)$/, (query: string) => {
    MocksOverviewPo.actions.search(query);
});
Then(/^the mocks tab is active$/, () => {
    MocksOverviewPo.isActive()
});
Then(/^the following mocks are present with state:$/, (dataTable: any) => cy
    .then(() => {
        dataTable.hashes().forEach((h: Record<string, string>, index: number) => {
            MocksOverviewPo.row(index).name.should('contain.text', h['name']);
            MocksOverviewPo.row(index).scenario.should('contain.text', h['scenario']);
            MocksOverviewPo.row(index).delay.should('contain.value.value', h['delay']);
        });
    }));
Then(/^the selected scenario for mock with name (.*) is changed to (.*)$/, (name: string, scenario: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'update response');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['update response'][0].request.body.name).to.equal(name);
        expect(recordings.recordings['update response'][0].request.body.scenario).to.equal(scenario);
    });
});
Then(/^the delay for mock with name (.*) is changed to (.*)$/, (name: string, delay: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'update response');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['update response'][0].request.body.name).to.equal(name);
        expect(recordings.recordings['update response'][0].request.body.delay).to.equal(Number(delay));
    });
});
Then(/^echoing for mock with name (.*) is enabled$/, (name: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'update response');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['update response'][0].request.body.name).to.equal(name);
        expect(recordings.recordings['update response'][0].request.body.echo).to.equal(true);
    });
});
Then(/^echoing for mock with name (.*) is disabled/, (name: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'update response');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['update response'][1].request.body.name).to.equal(name);
        expect(recordings.recordings['update response'][1].request.body.echo).to.equal(false);
    });
});
Then(/^all mocks are reset to defaults$/, () => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'reset to defaults');
        expect(matchingRecording.length).to.equal(1)
    });
});
Then(/^all mocks are set to passThrough$/, () => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'all to passThrough');
        expect(matchingRecording.length).to.equal(1)
    });
});
