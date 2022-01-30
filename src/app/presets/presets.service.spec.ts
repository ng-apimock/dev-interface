import { createSpyObj } from 'jest-createspyobj';

import { HttpClient } from '@angular/common/http';

import { PresetsService } from './presets.service';

describe('PresetsService', () => {
    let http: jest.Mocked<HttpClient>;
    let service: PresetsService;

    beforeEach(() => {
        http = createSpyObj(HttpClient);
        service = new PresetsService(http as any);
    });

    describe('createPreset', () => {
        it('selects the preset', () => {
            service.createPreset({ name: 'somepreset', mocks: {}, variables: {} });

            expect(http.post).toHaveBeenCalledWith('/ngapimock/presets', {
                name: 'somepreset',
                mocks: {},
                variables: {}
            }, { responseType: 'blob' });
        });
    });

    describe('getPresets', () => {
        it('gets the presets', () => {
            service.getPresets();
            expect(http.get).toHaveBeenCalledWith('/ngapimock/presets');
        });
    });

    describe('selectPreset', () => {
        it('selects the preset', () => {
            service.selectPreset({ name: 'somepreset' });

            expect(http.put).toHaveBeenCalledWith('/ngapimock/presets', { name: 'somepreset' }, { "responseType": "text" });
        });
    });
});

