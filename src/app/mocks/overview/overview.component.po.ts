const CONTAINER_SELECTOR = 'apimock-mocks-overview';

export class MockOverviewActionsPo {
    constructor(private container: Cypress.Chainable = null) {
    }

    resetToDefaults() {
        this.container.contains('button', 'Reset to defaults')
            .click();

        cy.wait(1000); // wait until the command has been finished
    }

    setToPassThroughs() {
        this.container.contains('button', 'All to passThrough')
            .click();

        cy.wait(1000); // wait until the command has been finished
    }

    search(query: string) {
        this.container.find('apimock-mat-table-filter').find('input').type(query);
    }
}

export class MocksOverviewPo {
    static get actions(): MockOverviewActionsPo {
        return new MockOverviewActionsPo(cy.get(CONTAINER_SELECTOR));
    }

    static isActive() {
        return cy.get(CONTAINER_SELECTOR).should('exist');
    }

    static row(index: number): MocksOverviewRowPo {
        return new MocksOverviewRowPo(
            cy.get(CONTAINER_SELECTOR + " .mat-mdc-row")
                .eq(index))
    }


    static selectScenario(name: string, scenario: string) {
        // Open mat-select
        MocksOverviewPo.find(name)
            .selectScenario(scenario);
    }

    static find(name: string): MocksOverviewRowPo {
        return new MocksOverviewRowPo(cy.contains('.mat-mdc-row .mat-column-name', name)
            .parent());
    }

    static navigateTo(destination = '/dev-interface/') {
        cy.visit(destination);
    }
}

export class MocksOverviewRowPo {
    constructor(private container: Cypress.Chainable) {
    }

    get delay(): Cypress.Chainable {
        return this.container.find('.mat-column-delay input');
    }

    get echo(): any {
        return this.container.find('.echo');
    }

    get name(): Cypress.Chainable {
        return this.container.find('.mat-column-name');
    }

    get scenario(): Cypress.Chainable {
        return this.container.find('.mat-mdc-select-value-text');
    }

    delayResponse(delay: string) {
        this.delay.type(delay);

        // wait until the command has been finished
        cy.wait(1000);
    }

    toggleEcho() {
        this.echo.click();

        // wait until the command has been finished
        cy.wait(2000);
    }

    selectScenario(scenario: string) {
        // Open the mat-select
        this.container.find('mat-select').click();

        // Select the scenario
        cy.contains('mat-option', scenario).click();

        // wait until the command has been finished
        cy.wait(100);
    }
}
