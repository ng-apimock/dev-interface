import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';

import { MocksService } from '../../mocks/mocks.service';
import { VariablesService } from '../../variables/variables.service';
import { PresetsService } from '../presets.service';

import { CreatePresetRequest } from './create-preset-request';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'apimock-create-preset',
    templateUrl: './create-preset.component.html',
    styleUrls: ['./create-preset.component.scss'],
    standalone: true,
    imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule
],
})
export class CreatePresetComponent implements OnInit {
    presetForm: FormGroup;

    public duplicate = false;
    public hasData = true;
    public done = false;

    public presets: string[] = [];

    constructor(
        private readonly fb: FormBuilder,
        private readonly presetsService: PresetsService,
        private readonly mocksService: MocksService,
        private readonly variablesService: VariablesService,
        public dialogRef: MatDialogRef<CreatePresetComponent>
    ) {
    }

    ngOnInit(): void {
        this.presetForm = this.fb.group({
            name: '',
            excludeMocks: false,
            excludeVariables: false
        });

        this.presetsService.getPresets()
            .subscribe(presets =>
                this.presets = presets.presets.map(preset => preset.name));

        this.presetForm.get('name').valueChanges
            .subscribe(newName =>
                this.duplicate = this.presets.indexOf(newName) > -1);

        this.presetForm.get('excludeMocks').valueChanges
            .subscribe(newName =>
                this.hasData = !this.presetForm.get('excludeMocks').value
                    || !this.presetForm.get('excludeVariables').value);

        this.presetForm.get('excludeVariables').valueChanges
            .subscribe(newName =>
                this.hasData = !this.presetForm.get('excludeMocks').value
                    || !this.presetForm.get('excludeVariables').value);
    }

    submitForm(): void {
        if (this.presetForm.valid) {
            forkJoin([this.mocksService.getMocks(), this.variablesService.getVariables()])
                .subscribe(results => {
                    const name = this.presetForm.get('name').value;
                    const excludeMocks = this.presetForm.get('excludeMocks').value;
                    const excludeVariables = this.presetForm.get('excludeVariables').value;

                    const mocks = excludeMocks ? {} : results[0].state;
                    const variables = excludeVariables ? {} : results[1].state;

                    const request = new CreatePresetRequest(name, mocks, variables);

                    this.presetsService.createPreset(request)
                        .subscribe(data => this.dialogRef.close());
                });
        }
    }

    cancel(): void {
        this.dialogRef.close();
    }
}
