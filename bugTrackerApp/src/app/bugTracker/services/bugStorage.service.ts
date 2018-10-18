import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class BugStorageService{
	private storage = window.localStorage;
	//private currentBugId = 0;

	private serviceUrl = 'http://localhost:3000/bugs';

	constructor(private httpClient : HttpClient){

	}

	getAll() : Observable<Bug[]>{
		return this.httpClient
			.get<Bug[]>(this.serviceUrl)

	}

	save(bugData : Bug) : Observable<Bug> {
		if (bugData.id === 0){
			return this.httpClient.post<Bug>(this.serviceUrl, bugData);
		} else {
			 return this.httpClient.put<Bug>(`${this.serviceUrl}/${bugData.id}`, bugData);
		}
	}

	remove(bugData : Bug) : Observable<any> {
		return this.httpClient.delete<Bug>(`${this.serviceUrl}/${bugData.id}`)
	}


}