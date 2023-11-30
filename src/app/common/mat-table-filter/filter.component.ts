import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'apimock-mat-table-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss'],
    standalone: true,
    imports: [FormsModule],
})
export class MatTableFilterComponent implements OnInit {
    @Input() placeholder: string;
    @Output() changed = new EventEmitter<string>();

    searchText: string;

    ngOnInit(): void {
        this.searchText = '';
    }
}
