import { Component, OnInit } from '@angular/core';
import { Point, Item, Note, Dossier } from "../point";
import { ItemService } from '../item.service';

interface Selections {
  item: Item;
  selected: boolean;
}
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  pathMode = false;

  path: Selections[];
  notes: Selections[];
  dossiers: Selections[];
  constructor(private itemService: ItemService) {
    this.path = [];
    this.getNotes();
    this.getDossiers();
  }

  public getPath() {
    let pathString = "";
    this.path.forEach((element) => {
      pathString += element.item.coords.lon + ',' + element.item.coords.lat + ' ';
    });
    return pathString;
  }
  public toggleSelect(item: Selections) {
    let index = this.path.indexOf(item);
    if(index !== -1) {
      this.path.splice(index, 1);
      item.selected = false;
    }
    else {
      item.selected = true;
      this.path.push(item);
    }
  }
  public getHeading(index: number): string {
    let next = index + 1;
    if(next < this.path.length) {
      let x_1 = this.path[index].item.coords.lon;
      let x_2 = this.path[next].item.coords.lon;
      let y_1 = this.path[index].item.coords.lat;
      let y_2 = this.path[next].item.coords.lat;
      let diff_y = y_1 - y_2;
      let diff_x = x_2 - x_1;
      let angle = Math.atan2(diff_y, diff_x) * 180 / Math.PI;
      if(angle < 0) angle += 360;
      return this.compassHeading(angle);
    }
    return null;
  }
  private compassHeading(angle) {
    let heading;
    if(angle < 33.75 || angle >= 326.25) {
      //W
      if(angle < 11.25 || angle >= 348.75) {
        return 'W';
      }
      else if (angle < 33.75) {
        return 'WNW';
      }
      else {
        return 'WSW';
      }
    }
    else if (angle < 146.25) {
      //N
      if (angle >= 123.75) {
        return 'NE';
      }
      else if (angle >= 101.25) {
        return 'NNE';
      }
      else if (angle >= 78.75) {
        return 'N';
      }
      else if (angle >= 56.25) {
        return 'NNW';
      }
      else {
        return 'NW';
      }
    }
    else if (angle < 213.75) {
      //E
      if (angle >= 191.25) {
        return 'ESE';
      }
      else if (angle >= 168.75) {
        return 'E';
      }
      else {
        return 'ENE';
      }
    }
    else {
      //S
      if (angle >= 303.75) {
        return 'SW';
      }
      else if (angle >= 281.25) {
        return 'SSW';
      }
      else if (angle >= 258.75) {
        return 'S';
      }
      else if (angle >= 236.25) {
        return 'SSE'
      }
      else {
        return 'SE'
      }
    }
  }
  public getNotes() {
    this.itemService.getNotes()
    .subscribe(data => {
      this.notes = [];
      data.forEach(element => {
        this.notes.push({
          item: new Note(
            element.Author,
            element.Type,
            element.Number,
            new Point(
              element.Latitude, 
              element.Longitude)),
          selected: false});
      });
    });
  }
  public getDossiers() {
    this.itemService.getDossiers()
    .subscribe(data => {
      this.dossiers = [];
      data.forEach(element => {
        this.dossiers.push({
          item: new Dossier(
            element.Name,
            new Point(
              element.Latitude, 
              element.Longitude)),
          selected: false});
      });
    });
  }
  public getClass(target: any): string {
    return target instanceof Note ? 'note' : 'dossier';
  }
}
