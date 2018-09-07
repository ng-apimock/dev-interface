import {UpdateVariableRequest, VariableRequest} from './variable-request';

describe('VariableRequest', () => {
    let request: VariableRequest;

    describe('constructor', () => {
        beforeEach(() => {
            request = new VariableRequest({ key: 'some', value: 'thing' });
        });
        it('sets the payload', () =>
            expect(request.payload.some).toBe('thing'));

        it('sets the key', () =>
            expect(request.key).toBe('some'));

        it('sets the value ', () =>
            expect(request.value).toBe('thing'));
    });
});

describe('UpdateVariableRequest', () => {
    let request: UpdateVariableRequest;

    describe('constructor', () => {
        beforeEach(() => {
            request = new UpdateVariableRequest('key', 'type', 'value');
        });
        it('sets the type', () =>
            expect(request.type).toBe('type'));

        it('sets the key', () =>
            expect(request.key).toBe('key'));

        it('sets the value', () =>
            expect(request.value).toBe('value'));
    });
});
