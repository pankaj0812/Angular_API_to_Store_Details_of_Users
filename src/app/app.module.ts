import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PersonListComponent } from './person-list/person-list.component';
import { AddPersonComponent } from './add-person/add-person.component';

import { EmitterService } from './services/emitter.service';

@NgModule({
  declarations: [
    AppComponent,
    PersonListComponent,
    AddPersonComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule
  ],
  providers: [EmitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
