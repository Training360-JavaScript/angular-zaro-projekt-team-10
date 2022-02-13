import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, phrase: string): any {

    if (!Array.isArray(value) || !phrase) {
      return value;
    }

    phrase = ('' + phrase).toLowerCase();

    return value.filter((item: any) => {
      return Object.values(item).some((element: any) => ('' + element).toLowerCase().includes(phrase));
    });
  }

}
