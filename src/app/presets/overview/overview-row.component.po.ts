import { ElementFinder } from 'protractor';

export class PresetsOverviewRowPo {
    constructor(private ef: ElementFinder = null) {
    }

    get name(): any {
        return this.ef.$('.name');
    }

    async selectPreset(): Promise<void> {
        await this.ef.$('.options').$('button').click();
    }
}
