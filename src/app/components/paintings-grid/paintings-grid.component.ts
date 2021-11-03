import { SearchFilterPipe } from './../../shared/pipes/search-filter.pipe';
import { Painting } from './../../shared/models/painting.model';
import { PaintingObject } from './../../shared/models/paintings-object.model';
import { Component, Input, OnInit } from '@angular/core';
import { PaintingsDataService } from '../../shared/services/paintings-data.service';




@Component({
  selector: 'app-paintings-grid',
  templateUrl: './paintings-grid.component.html',
  styleUrls: ['./paintings-grid.component.scss']
})
export class PaintingsGridComponent implements OnInit{

  paintings: Promise<Painting[]> | null = null;
  @Input()
  public query = '';

  constructor(
    private paintingsDataService: PaintingsDataService,
    private searchFilterPipe: SearchFilterPipe
) {
}

  ngOnInit(): void {
    console.log('this is the query:' + this.query);
    this.paintings = this.paintingsDataService.getPaintings();
    console.log('paintings from grid-comp' + this.paintings);

  }

}
