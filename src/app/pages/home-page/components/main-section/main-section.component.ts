import { Component, input } from '@angular/core';
import { GuestNavComponent } from "../../../../shared/guest-nav/guest-nav.component";
import { FilmDetailsMapped } from '../../../../interfaces/FilmDetailsMapped';
import { DiscoverFilmsMapped } from '../../../../interfaces/DiscoverFilmsMapped';
import { JsonPipe } from '@angular/common';
import { TrailerFilmArticleComponent } from "../trailer-film-article/trailer-film-article.component";
import { RouterLink } from '@angular/router';
import { MainTrailerFilmComponent } from "../main-trailer-film/main-trailer-film.component";

@Component({
  selector: 'main-section',
  imports: [TrailerFilmArticleComponent, RouterLink, MainTrailerFilmComponent],
  templateUrl: './main-section.component.html',
})
export class MainSectionComponent {

  public filmTrailers = input<DiscoverFilmsMapped[]>();



 }
