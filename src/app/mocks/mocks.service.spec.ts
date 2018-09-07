import * as sinon from 'sinon';
import {HttpClient} from '@angular/common/http';
import {MocksService} from './mocks.service';
import {MockRequest} from './mock-request';

describe('MocksService', () => {
    let http: sinon.SinonStubbedInstance<HttpClient>;
    let request: sinon.SinonStubbedInstance<MockRequest>;
    let service: MocksService;

    beforeAll(() => {
        http = sinon.createStubInstance(HttpClient);
        request = sinon.createStubInstance(MockRequest);
        service = new MocksService(http as any);
    });

    describe('getMocks', () => it('gets the mocks', () => {
        service.getMocks();
        sinon.assert.calledWith(http.get, '/ngapimock/mocks');
    }));

    describe('updateMock', () => it('updates the mocks', () => {
        service.updateMock(request as any);
        sinon.assert.calledWith(http.put, '/ngapimock/mocks', request);
    }));

    describe('resetMocksToDefault', () => it('resets the mocks to default', () => {
        service.resetMocksToDefault();
        sinon.assert.calledWith(http.put, '/ngapimock/actions', { action: 'defaults' });
    }));

    describe('setMocksToPassThrough', () => it('sets the mocks to passThrough', () => {
        service.setMocksToPassThrough();
        sinon.assert.calledWith(http.put, '/ngapimock/actions', { action: 'passThroughs' });
    }));

    afterEach(() => {
        http.get.reset();
        http.put.reset();
    });
});
