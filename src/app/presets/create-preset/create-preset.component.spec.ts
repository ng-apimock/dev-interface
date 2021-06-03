import { Mock } from '@ng-apimock/core/dist/mock/mock';
import { createSpyObj } from 'jest-createspyobj';

import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { MocksService } from '../../mocks/mocks.service';
import { VariablesService } from '../../variables/variables.service';
import { GetPresetResponse } from '../presets.interfaces';
import { PresetsService } from '../presets.service';

import { CreatePresetComponent } from './create-preset.component';

describe('CreatePresetComponent', () => {
    let component: CreatePresetComponent;
    let presetsService: jest.Mocked<PresetsService>;
    let mocksService: jest.Mocked<MocksService>;
    let variableService: jest.Mocked<VariablesService>;
    let dialogRef: jest.Mocked<MatDialogRef<CreatePresetComponent>>;
    let fb: FormBuilder;

    beforeEach(() => {
        fb = new FormBuilder();
        mocksService = createSpyObj(MocksService, ['getMocks']);
        variableService = createSpyObj(VariablesService, ['getVariables']);
        presetsService = createSpyObj(PresetsService, [
            'getPresets',
            'createPreset',
        ]);
        dialogRef = createSpyObj(MatDialogRef, ['close']) as jest.Mocked<MatDialogRef<CreatePresetComponent>>;
        component = new CreatePresetComponent(fb, presetsService, mocksService, variableService, dialogRef);
    });

    describe('ngOnInit', () => {
        const existingPresets: GetPresetResponse = {
            presets: [
                {name: 'preset1', mocks: {}, variables: {}},
                {name: 'preset2', mocks: {}, variables: {}},
                {name: 'preset3', mocks: {}, variables: {}},
            ],
        };
        beforeEach(() => {
            presetsService.getPresets.mockReturnValue(of(existingPresets));
            component.ngOnInit();
        });

        it('initializes the form', () => {
            expect(component.presetForm).toBeDefined();
            expect(component.presetForm.getRawValue()).toEqual({
                name: '',
                excludeMocks: false,
                excludeVariables: false
            });
        });

        it('should get existing presets and store them', () => {
            expect(component.presets).toEqual([
                'preset1',
                'preset2',
                'preset3'
            ]);
            expect(presetsService.getPresets).toHaveBeenCalled();
        });

        it('marks the provided name as duplicate', () => {
            component.duplicate = false;

            component.presetForm.get('name').setValue('preset1');
            component.presetForm.get('name').updateValueAndValidity();

            expect(component.duplicate).toBeTruthy();
        });

        it('unmarks the provided name as duplicate', () => {
            component.duplicate = true;

            component.presetForm.get('name').setValue('preset4');
            component.presetForm.get('name').updateValueAndValidity();

            expect(component.duplicate).toBeFalsy();
        });

        it('indicate the to be created preset has data', () => {
            component.hasData = true;

            component.presetForm.get('excludeMocks').setValue(true);
            component.presetForm.get('excludeMocks').updateValueAndValidity();

            expect(component.hasData).toBeTruthy();

            component.presetForm.get('excludeVariables').setValue(true);
            component.presetForm.get('excludeVariables').updateValueAndValidity();

            expect(component.hasData).toBeFalsy();

            component.presetForm.get('excludeMocks').setValue(false);
            component.presetForm.get('excludeMocks').updateValueAndValidity();

            expect(component.hasData).toBeTruthy();
        });
    });

    describe('submitForm', () => {
        let presetFormGetFn: jest.Mock;

        beforeEach(() => {
            mocksService.getMocks.mockImplementation(() => of({
                state: {mock: {delay: 0, echo: false, scenario: 'some'}},
                mocks: [
                    {name: 'some', request: {url: 'path/to/some-url'}} as Mock,
                    {name: 'other', request: {url: 'path/to/other-url'}} as Mock
                ]
            }));
            variableService.getVariables.mockImplementation(() => of(
                {state: {one: 'first', two: 'second', three: 'third'}}
            ));

            presetsService.createPreset.mockImplementation(() => of({}));

            presetFormGetFn = jest.fn();
            component.presetForm = {
                valid: true,
                get: presetFormGetFn
            } as any;
        });

        describe('valid', () => {
            it('creates the preset with mocks and variables', () => {
                presetFormGetFn.mockImplementation((key: string) =>
                        ({
                            value: key === 'name'
                                ? 'name' : key === 'excludeMocks'
                                    ? false : key === 'excludeVariables'
                                        ? false : undefined
                        })
                );

                component.submitForm();

                expect(presetsService.createPreset).toHaveBeenCalledWith({
                    name: 'name',
                    mocks: {
                        mock: {
                            delay: 0,
                            echo: false,
                            scenario: 'some'
                        }
                    },
                    variables: {
                        one: 'first',
                        two: 'second',
                        three: 'third'
                    }
                });
                expect(mocksService.getMocks).toHaveBeenCalled();
                expect(variableService.getVariables).toHaveBeenCalled();
                expect(dialogRef.close).toHaveBeenCalled();
            });

            it('creates the preset with variables', () => {
                presetFormGetFn.mockImplementation((key: string) =>
                    ({
                            value: key === 'name'
                                ? 'name' : key === 'excludeMocks'
                                    ? true : key === 'excludeVariables'
                                        ? false : undefined
                        })
                );

                component.submitForm();

                expect(presetsService.createPreset).toHaveBeenCalledWith({
                    name: 'name',
                    mocks: {},
                    variables: {
                        one: 'first',
                        two: 'second',
                        three: 'third'
                    }
                });
                expect(mocksService.getMocks).toHaveBeenCalled();
                expect(variableService.getVariables).toHaveBeenCalled();
                expect(dialogRef.close).toHaveBeenCalled();
            });

            it('creates the preset with mock', () => {
                presetFormGetFn.mockImplementation((key: string) =>
                        ({
                            value: key === 'name'
                                ? 'name' : key === 'excludeMocks'
                                    ? false : key === 'excludeVariables'
                                        ? true : undefined
                        })
                );

                component.submitForm();

                expect(presetsService.createPreset).toHaveBeenCalledWith({
                    name: 'name',
                    mocks: {
                        mock: {
                            delay: 0,
                            echo: false,
                            scenario: 'some'
                        }
                    },
                    variables: {}
                });
                expect(mocksService.getMocks).toHaveBeenCalled();
                expect(variableService.getVariables).toHaveBeenCalled();
                expect(dialogRef.close).toHaveBeenCalled();
            });
        });

        describe('invalid', () => {
            beforeEach(() => {
                (component.presetForm as any).valid = false;

                component.submitForm();
            });
            it('does nothing', () => {
                expect(mocksService.getMocks).not.toHaveBeenCalled();
                expect(variableService.getVariables).not.toHaveBeenCalled();
                expect(dialogRef.close).not.toHaveBeenCalled();
            });
        });

        describe('cancel', () => {
           it('closes the dialog', () => {
               component.cancel();
               expect(dialogRef.close).toHaveBeenCalled();
           }) ;
        });
    });
});
