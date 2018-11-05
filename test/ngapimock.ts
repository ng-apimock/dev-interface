export interface NgApimock {
    /**
     * Delay the response for the mock matching the given name.
     * @param {string} name The name of the mock.
     * @param {number} delay The delay.
     * @return {promise} promise The promise.
     */
    delayResponse(name: string, delay: number): Promise<any>;

    /**
     * Delete the variable matching the given key.
     * @param {string} key The key.
     * @return {promise} promise The promise.
     */
    deleteVariable(key: string): Promise<any>;

    /**
     * Set the echo indicator for the mock matching the given name.
     * @param {string} name The name of the mock.
     * @param {boolean} echo The echo indicator.
     * @return {promise} promise The promise.
     */
    echoRequest(name: string, echo: boolean): Promise<any>;

    /**
     * Gets the mocks.
     * @return {promise} promise The promise.
     */
    getMocks(): Promise<any>;

    /**
     * Gets the presets.
     * @return {promise} promise The promise.
     */
    getPresets(): Promise<any>;

    /**
     * Gets the recordings.
     * @return {promise} promise The promise.
     */
    getRecordings(): Promise<any>;

    /**
     * Gets the variables.
     * @return {promise} promise The promise.
     */
    getVariables(): Promise<any>;

    /**
     * Set the record indicator.
     * @param {boolean} record The record indicator.
     * @return {promise} promise The promise.
     */
    recordRequests(record: boolean): Promise<any>;

    /**
     * Resets the mocks to default.
     * @return {promise} promise The promise.
     */
    resetMocksToDefault(): Promise<any>;

    /**
     * Select the scenario for the mock matching the given name.
     * @param {string} name The name of the mock.
     * @param {string} scenario The scenario.
     * @return {promise} promise The promise.
     */
    selectScenario(name: string, scenario: string): Promise<any>;

    /**
     * Select the preset.
     * @param {string} name The name of the preset.
     * @return {promise} promise The promise.
     */
    selectPreset(name: string): Promise<any>;

    /**
     * Sets the mocks to pass throughs.
     * @return {promise} promise The promise.
     */
    setMocksToPassThrough(): Promise<any>;

    /**
     * Sets the variable.
     * @param {string} key The key.
     * @param {string} value The value.
     * @return {promise} promise The promise.
     */
    setVariable(key: string, value: string): Promise<any>;

    /**
     * Sets the variables.
     * @param {{ [key: string]: string; }} variables The variables.
     * @return {promise} promise The promise.
     */
    setVariables(variables: { [key: string]: string; }): Promise<any>;
}
