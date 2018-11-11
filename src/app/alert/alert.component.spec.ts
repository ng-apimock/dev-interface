import {AlertComponent} from './alert.component';
import {Observable} from 'rxjs';
import {assert, createStubInstance, SinonFakeTimers, SinonStubbedInstance, useFakeTimers} from 'sinon';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let changeObservable: SinonStubbedInstance<Observable<any>>;
    let clock: SinonFakeTimers;

    beforeEach(() => {
        component = new AlertComponent();
        changeObservable = createStubInstance(Observable);
        component.change = changeObservable;
        clock = useFakeTimers();
    });

    describe('ngOnInit', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('subscribes to the changes', () => {
            assert.called(changeObservable.subscribe);
        });

        describe('on change', () => {
            it('sets the message', () => {
                expect(component.message).toBeUndefined();
                changeObservable.subscribe.getCall(0).callArgWith(0, 'change');
                expect(component.message).toBe('change');
            });

            it('unsets the message after the specified number of seconds', () => {
                component.seconds = 3000;
                changeObservable.subscribe.getCall(0).callArgWith(0, 'change');
                expect(component.message).toBe('change');
                clock.tick(3000);
                expect(component.message).toBeUndefined();
            });
        });

    });
});
