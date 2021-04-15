import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { MocksService } from '../../mocks/mocks.service';
import { PresetsService } from '../presets.service';

import { GetMocksResponse, MocksWithState } from 'src/app/mocks/mock-state';

const PASSTHROUGH_KEY = 'passThrough';

@Component({
  selector: 'create-preset',
  templateUrl: './create-preset.component.html',
  styleUrls: ['./create-preset.component.scss'],
})
export class CreatePresetComponent implements OnInit {
  public presetName: string;
  public presetNameControl = new FormControl(null, Validators.required);
  public duplicateName = false;
  public presetCreated = false;
  private presets: string[] = [];

  constructor(
    private readonly presetsService: PresetsService,
    private readonly mockService: MocksService
  ) {}

  ngOnInit(): void {

    this.presetsService.getPresets().subscribe(presets => {
      this.presets = presets.presets.map(preset => preset.name);
    });
    this.presetNameControl.valueChanges.subscribe(newName => this.duplicateName = this.presets.indexOf(newName) > -1);
  }

  createPreset(): void {
      if (!this.duplicateName && !!this.presetNameControl.value) {
        this.mockService.getMocks().subscribe((mockState: GetMocksResponse) => {
            const mockedMocks: MocksWithState = {};
            Object.keys(mockState.state).forEach(mockName => {
                if (mockState.state[mockName].scenario !== PASSTHROUGH_KEY) {
                    mockedMocks[mockName] = mockState.state[mockName] ;
                }
            });
            this.presetsService.createPreset(this.presetNameControl.value, mockedMocks).subscribe(data => {
                this.presetCreated = true;
            });
        });
      }
  }
}
