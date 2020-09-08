import { createSpyObj } from 'jest-createspyobj';

import { HttpClient } from '@angular/common/http';

import { MockRequest } from './mock-request';
import { MocksService } from './mocks.service';

describe('MocksService', () => {
    let http: jest.Mocked<HttpClient>;
    let request: jest.Mocked<MockRequest>;
    let service: MocksService;

    beforeEach(() => {
        http = createSpyObj(HttpClient);
        request = createSpyObj(MockRequest);
        service = new MocksService(http as any);
    });

    describe('getMocks', () => {
        it('gets the mocks', () => {
            service.getMocks();
            expect(http.get).toHaveBeenCalledWith('/ngapimock/mocks');
        });
    });

    describe('updateMock', () => {
        it('updates the mocks', () => {
            service.updateMock(request as any);
            expect(http.put).toHaveBeenCalledWith('/ngapimock/mocks', request);
        });
    });

    describe('resetMocksToDefault', () => {
        it('resets the mocks to default', () => {
            service.resetMocksToDefault();
            expect(http.put).toHaveBeenCalledWith('/ngapimock/actions', { action: 'defaults' });
        });
    });

    describe('setMocksToPassThrough', () => {
        it('sets the mocks to passThrough', () => {
            service.setMocksToPassThrough();
            expect(http.put).toHaveBeenCalledWith('/ngapimock/actions', { action: 'passThroughs' });
        });
    });
});
