import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import {
  concatMap,
  forkJoin,
  map,
  Observable,
  Subscription,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { FilmsDetailsRaw } from '../interfaces/FilmDetailsRaw';
import { FilmDetailsMapped } from '../interfaces/FilmDetailsMapped';
import { SearchFilmsByQueryRaw } from '../interfaces/SearchFilmsByQueryRaw';
import { FilmAdapter } from '../class/FilmAdapter';
import { DiscoverFilmsMapped } from '../interfaces/DiscoverFilmsMapped';
import { DiscoverFilmsRaw, Result } from '../interfaces/DiscoverFilmsRaw';
import { SearchFilmsByQueryMapped } from '../interfaces/SearchFilmsByQueryMapped';
import { Genres } from '../interfaces/Genres';
import { FilmCardRaw } from '../interfaces/FilmCardRaw';
import { environment } from '../../environments/environment';
import { FilmCardMapped } from '../interfaces/FilmCardMapped';

const api_key: string = environment.api_key;

@Injectable({
  providedIn: 'root',
})
export class FilmsService {
  private http = inject(HttpClient);
  private url_base: string = `https://api.themoviedb.org/3`;

  public genresList = signal<Genres | null>(null);
  public currentFilmId = signal<number | null>(null);
  constructor() {
    this.initGenres();
  }

  private initGenres(): void {
    this.getGenres()
      .pipe(take(1))
      .subscribe((response) => {
        this.genresList.set(response);
      });
  }

  public saveCurrentIdFilm(id: number | undefined): void{
    if(!id) return;

    this.currentFilmId.set(id)
  }

  getDiscoverfilms(): Observable<DiscoverFilmsMapped[]> {
    return this.http
      .get<DiscoverFilmsRaw>(`${this.url_base}/discover/movie`, {
        headers: {
          Authorization:
            `Bearer ${api_key}`,
        },
        params: {
          include_adult: false,
          include_video: false,
          language: 'en-US',
          page: 1,
          sort_by: 'popularity.desc',
        },
      })
      .pipe(
        map((response) => response.results),
        map((movies) => movies.slice(0, 4)),
        concatMap((movies: Result[]) => {
          const filmsMapped = movies.map((movie) => {
            return this.getFilmDetails(movie.id).pipe(
              map((details: FilmsDetailsRaw) =>
                FilmAdapter.adaptDiscoverFilmsFromRaw(movie, details)
              )
            );
          });
          return forkJoin(filmsMapped);
        })
      );
  }

  getFilmDetails(idMovies: number): Observable<FilmsDetailsRaw> {
    return this.http.get<FilmsDetailsRaw>(
      `${this.url_base}/movie/${idMovies}`,
      {
        headers: {
          Authorization:
            `Bearer ${api_key}`,
        },
      }
    );
  }

  searchFilmByQuery(query: string): Observable<SearchFilmsByQueryMapped[]> {
    return this.http
      .get<SearchFilmsByQueryRaw>(
        `https://api.themoviedb.org/3/search/movie?query=${query}`,
        {
          headers: {
            Authorization:
            `Bearer ${api_key}`,
          },
        }
      )
      .pipe(
        map((response) => response.results),
        map((movies) => {
          return movies
            .map((movie) => {
              return FilmAdapter.adaptSearchFilmsFromRaw(movie,this.genresList());
            }).slice(0, 4);
        })
      );
  }

  getGenres(): Observable<Genres> {
    return this.http.get<Genres>(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        headers: {
          Authorization:
            `Bearer ${api_key}`,
        },
      }
    );
  }

  getFilmById(id: number): Observable<FilmCardMapped>{
    return this.http.get<FilmCardRaw>(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: {
        Authorization:
            `Bearer ${api_key}`,

      }
    }).pipe(
      map(response => FilmAdapter.adaptFilmCardToRaw(response)),
      tap(resp => console.log(resp)
      )
    )



  }


}
