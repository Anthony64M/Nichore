import { Painting } from './painting.model';


export interface PaintingObject{
    elapsedMilliseconds: number;
    count: number;
    countFacets: {
        hasimage: number;
        ondisplay: number;
    };
    artObjects: Painting[];
}