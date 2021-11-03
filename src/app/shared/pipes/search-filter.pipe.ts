import { Pipe, PipeTransform } from '@angular/core';
import { PaintingsDataService } from '../services/paintings-data.service';
import { Painting } from '../models/painting.model';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value: Painting[], query: string): Painting[] | null {
    if (!value) { return null; }
    if (!query) { return value; }

    query = query.toLowerCase();

    return value.filter((data) => {
        return JSON.stringify(data).toLowerCase().includes(query);
    });
  }

}
