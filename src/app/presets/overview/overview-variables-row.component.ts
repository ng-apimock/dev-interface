import {Component, Input} from '@angular/core';

@Component({
    selector: '[apimock-preset-overview-variables-row]',
    templateUrl: './overview-variables-row.component.html',
    styleUrls: ['./overview-variables-row.component.scss']
})
export class OverviewVariablesRowComponent {
    @Input() preset: any;
}
