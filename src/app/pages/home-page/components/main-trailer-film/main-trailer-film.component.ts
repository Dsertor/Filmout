import { Component, input } from '@angular/core';
import { DiscoverFilmsMapped } from '../../../../interfaces/DiscoverFilmsMapped';

@Component({
  selector: 'main-trailer-film',
  imports: [],
  templateUrl: './main-trailer-film.component.html',
  styleUrl: './main-trailer-film.component.css',
})
export class MainTrailerFilmComponent {

  public mainFilm = input<DiscoverFilmsMapped>();

 }
