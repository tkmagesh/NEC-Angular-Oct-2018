import { Component, Output, EventEmitter} from '@angular/core';

import { Bug } from '../models/Bug';
import { BugOperationsService } from '../services/bugOperations.service';

@Component({
	selector : 'app-bug-edit',
	template : `
		<section class="edit">
			<label for="">Bug Name :</label>
			<input type="text" (keyup)="newBugName = $event.target.value">
			<span> [ {{newBugName.length}} ] </span>
			<input type="button" value="Add New" (click)="onAddNewClick()">
		</section>
	`
})
export class BugEditComponent{
	newBugName : string = '';

	@Output()
	newBugCreated : EventEmitter<Bug> = new EventEmitter<Bug>();

	constructor(private bugOperations : BugOperationsService){

	}
	onAddNewClick(){
		/*let newBug = this.bugOperations.createNew(this.newBugName);
		//this.bugs.push(newBug);
		//this.bugs = [...this.bugs, newBug];
		this.newBugCreated.emit(newBug);*/

		this.bugOperations
			.createNew(this.newBugName)
			.then(newBug => this.newBugCreated.emit(newBug));
		//this.bugs.push(newBug);
		//this.bugs = [...this.bugs, newBug];
		
	}
}