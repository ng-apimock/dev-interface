import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    standalone: true
})
export class FilterMocksPipe implements PipeTransform {
    /** {@inheritDoc}.*/
    transform(mocks: any[], searchText: string): any[] {
        if (!mocks) {
            return [];
        }
        if (!searchText) {
            return mocks;
        }
        searchText = searchText.toLowerCase();
        return mocks.filter(mock => mock.name.toLowerCase().includes(searchText));
    }
}
