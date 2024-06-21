import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BehaviorSubject,
  Observable,
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  takeUntil,
} from 'rxjs';

import {
  ArrayUtil,
  ArrayUtilSearchOptions,
  ArrayUtilSearchWeight,
} from '../../utils/array';

export interface SearchEvent<T> {
  result: T[];
  term: string;
}

interface SearchForm {
  term: FormControl<string>;
}

@Component({
  selector: 'innov-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent<T = unknown> implements OnDestroy {
  private readonly _data$ = new BehaviorSubject<T[]>([]);
  private readonly _destroy$ = new Subject<void>();
  private readonly _term$: Observable<string>;
  @Input() public caseSensitive?: boolean;
  @Input() public set data(data: T[]) {
    this._data$.next(data);
  }
  @Input() public debounceTime = 300;
  @Input() public delimiter?: RegExp | string;
  public get options(): ArrayUtilSearchOptions<T> {
    return {
      caseSensitive: this.caseSensitive,
      delimiter: this.delimiter,
      weight: this.weight,
    };
  }
  @Output() public readonly search = new EventEmitter<SearchEvent<T>>();
  public readonly searchForm = new FormGroup<SearchForm>({
    term: new FormControl('', { nonNullable: true }),
  });
  @Input() public weight?: ArrayUtilSearchWeight<T>;

  constructor() {
    this._term$ = this.searchForm.controls.term.valueChanges.pipe(
      debounceTime(this.debounceTime),
      distinctUntilChanged()
    );
    combineLatest([this._data$, this._term$])
      .pipe(takeUntil(this._destroy$))
      .subscribe(([data, term]) => {
        const result = term ? ArrayUtil.search(data, term, this.options) : data;
        this.search.emit({ result, term });
      });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
