import { Component, OnInit } from '@angular/core';

import { Bug } from './models/Bug';

import { BugOperationsService } from './services/bugOperations.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs  : Bug[] = [];

	sortBugBy : string = '';
	sortByDesc : boolean = false;

	

	constructor(private bugOperations : BugOperationsService){

	}

	async ngOnInit(){
		this.bugs = await this.bugOperations.getAll();
		/*this.bugOperations
			.getAll()
			.then(bugs => this.bugs = bugs);*/
	}

	addNewBug(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}

	async onBugNameClick(bugToToggle : Bug){
		let toggledBug = await this.bugOperations.toggle(bugToToggle);
		this.bugs = this.bugs.map(bug => bug.id === bugToToggle.id ? toggledBug : bug));
	}

	onRemoveClosedClick(){
		this
			.bugs
			.filter(bug => bug.isClosed)
			.forEach(async closedBug => {
				await this.bugOperations.remove(closedBug);
				this.bugs = this.bugs.filter(bug => bug.id !== closedBug.id);
			});
	}
}