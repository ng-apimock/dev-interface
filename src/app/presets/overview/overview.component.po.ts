import { CreatePresetPo } from '../create-preset/create-preset-component.po';

const CONTAINER_SELECTOR = 'apimock-presets-overview';

export class PresetOverviewActionsPo {
    constructor(private container: Cypress.Chainable = null) {
    }

    search(query: string) {
        this.container.find('apimock-mat-table-filter').find('input').type(query);
    }

    createPreset(name: string, excludeMocks: boolean, excludeVariables: boolean) {
        this.container.contains('button', 'Create preset').click().then(() => {
            CreatePresetPo.create(name, excludeMocks, excludeVariables);
        });
    }
}

export class PresetsOverviewPo {
    static get actions(): PresetOverviewActionsPo {
        return new PresetOverviewActionsPo(cy.get(CONTAINER_SELECTOR));
    }

    static row(index: number): PresetsOverviewRowPo {
        return new PresetsOverviewRowPo(
            cy.get(CONTAINER_SELECTOR + " .mat-mdc-row")
                .eq(index));
    }

    static find(name: string): PresetsOverviewRowPo {
        return new PresetsOverviewRowPo(cy.contains('.mat-mdc-row .mat-column-name', name)
            .parent());
    }

    static navigateTo(destination = '/dev-interface/') {
        cy.visit(destination);
    }

    static isActive() {
        return cy.get(CONTAINER_SELECTOR).should('exist');
    }
}

export class PresetsOverviewRowPo {
    constructor(private container: Cypress.Chainable) {
    }

    get name(): Cypress.Chainable {
        return this.container.find('.mat-column-name');
    }

    selectPreset() {
        this.container.contains('button', 'Select').click();

        // wait until the command has been finished
        cy.wait(100);
    }
}
