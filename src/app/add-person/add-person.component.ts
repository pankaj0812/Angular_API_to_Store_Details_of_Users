import { Component,Input, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpService } from '../services/http.service';
import { EmitterService } from '../services/emitter.service';

import { PersonModel } from '../personModel';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css'],
  providers: [ HttpService ]
})
export class AddPersonComponent implements OnChanges {

    @Input() personInfo: string;
    @Input() reset: string;
	@Input() personList: string;

	private isInsert:boolean = true;
	private personModel:PersonModel = new PersonModel(null,null,null,null,null);

	constructor(
			private httpService: HttpService
		) {}

	public addPerson(){
		this.httpService.addPerson(this.personModel).subscribe(
                        response =>  {
							if(response.error) {
	                        	alert(`The person's details could not be added, server Error.`);
	                        } else {
	                        	EmitterService.get(this.personList).emit(response.persons);
	                        }
                        },
                        error=> {
                       		alert(`The person's details could not be added, server Error.`);
                       	}
                    );
	}

	public updatePerson(){
		this.httpService.updatePerson(this.personModel).subscribe(
						response => {
							if(response.error) {
	                        	alert(`The person's details could not be updated, server Error.`);
	                        } else {
	                        	EmitterService.get(this.personList).emit(response.persons);
	                        }
                        },
                        error=> {
                        	alert(`The person's details could not be updated, server Error.`);
                        }
                    );
	}

	public resetAddPerson(){
		this.personModel = new PersonModel(null,null,null,null,null);
		EmitterService.get(this.reset).emit(true);
		this.isInsert = true;
	}

	ngOnChanges(changes:any) {

		EmitterService.get(this.personInfo).subscribe( (value:PersonModel) => {
			this.personModel = new PersonModel(value._id,value.name,value.age,value.gender,value.mobileno);
			this.isInsert = false;
		});
	}
}
