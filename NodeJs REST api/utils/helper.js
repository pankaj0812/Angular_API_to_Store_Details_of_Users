'use strict';

class Helper{

	constructor(){

		this.Mongodb = require("./db");
	}

	getPersons(callback){
		this.Mongodb.onConnect( (db,ObjectID) => {
			db.collection('persons').find().toArray( (err, result) => {
				callback(result);
				db.close();
			});
		});
	}


	addPerson(data,callback){

		var response = {};

		delete data['_id'];

		console.log(data);

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('persons').findOne(data,function(err, result){

				if(err){

					response.error = true;
					response.isUserExists = false;
					response.message = `Something went Wrong,try after sometime.`;
					callback(response);

				}else{

					if(result != null ){

						response.error = true;
						response.isUserExists = true;
						response.message = `Person already exists.`;

						callback(response);

					}else{

						db.collection('persons').insertOne(data, (err, result) => {

							if(err){
								response.error = true;
								response.isUserExists = false;
								response.message = `Something went Wrong,try after sometime.`;
							}else{
								response.error = false;
								response.isUserExists = false;
								response.isUserAdded = true;
								response.id=result.ops[0]._id;
								response.message = `Person added.`;
							}

							callback(response);
						});

					}
				}
			});
		});
	}



	removePersons( personID, callback ){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('persons').deleteOne(
				{
					_id : new ObjectID(personID)
				},
				(err, results) => {
					if(err){
						callback({
							error : true
						});
					}else{
						callback({
							error : false
						});
					}
				}
			);

		});

	}

	updatePerson( personID , data , callback){

		this.Mongodb.onConnect( (db,ObjectID) => {

			db.collection('persons').updateOne(
				{
					_id: new ObjectID(personID)
				},
				{
					$set : {
						name:data.name,
						age:data.age,
						gender:data.gender,
						mobileno:data.mobileno
					}
				}, (err, results) => {


					if(err){
						callback({
							error : true
						});
					}else{
						callback({
							error : false
						});
					}

				}
			);
		});
	}
}

module.exports = new Helper();
