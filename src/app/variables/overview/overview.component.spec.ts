// import {assert, createStubInstance, SinonFakeTimers, SinonStub, SinonStubbedInstance, stub, useFakeTimers} from 'sinon';
// import {OverviewComponent} from './overview.component';
// import {VariablesService} from '../variables.service';
// import {of, Subject, Subscription} from 'rxjs';
// import {UpdateVariableRequest} from '../variable-request';
//
// describe('OverviewComponent', () => {
//     let component: OverviewComponent;
//     let componentGetVariablesFn: SinonStub;
//     let changeSubject: SinonStubbedInstance<Subject<any>>;
//     let variablesService: SinonStubbedInstance<VariablesService>;
//     let subscription: SinonStubbedInstance<Subscription>;
//     let request: UpdateVariableRequest;
//     let clock: SinonFakeTimers;
//
//     beforeEach(() => {
//         componentGetVariablesFn = stub(OverviewComponent.prototype, 'getVariables');
//         clock = useFakeTimers();
//         subscription = createStubInstance(Subscription);
//         changeSubject = createStubInstance(Subject);
//         variablesService = createStubInstance(VariablesService);
//         request = createStubInstance(UpdateVariableRequest);
//         component = new OverviewComponent(variablesService as any);
//         component.change$ = changeSubject;
//     });
//
//     describe('constructor', () => {
//         it('creates a new data object', () =>
//             expect(component.data).toEqual({ variables: [] }));
//
//         it('creates a new subscriptions object', () =>
//             expect(component.subscriptions).toEqual([]));
//     });
//
//     describe('getVariables', () => {
//         beforeEach(() => {
//             componentGetVariablesFn.callThrough();
//             variablesService.getVariables.returns(of({ state: [{ one: 'first' }] }));
//             component.getVariables();
//         });
//
//         it('calls getVariables', () =>
//             assert.called(variablesService.getVariables));
//
//         it('subscribes to getVariables and sets the data object once resolved', () =>
//             expect(component.data).toEqual({
//                 variables: [{ key: '0', value: { one: 'first' } }]
//             }));
//
//         afterEach(() => {
//             componentGetVariablesFn.reset();
//             variablesService.getVariables.reset();
//         });
//     });
//
//     describe('ngOnDestroy', () => {
//         beforeEach(() => {
//             component.subscriptions.push(subscription as any);
//             component.ngOnDestroy();
//         });
//
//         it('unsubscribes the subscriptions', () =>
//             assert.calledWith(subscription.unsubscribe));
//
//         afterEach(() => {
//             subscription.unsubscribe.reset();
//         });
//     });
//
//     describe('ngOnInit', () => {
//         beforeEach(() => {
//             component.ngOnInit();
//         });
//
//         it('call getVariables', () => {
//             assert.called(componentGetVariablesFn);
//         });
//
//
//         it('creates the change subject', () =>
//             expect(component.change$).toBeDefined());
//
//         afterEach(() => {
//             variablesService.getVariables.reset();
//         });
//     });
//
//     describe('onUpdate', () => {
//         beforeEach(() => {
//             component.onUpdate(request);
//         });
//
//         it('emits the change', () =>
//             assert.called(changeSubject.next));
//
//         afterEach(() => {
//             variablesService.getVariables.reset();
//         });
//     });
//
//     afterEach(() => {
//         componentGetVariablesFn.restore();
//     });
// });
