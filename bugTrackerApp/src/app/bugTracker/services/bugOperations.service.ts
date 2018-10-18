import { Injectable } from '@angular/core';
import { Bug } from '../models/Bug';
import { BugStorageService } from './bugStorage.service';
import { Observable } from 'rxjs';
import { SocketService } from '../../utils/services/socket.service';

@Injectable()
export class BugOperationsService{
	constructor(private bugStorage : BugStorageService, private socketService : SocketService){

	}
	getAll() : Observable<Bug[]> {
		return this.bugStorage.getAll();
	}
	createNew(bugName : string) : Observable<Bug>{
		let newBug = {
			id : 0,
			name : bugName,
			isClosed : false,
			createdAt : new Date(),
			desc : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur aliquam id pariatur ipsa expedita nesciunt doloribus facilis architecto quisquam totam veniam odio, minima, labore deleniti, neque nam quia amet eveniet.'
		};
		this.socketService.send('A new bug is crearted');
		return this.bugStorage.save(newBug);
	}
	toggle(bugToToggle : Bug) : Observable<Bug> {
		let toggledBug = { ...bugToToggle, isClosed : !bugToToggle.isClosed};
		this.socketService.send('An existing bug is modified @ ' + Date());
		return this.bugStorage.save(toggledBug);
	}
	remove(bug : Bug) : Observable<any>{
		let observable = this.bugStorage
			.remove(bug)
			
		this.socketService.send('Zero or more closed bugs are removed @' + Date());
		return observable;
	}
}