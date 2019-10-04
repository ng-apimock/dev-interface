/** Mock request. */
export class VariableRequest {
    payload: { [key: string]: any };
    key: string;
    value: string;

    /**
     * Constructor.
     * @param {{ key: string, value: string }} variable The variable.
     */
    constructor(private variable: { key: string, value: any }) {
        this.payload = {};
        this.payload[variable.key] = !Number.isNaN(Number.parseInt(variable.value))
            ? Number(variable.value)
            : /^(true|false)$/.test(variable.value)
                ? variable.value == 'true' ? true : false
                : variable.value;

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
