import {
  getCurrencySymbol,
  formatCurrency,
  formatNumber,
} from '@angular/common';
import { LOCALE_ID, Pipe, PipeTransform, inject } from '@angular/core';

type CurrencyDisplay = 'code' | 'symbol' | 'symbol-narrow';

interface SiPrefix {
  base: number;
  decimal: string;
  name: string;
  symbol: string;
}

interface SiPrefixPipeGetCurrencyOptions {
  display?: CurrencyDisplay;
  locale?: string;
}

interface SiPrefixPipeTransformOptions {
  currencyCode?: string;
  currencyDisplay?: CurrencyDisplay;
  ignore?: string[];
  locale?: string;
}

@Pipe({
  name: 'siPrefix',
})
export class SiPrefixPipe implements PipeTransform {
  private _locale: string = inject(LOCALE_ID);
  private readonly _prefixes: SiPrefix[] = [
    { base: 30, decimal: 'nonillionth', name: 'quecto', symbol: 'q' },
    { base: 27, decimal: 'octillionth', name: 'ronto', symbol: 'r' },
    { base: 24, decimal: 'septillionth', name: 'yocto', symbol: 'y' },
    { base: 21, decimal: 'sextillionth', name: 'zepto', symbol: 'z' },
    { base: 18, decimal: 'quintillionth', name: 'atto', symbol: 'a' },
    { base: 15, decimal: 'quadrillionth', name: 'femto', symbol: 'f' },
    { base: 12, decimal: 'trillionth', name: 'pico', symbol: 'p' },
    { base: 9, decimal: 'billionth', name: 'nano', symbol: 'n' },
    { base: 6, decimal: 'millionth', name: 'micro', symbol: 'μ' },
    { base: 3, decimal: 'thousandth', name: 'milli', symbol: 'm' },
    { base: 2, decimal: 'hundredth', name: 'centi', symbol: 'c' },
    { base: 1, decimal: 'tenth', name: 'deci', symbol: 'd' },
    { base: 0, decimal: '', name: '', symbol: '' },
    { base: 1, decimal: 'ten', name: 'deca', symbol: 'da' },
    { base: 2, decimal: 'hundred', name: 'hecto', symbol: 'h' },
    { base: 3, decimal: 'thousand', name: 'kilo', symbol: 'k' },
    { base: 6, decimal: 'million', name: 'mega', symbol: 'M' },
    { base: 9, decimal: 'billion', name: 'giga', symbol: 'G' },
    { base: 12, decimal: 'trillion', name: 'tera', symbol: 'T' },
    { base: 15, decimal: 'quadrillion', name: 'peta', symbol: 'P' },
    { base: 18, decimal: 'quintillion', name: 'exa', symbol: 'E' },
    { base: 21, decimal: 'sextillion', name: 'zetta', symbol: 'Z' },
    { base: 24, decimal: 'septillion', name: 'yotta', symbol: 'Y' },
    { base: 27, decimal: 'octillion', name: 'ronna', symbol: 'R' },
    { base: 30, decimal: 'nonillion', name: 'quetta', symbol: 'Q' },
  ];

  private _getZeroBaseIndex(prefixes?: SiPrefix[]): number {
    return (prefixes ?? this._prefixes).findIndex(({ base }) => base === 0);
  }

  public findPrefix(
    value: number,
    prefixes?: SiPrefix[]
  ): SiPrefix | undefined {
    prefixes ??= this._prefixes;
    const base = Math.floor(Math.log10(Math.abs(value)));
    const zeroIndex = this._getZeroBaseIndex(prefixes);
    return prefixes.find(({ base: b }, i) => {
      const next = prefixes[i + 1];
      if (value < 0) {
        if (i < zeroIndex) return b === base || b < base;
        return false;
      }
      if (i < zeroIndex) return false;
      return b === base || !next || next.base > base;
    });
  }

  public getCurrency(
    code: string,
    { display, locale }: SiPrefixPipeGetCurrencyOptions = {}
  ): string {
    display ??= 'symbol';
    locale ??= this._locale;
    if (display === 'code') return code;
    if (display === 'symbol' || display === 'symbol-narrow') {
      return getCurrencySymbol(
        code,
        display === 'symbol' ? 'wide' : 'narrow',
        locale
      );
    }
    return display;
  }

  public transform(
    value: number,
    type: keyof Omit<SiPrefix, 'base'> = 'symbol',
    digitsInfo = '1.1-1',
    {
      currencyCode,
      currencyDisplay,
      ignore,
      locale,
    }: SiPrefixPipeTransformOptions = {}
  ): string {
    ignore ??= ['c', 'd', 'da', 'h'];
    locale ??= this._locale;
    const prefixes = this._prefixes.filter(
      ({ symbol }) => !ignore.includes(symbol)
    );
    const prefix = this.findPrefix(value, prefixes);
    const prefixType = prefix?.[type];
    let baseNumber = value / Math.pow(10, prefix?.base ?? 1);
    if (prefixType) baseNumber = Math.abs(baseNumber);
    let formattedNumber: string;
    if (currencyCode) {
      const currency = this.getCurrency(currencyCode, {
        display: currencyDisplay,
        locale,
      });
      formattedNumber = formatCurrency(
        baseNumber,
        locale,
        currency,
        currencyCode,
        digitsInfo
      );
    } else {
      formattedNumber = formatNumber(baseNumber, locale, digitsInfo);
    }
    return prefixType
      ? `${formattedNumber}${type === 'symbol' ? '' : ' '}${prefixType}`
      : formattedNumber;
  }
}
