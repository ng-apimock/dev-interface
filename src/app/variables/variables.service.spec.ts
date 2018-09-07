import {HttpClient} from '@angular/common/http';
import {VariableRequest} from './variable-request';
import {VariablesService} from './variables.service';

import * as sinon from 'sinon';

describe('MocksService', () => {
    let http: sinon.SinonStubbedInstance<HttpClient>;
    let service: VariablesService;
    let variableRequest: sinon.SinonStubbedInstance<VariableRequest>;

    beforeAll(() => {
        http = sinon.createStubInstance(HttpClient);
        variableRequest = sinon.createStubInstance(VariableRequest);
        variableRequest.payload = { some: 'thing' };
        service = new VariablesService(http as any);
    });
    describe('getVariables', () => it('gets the variables', () => {
        service.getVariables();
        sinon.assert.calledWith(http.get, '/ngapimock/variables');
    }));

    describe('deleteVariable', () => it('deletes the variable', () => {
        service.deleteVariable('key');
        sinon.assert.calledWith(http.delete, '/ngapimock/variables/key');
    }));

    describe('updateVariable', () => it('updates the variable', () => {
        service.updateVariable(variableRequest as any);
        sinon.assert.calledWith(http.put, '/ngapimock/variables', { some: 'thing' });
    }));

    afterEach(() => {
        http.delete.reset();
        http.get.reset();
        http.put.reset();
    });
});
