import { createSpyObj } from 'jest-createspyobj';

import { of, Subject, Subscription } from 'rxjs';

import { UpdateVariableRequest } from '../variable-request';
import { VariablesService } from '../variables.service';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
    let component: OverviewComponent;
    let changeSubject: jest.Mocked<Subject<any>>;
    let variablesService: jest.Mocked<VariablesService>;
    let request: jest.Mocked<UpdateVariableRequest>;
    let subscription: jest.Mocked<Subscription>;

    beforeEach(() => {
        changeSubject = createSpyObj(Subject, ['next']);
        request = createSpyObj(UpdateVariableRequest);
        subscription = createSpyObj(Subscription);
        variablesService = createSpyObj(VariablesService, ['getVariables']);

        component = new OverviewComponent(variablesService as any);
        component.change$ = changeSubject;
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({variables: []}));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('getVariables', () => {
        beforeEach(() => {
            variablesService.getVariables.mockReturnValue(of({state: [{one: 'first'}]}));

            component.getVariables();
        });

        afterEach(() => {
            component.subscriptions = [];
        });

        it('calls getVariables', () =>
            expect(variablesService.getVariables).toHaveBeenCalled());

        it('subscribes to getVariables and sets the data object once resolved', () =>
            expect(component.data).toEqual({
                variables: [{key: '0', value: {one: 'first'}}]
            }));
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            component.subscriptions.push(subscription as any);
            component.ngOnDestroy();
        });

        it('unsubscribes the subscriptions', () =>
            expect(subscription.unsubscribe).toHaveBeenCalled());
    });

    describe('ngOnInit', () => {
        let getVariablesFn;

        beforeEach(() => {
            getVariablesFn = jest.spyOn(component, 'getVariables');
            getVariablesFn.mockImplementation(() => []);

            component.ngOnInit();
        });

        it('call getVariables', () => {
            expect(getVariablesFn).toHaveBeenCalled();
        });

        it('creates the change subject', () =>
            expect(component.change$).toBeDefined());
    });

    describe('onUpdate', () => {
        let getVariablesFn;

        beforeEach(() => {
            getVariablesFn = jest.spyOn(component, 'getVariables');

            getVariablesFn.mockImplementation(() => []);
            component.onUpdate(request);
        });

        it('emits the change', () =>
            expect(component.change$.next).toHaveBeenCalled());

        it('call getVariables', () => {
            expect(getVariablesFn).toHaveBeenCalled();
        });
    });
});
