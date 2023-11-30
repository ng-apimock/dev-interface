import {Given, Then, When} from '@badeball/cypress-cucumber-preprocessor';
import {PresetsOverviewPo} from '../../src/app/presets/overview/overview.component.po';
import {CreatePresetPo} from "../../src/app/presets/create-preset/create-preset-component.po";

Given(/^I open the presets page$/, () => {
    cy.recordRequests(true);
    PresetsOverviewPo.navigateTo('/dev-interface/#/presets');
});
When(/^I create preset (.*) with mocks and variables$/, (name: string) => {
    PresetsOverviewPo.actions.createPreset(name, false, false);
});
When(/^I create preset (.*) without mocks$/, (name: string) => {
    PresetsOverviewPo.actions.createPreset(name, true, false);
});
When(/^I create preset (.*) without variables$/, (name: string) => {
    PresetsOverviewPo.actions.createPreset(name, false, true);
});
When(/^I create preset (.*) without mocks and variables$/, (name: string) => {
    PresetsOverviewPo.actions.createPreset(name, true, true);
});
When(/^I search for presets matching (.*)$/, (query: string) => {
    PresetsOverviewPo.actions.search(query);
});
When(/^I select preset with name (.*)$/, (name: string) => {
    PresetsOverviewPo.find(name).selectPreset();
});
Then(/^the following presets are present:$/, (dataTable: any) => cy
    .then(() => {
        dataTable.hashes().forEach((h: Record<string, string>, index: number) => {
            PresetsOverviewPo.row(index).name.should('contain.text', h['name']);
        });
    }));
Then(/^the presets tab is active$/, () => {
    PresetsOverviewPo.isActive();
});
Then(/^the selected preset with name (.*) is selected$/, (name: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'select preset');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['select preset'][0].request.body.name).to.equal(name);
    });
});
Then(/^the preset (.*) is created with mocks and variables$/, (name: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'create preset');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['create preset'][0].request.body.name).to.equal(name);
        expect(recordings.recordings['create preset'][0].request.body.mocks).to.not.eql({});
        expect(recordings.recordings['create preset'][0].request.body.variables).to.not.eql({});
    });
});
Then(/^the preset (.*) is created with variables but without mocks$/, (name: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'create preset');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['create preset'][0].request.body.name).to.equal(name);
        expect(recordings.recordings['create preset'][0].request.body.mocks).to.eql({});
        expect(recordings.recordings['create preset'][0].request.body.variables).to.not.eql({});
    });
});
Then(/^the preset (.*) is created with mocks but without variables$/, (name: string) => {
    cy.getRecordings().then(recordings => {
        const matchingRecording = Object.keys(recordings.recordings).filter(key => key == 'create preset');
        expect(matchingRecording.length).to.equal(1)
        expect(recordings.recordings['create preset'][0].request.body.name).to.equal(name);
        expect(recordings.recordings['create preset'][0].request.body.mocks).to.not.eql({});
        expect(recordings.recordings['create preset'][0].request.body.variables).to.eql({});
    });
});
Then(/^An error with message '(.*)' has occured$/, (message: string) => {
    CreatePresetPo.error().should('contains.text', message);
});
