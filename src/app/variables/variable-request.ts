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
        if (!Number.isNaN(Number.parseInt(variable.value))) {
            this.payload[variable.key] = Number(variable.value);
        } else {
            if (/^(true|false)$/.test(variable.value)) {
                this.payload[variable.key] = variable.value === 'true';
            } else {
                this.payload[variable.key] = variable.value;
            }
        }

        this.key = variable.key;
        this.value = variable.value;
    }
}
