import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;

    beforeAll(() => {
        component = new HeaderComponent();
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('sets indicator collapsed to true', () =>
            expect(component.isCollapsed).toBe(true));
    });
});