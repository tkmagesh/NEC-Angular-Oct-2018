import { Component, OnInit } from '@angular/core';
import { Bug } from './models/Bug';
import { BugOperationsService } from './services/bugOperations.service';
import { SocketService } from '../utils/services/socket.service';

@Component({
	selector : 'app-bug-tracker',
	templateUrl : 'bugTracker.component.html'
})
export class BugTrackerComponent implements OnInit{
	bugs  : Bug[] = [];

	sortBugBy : string = '';
	sortByDesc : boolean = false;

	constructor(private bugOperations : BugOperationsService, private socketService : SocketService){

	}

	ngOnInit(){
		 this.socketService.onMessage()
	      .subscribe((message: string) => {
	        this.loadBugs();
	      });

		this.loadBugs();
	}

	loadBugs(){
		this.bugOperations
			.getAll()
			.subscribe(bugs => this.bugs = bugs);
	}

	addNewBug(newBug : Bug){
		this.bugs = [...this.bugs, newBug];
	}

	onBugNameClick(bugToToggle : Bug){
		this.bugOperations
			.toggle(bugToToggle)
			.subscribe(toggledBug => this.bugs = this.bugs.map(bug => bug.id === bugToToggle.id ? toggledBug : bug));
		
	}

	onRemoveClosedClick(){
		this
			.bugs
			.filter(bug => bug.isClosed)
			.forEach(closedBug => {
				this.bugOperations
					.remove(closedBug)
					.subscribe(() => this.bugs = this.bugs.filter(bug => bug.id !== closedBug.id));
			});
	}
}