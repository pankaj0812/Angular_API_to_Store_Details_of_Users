import { Component } from '@angular/core';

import { PersonListComponent } from './person-list/person-list.component';
import { AddPersonComponent } from './add-person/add-person.component';

import { EmitterService } from './services/emitter.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})


export class AppComponent {

	public host_id: "HOST_COMPONENT";
	public title:string = 'Store Details of People with their Mobile Numbers';

	private personInfo = 'CRUD_PERSON_INFO';
    private reset = 'CRUD_RESET_FORM';
    private perosnList = 'CRUD_PERSON_LIST';

	constructor(private _emitterService: EmitterService) {}
}
