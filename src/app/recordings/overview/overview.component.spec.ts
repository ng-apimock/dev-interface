import { createSpyObj } from 'jest-createspyobj';

import { of, Subject } from 'rxjs';

import { RecordingsService } from '../recordings.service';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
    const now = new Date();
    let component: OverviewComponent;
    let recordingsService: jest.Mocked<RecordingsService>;
    let subscription: jest.Mocked<Subject<any>>;

    beforeAll(() => {
        subscription = createSpyObj(Subject, ['next', 'unsubscribe']);
        recordingsService = createSpyObj(RecordingsService, ['getRecordings', 'record']);
        component = new OverviewComponent(recordingsService as any);
    });

    describe('constructor', () => {
        it('creates a new data object', () =>
            expect(component.data).toEqual({recordings: []}));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
    });

    describe('enableRecording', () => {
        beforeEach(() => {
            recordingsService.record.mockReturnValue(of({}));
            component.enableRecording();
        });

        afterEach(() => {
            component.subscriptions = [];
        });

        it('calls record', () =>
            expect(recordingsService.record).toHaveBeenCalled());

        it('subscribes to record and sets the data record to true once resolved', () =>
            expect(component.data.record).toBe(true));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));
    });

    describe('disableRecording', () => {
        beforeEach(() => {
            recordingsService.record.mockReturnValue(of({}));
            component.disableRecording();
        });

        afterEach(() => {
            component.subscriptions = [];
        });

        it('calls record', () =>
            expect(recordingsService.record).toHaveBeenCalled());

        it('subscribes to record and sets the data record to false once resolved', () =>
            expect(component.data.record).toBe(false));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));
    });

    describe('getRecordings', () => {
        beforeEach(() => {
            recordingsService.getRecordings.mockReturnValue(of({
                recordings: {
                    'mock name': [{
                        request: {
                            url: '/some/url',
                            method: 'GET',
                            headers: {
                                record: 'true'
                            },
                            payload: {}
                        },
                        response: {
                            data: JSON.stringify([{'some': 'thing'}]),
                            status: 200,
                            headers: {
                                'content-type': ['application/json']
                            }
                        },
                        datetime: now.getTime()
                    }]
                },
                record: true
            }));
            component.getRecordings();
        });

        afterEach(() => {
            component.subscriptions = [];
        });

        it('calls getRecordings', () =>
            expect(recordingsService.getRecordings).toHaveBeenCalled());

        it('subscribes to getRecordings and sets the data object once resolved', () =>
            expect(component.data).toEqual({
                recordings: [{
                    request: {
                        url: '/some/url',
                        method: 'GET',
                        headers: {record: 'true'},
                        payload: {}
                    },
                    response: {
                        data: [{some: 'thing'}],
                        status: 200,
                        headers: {'content-type': ['application/json']}
                    },
                    datetime: now.getTime(),
                    name: 'mock name'
                }],
                record: true
            }));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));

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
        let getRecordingsFn;

        beforeEach(() => {
            getRecordingsFn = jest.spyOn(component, 'getRecordings');
            getRecordingsFn.mockImplementation(() => []);

            component.ngOnInit();
        });

        it('gets the recordings', () =>
            expect(getRecordingsFn).toHaveBeenCalled());
    });
});
