import { Mock } from '@ng-apimock/core/dist/mock/mock';
import { createSpyObj } from 'jest-createspyobj';

import { of, Subject } from 'rxjs';

import { MocksService } from '../../mocks/mocks.service';
import { GetPresetResponse } from '../presets.interfaces';
import { PresetsService } from '../presets.service';

import { CreatePresetComponent } from './create-preset.component';

import { GetMocksResponse, MockState } from 'src/app/mocks/mock-state';

describe('CreatePresetComponent', () => {
  let component: CreatePresetComponent;
  let presetsService: jest.Mocked<PresetsService>;
  let mocksService: jest.Mocked<MocksService>;

  beforeEach(() => {
    mocksService = createSpyObj(MocksService, ['getMocks']);
    presetsService = createSpyObj(PresetsService, [
      'getPresets',
      'createPreset',
    ]);
    component = new CreatePresetComponent(presetsService, mocksService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    const existingPresets: GetPresetResponse = {
      presets: [
        { name: 'preset1', mocks: {}, variables: {} },
        { name: 'preset2', mocks: {}, variables: {} },
        { name: 'preset3', mocks: {}, variables: {} },
      ],
    };
    beforeEach(() => {
      presetsService.getPresets.mockReturnValue(of(existingPresets));
    });
    it('should get existing presets and store them', () => {
      component.ngOnInit();
      expect(presetsService.getPresets).toHaveBeenCalled();
    });
    it('should listing to the formControl and check is the toBe presetName does already exist', () => {
      component.ngOnInit();
      component.duplicateName = false;
      component.presetNameControl.setValue('preset1');
      component.presetNameControl.updateValueAndValidity();
      expect(component.duplicateName).toBeTruthy();

      component.presetNameControl.setValue('notExistingYet');
      component.presetNameControl.updateValueAndValidity();
      expect(component.duplicateName).toBeFalsy();
    });
  });
  describe('#createPreset', () => {
    const mocksSubject = new Subject<GetMocksResponse>();
    const presetSubject = new Subject<GetPresetResponse>();
    const existingMocks: GetMocksResponse = {
      mocks: [{ name: 'mock1' }, { name: 'mock2' }] as Mock[],
      state: {
        mock1: {
          scenario: 'myscenario',
        } as MockState,
        mock2: {
          scenario: 'passThrough',
        } as MockState,
      },
    };
    beforeEach(() => {
      mocksService.getMocks.mockReturnValue(mocksSubject.asObservable());
      presetsService.createPreset.mockReturnValue(presetSubject.asObservable());
    });
    it('should not do anything if there is a duplicatname, or an error', () => {
      component.duplicateName = true;

      component.createPreset();
      expect(mocksService.getMocks).not.toHaveBeenCalled();
      component.presetNameControl.setValue('somename');
      component.presetNameControl.updateValueAndValidity();
      component.createPreset();
      expect(mocksService.getMocks).not.toHaveBeenCalled();
      component.duplicateName = false;
      component.presetNameControl.reset();
      component.presetNameControl.updateValueAndValidity();
      component.createPreset();
      expect(mocksService.getMocks).not.toHaveBeenCalled();
    });
    describe('with no errors', () => {
      it('should get existing Mocks', () => {
        component.duplicateName = false;
        component.presetNameControl.setValue('somename');
        component.presetNameControl.updateValueAndValidity();
        component.createPreset();
        expect(mocksService.getMocks).toHaveBeenCalled();
      });
      it('should use the mocked responses and create the Preset and alter state then done', () => {
        component.presetNameControl.setValue('somename');
        component.presetNameControl.updateValueAndValidity();
        component.createPreset();
        mocksSubject.next(existingMocks);
        expect(presetsService.createPreset).toHaveBeenCalledWith('somename', {
          mock1: { scenario: 'myscenario' },
        });
        presetSubject.next();
        expect(component.presetCreated).toBeTruthy();
      });
    });
  });
});
