# ih-thousands-separator #
An Angular thousands separator module which includes a directive and a pipe.

## Installation ##
```
$>npm install ih-thousands-separator
```
```
$>yarn add ih-thousands-separator
```

## Usage ##
After installation register the module within the application:
```javascript
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { ThousandsSeparatorDemoComponent } from './thousands-separator-demo.component';

import { IhThousandsSeparatorModule } from 'ih-thousands-separator';

@NgModule({
  imports: [ FormsModule, IhThousandsSeparatorModule ],
  declarations: [ ThousandsSeparatorDemoComponent ],
  exports: [ ThousandsSeparatorDemoComponent ]
})
export class ThousandsSeparatorDemoModule { }
```

IhPricePipe:
```html
<div>{{ pricePipeValue | ihPrice }}</div>
```

IhPricePipe inside of a component:
```javascript
import { Component, OnInit } from '@angular/core';
import { IhPricePipe } from 'ih-thousands-separator';

@Component({
  selector: 'injected-pipe-component'
})
export class ThousandsSeparatorDemoComponent implements OnInit {
  private value: string = '';

  constructor(private pricePipe: IhPricePipe) { }

  ngOnInit(): void {
    this.value = this.pricePipe.transform(5000);
  }
}
```

IhPriceFormatterDirective:

__Hint: It is important to have the FormsModule from @angular/core imported.__
```html
<form>
  <input type="tel"
         placeholder="Enter a number"
         name="priceFormatterValue"
         [(ngModel)]=priceFormatterValue 
         ihPriceFormatter>
</form>
```

## Demo ##
An example project with all modules included can be found [here](https://stackblitz.com/edit/interhyp-angular-modules).

## Licence ##
MIT
