import { MatTableFilterComponent } from './filter.component';

describe('MatTableFilterComponent', () => {
    let component: MatTableFilterComponent;

    beforeEach(() => {
        component = new MatTableFilterComponent();
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('sets the search text to empty', () => {
            expect(component.searchText).toBe('');
        });
    });
});
