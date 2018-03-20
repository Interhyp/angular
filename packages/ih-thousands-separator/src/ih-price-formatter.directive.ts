/**
 *
 * Formats the value of input into format declared in PricePipe
 *
 */
import { Directive, HostListener, ElementRef, OnInit } from '@angular/core';
import { NgControl } from "@angular/forms";
import { IhPricePipe } from "./ih-price.pipe";

@Directive({
  selector: '[ihPriceFormatter]'
})
export class IhPriceFormatterDirective implements OnInit {
  private el: any;
  private ENTER_KEY: number = 13;
  private DELETE_KEY: number = 46;
  private BACKSPACE_KEY: number = 8;

  constructor(private elementRef: ElementRef,
              private control: NgControl,
              private pricePipe: IhPricePipe) {
    this.el = this.elementRef.nativeElement;
  }

  /**
   * Format input value onInit if Input is not empty
   */
  ngOnInit() {
    if (this.el.value !== '') {
      this.setValue(this.pricePipe.transform(this.el.value));
    }
  }


  /**
   * Transform input value if Input is not onFocus anymore
   */
  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    if (value) {
      let newValue = this.pricePipe.transform(this.pricePipe.deleteLeadingZeros(value));
      if (newValue !== value) {
        this.setValue(newValue);
      }
    }
  }


  /**
   * Event Handler for the transformation of the inserted number.
   * It will be executed on key release.
   * Transformation:
   * --> Numbers will be formatted with thousand separators
   * --> Letters will be deleted
   * --> When deleting a thousand separator the number next to it must be also deleted.
   */
  @HostListener('keyup', ['$event'])
  keyEvent(event) {
    let value = event.target.value;
    const oldValue: string = value;
    let myCaretPosition: number = this.getCaretPosition(this.el);
    if (value) {
      if (event.keyCode === this.ENTER_KEY) {
        value = this.pricePipe.deleteLeadingZeros(value);
      }

      if (event.keyCode === this.BACKSPACE_KEY) {
        const _ret = this.checkDeleteOfSeparator(value, 4, 3);
        value = _ret.newValue;
        if (_ret.deletedPoint && _ret.secondPointDeleted) {
          myCaretPosition -= 2;
        } else if (_ret.deletedPoint || _ret.secondPointDeleted) {
          myCaretPosition--;
        }
      } else {
        if (event.keyCode === this.DELETE_KEY) {
          const _ret = this.checkDeleteOfSeparator(value, 3, 2);
          value = _ret.newValue;
          if (_ret.deletedPoint && !_ret.secondPointDeleted && !_ret.firstPointDeleted) {
            myCaretPosition++;
          } else if (!_ret.deletedPoint && _ret.secondPointDeleted) {
            myCaretPosition--;
          }
        }
      }

      // TODO: Only remove before going live, we will probably need these logs during dev-time again

      const beforeTransformValue = value;
      //console.log('beforetransform value: ' + beforeTransformValue);

      const newValue = this.pricePipe.transform(value);
      //console.log('new value ' + newValue);

      const countOldSeperators = this.pricePipe.countAllSeparators(beforeTransformValue);
      const countNewSeperators = this.pricePipe.countAllSeparators(newValue);

      const countAddedSeperators = countNewSeperators - countOldSeperators;

      //console.log('added seperators: ' + countAddedSeperators);

      const countOldSeparatorsLeftOfCaret = this.pricePipe.countSeparatorsLeftOfCaret(beforeTransformValue, myCaretPosition);
      //console.log('count old seperators left of caret ' + countOldSeparatorsLeftOfCaret);

      const countNewSeparatorsLeftOfCaret = this.pricePipe.countSeparatorsLeftOfCaret(newValue, myCaretPosition);
      //console.log('count new seperators left of caret ' + countNewSeparatorsLeftOfCaret);

      const countOldSeparatorsRightOfCaret = this.pricePipe.countSeparatorsRightOfCaret(beforeTransformValue, myCaretPosition);
      //console.log('count old seperators right of caret ' + countOldSeparatorsRightOfCaret);

      const countNewSeparatorsRightOfCaret = this.pricePipe.countSeparatorsRightOfCaret(newValue, myCaretPosition);
      //console.log('count new seperators right of caret ' + countNewSeparatorsRightOfCaret);


      let separatorOffset = countNewSeparatorsLeftOfCaret - countOldSeparatorsLeftOfCaret;
      //console.log('seperatorOffset ' + separatorOffset);
      if (Math.abs(countAddedSeperators) > 1) {
        separatorOffset += (countNewSeparatorsRightOfCaret - countOldSeparatorsRightOfCaret);
      }

      if (oldValue !== newValue) {
        this.setValue(newValue);
        //console.log('my caret position: ' + myCaretPosition);

        this.setCaretPosition(this.el, myCaretPosition + separatorOffset);
        //console.log('setting to position (myCaretPOsition + seperatorOffset): ' + (myCaretPosition + separatorOffset));
      }
    }
  }

  checkDeleteOfSeparator(value: string, firstSliceIndex: number, secondSliceIndex: number): any {
    const splitValueArray = value.split(".");
    let deletedPoint = false, secondPointDeleted = false, firstPointDeleted = false;
    splitValueArray.forEach(function (element: string, index: number, splitArray) {
      if (element.length > 3) {
        splitArray[index] = element.slice(0, element.length - firstSliceIndex) + element.slice(element.length - secondSliceIndex);
        deletedPoint = true;
        if (index === 0 && element.length === 4) {
          firstPointDeleted = true;
        }
      } else if (element.length === 1) {
        secondPointDeleted = true;
      }
    });
    const newValue: string = this.pricePipe.transform(splitValueArray.join("."));

    return {newValue, deletedPoint, secondPointDeleted, firstPointDeleted};
  }


  setValue(value: any) {
    if (this.control.control) {
      this.control.control.setValue(value);
    } else {
      this.el.value = value;
    }
  }

  private getCaretPosition(ctrl) {
    let CaretPos = 0;
    if (ctrl.selectionStart || ctrl.selectionStart === 0) {
      CaretPos = ctrl.selectionStart;
    }
    return CaretPos;
  }

  private setCaretPosition(ctrl, pos) {
    if (ctrl.setSelectionRange) {
      ctrl.focus();
      ctrl.setSelectionRange(pos, pos);
    }
  }
}
