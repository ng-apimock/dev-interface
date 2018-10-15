class ClientPO {
    open() {
        return browser.get('/dev-interface/#/');
    }

    get tabs() {return new TabsPO(); }
}

class TabsPO {
    get mocks() { return new MocksOverviewPO(); }
}

class MocksOverviewPO {
    constructor() {
        this.container = $('apimock-mocks-overview');
    }

    row(index) {
        return new MocksOverviewRowPO(this.container.$$('[apimock-mock-overview-row]').get(index));
    }
    isActive() {
        return this.container.isPresent();
    }
}

class MocksOverviewRowPO {
    constructor(container) {
        this.container = container;
    }

    get delay() {return this.container.$('.delay').$('input')};
    get name() {return this.container.$('.name')};
    get scenario() {return this.container.$('.scenario').$$('option').filter((option) => option.isSelected()).first()};
}

module.exports = ClientPO;