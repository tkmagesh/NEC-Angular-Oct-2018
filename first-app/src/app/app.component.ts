import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'first-app';

  constructor(){
  	/*setTimeout(() => {
  		this.title = 'My Fantastic App';
  	}, 10000);*/
  }

  onBtnChangeTitleClick(){
  	this.title = 'My Fantastic App';
  }
}
