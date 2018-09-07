import * as sinon from 'sinon';
import {OverviewComponent} from './overview.component';
import {RecordingsService} from '../recordings.service';
import {of, Subscription} from 'rxjs';

describe('OverviewComponent', () => {
    const now = new Date();
    let component: OverviewComponent;
    let componentGetRecordingsFn: sinon.SinonStub;
    let recordingsService: sinon.SinonStubbedInstance<RecordingsService>;
    let subscription: sinon.SinonStubbedInstance<Subscription>;

    beforeAll(() => {
        componentGetRecordingsFn = sinon.stub(OverviewComponent.prototype, <any>'getRecordings');
        jasmine.clock().install();
        subscription = sinon.createStubInstance(Subscription);
        recordingsService = sinon.createStubInstance(RecordingsService);
        component = new OverviewComponent(recordingsService as any);
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({ recordings: [] }));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('getRecordings', () => {
        beforeEach(() => {
            componentGetRecordingsFn.callThrough();
            recordingsService.getRecordings.returns(of({
                "recordings": {
                    "mock name": [{
                        "request": {
                            "url": "/some/url",
                            "method": "GET",
                            "headers": {
                                "record": "true"
                            },
                            "payload": {}
                        },
                        "response": {
                            "data": "[{\"some\":\"thing\"}]",
                            "status": 200,
                            "headers": {
                                "content-type": ["application/json"]
                            }
                        },
                        "datetime": now.getTime()
                    }]
                }
            }));
            component.getRecordings();
        });

        it('calls getRecordings', () =>
            sinon.assert.called(recordingsService.getRecordings));

        it('subscribes to getRecordings and sets the data object once resolved', () =>
            expect(component.data).toEqual({
                recordings: [{
                    request: { url: '/some/url', method: 'GET', headers: { record: 'true' }, payload: {} },
                    response: {
                        data: [{ some: 'thing' }],
                        status: 200,
                        headers: { 'content-type': ['application/json'] }
                    },
                    datetime: now.getTime(),
                    name: 'mock name'
                }]
            }));

        afterEach(() => {
            componentGetRecordingsFn.reset();
            recordingsService.getRecordings.reset();
        });
    });

    describe('ngOnDestroy', () => {
        beforeEach(() => {
            component.subscriptions.push(subscription as any);
            component.ngOnDestroy();
        });

        it('unsubscribes the subscriptions', () =>
            sinon.assert.calledWith(subscription.unsubscribe));

        afterEach(() => {
            subscription.unsubscribe.reset();
        });
    });

    afterAll(() => {
        jasmine.clock().uninstall();
        componentGetRecordingsFn.restore();
    });
});
