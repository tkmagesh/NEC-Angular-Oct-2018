import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugStorageService } from './bugStorage.service';

@Injectable()
export class BugOperationsService{

	constructor(private bugStorage : BugStorageService){

	}
	createNew(bugName : string) : Bug {
		let newBug : Bug = {
			id : 0,
			name : bugName,
			isClosed : false,
			createdAt : new Date()
		};
		this.bugStorage.save(newBug);
		return newBug;
	}

	toggle(bugToToggle : Bug ) : Bug {
		let toggledBug = {...bugToToggle, isClosed : !bugToToggle.isClosed};
		this.bugStorage.save(toggledBug);
		return toggledBug;
	}

	remove(bug : Bug){
		this.bugStorage.remove(bug);
	}

	getAll(){
		return this.bugStorage.getAll();
	}
}