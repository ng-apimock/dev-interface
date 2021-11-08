import { createSpyObj } from 'jest-createspyobj';

import { HttpClient } from '@angular/common/http';

import { VariableRequest } from './variable-request';
import { VariablesService } from './variables.service';

describe('VariablesService', () => {
    let http: jest.Mocked<HttpClient>;
    let service: VariablesService;
    let variableRequest: jest.Mocked<VariableRequest>;

    beforeAll(() => {
        http = createSpyObj(HttpClient);
        variableRequest = createSpyObj(VariableRequest);
        variableRequest.payload = { some: 'thing' };
        service = new VariablesService(http as any);
    });
    describe('getVariables', () => {
        it('gets the variables', () => {
            service.getVariables();
            expect(http.get).toHaveBeenCalledWith('/ngapimock/variables');
        });
    });

    describe('deleteVariable', () => {
        it('deletes the variable', () => {
            service.deleteVariable('key');
            expect(http.delete).toHaveBeenCalledWith('/ngapimock/variables/key');
        });
    });

    describe('updateVariable', () => {
        it('updates the variable', () => {
            service.updateVariable(variableRequest as any);
            expect(http.put).toHaveBeenCalledWith('/ngapimock/variables', { some: 'thing' });
        });
    });
});
