import { RecordingDetailsComponent } from './details.component';

describe('RecordingDetailsComponent', () => {
    const now = new Date();
    let component: RecordingDetailsComponent;
    let data: any;

    beforeEach(() => {
        data = {
            datetime: now.getTime(),
            name: 'mock name',
            request: {
                url: '/some/url',
                method: 'GET',
                headers: { record: 'true' },
                payload: {}
            },
            response: {
                data: [{ some: 'thing' }],
                status: 200,
                headers: { 'content-type': ['application/json'] }
            }
        };
        component = new RecordingDetailsComponent(data);
    });

    describe('constructor', () => {
        it('creates a new request datasource data', () =>
            expect(component.requestDataSource.data).toEqual([
                { key: 'Url', value: '/some/url' },
                { key: 'Method', value: 'GET' },
                { key: 'Headers', value: { record: 'true' } },
                { key: 'Body', value: {} },
            ]));

        it('creates a new response datasource data', () =>
            expect(component.responseDataSource.data).toEqual([
                { key: 'Status', value: 200 },
                { key: 'Headers', value: { 'content-type': ['application/json'] } },
                { key: 'Data', value: [{ some: 'thing' }] }
            ]));
    });
});
