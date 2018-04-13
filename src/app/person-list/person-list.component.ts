import { Component, Input, OnInit,OnChanges } from '@angular/core';

import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';

import { PersonModel } from '../personModel';

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css'],
  providers: [ HttpService ]
})
export class PersonListComponent implements OnInit, OnChanges{

    @Input() reset: string;
    @Input() personInfo: string;
	@Input() personList: string;


	private personsList;
	private currentPerson:PersonModel;
	private isReset:boolean = true;


	constructor(
			private httpService: HttpService
		) {}

	ngOnInit(){
		this.httpService.getAllPerson().subscribe(
                       response => this.personsList = response.persons,
                       error=>  { alert(`Can't get persons details.`); }
                    );
	}

	public personSelected(person){
		this.currentPerson = person;
		EmitterService.get(this.personInfo).emit(this.currentPerson);
		this.isReset = true;
	}

	public isSelected(person): boolean {
		if(!this.currentPerson) {
			return false;
		}
		return this.currentPerson._id ===  person._id ? true : false;
	}

	public deletePerson(personId:string){
		this.httpService.deletePerson(personId).subscribe(
						response => {
							if(response.error) {
	                        	alert(`The person's details could not be deleted, server Error.`);
	                        } else {
	                        	this.personsList = response.persons;
	                        }
                        },
                       error=> {
                       		alert(`The person's details could not be deleted, server Error.`);
                       	}
                    );
	}

	ngOnChanges(changes:any) {

		EmitterService.get(this.reset).subscribe( (reset:string) => {
			this.isReset = false;
		});


		EmitterService.get(this.personList).subscribe( (personList:string) => {
			this.personsList = personList;
		});
	}
}
