import {
    MockRequest,
    UpdateMockDelayRequest,
    UpdateMockEchoRequest,
    UpdateMockRequest,
    UpdateMockScenarioRequest
} from './mock-request';

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

describe('UpdateMockRequest', () => {
    let request: UpdateMockRequest;

    describe('constructor', () => {
        beforeEach(() => {
            request = new UpdateMockRequest('name', 'type', 'value');
        });
        it('sets the type', () =>
            expect(request.type).toBe('type'));

        it('sets the name', () =>
            expect(request.name).toBe('name'));

        it('sets the value', () =>
            expect(request.value).toBe('value'));
    });
});

describe('UpdateMockScenarioRequest', () => {
    let request: UpdateMockRequest;

    describe('constructor', () => {
        beforeEach(() => {
            request = new UpdateMockScenarioRequest('name', 'value');
        });
        it('sets the type', () =>
            expect(request.type).toBe('scenario'));
    });
});

describe('UpdateMockDelayRequest', () => {
    let request: UpdateMockRequest;

    describe('constructor', () => {
        beforeEach(() => {
            request = new UpdateMockDelayRequest('name', 'value');
        });
        it('sets the type', () =>
            expect(request.type).toBe('delay'));
    });
});

describe('UpdateMockEchoRequest', () => {
    let request: UpdateMockRequest;

    describe('constructor', () => {
        beforeEach(() => {
            request = new UpdateMockEchoRequest('name', 'value');
        });
        it('sets the type', () =>
            expect(request.type).toBe('echo'));
    });
});

