/** Mock request. */
export class VariableRequest {
    payload: { [key: string]: string };
    key: string;
    value: string;

    /**
     * Constructor.
     * @param {{ key: string, value: string }} variable The variable.
     */
    constructor(private variable: { key: string, value: string }) {
        this.payload = {};
        this.payload[variable.key] = variable.value;
        this.key = variable.key;
        this.value = variable.value;
    }
}

/** Update mock request. */
export class UpdateVariableRequest {
    type: string;
    key: string;
    value: string;

    /**
     * Constructor.
     * @param {string} key The key.
     * @param {string} type The type.
     * @param {string} value The value.
     */
    constructor(key: string, type: string, value: string) {
        this.key = key;
        this.type = type;
        this.value = value;
    }
}
