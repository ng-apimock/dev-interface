import { $, $$, browser, by, ElementFinder, promise } from 'protractor';

const CONTAINER_SELECTOR = 'apimock-mocks-overview';

export class MockOverviewActionsPo {
    constructor(private container: ElementFinder = null) {
    }

    async resetToDefaults(): promise.Promise<void> {
        await this.container.element(by.buttonText('Reset to defaults')).click();

        await browser.sleep(1000); // wait until the command has been finished
    }

    async setToPassThroughs(): promise.Promise<void> {
        await this.container.element(by.buttonText('All to passThrough')).click();

        await browser.sleep(1000); // wait until the command has been finished
    }

    async search(query: string): promise.Promise<void> {
        await this.container.$('apimock-mat-table-filter').$('input').sendKeys(query);
    }
}

export class MocksOverviewPo {
    static get actions(): MockOverviewActionsPo {
        return new MockOverviewActionsPo($(CONTAINER_SELECTOR));
    }

    static isActive(): promise.Promise<any> {
        return $(CONTAINER_SELECTOR).isPresent();
    }

    static row(index: number): MocksOverviewRowPo {
        return new MocksOverviewRowPo($(CONTAINER_SELECTOR).$$('.mat-row').get(index));
    }

    static async selectScenario(name: string, scenario: string): Promise<void> {
        // Open mat-select
        await MocksOverviewPo.find(name).selectScenario(scenario);
    }

    static find(name: string): MocksOverviewRowPo {
        return new MocksOverviewRowPo($$('.mat-row')
            .filter(async el => {
                const text = await el.$('.mat-column-name').getText();
                return text === name;
            }).first());
    }

    static navigateTo(): promise.Promise<any> {
        return browser.get('/dev-interface/#/mocks');
    }
}

export class MocksOverviewRowPo {
    constructor(private container: ElementFinder) {
    }

    get delay(): any {
        return this.container.$('.delay');
    }

    get echo(): any {
        return this.container.$('.echo');
    }

    get name(): any {
        return this.container.$('.mat-column-name').getText();
    }

    get scenario(): any {
        return this.container.$('.mat-select-value-text').getText();
    }

    async delayResponse(delay: string): Promise<void> {
        await this.delay.sendKeys(delay);

        // wait until the command has been finished
        await browser.sleep(1000);
    }

    async toggleEcho(): Promise<void> {
        await this.echo.click();

        // wait until the command has been finished
        await browser.sleep(1000);
    }

    async selectScenario(scenario: string): Promise<void> {
        // Open the mat-select
        this.container.$('mat-select')
            .click();

        // Select the scenario
        await $$('mat-option')
            .filter(async el => {
                const text = await el.getText();
                return text === scenario;
            }).first()
            .click();

        // wait until the command has been finished
        await browser.sleep(100);
    }
}
