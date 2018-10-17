import { Component, OnInit } from '@angular/core';

import { Bug } from './models/Bug';

import { BugOperationsService } from './services/bugOperations.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs  : Bug[] = [];

	sortBugBy : string = 'name';
	sortByDesc : boolean = false;

	constructor(private bugOperations : BugOperationsService){

	}

	ngOnInit(){
		this.bugs = this.bugOperations.getAll();
	}

	onAddNewClick(bugName : string){
		let newBug = this.bugOperations.createNew(bugName);
		this.bugs.push(newBug);
	}

	onBugNameClick(bugToToggle : Bug){
		this.bugOperations.toggle(bugToToggle)
	}

	onRemoveClosedClick(){
		this.bugs = this.bugs.filter(bug => !bug.isClosed);
	}

	getClosedCount(){
		return this.bugs.reduce((result, bug) => bug.isClosed ? ++result : result, 0);
	}
}