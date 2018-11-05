import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterMocksPipe implements PipeTransform {
    transform(mocks: any[], searchText: string): any[] {
        if (!mocks) {
            return [];
        }
        if (!searchText) {
            return mocks;
        }
        searchText = searchText.toLowerCase();
        return mocks.filter((mock) => mock.name.toLowerCase().includes(searchText));
    }
}
