/**
 *
 * Describes the desired format of price values
 * Can be used in html as
 * {{ numberVariable | price }}
 * or in typescript with
 * pricePipe.transform(numberVariable);
 *
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ihPrice' })
export class IhPricePipe implements PipeTransform {

    private THOUSANDS_SEPARATOR: string;

    constructor() {
        this.THOUSANDS_SEPARATOR = '.';
    }

    /**
     * Set thousands separators and remove any characters except digits from value
     */
    transform(value: number | string, fractionSize = 2): string {
        if (value === 0) {
            value = '0';
        }
        const userInput: string = this.removeThousandsSeparators((value || '').toString());
        const sanitizedUserInput: string = userInput.replace(/\D+/g, '');
      return sanitizedUserInput.replace(/\B(?=(\d{3})+(?!\d))/g, this.THOUSANDS_SEPARATOR);
    }

    /**
     * Remove thousands separators
     */
    removeThousandsSeparators(value: string): string {
        value = value ? value.toString() : '';
      return value.split(this.THOUSANDS_SEPARATOR).join("");
    }

    /**
     * Count separators left of caret
     */
    countSeparatorsLeftOfCaret(value: string, caretPosition: number) {
        const mySubString = value.substr(0, caretPosition);
        const parsedSubString = this.removeThousandsSeparators(mySubString);
      return mySubString.length - parsedSubString.length;
    }

    /**
     * Count separators right of caret
     */
    countSeparatorsRightOfCaret(value: string, caretPosition: number) {
      return (this.countAllSeparators(value) - this.countSeparatorsLeftOfCaret(value, caretPosition));
    }

    /**
     * Count all separators
     */
    countAllSeparators(myString: string): number {
      const parsedSubString: string = this.removeThousandsSeparators(myString);
      return myString.length - parsedSubString.length;
    }


  /**
     * Remove leading zeros
     */
    deleteLeadingZeros (value: number): string {
        const userInput: string = this.removeThousandsSeparators((value || '').toString());
    return parseFloat(userInput).toString();
    }


}
