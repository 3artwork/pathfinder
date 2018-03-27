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
      let y = this.path[next].item.coords.lon - this.path[index].item.coords.lon;
      let x = this.path[next].item.coords.lat - this.path[index].item.coords.lat;
      let angle = Math.atan2(y, x) * 180 / Math.PI;
      return this.compassHeading(angle);
    }
    return null;
  }
  private compassHeading(angle) {
    let heading;
    if(angle >= 303.75 || angle < 56.25) {
      if(angle >= 348.75 || angle < 11.25) {
        return 'N';
      }
      else if(angle < 33.75){
        return 'NNE';
      }
      else if(angle < 56.25){
        return 'NE';
      }
      else if(angle < 326.25){
        return 'NW';
      }
      else {
        return 'NNW';
      }
    }
    else if (angle < 123.75) {
      if(angle < 78.75) {
        return 'ENE';
      }
      else if(angle < 101.25) {
        return 'E';
      }
      else {
        return 'ESE';
      }
    }
    else if(angle < 236.25) {
      if(angle < 146.25) {
        return 'SE';
      }
      else if(angle < 168.75){
        return 'SSE';
      }
      else if(angle < 191.25){
        return 'S';
      }
      else if(angle < 213.75){
        return 'SSW';
      }
      else {
        return 'SW';
      }
    }
    else {
      if(angle < 258.75) {
        return 'WSW';
      }
      else if(angle < 281.25) {
        return 'W';
      }
      else {
        return 'WNW';
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
    return target instanceof Item ? 'note' : 'dossier';
  }
}
