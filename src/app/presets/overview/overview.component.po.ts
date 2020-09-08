import { $, browser, ElementFinder, promise } from 'protractor';

import { PresetsOverviewRowPo } from './overview-row.component.po';

const CONTAINER_SELECTOR = 'apimock-presets-overview';
const OVERVIEW_ROW_SELECTOR = '[apimock-preset-overview-row]';

export class PresetOverviewActionsPo {
    constructor(private ef: ElementFinder = null) {
    }

    async search(query: string): promise.Promise<void> {
        await this.ef.$('.search-presets').sendKeys(query);
    }
}

export class PresetsOverviewPo {
    static get actions(): PresetOverviewActionsPo {
        return new PresetOverviewActionsPo($(CONTAINER_SELECTOR));
    }

    static row(index: number): PresetsOverviewRowPo {
        return new PresetsOverviewRowPo($(CONTAINER_SELECTOR).$$(OVERVIEW_ROW_SELECTOR).get(index));
    }

    static find(name: string): PresetsOverviewRowPo {
        return new PresetsOverviewRowPo($(CONTAINER_SELECTOR).$$(OVERVIEW_ROW_SELECTOR).filter(async el => {
            const text = await el.$('.name').getText();
            return text === name;
        }).first());
    }

    static navigateTo(): promise.Promise<any> {
        return browser.get('/dev-interface/#/presets');
    }

    static isActive(): promise.Promise<any> {
        return $(CONTAINER_SELECTOR).isPresent();
    }
}
