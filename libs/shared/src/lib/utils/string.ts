export interface StringUtilSearchOptions {
  caseSensitive?: boolean;
  delimiter?: RegExp | string;
}

export class StringUtil {
  /**
   * Search a string for a given search term and return a score.
   *
   * @param str - String to search
   * @param term - Search term
   * @param options - Optional settings:
   * - `caseSensitive`: Case sensitivity. (defaults to `false`)
   * - `delimiter`: Search term delimiter. (defaults to whitespace)
   * @returns Numeric score. (0-1)
   */
  public static search(
    str: string,
    term: string,
    { caseSensitive, delimiter }: StringUtilSearchOptions = {}
  ): number {
    caseSensitive ??= false;
    delimiter ??= /\s+/g;
    if (!caseSensitive) {
      str = str.toLowerCase();
      term = term.toLowerCase();
    }
    const terms = term
      .split(delimiter)
      .sort((a, b) => (a.length - b.length) * -1);
    const { matchedLength, termsLength } = terms.reduce(
      ({ matchedLength, termsLength, unmatchedStr }, term) => {
        termsLength += term.length;
        if (unmatchedStr.includes(term)) {
          matchedLength += term.length;
          unmatchedStr = unmatchedStr.replace(term, '');
        }
        return { matchedLength, termsLength, unmatchedStr };
      },
      { matchedLength: 0, termsLength: 0, unmatchedStr: str }
    );
    str = str.replace(delimiter, '');
    return (matchedLength / str.length) * (matchedLength / termsLength);
  }
}
