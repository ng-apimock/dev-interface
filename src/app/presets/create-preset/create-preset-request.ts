import { MockState } from '@ng-apimock/core/dist/state/mock.state';

/** Preset request. */
export class CreatePresetRequest {
    name: string;
    mocks: Record<string, MockState>;
    variables: Record<string, any>;

    constructor(name: string, mocks: Record<string, MockState>, variables: Record<string, any>) {
        this.name = name;
        this.mocks = mocks;
        this.variables = variables;
    }
}
