import {MockState} from './mock-state';

/** Mock request. */
export class MockRequest {
    delay: number;
    echo: boolean;
    scenario: string;

    /**
     * Constructor.
     * @param {string} name The mock name.
     * @param {MockState} state The mock state.
     */
    constructor(public name: string, private state: MockState) {
        this.scenario = state.scenario;
        this.delay = state.delay;
        this.echo = state.echo;
    }
}

/** Update mock request. */
export class UpdateMockRequest {
    name: string;
    type: string;
    value: string;

    /**
     * Constructor.
     * @param {string} name The mock name.
     * @param {string} type The type.
     * @param {string} value The value.
     */
    constructor(name: string, type: string, value: string) {
        this.name = name;
        this.type = type;
        this.value = value;
    }
}

/** Update mock scenario request. */
export class UpdateMockScenarioRequest extends UpdateMockRequest {
    /** {@inheritDoc} */
    constructor(public name: string, public value: string) {
        super(name, 'scenario', value);
    }
}

/** Update mock delay request. */
export class UpdateMockDelayRequest extends UpdateMockRequest {
    /** {@inheritDoc} */
    constructor(public name: string, public value: string) {
        super(name, 'delay', value);
    }
}

/** Update mock echo request. */
export class UpdateMockEchoRequest extends UpdateMockRequest {
    /** {@inheritDoc} */
    constructor(public name: string, public value: string) {
        super(name, 'echo', value);
    }
}
