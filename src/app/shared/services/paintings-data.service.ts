import { PaintingObject } from './../models/paintings-object.model';
import { Painting } from '../models/painting.model';
import {PaintingDetails} from '../models/paintingDetails.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class PaintingsDataService {

  readonly ROOT_URL = 'https://www.rijksmuseum.nl/api/en/collection?key=j7OLg4QP';

  paintings: Promise<Painting[]> | null = null;
  paintingDetails: Promise<PaintingDetails> | null = null ;

  constructor(private http: HttpClient) { }

  async getPaintings(): Promise<Painting[]> {
    if (this.paintings === null) {
      this.paintings = this.http
        .get<PaintingObject>(this.ROOT_URL)
        .toPromise()
        .then((paintingsResponse) => paintingsResponse.artObjects);
    }

    return this.paintings;
  }

  async getPainting(id: string): Promise<Painting> {
      const allPaintings = await this.getPaintings();
      const painting = allPaintings.find((p) => p.id === id);

      if (painting === undefined) {
        throw new Error(`Could not find the painting by id ${id}.`);
      }

      console.log({ painting });

      return painting;
  }

  async getPaintingDetails(id: string): Promise<PaintingDetails> {
    const allPaintings = await this.getPaintings();
    const painting = allPaintings.find((p) => p.id === id);

    if (painting === undefined) {
      throw new Error(`Could not find the painting by id ${id}.`);
    }

    const objectNumber = painting.objectNumber;
    const detailUrl = `https://www.rijksmuseum.nl/api/en/collection/${objectNumber}?key=j7OLg4QP`;

    this.paintingDetails = this.http
    .get<PaintingDetails>(detailUrl)
    .toPromise()
    .then((paintingDetailsResponse) => paintingDetailsResponse);

    return this.paintingDetails;
  }
}
