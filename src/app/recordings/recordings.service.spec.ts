import { createSpyObj } from 'jest-createspyobj';

import { HttpClient } from '@angular/common/http';

import { RecordingsService } from './recordings.service';

describe('RecordingsService', () => {
    let http: jest.Mocked<HttpClient>;
    let service: RecordingsService;

    beforeAll(() => {
        http = createSpyObj(HttpClient);
        service = new RecordingsService(http as any);
    });
    describe('getRecordings', () => {
        it('gets the recordings', () => {
            service.getRecordings();
            expect(http.get).toHaveBeenCalledWith('/ngapimock/recordings');
        });
    });

    describe('record', () => {
        it('sets the recording indicator', () => {
            service.record(true);
            expect(http.put).toHaveBeenCalledWith('/ngapimock/actions', { action: 'record', record: true });
        });
    });
});
