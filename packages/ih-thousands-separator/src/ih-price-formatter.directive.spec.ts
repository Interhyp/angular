import { IhPriceFormatterDirective } from "./ih-price-formatter.directive";
import { Component, DebugElement, ElementRef } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { FormsModule, NgControl, ReactiveFormsModule } from "@angular/forms";
import { IhPricePipe } from "./ih-price.pipe";

@Component({
    template: `<input type="tel" ihPriceFormatter>`
})
class TestComponent {
}

describe('IhPriceFormatterDirective', () => {
   let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;
    let component: TestComponent;

    let priceFormatterDirective: IhPriceFormatterDirective;
    let inputBox: HTMLInputElement;
    let inputEl: DebugElement;
    let control: NgControl;

    beforeEach(() => {
        priceFormatterDirective = new IhPriceFormatterDirective(new ElementRef(null), control, new IhPricePipe());

        TestBed.configureTestingModule({
            declarations: [IhPriceFormatterDirective, TestComponent],
            imports: [ReactiveFormsModule, FormsModule],
            providers: [IhPricePipe, NgControl]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        inputBox = debugElement.query(By.css('input')).nativeElement;
        inputEl = fixture.debugElement.query(By.css('input'));
    });


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('check delete of separator', () => {
        let checkDeleteOfSeparator = priceFormatterDirective.checkDeleteOfSeparator("1.234.567890", 4, 3);
        expect(checkDeleteOfSeparator.newValue).toBe("123.456.890");
        expect(checkDeleteOfSeparator.deletedPoint).toBe(true);
        expect(checkDeleteOfSeparator.secondPointDeleted).toBe(true);

        checkDeleteOfSeparator = priceFormatterDirective.checkDeleteOfSeparator("123.456789", 4, 3);
        expect(checkDeleteOfSeparator.newValue).toBe("12.345.789");
        expect(checkDeleteOfSeparator.deletedPoint).toBe(true);
        expect(checkDeleteOfSeparator.secondPointDeleted).toBe(false);
    });

    it('check correct thousand separators', () => {
        inputBox.value = '123456789';
        fixture.detectChanges();
        expect(inputBox.value).toBe('123.456.789');
    });

    it('should transform value on blur event', () => {
        inputEl.triggerEventHandler('blur', {
            target: {
              value: "000.123.456"
            }
        });

        expect(inputEl.nativeElement.value).toEqual('123.456');
    });

    it('should transform value on keyup event', () => {
        inputEl.triggerEventHandler('keyup', {
          target: {
            value: "ab444334"
          }
        });

        expect(inputEl.nativeElement.value).toEqual('444.334');
    });
});
