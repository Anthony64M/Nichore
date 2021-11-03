import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paintings-section',
  templateUrl: './paintings-section.component.html',
  styleUrls: ['./paintings-section.component.scss']
})
export class PaintingsSectionComponent implements OnInit {

  constructor() { }
  public query = '';

  ngOnInit(): void {
  }

  setQuery(query: string): void{
    console.log(query);
    this.query = query;
  }

}
