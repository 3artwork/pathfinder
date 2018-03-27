import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ItemService {

  constructor(private http: Http) { }

  getNotes() {
    return this.http.get('/api/getNotes').map((res: Response) => res.json());
  }
  getDossiers() {
    return this.http.get('/api/getDossiers').map((res: Response) => res.json());
  }
}
