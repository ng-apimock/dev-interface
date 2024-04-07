import { HeaderComponent } from './header.component';

import { VersionsService } from './versions.service';
import { createSpyObj } from "jest-createspyobj";
import { of, Subscription } from "rxjs";
import { Build } from "./versions.interfaces";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let versionsService: jest.Mocked<VersionsService>;
  let subscription: jest.Mocked<Subscription>;

  beforeEach(() => {
    versionsService = createSpyObj(VersionsService, ['getCoreVersion']);
    subscription = createSpyObj(Subscription);
    component = new HeaderComponent(versionsService);
  });

  describe('constructor', () => {
    it('creates a new subscriptions object', () =>
        expect(component.subscriptions).toEqual([]));
  });

  describe('getCoreVersion', () => {
    beforeEach(() => {
      versionsService.getCoreVersion.mockReturnValue(of({ build: { artifact: '@ng-apimock/core', description: 'ng-apimock core module', version: '3.12.0' } as Build }));
      component.getCoreVersion();
    });

    afterEach(() => {
      component.subscriptions = [];
    });

    it('calls getCoreVersion', () =>
        expect(versionsService.getCoreVersion).toHaveBeenCalled());

    it('subscribes to getCoreVersion and sets the coverVersion once resolved', () =>
        expect(component.coreVersion).toEqual('3.12.0'));

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
    let getCoreVersionFn;

    beforeEach(() => {
      getCoreVersionFn = jest.spyOn(component, 'getCoreVersion');
      getCoreVersionFn.mockImplementation(() => []);

      component.ngOnInit();
    });

    it('sets indicator collapsed to true', () =>
        expect(component.isCollapsed).toBe(true));

    it('gets the presets', () =>
        expect(component.getCoreVersion).toHaveBeenCalled());
  });
});
