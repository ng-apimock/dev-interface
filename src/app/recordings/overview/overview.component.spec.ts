import { createSpyObj } from 'jest-createspyobj';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { of, Subject } from 'rxjs';

import { RecordingDetailsComponent } from '../details/details.component';
import { RecordingsService } from '../recordings.service';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
    const now = new Date();
    let component: OverviewComponent;
    let dialog: jest.Mocked<MatDialog>;
    let recordingsService: jest.Mocked<RecordingsService>;
    let subscription: jest.Mocked<Subject<any>>;

    beforeAll(() => {
        dialog = createSpyObj(MatDialog, ['open']);
        subscription = createSpyObj(Subject, ['next', 'unsubscribe']);
        recordingsService = createSpyObj(RecordingsService, ['getRecordings', 'record']);
        component = new OverviewComponent(dialog, recordingsService);
    });

    describe('constructor', () => {
        it('creates a new datasource', () =>
            expect(component.dataSource).toBeInstanceOf(MatTableDataSource));

        it('creates a new subscriptions object', () =>
            expect(component.subscriptions).toEqual([]));
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
            expect(component.record).toBe(false));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));
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
            expect(component.record).toBe(true));

        it('adds the observable to the subscription list', () =>
            expect(component.subscriptions.length).toBe(1));
    });

    describe('filter', () => {
        beforeEach(() => {
            component.dataSource.data = [{
                datetime: now.getTime(),
                name: 'mock name',
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
                }
            }];
        });

        it('filters by name', () => {
            component.filter('mock name');

            expect(component.dataSource._filterData(component.dataSource.data)).toEqual([{
                datetime: now.getTime(),
                name: 'mock name',
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
                }
            }]);
        });

        it('filters by url', () => {
            component.filter('some/url');

            expect(component.dataSource._filterData(component.dataSource.data)).toEqual([{
                datetime: now.getTime(),
                name: 'mock name',
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
                }
            }]);
        });
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
            expect(component.dataSource.data).toEqual([{
                datetime: now.getTime(),
                name: 'mock name',
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
                }
            }]));

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

    describe('showRecordingDetails', () => {
        beforeEach(() => {
            component.showRecordingDetails({
                datetime: now.getTime(),
                name: 'mock name',
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
                }
            });
        });

        it('opens de dialog', () =>
            expect(dialog.open).toHaveBeenCalledWith(RecordingDetailsComponent, {
                width: '80%',
                data: {
                    datetime: now.getTime(),
                    name: 'mock name',
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
                    }
                },
                height: '80%'
            }));
    });
});
