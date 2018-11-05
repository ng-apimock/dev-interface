import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filter'})
export class FilterVariablesPipe implements PipeTransform {
    transform(variables: {[key:string]:string}[], searchText: string): any[] {
        if(!variables) return [];
        if(!searchText) return variables;
        searchText = searchText.toLowerCase();
        console.log(variables);
        return variables.filter( (variable: {[key:string]:string}) => variable.key.toLowerCase().includes(searchText));
    }
}