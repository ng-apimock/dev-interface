export interface NgApimock {
    delayResponse(name: string, delay: number): Promise<any>;

    deleteVariable(key: string): Promise<any>;

    echoRequest(name: string, echo: boolean): Promise<any>;

    fetchResponse(request: Request): Promise<any>;

    getMocks(): Promise<any>;

    getRecordings(): Promise<any>;

    getVariables(): Promise<any>;

    recordRequests(record: boolean): Promise<any>;

    resetMocksToDefault(): Promise<any>;

    selectScenario(name: string, scenario: string): Promise<any>;

    setMocksToPassThrough(): Promise<any>;

    setNgApimockCookie(): Promise<any>;

    setVariable(key: string, value: string): Promise<any>;

    setVariables(variables: { [key: string]: string; }): Promise<any>;
}
