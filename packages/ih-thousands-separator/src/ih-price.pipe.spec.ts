import { IhPricePipe } from './ih-price.pipe';

describe('IhPricePipe', () => {

    let pricePipe: IhPricePipe;

    beforeEach(() => {
        pricePipe = new IhPricePipe();
    });

    it('number to currency number format test', () => {
        numberToCurrencyNumberFormatVerification('1000', '1.000');
        numberToCurrencyNumberFormatVerification('99000', '99.000');
        numberToCurrencyNumberFormatVerification(1000, '1.000');
        numberToCurrencyNumberFormatVerification(1, '1');
        numberToCurrencyNumberFormatVerification(0, '0');
        numberToCurrencyNumberFormatVerification('gfsaiugeh1234', '1.234');
        numberToCurrencyNumberFormatVerification('g1h2j3k4y5', '12.345');
        numberToCurrencyNumberFormatVerification('...1..2..3..4..5..6...', '123.456');
        numberToCurrencyNumberFormatVerification(' 1.. 2. .3.  4... . 5 ', '12.345');
    });

    function numberToCurrencyNumberFormatVerification(input: string | number, expectedOutput: string) {
        const actualTransformedValue = pricePipe.transform(input);
        expect(actualTransformedValue).toBe(expectedOutput);
    }

    it('currency number to number format test', () => {
        currencyNumberFormatToNumberVerification('1.000', '1000');
        currencyNumberFormatToNumberVerification('10.000', '10000');
        currencyNumberFormatToNumberVerification('10000', '10000');
        currencyNumberFormatToNumberVerification('100', '100');
        currencyNumberFormatToNumberVerification('1', '1');
        currencyNumberFormatToNumberVerification('0', '0');
    });

    function currencyNumberFormatToNumberVerification(input: string, expectedOutput: string) {
        const actualParsedValue = pricePipe.removeThousandsSeparators(input);
        expect(actualParsedValue).toBe(expectedOutput);
    }
});
