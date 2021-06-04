import { MockState } from './mock-state';

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
    constructor(public readonly name: string, private readonly state: MockState) {
        this.scenario = state.scenario;
        this.delay = state.delay;
        this.echo = state.echo;
    }
}
