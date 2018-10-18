import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugStorageService } from './bugStorage.service';

@Injectable()
export class BugOperationsService{

	constructor(private bugStorage : BugStorageService){

	}
	createNew(bugName : string) : Promise<Bug> {
		let newBugData : Bug = {
			id : 0,
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		};
		return this.bugStorage.save(newBugData);
	}

	toggle(bugToToggle : Bug ) : Promise<Bug> {
		let toggledBug = {...bugToToggle, isClosed : !bugToToggle.isClosed};
		return this.bugStorage.save(toggledBug);
	}

	remove(bug : Bug) : Promise<any>{
		return this.bugStorage.remove(bug);
	}

	getAll() : Promise<Bug[]>{
		return this.bugStorage.getAll();
	}
}