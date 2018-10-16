import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GreeterComponent } from './greeter/greeter.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { CalculatorTwoComponent } from './calculator/calculatorTwo.component';
import { CalculatorResultComponent } from './calculator/calculatorResult.component';

@NgModule({
  declarations: [
    AppComponent
    , GreeterComponent
    , CalculatorComponent
    , CalculatorTwoComponent
    , CalculatorResultComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [
    AppComponent, 
    GreeterComponent, 
    CalculatorComponent, 
    CalculatorTwoComponent
   ]
})
export class AppModule { }
