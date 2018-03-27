export class Point {
  private _lat: number;
  private _lon: number;
  constructor(lat: number, lon: number) {
    this._lat = this.processNumber(lat);
    this._lon = this.processNumber(lon);
  }
  public get lat() {
    return this._lat;
  }
  public get lon() {
    return this._lon;
  }
  public set lat(num: number) {
    this.processNumber(num);
  }
  public set lon(num: number) {
    this.processNumber(num);
  }
  private processNumber(num: number) {
    return (Math.round(num * 10) / 10);
  }
}
export class Item {
  constructor(public coords: Point) {

  }
}
export class Note extends Item {
  constructor(
    public author: string,
    public type: string, 
    public number: number,
    public coords: Point
  ) {
    super(coords);
  }
  public getTitle(): string {
    return this.author + ' ' + this.type.toLowerCase() + ' #' + this.number;
  };
}
export class Dossier extends Item {
  constructor(
    public name: string, 
    public coords: Point
  ) {
    super(coords);
  }
  public getTitle(): string {
    return this.name + ' Dossier';
  }
}