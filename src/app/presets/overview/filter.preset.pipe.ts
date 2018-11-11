import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'filter' })
export class FilterPresetsPipe implements PipeTransform {
    transform(presets: any[], searchText: string): any[] {
        if (!presets) {
            return [];
        }
        if (!searchText) {
            return presets;
        }
        searchText = searchText.toLowerCase();
        return presets.filter((preset) => preset.name.toLowerCase().includes(searchText));
    }
}
