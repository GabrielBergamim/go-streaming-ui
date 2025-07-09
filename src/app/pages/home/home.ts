import { Component, inject, OnInit } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list/movie-list';
import { FilterComponent } from '../../components/filter/filter';
import { ApiHttpService } from '../../core/services/api-http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { Movie } from '../../core/models/movie';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [
    MovieListComponent,
    FilterComponent,
    AsyncPipe
  ]
})
export class HomeComponent implements OnInit {

  movies$?: Observable<Movie[]>;

  private service = inject(ApiHttpService);
  private filterSubject = new BehaviorSubject<string>('');

  ngOnInit() {
    this.movies$ = this.filterSubject.asObservable().pipe(
      switchMap((filter: string) => this.service.filter(filter))
    );
  }

  onFilterChange(filter: string) {
    this.filterSubject.next(filter);
  }
}
