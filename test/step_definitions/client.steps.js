(() => {
    const {Given, Then, After} = require('cucumber');
    const {forEach} = require('p-iteration');

    const client = new (require('../pos/client.po'))();

    Given('I open the dev interface', openDevInterface);

    Then(/^the (.*) tab is active$/, tabIsActive);

    Then('the following mocks are present:', checkMocksPresent);

    Then('the following mocks state is set:', checkMockState);


    async function checkMocksPresent(dataTable) {
        await forEach(dataTable.rows(), async (row, index) => {
            const mockRow = await client.tabs.mocks.row(index);
            expect(await mockRow.name.getText()).to.equal(row[0]);
        });
    }

    async function checkMockState(dataTable) {
        await forEach(dataTable.rows(), async (row, index) => {
            const mockRow = await client.tabs.mocks.row(index);
            expect(await mockRow.name.getText()).to.equal(row[0]);
            expect(await mockRow.scenario.getText()).to.equal(row[1]);
            expect(await mockRow.delay.getAttribute('value')).to.equal(row[2]);
        });
    }

    async function openDevInterface() {
        await client.open();
    }

    async function tabIsActive(tab) {
        expect(await client.tabs.mocks.isActive()).to.equal(true);
    }
})();