import { MockRequest } from './mock-request';

describe('MockRequest', () => {
    let request: MockRequest;

    describe('constructor', () => {
        beforeEach(() => {
            request = new MockRequest('name', {
                scenario: 'scenario',
                delay: 0,
                echo: false
            });
        });

        it('sets the scenario from the state', () =>
            expect(request.scenario).toBe('scenario'));

        it('sets the delay from the state', () =>
            expect(request.delay).toBe(0));

        it('sets the echo indicator from the state', () =>
            expect(request.echo).toBe(false));

        it('sets the name', () =>
            expect(request.name).toBe('name'));
    });
});
