import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FilmsService } from '../../services/films.service';
import { FilmCardMapped } from '../../interfaces/FilmCardMapped';

@Component({
  selector: 'app-film-card',
  imports: [],
  templateUrl: './film-card.component.html',
  styleUrl: './film-card.component.css',
})
export class FilmCardComponent implements OnInit {
  private activateRoute = inject(ActivatedRoute)
  public queryParams = this.activateRoute.snapshot.paramMap.get('filmName') ?? '';
  public isLoading = true;

  public filmService = inject(FilmsService);
  public filmInfo = signal<FilmCardMapped | null>(null);
  ngOnInit(): void {
    console.log(this.queryParams)
    const filmId = this.filmService.currentFilmId();
    if(!filmId) return
    console.log(filmId);

    this.filmService.getFilmById(filmId).subscribe((response) =>
      this.filmInfo.set(response)

    )

  }




 }
