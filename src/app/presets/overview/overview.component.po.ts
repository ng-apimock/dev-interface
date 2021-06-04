import { $, $$, browser, by, ElementFinder, promise } from 'protractor';

import { CreatePresetPo } from '../create-preset/create-preset-component.po';

const CONTAINER_SELECTOR = 'apimock-presets-overview';

export class PresetOverviewActionsPo {
    constructor(private container: ElementFinder = null) {
    }

    async search(query: string): promise.Promise<void> {
        await this.container.$('apimock-mat-table-filter').$('input').sendKeys(query);
    }

    async createPreset(name: string, excludeMocks: boolean, excludeVariables: boolean): promise.Promise<void> {
        await this.container.element(by.buttonText('Create preset')).click();

        await CreatePresetPo.create(name, excludeMocks, excludeVariables);
    }
}

export class PresetsOverviewPo {
    static get actions(): PresetOverviewActionsPo {
        return new PresetOverviewActionsPo($(CONTAINER_SELECTOR));
    }

    static row(index: number): PresetsOverviewRowPo {
        return new PresetsOverviewRowPo($(CONTAINER_SELECTOR).$$('.mat-row').get(index));
    }

    static find(name: string): PresetsOverviewRowPo {
        return new PresetsOverviewRowPo($$('.mat-row')
            .filter(async el => {
                const text = await el.$('.mat-column-name').getText();
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

export class PresetsOverviewRowPo {
    constructor(private container: ElementFinder) {
    }

    get name(): any {
        return this.container.$('.mat-column-name');
    }

    async selectPreset(): Promise<void> {
        await this.container.element(by.buttonText('Select')).click();

        // wait until the command has been finished
        await browser.sleep(100);
    }
}
