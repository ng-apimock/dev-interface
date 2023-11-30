const CONTAINER_SELECTOR = 'apimock-variables-overview';

export class VariablesOverviewActionsPo {
    constructor(private container: Cypress.Chainable = null) {
    }

    add(key: string, value: string) {
        cy.get('input[placeholder="key"]').type(key);
        cy.get('input[placeholder="value"]').last().type(value);
        cy.contains('button', 'Add variable').click();

        cy.wait(1000); // wait until the command has been finished
    }

    search(query: string) {
        this.container.get('apimock-mat-table-filter input').type(query);
    }
}

export class VariablesOverviewPo {
    static get actions(): VariablesOverviewActionsPo {
        return new VariablesOverviewActionsPo(cy.get(CONTAINER_SELECTOR + " .mat-mdc-table"));
    }

    static row(index: number): VariablesOverviewRowPo {
        return new VariablesOverviewRowPo(
            cy.get(CONTAINER_SELECTOR + " .mat-mdc-row")
                .eq(index));
    }

    static find(name: string): VariablesOverviewRowPo {
        return new VariablesOverviewRowPo(cy.contains('.mat-mdc-row .mat-column-key', name)
            .parent());
    }

    static navigateTo(destination = '/dev-interface/') {
        cy.visit(destination);
    }

    static isActive() {
        return cy.get(CONTAINER_SELECTOR).should('exist');
    }
}

export class VariablesOverviewRowPo {
    constructor(private container: Cypress.Chainable) {
    }

    get key(): any {
        return this.container.find('.mat-column-key');
    }

    get value(): any {
        return this.container.find('.mat-column-value input');
    }

    updateValue(value: string) {
        this.value.clear().type(value);
        // wait until the command has been finished
        cy.wait(1000);
    }

    delete() {
        this.container.find('.delete').click();

        // wait until the command has been finished
        cy.wait(1000);
    }
}
