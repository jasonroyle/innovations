import { StringUtil, StringUtilSearchOptions } from './string';

export interface ArrayUtilSearchOptions<T> extends StringUtilSearchOptions {
  weight: ArrayUtilSearchWeight<T>;
}

export type ArrayUtilSearchWeight<T> = T extends string | number
  ? number
  : T extends (infer A)[]
  ? ArrayUtilSearchWeight<A>
  : T extends object
  ? { [P in keyof Partial<T>]: ArrayUtilSearchWeight<T[P]> }
  : never;

export class ArrayUtil {
  /**
   * Search `string` and `number` type values within an array for a given search
   * term, score each value, omit any values with a nill score and sort the
   * remaining values by their score in descending order.
   *
   * @example
   * ```ts
   * ArrayUtil.search(
   *   ['foo', 'bar', true, 'foo bar', 10, 'foo bar 1', 'no match'],
   *   'foo bar 1',
   * )
   * // Expected result: ['foo bar 1', 'foo bar', 'foo', 'bar', 10]
   * ```
   *
   * @param arr - Array to search
   * @param term - Search term
   * @param options - Optional settings:
   * - `weight`: Score multiplier - for object search where weight is provided
   * but a property is not specified then it will be omitted from the search
   * criteria. (defaults to `1`)
   * @returns Array of matching values in order of relevance.
   */
  public static search<T>(
    arr: T[],
    term: string,
    { weight, ...options }: Partial<ArrayUtilSearchOptions<T>> = {}
  ): T[] {
    const searchScore = (
      value: T,
      weight: ArrayUtilSearchWeight<object> | number
    ): number => {
      if (typeof value === 'string' || typeof value === 'number') {
        if (typeof weight === 'number') {
          return StringUtil.search(`${value}`, term, options) * weight;
        }
      } else if (Array.isArray(value)) {
        return value.reduce(
          (score, value) => score + searchScore(value, weight),
          0
        );
      } else if (typeof value === 'object' && value !== null) {
        return Object.entries(value).reduce((score, [key, value]) => {
          const nextWeight =
            typeof weight === 'number'
              ? weight
              : weight?.[key as keyof typeof weight];
          return score + (nextWeight ? searchScore(value, nextWeight) : 0);
        }, 0);
      }
      return 0;
    };
    return arr
      .map((value) => [value, searchScore(value, weight ?? 1)] as const)
      .filter(([, score]) => !!score)
      .sort(([, a], [, b]) => (a - b) * -1)
      .map(([value, score]) => {
        console.log({ value, score });
        return value;
      });
  }
}
