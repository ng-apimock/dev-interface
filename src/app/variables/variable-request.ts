/** Mock request. */
export class VariableRequest {
    payload: { [key: string]: any };
    key: string;
    value: string;

    /**
     * Constructor.
     * @param {{ key: string, value: string }} variable The variable.
     */
    constructor(private readonly variable: { key: string, value: any }) {
        this.payload = {};
        // eslint-disable-next-line radix
        this.payload[variable.key] = !Number.isNaN(Number.parseInt(variable.value))
            ? Number(variable.value)
            : /^(true|false)$/.test(variable.value)
                ? variable.value === 'true'
                : variable.value;

        this.key = variable.key;
        this.value = variable.value;
    }
}
