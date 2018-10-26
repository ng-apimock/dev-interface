import {ElementFinder} from 'protractor';

export class MocksOverviewRowPo {
    constructor(private ef: ElementFinder = null) {
    }

    get delay() {
        return this.ef.$('.delay').$('input');
    }

    async delayResponse(delay: string): Promise<void> {
        await this.delay.clear();
        await this.delay.sendKeys(delay);
    }

    get echo() {
        return this.ef.$('.echo').$('input');
    }

    async toggleEcho(): Promise<void> {
        await this.echo.click();
    }

    get name() {
        return this.ef.$('.name');
    }

    get scenario() {
        return this.ef.$('.scenario').$('select');
    }

    async selectScenario(scenario: string): Promise<void> {
        await this.scenario.$(`[value='${scenario}']`).click();
    }
}