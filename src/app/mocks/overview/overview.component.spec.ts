import { Mock } from '@ng-apimock/core/dist/mock/mock';
import { createSpyObj } from 'jest-createspyobj';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { of, Subject, Subscription } from 'rxjs';

import { CreatePresetComponent } from '../../presets/create-preset/create-preset.component';
import { UpdateMockRequest } from '../mock-request';
import { GetMocksResponse } from '../mock-state';
import { MocksService } from '../mocks.service';

import { OverviewComponent } from './overview.component';
describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let changeSubject: jest.Mocked<Subject<any>>;
  let mocksService: jest.Mocked<MocksService>;
  let request: jest.Mocked<UpdateMockRequest>;
  let subscription: jest.Mocked<Subscription>;
  let router: jest.Mocked<Router>;
  let dialog: jest.Mocked<MatDialog>;
  const routerSubject = new Subject<RouterEvent>();

  const getMocksResponse: GetMocksResponse = {
    state: {},
    mocks: [{ name: 'mock' } as Mock],
  };
  beforeEach(() => {
    changeSubject = createSpyObj(Subject, ['next']);
    mocksService = createSpyObj(MocksService, [
      'getMocks',
      'resetMocksToDefault',
      'setMocksToPassThrough',
    ]);
    subscription = createSpyObj(Subscription);
    request = createSpyObj(UpdateMockRequest);
    router = createSpyObj(Router);
    dialog = createSpyObj(MatDialog);
    (router.events as any) = routerSubject.asObservable();
    component = new OverviewComponent(router, mocksService as any, dialog);
    component.change$ = changeSubject;
  });

  describe('constructor', () => {
    it('creates a new data object', () =>
      expect(component.data).toEqual({ state: {}, mocks: [] }));

    it('creates a new subscriptions object', () =>
      expect(component.subscriptions).toEqual([]));
  });

  describe('getMocks', () => {
    beforeEach(() => {
      mocksService.getMocks.mockReturnValue(of(getMocksResponse));
      component.getMocks();
    });

    afterEach(() => {
      component.subscriptions = [];
    });

    it('calls getMocks', () =>
      expect(mocksService.getMocks).toHaveBeenCalled());

    it('subscribes to getMocks and sets the data object once resolved', () =>
      expect(component.data).toEqual(getMocksResponse));

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
    let getMocksFn;

    beforeEach(() => {
      getMocksFn = jest.spyOn(component, 'getMocks');
      getMocksFn.mockImplementation(() => []);
      component.dialogRef = ({
        close: jest.fn(),
      } as unknown) as MatDialogRef<any>;
      component.ngOnInit();
    });

    it('gets the mocks', () => expect(getMocksFn).toHaveBeenCalled());

    it('creates the change subject', () =>
      expect(component.change$).toBeDefined());

    it('should close the dialog on router events', () => {
      const event = new NavigationStart(1, '/');
      routerSubject.next(event);
      expect(component.dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('onUpdate', () => {
    beforeEach(() => {
      component.onUpdate(request);
    });

    it('emits the change', () =>
      expect(component.change$.next).toHaveBeenCalled());
  });

  describe('resetMocksToDefaults', () => {
    beforeEach(() => {
      mocksService.getMocks.mockReturnValue(of(getMocksResponse));
      mocksService.resetMocksToDefault.mockReturnValue(of({}));

      component.resetMocksToDefaults();
    });

    it('call resetMocksToDefault', () =>
      expect(mocksService.resetMocksToDefault).toHaveBeenCalled());

    it('subscribes to resetMocksToDefault and once resolved calls getMocks', () =>
      expect(mocksService.getMocks).toHaveBeenCalled());

    it('subscribes to getMocks and sets the data object once resolved', () =>
      expect(component.data).toEqual(getMocksResponse));

    it('subscribes to getMocks and emits the change', () =>
      expect(changeSubject.next).toHaveBeenCalledWith(
        'All mocks have been reset to defaults.'
      ));
  });

  describe('setMocksToPassThrough', () => {
    beforeEach(() => {
      mocksService.getMocks.mockReturnValue(of(getMocksResponse));
      mocksService.setMocksToPassThrough.mockReturnValue(of({}));

      component.setMocksToPassThrough();
    });

    it('call setMocksToPassThrough', () =>
      expect(mocksService.setMocksToPassThrough).toHaveBeenCalled());

    it('subscribes to setMocksToPassThrough and once resolved calls getMocks', () =>
      expect(mocksService.getMocks).toHaveBeenCalled());

    it('subscribes to getMocks and sets the data object once resolved', () =>
      expect(component.data).toEqual(getMocksResponse));

    it('subscribes to getMocks and emits the change', () =>
      expect(changeSubject.next).toHaveBeenCalledWith(
        'All mocks have been set to pass through.'
      ));
  });

  describe('saveAsPreset', () => {
    it('should open the dialog with the proper component', () => {
      component.saveAsPreset();
      expect(dialog.open).toHaveBeenCalledWith(CreatePresetComponent);
    });
  });
});
