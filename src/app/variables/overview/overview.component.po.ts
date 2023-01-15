import { $, $$, browser, by, ElementFinder, promise } from 'protractor';

const CONTAINER_SELECTOR = 'apimock-variables-overview';

export class VariablesOverviewActionsPo {
    constructor(private container: ElementFinder = null) {
    }

    async add(key: string, value: string): Promise<void> {
        await this.container.$$('.key').last().sendKeys(key);
        await this.container.$$('.value').last().sendKeys(value);
        await this.container.element(by.buttonText('Add variable')).click();

        await browser.sleep(1000); // wait until the command has been finished
    }

    async search(query: string): Promise<void> {
        await this.container.$('apimock-mat-table-filter').$('input').sendKeys(query);
    }
}

export class VariablesOverviewPo {
    static get actions(): VariablesOverviewActionsPo {
        return new VariablesOverviewActionsPo($(CONTAINER_SELECTOR));
    }

    static row(index: number): VariablesOverviewRowPo {
        return new VariablesOverviewRowPo($(CONTAINER_SELECTOR).$$('.mat-mdc-row').get(index));
    }

    static find(name: string): VariablesOverviewRowPo {
        return new VariablesOverviewRowPo($$('.mat-mdc-row')
            .filter(async el => {
                const text = await el.$('.mat-column-key').getText();
                return text === name;
            }).first());
    }

    static navigateTo(): promise.Promise<any> {
        return browser.get('/dev-interface/#/variables');
    }

    static isActive(): promise.Promise<any> {
        return $(CONTAINER_SELECTOR).isPresent();
    }
}

export class VariablesOverviewRowPo {
    constructor(private container: ElementFinder) {
    }

    get key(): any {
        return this.container.$('.mat-column-key');
    }

    get value(): any {
        return this.container.$('.mat-column-value').$('input');
    }

    async updateValue(value: string): Promise<void> {
        await this.value.clear();
        await this.value.sendKeys(value);

        // wait until the command has been finished
        await browser.sleep(1000);
    }

    async delete(): Promise<void> {
        await this.container.$('.delete').click();

        // wait until the command has been finished
        await browser.sleep(1000);
    }
}
