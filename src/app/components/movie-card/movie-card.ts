import { Component, Input } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Movie } from "../../core/models/movie";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  imports: [RouterModule]
})
export class MovieCardComponent {

  @Input() movie?: Movie;

}

