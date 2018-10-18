import { Pipe, PipeTransform } from '@angular/core';
import { Bug } from '../models/Bug';

@Pipe({
	name: 'closedCount'
})
export class ClosedCountPipe implements PipeTransform {
	transform(list: Bug[], args: any[]): number {
		console.log('closedCount pipe triggered');
		return list.reduce((result, bug) => bug.isClosed ? ++result : result, 0);
	}
}