import { NgModule } from "@angular/core";
import { PriceFormatterDirective } from "./price-formatter.directive";
import { PricePipe } from "./price.pipe";

@NgModule({
  declarations: [
    PriceFormatterDirective,
    PricePipe
  ],
  exports: [
    PriceFormatterDirective,
    PricePipe
  ],
  providers: [
    PricePipe
  ]
})

export class ThousandsSeparatorModule { }
