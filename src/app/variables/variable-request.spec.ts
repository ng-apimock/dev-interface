import { VariableRequest } from './variable-request';

describe('VariableRequest', () => {
    let request: VariableRequest;

    describe('constructor', () => {
        describe('default', () => {
            beforeEach(() => {
                request = new VariableRequest({ key: 'some', value: 'thing' });
            });

            it('sets the payload', () =>
                expect(request.payload.some).toBe('thing'));

            it('sets the key', () =>
                expect(request.key).toBe('some'));

            it('sets the value', () =>
                expect(request.value).toBe('thing'));
        });

        describe('number', () => {
            beforeEach(() => {
                request = new VariableRequest({ key: 'some', value: 123 });
            });

            it('sets the value as a number', () =>
                expect(request.value).toBe(123));
        });

        describe('string true', () => {
            beforeEach(() => {
                request = new VariableRequest({ key: 'some', value: 'true' });
            });

            it('sets the value as a boolean', () =>
                expect(request.value).toBe('true'));
        });
    });

});
