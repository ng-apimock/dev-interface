import {assert, createStubInstance, SinonStubbedInstance} from 'sinon';
import {HttpClient} from '@angular/common/http';
import {MocksService} from './mocks.service';
import {MockRequest} from './mock-request';

describe('MocksService', () => {
    let http: SinonStubbedInstance<HttpClient>;
    let request: SinonStubbedInstance<MockRequest>;
    let service: MocksService;

    beforeAll(() => {
        http = createStubInstance(HttpClient);
        request = createStubInstance(MockRequest);
        service = new MocksService(http as any);
    });

    describe('getMocks', () => it('gets the mocks', () => {
        service.getMocks();
        assert.calledWith(http.get, '/ngapimock/mocks');
    }));

    describe('updateMock', () => it('updates the mocks', () => {
        service.updateMock(request as any);
        assert.calledWith(http.put, '/ngapimock/mocks', request);
    }));

    describe('resetMocksToDefault', () => it('resets the mocks to default', () => {
        service.resetMocksToDefault();
        assert.calledWith(http.put, '/ngapimock/actions', { action: 'defaults' });
    }));

    describe('setMocksToPassThrough', () => it('sets the mocks to passThrough', () => {
        service.setMocksToPassThrough();
        assert.calledWith(http.put, '/ngapimock/actions', { action: 'passThroughs' });
    }));

    afterEach(() => {
        http.get.reset();
        http.put.reset();
    });
});
