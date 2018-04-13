'use strict';
const helper = require("./helper");

class Routes{

	constructor(app){
		this.app = app;
	}



	appRoutes(){


		this.app.get('/api/persons',(request,response) =>{

			helper.getPersons( (result) => {
				if (result) {
					response.status(200).json({
						persons:result
					});
				}else{
					response.status(404).json({
						message:`No details found.`
					});
				}
			});
		});



		this.app.post('/api/persons/',(request,response) =>{


				helper.addPerson( request.body , (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{

						helper.getPersons( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									persons:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No details found.`
								});
							}
						});
					};
				});
		});


		this.app.delete('/api/persons/:id',(request,response) =>{

			if (request.params.id && request.params.id!='') {

				helper.removePersons( request.params.id, (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{

						helper.getPersons( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									persons:result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No details found.`
								});
							}
						});


					};

				});

			}else{
				response.status(403).json({
					error : true,
					message : `Invalid person Id.`
				});
			}
		});


		this.app.put('/api/persons/:id',(request,response) =>{


			if (request.params.id && request.params.id!='') {

				helper.updatePerson( request.params.id, request.body , (result)=>{

					if (result.error) {

						response.status(403).json({
							error : true,
							message : `Error.`
						});

					} else{


						helper.getPersons( (result) => {
							if (result) {
								response.status(200).json({
									error : false,
									persons: result
								});
							}else{
								response.status(404).json({
									error : true,
									message:`No details found.`
								});
							}
						});


					};

				});

			}else{
				response.status(403).json({
					error : true,
					message : `Invalid person Id.`
				});
			}
		});
		

	}

	routesConfig(){
		this.appRoutes();
	}
}
module.exports = Routes;
