import { Component, OnInit, Output } from '@angular/core';
import { PaintingsDataService } from '../../shared/services/paintings-data.service';
import { Painting } from '../../shared/models/painting.model';
import {EventEmitter} from '@angular/core';

@Component({
  selector: 'app-paintings-search-bar',
  templateUrl: './paintings-search-bar.component.html',
  styleUrls: ['./paintings-search-bar.component.scss']
})
export class PaintingsSearchBarComponent implements OnInit {
  @Output()
  public query = new EventEmitter<string>();


  ngOnInit(): void {
    console.log('this is the query [searchbar]:' + this.query);
  }
  setQuery(query: string): void{
    this.query.emit(query);
  }

}
