import {HttpClient} from '@angular/common/http';
import {VariableRequest} from './variable-request';
import {VariablesService} from './variables.service';

import {assert, createStubInstance, SinonStubbedInstance} from 'sinon';

describe('MocksService', () => {
    let http: SinonStubbedInstance<HttpClient>;
    let service: VariablesService;
    let variableRequest: SinonStubbedInstance<VariableRequest>;

    beforeAll(() => {
        http = createStubInstance(HttpClient);
        variableRequest = createStubInstance(VariableRequest);
        variableRequest.payload = { some: 'thing' };
        service = new VariablesService(http as any);
    });
    describe('getVariables', () => it('gets the variables', () => {
        service.getVariables();
        assert.calledWith(http.get, '/ngapimock/variables');
    }));

    describe('deleteVariable', () => it('deletes the variable', () => {
        service.deleteVariable('key');
        assert.calledWith(http.delete, '/ngapimock/variables/key');
    }));

    describe('updateVariable', () => it('updates the variable', () => {
        service.updateVariable(variableRequest as any);
        assert.calledWith(http.put, '/ngapimock/variables', { some: 'thing' });
    }));

    afterEach(() => {
        http.delete.reset();
        http.get.reset();
        http.put.reset();
    });
});
