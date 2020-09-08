import { createSpyObj } from 'jest-createspyobj';

import { HttpClient } from '@angular/common/http';

import { PresetsService } from './presets.service';
import { SelectPresetRequest } from './select-preset-request';

describe('PresetsService', () => {
    let http: jest.Mocked<HttpClient>;
    let request: jest.Mocked<SelectPresetRequest>;
    let service: PresetsService;

    beforeEach(() => {
        http = createSpyObj(HttpClient);
        request = createSpyObj(SelectPresetRequest);
        service = new PresetsService(http as any);
    });

    describe('getPresets', () => {
        it('gets the presets', () => {
            service.getPresets();
            expect(http.get).toHaveBeenCalledWith('/ngapimock/presets');
        });
    });

    describe('selectPreset', () => {
        it('selects the preset', () => {
            service.selectPreset(request as any);

            expect(http.put).toHaveBeenCalledWith('/ngapimock/presets', request);
        });
    });
});
