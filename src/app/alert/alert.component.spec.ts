import { AlertComponent } from './alert.component';

jest.useFakeTimers();

describe('AlertComponent', () => {
    let component: AlertComponent;
    let subscribeFn: jest.Mock;

    beforeEach(() => {
        component = new AlertComponent();
        subscribeFn = jest.fn();
        component.change = {
            subscribe: subscribeFn
        } as any;
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('subscribes to the changes', () => {
            expect(subscribeFn).toHaveBeenCalled();
        });

        describe('on change', () => {
            it('sets the message', () => {
                expect(component.message).toBeUndefined();

                subscribeFn.mock.calls[0][0]('change');

                expect(component.message).toBe('change');
            });

            it('unsets the message after the specified number of seconds', () => {
                component.seconds = 3000;

                subscribeFn.mock.calls[0][0]('change');
                expect(component.message).toBe('change');

                jest.advanceTimersByTime(3000);

                expect(component.message).toBeUndefined();
            });
        });
    });
});
