import {OverviewRowComponent} from './overview-row.component';

describe('OverviewRowComponent', () => {
    let component: OverviewRowComponent;

    beforeEach(() => {
        component = new OverviewRowComponent();
        component.recording = {
            showRequestDetails: undefined,
            showResponseDetails: undefined
        };
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('sets the show request details indicator to false', () =>
            expect(component.recording.showRequestDetails).toBe(false));

        it('sets the show response details indicator to false', () =>
            expect(component.recording.showResponseDetails).toBe(false));
    });

    describe('toggleRequestDetails', () => {
        beforeEach(() => {
            component.toggleRequestDetails();
        });

        it('toggles the indicator', () =>
            expect(component.recording.showRequestDetails).toBe(true));
    });

    describe('toggleResponseDetails', () => {
        beforeEach(() => {
            component.toggleResponseDetails();
        });

        it('toggles the indicator', () =>
            expect(component.recording.showResponseDetails).toBe(true));
    });

    afterAll(() => {
        jasmine.clock().uninstall();
    });
});
