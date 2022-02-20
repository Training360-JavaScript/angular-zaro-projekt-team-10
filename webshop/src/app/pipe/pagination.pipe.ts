import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagination',
})
export class PaginationPipe implements PipeTransform {
  transform(
    value: any[] | null,
    perPage: number,
    page: number | null
  ): any[] | null {
    if (!Array.isArray(value)) {
      return null;
    }

    let parsedPerPage = perPage ? perPage : 20;
    let parsedPage = page ? Number(page) : 1;

    const offset = parsedPerPage * (parsedPage - 1);

    let records = value.slice(offset, offset + parsedPerPage);

    return records;
  }
}
