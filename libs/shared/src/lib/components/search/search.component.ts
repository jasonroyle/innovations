import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  BehaviorSubject,
  Subject,
  combineLatest,
  debounce,
  distinctUntilChanged,
  filter,
  merge,
  takeUntil,
  tap,
  timer,
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
export class SearchComponent<T = unknown> implements OnDestroy, OnInit {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _data$ = new BehaviorSubject<T[]>([]);
  private readonly _destroy$ = new Subject<void>();
  private readonly _router = inject(Router);
  private readonly _term$ = new Subject<string>();
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
  @Input() public placeholder = 'Search…';
  @Input() public routerEnabled = true;
  @Output() public readonly search = new EventEmitter<SearchEvent<T>>();
  public readonly searchForm = new FormGroup<SearchForm>({
    term: new FormControl('', { nonNullable: true }),
  });
  @Input() public term?: string;
  @Input() public weight?: ArrayUtilSearchWeight<T>;

  constructor() {
    if (this.routerEnabled) {
      this._router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntil(this._destroy$)
        )
        .subscribe(() => this._afterNavigate());
    }
  }

  private _afterNavigate(): void {
    if (this.routerEnabled) {
      this._term$.next(
        this._activatedRoute.snapshot.queryParamMap.get('search') ?? ''
      );
    }
  }

  private _hydrate(): void {
    if (
      !this.routerEnabled ||
      !this._activatedRoute.snapshot.queryParamMap.has('search')
    ) {
      this._term$.next(this.term ?? '');
    }
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngOnInit(): void {
    combineLatest([
      this._data$,
      merge(
        this._term$.pipe(
          tap((term) => this.searchForm.controls.term.patchValue(term))
        ),
        this.searchForm.controls.term.valueChanges.pipe(
          debounce(() => timer(this.debounceTime))
        )
      ).pipe(distinctUntilChanged()),
    ])
      .pipe(takeUntil(this._destroy$))
      .subscribe(([data, term]) => {
        const result = term ? ArrayUtil.search(data, term, this.options) : data;
        this.search.emit({ result, term });
        if (this.routerEnabled) {
          let { search, ...queryParams } =
            this._activatedRoute.snapshot.queryParams;
          if (term) queryParams = { ...queryParams, search: term };
          if (term !== search) {
            this._router.navigate([], {
              queryParams,
              relativeTo: this._activatedRoute,
              replaceUrl: true,
            });
          }
        }
      });
    this._afterNavigate();
    this._hydrate();
  }
}
