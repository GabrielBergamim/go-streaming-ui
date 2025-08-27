import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, combineLatest, map, merge, Observable, of, shareReplay, skip, switchMap, tap, withLatestFrom } from 'rxjs';
import { PaginatorModule, Paginator, PaginatorState } from 'primeng/paginator';
import { MovieListComponent } from '../../components/movie-list/movie-list';
import { FilterComponent } from '../../components/filter/filter';
import { ApiHttpService } from '../../core/services/api-http';
import { Movie } from '../../core/models/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [
    MovieListComponent,
    FilterComponent,
    PaginatorModule,
    AsyncPipe
  ]
})
export class HomeComponent implements OnInit {

  @ViewChild(Paginator, { static: true }) paginator: Paginator | undefined;

  movies$?: Observable<any>;
  rows = 2;
  totalRecords = 0;
  first = 0;

  private service = inject(ApiHttpService);
  private filterSubject = new BehaviorSubject<string>('');
  private pageSubject = new BehaviorSubject<PaginatorState>({
    rows: 2,
    page: 0,
    pageCount: 0
  });

  private filter$ = this.filterSubject.pipe(
    skip(1),
    withLatestFrom(this.pageSubject),
    map(([a, b]) => ({ filter: a, page: 0, rows: b.rows })),
  );
  private pageIndex$ = this.pageSubject.pipe(
    withLatestFrom(this.filterSubject),
    map(([a, b]) => ({ page: a.page, filter: b, rows: a.rows })),
  );

  ngOnInit() {
    this.movies$ = merge(this.filter$, this.pageIndex$).pipe(
      switchMap(({ page, filter, rows }) => {
        console.log('Loading data with filter', filter, 'page', page, 'rows', rows);
        this.first = page ? (page) * rows : 0;
        return this.service.filter(filter, page + 1, rows);
      }),
      switchMap(page => {
        this.totalRecords = page.totalItems;
        return of(page.content);
      }),
    );
  }

  onFilterChange(filter: string) {
    this.filterSubject.next(filter);
    this.first = 0;
  }

  onPageChange(event: PaginatorState) {
    this.rows = event.rows || 2;
    this.pageSubject.next(event);
  }
}
