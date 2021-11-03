import { Painting } from './../../shared/models/painting.model';
import {PaintingDetails} from './../../shared/models/paintingDetails.model';
import { Component, OnInit } from '@angular/core';
import {PaintingsDataService} from '../../shared/services/paintings-data.service';
import {ActivatedRoute, Router, RouterLinkActive} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.component.html',
  styleUrls: ['./painting-details.component.scss']
})
export class PaintingDetailsComponent implements OnInit {

  painting$: Observable<Painting> | null = null;
  paintingDetails$: Observable<PaintingDetails> | null = null;

  hovered: boolean;

  constructor(
    private paintingsDataService: PaintingsDataService,
    private route: ActivatedRoute,
  ) {
    this.hovered = false;
  }

  ngOnInit(): void {
    this.painting$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log({ id });
        if (id === null) {
          return Promise.reject('No id found in the URL');
        }
        return this.paintingsDataService.getPainting(id);
      })
    );
    this.paintingDetails$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        console.log({ id });
        if (id === null) {
          return Promise.reject('No id found in the URL');
        }
        console.log(this.paintingsDataService.getPaintingDetails(id));
        return this.paintingsDataService.getPaintingDetails(id);
      })
    );
  }
}
