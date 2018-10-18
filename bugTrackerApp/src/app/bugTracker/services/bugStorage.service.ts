import { Bug } from '../models/Bug';
import axios from 'axios';

export class BugStorageService{
	private storage = window.localStorage;
	//private currentBugId = 0;

	private serviceUrl = 'http://localhost:3000/bugs';

	async getAll() : Promise<Bug[]>{
		let response = await axios.get(this.serviceUrl);
		return response.data;		
	}

	async save(bugData : Bug) : Promise<Bug> {
		if (bugData.id === 0){
			let response = await axios.post(this.serviceUrl, bugData)
			return response.data;
		} else {
			 let response = await axios.put(`${this.serviceUrl}/${bugData.id}`, bugData);
			 return response.data;
		}
	}

	async remove(bugData : Bug) : Promise<any> {
		let response = await axios.delete(`${this.serviceUrl}/${bugData.id}`)
		return response.data;
	}


}