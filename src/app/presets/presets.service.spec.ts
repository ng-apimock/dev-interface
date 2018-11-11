import * as sinon from 'sinon';
import {HttpClient} from '@angular/common/http';
import {PresetsService} from './presets.service';
import {SelectPresetRequest} from './select-preset-request';

describe('PresetsService', () => {
    let http: sinon.SinonStubbedInstance<HttpClient>;
    let request: sinon.SinonStubbedInstance<SelectPresetRequest>;
    let service: PresetsService;

    beforeAll(() => {
        http = sinon.createStubInstance(HttpClient);
        request = sinon.createStubInstance(SelectPresetRequest);
        service = new PresetsService(http as any);
    });

    describe('getPresets', () => it('gets the presets', () => {
        service.getPresets();
        sinon.assert.calledWith(http.get, '/ngapimock/presets');
    }));

    describe('selectPreset', () => it('selects the preset', () => {
        service.selectPreset(request as any);
        sinon.assert.calledWith(http.put, '/ngapimock/presets', request);
    }));

    afterEach(() => {
        http.get.reset();
        http.put.reset();
    });
});
