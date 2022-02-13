import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringCutter'
})
export class StringCutterPipe implements PipeTransform {

  transform(data: any,
    start: number,
    end: number,
    property: string,
    curve: string = '...',
    ): string {
    if (property === 'description'){
      return data ? data.slice(start, end) + curve : data;
    }
    return data;
  }

}
