import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  constructor(private http: Http) { }

  getNotes(subsurface: boolean) {
    return this.http.post('/api/getNotes', {'subsurface': subsurface }).map((res: Response) => res.json());
  }
  getDossiers(subsurface: boolean) {
    return this.http.post('/api/getDossiers', {'subsurface': subsurface }).map((res: Response) => res.json());
  }
}