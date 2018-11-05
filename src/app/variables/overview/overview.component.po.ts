import {$, browser, by, ElementFinder, promise} from 'protractor';
import {VariablesOverviewRowPo} from './overview-row.component.po';

const CONTAINER_SELECTOR = 'apimock-variables-overview';
const OVERVIEW_ROW_SELECTOR = '[apimock-variable-overview-row]';

export class VariablesOverviewActionsPo {
    constructor(private ef: ElementFinder = null) {
    }

    async add(key: string, value: string): promise.Promise<void> {
        await this.ef.$('.newKey').$('input').sendKeys(key);
        await this.ef.$('.newValue').$('input').sendKeys(value);
        await this.ef.element(by.buttonText('Add variable')).click();
    }

    async search(query: string): promise.Promise<void> {
        await this.ef.$('.search-variables').sendKeys(query);
    }
}

export class VariablesOverviewPo {
    static get actions(): VariablesOverviewActionsPo {
        return new VariablesOverviewActionsPo($(CONTAINER_SELECTOR));
    }

    static row(index: number): VariablesOverviewRowPo {
        return new VariablesOverviewRowPo($(CONTAINER_SELECTOR).$$(OVERVIEW_ROW_SELECTOR).get(index));
    }

    static find(name: string): VariablesOverviewRowPo {
        return new VariablesOverviewRowPo($(CONTAINER_SELECTOR).$$(OVERVIEW_ROW_SELECTOR).filter(async (el) => {
            const text = await el.$('.key').getText();
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
