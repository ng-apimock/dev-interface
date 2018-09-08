import * as sinon from 'sinon';

import {HttpClient} from '@angular/common/http';
import {RecordingsService} from './recordings.service';

describe('RecordingsService', () => {
    let http: sinon.SinonStubbedInstance<HttpClient>;
    let service: RecordingsService;

    beforeAll(() => {
        http = sinon.createStubInstance(HttpClient);
        service = new RecordingsService(http as any);
    });
    describe('getRecordings', () => it('gets the recordings', () => {
        service.getRecordings();
        sinon.assert.calledWith(http.get, '/ngapimock/recordings');
    }));

    describe('record', () => it('sets the recording indicator', () => {
        service.record(true);
        sinon.assert.calledWith(http.put, '/ngapimock/actions', { action: 'record', record: true });
    }));

    afterEach(() => {
        http.get.reset();
    });
});
