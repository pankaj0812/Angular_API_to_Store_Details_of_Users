import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { PersonModel } from '../personModel';

import {Observable} from 'rxjs/Rx';

// import { Router } from '@angular/router';

// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class HttpService {

    private BASE_URL:string = 'http://localhost:8080/api/persons/';

    constructor(
	        private http: Http
	) { }

	public getAllPerson(){
		return this.http.get(`${this.BASE_URL}`)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public addPerson(body:PersonModel){
		let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });
		return this.http.post(`${this.BASE_URL}`,JSON.stringify(body), options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public updatePerson(body:PersonModel){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });

		return this.http.put(`${this.BASE_URL}${body['_id']}`,JSON.stringify(body), options)
      // .do(res=> {
      //   if(res.status === 200 || res.status ===201){
      //     this.router.navigate(['/persons']);
      //   }
      // })
      .map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

	public deletePerson(personsID:string){

        let options = new RequestOptions({
        	headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
        });

		return this.http.delete(`${this.BASE_URL}${personsID}`,options)
			.map((res:Response) => res.json())
			.catch((error:any) => Observable.throw(error.json().error || 'Server error'));
	}

// private extractData(res:Response){
//   let body = res.json();
//   return body || {}
// }
}
