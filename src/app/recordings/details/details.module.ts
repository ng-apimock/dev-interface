import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatTableModule } from "@angular/material/table";

import { RecordingDetailsComponent } from "./details.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  declarations: [RecordingDetailsComponent],
  exports: [RecordingDetailsComponent],
})
export class RecordingDetailsModule {}
