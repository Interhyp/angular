import { NgModule } from "@angular/core";
import { IhPriceFormatterDirective } from "./ih-price-formatter.directive";
import { IhPricePipe } from "./ih-price.pipe";

@NgModule({
  declarations: [
    IhPriceFormatterDirective,
    IhPricePipe
  ],
  exports: [
    IhPriceFormatterDirective,
    IhPricePipe
  ],
  providers: [
    IhPricePipe
  ]
})

export class IhThousandsSeparatorModule { }
