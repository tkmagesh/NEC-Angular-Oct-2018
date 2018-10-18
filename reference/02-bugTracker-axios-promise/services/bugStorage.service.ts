import { Bug } from '../models/Bug';
import axios from 'axios';

export class BugStorageService{
	private storage = window.localStorage;
	//private currentBugId = 0;

	private serviceUrl = 'http://localhost:3000/bugs';

	getAll() : Promise<Bug[]>{
		/*
		var p = axios.get('http://localhost:3000/bugs');
		var p2 = p.then(function(response){
			return response.data;
		});
		return p2;
		*/
		return axios
			.get(this.serviceUrl)
			.then(function(response){
				return response.data;
			});
		
	}

	save(bugData : Bug) : Promise<Bug> {
		if (bugData.id === 0){
			return axios
				.post(this.serviceUrl, bugData)
				.then(function(response){
					return response.data;
				});
		} else {
			return axios
				.put(`${this.serviceUrl}/${bugData.id}`, bugData)
				.then(function(response){
					return response.data;
				});
		}
	}

	remove(bugData : Bug) : Promise<any> {
		return axios
			.delete(`${this.serviceUrl}/${bugData.id}`)
			.then(function(response){
				return response.data;
			});
	}


}