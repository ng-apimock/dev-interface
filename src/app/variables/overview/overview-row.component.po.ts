import { ElementFinder } from 'protractor';

export class VariablesOverviewRowPo {
    constructor(private ef: ElementFinder = null) {
    }

    get key() {
        return this.ef.$('.key');
    }

    get value() {
        return this.ef.$('.value').$('input');
    }

    async updateValue(value: string): Promise<void> {
        await this.value.clear();
        await this.value.sendKeys(value);
    }

    async delete(): Promise<void> {
        await this.ef.$('.options').$('button').click();
    }
}
