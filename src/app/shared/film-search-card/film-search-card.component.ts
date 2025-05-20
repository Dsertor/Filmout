import { Component, inject, input } from '@angular/core';
import { SearchFilmsByQueryMapped } from '../../interfaces/SearchFilmsByQueryMapped';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouteFilmPipe } from '../../pipes/route-film.pipe';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'film-search-card',
  imports: [RouterLink, RouteFilmPipe],
  templateUrl: './film-search-card.component.html',
  styleUrl: './film-search-card.component.css',
  providers: [DatePipe]
})
export class FilmSearchCardComponent {

  public film = input<SearchFilmsByQueryMapped>();
  private datePipe = inject(DatePipe);
  public filmService = inject(FilmsService)

  hasReleaseDate(){
    return this.film()?.release_date !== '' ? `(${this.datePipe.transform(this.film()?.release_date, 'yyyy')})` : ''
  }

}
