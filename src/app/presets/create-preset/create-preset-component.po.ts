export class CreatePresetPo {
    static create(name: string, excludeMocks: boolean, excludeVariables: boolean) {

        cy.get('.name').type(name);

        if (excludeMocks) {
            cy.get('.excludeMocks .mdc-checkbox__native-control').click();
        }

        if (excludeVariables) {
            cy.get('.excludeVariables .mdc-checkbox__native-control').click();
        }

            // cy.get('.actions').contains('button', 'Create').click();

        cy.get('.actions').contains('button', 'Create').then(($btn) => {
            if ($btn.is(":disabled")) {
                return
            } else {
                cy.wrap($btn).click()
            }
        })
        cy.wait(1000);
    }

    static error(): Cypress.Chainable {
        return cy.get('.error');
    }
}
