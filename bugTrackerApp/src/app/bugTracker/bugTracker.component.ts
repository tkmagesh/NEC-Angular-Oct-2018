import { Component } from '@angular/core';

import { Bug } from './models/Bug';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent{
	bugs  : Bug[] = [];

	sortBugBy : string = 'name';
	sortByDesc : boolean = false;

	constructor(){
		this.bugs.push({name : 'Server communication failure', isClosed : false});
		this.bugs.push({name : 'Data integrity checks failed', isClosed : true});
		this.bugs.push({name : 'User actions not recognised', isClosed : true});
		this.bugs.push({name : 'Application not responding', isClosed : false});
	}

	onAddNewClick(bugName : string){
		let newBug = {
			name : bugName,
			isClosed : false
		};
		this.bugs.push(newBug);
	}

	onBugNameClick(bugToToggle : Bug){
		bugToToggle.isClosed = !bugToToggle.isClosed;
	}

	onRemoveClosedClick(){
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

	getClosedCount(){
		return this.bugs.reduce((result, bug) => bug.isClosed ? ++result : result, 0);
	}
}