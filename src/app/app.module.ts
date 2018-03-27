import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ItemService } from './item.service';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [ ItemService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
