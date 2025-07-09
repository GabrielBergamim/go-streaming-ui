import { Component, Input } from "@angular/core";
import { MovieCardComponent } from "../movie-card/movie-card";
import { Movie } from "../../core/models/movie";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss',
  imports: [
    MovieCardComponent
  ]
})
export class MovieListComponent {

  @Input() movies: Movie[] = [];

}
