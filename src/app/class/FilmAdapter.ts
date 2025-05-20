import { inject } from "@angular/core";
import { DiscoverFilmsMapped } from "../interfaces/DiscoverFilmsMapped";
import { Result } from "../interfaces/DiscoverFilmsRaw";
import { FilmDetailsMapped } from "../interfaces/FilmDetailsMapped";
import { SearchFilmsByQueryMapped } from "../interfaces/SearchFilmsByQueryMapped";
import { ResultSearch, SearchFilmsByQueryRaw } from "../interfaces/SearchFilmsByQueryRaw";
import { FilmsService } from "../services/films.service";
import { Genres } from "../interfaces/Genres";
import { FilmCardRaw } from "../interfaces/FilmCardRaw";
import { FilmCardMapped } from "../interfaces/FilmCardMapped";



export class FilmAdapter{


    public static adaptDiscoverFilmsFromRaw(movie: Result, filmDetails: FilmDetailsMapped): DiscoverFilmsMapped{

        return{
            id: movie.id,
            title: movie.title,
            backdrop_path: `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`,
            runtime: filmDetails.runtime
          }
    }

    public static adaptSearchFilmsFromRaw(searchFilmsRaw: ResultSearch, genreList: Genres | null): SearchFilmsByQueryMapped{


        const genresFiltered = genreList?.genres.filter(genre => searchFilmsRaw.genre_ids.includes(genre.id));
        const genresName = genresFiltered?.map(genre => genre.name);
        console.log(searchFilmsRaw);

        return {
            id: searchFilmsRaw.id,
            genre_ids: genresName ?? [],
            original_title: searchFilmsRaw.original_title,
            poster_path: `https://image.tmdb.org/t/p/w500${searchFilmsRaw.poster_path}`,
            release_date: searchFilmsRaw.release_date,
            title: searchFilmsRaw.title
        }
    }

    public static adaptFilmCardToRaw(filmCard: FilmCardRaw): FilmCardMapped{

        const filmCardMapped: FilmCardMapped = {
              id: filmCard.id,
              backdrop_path: filmCard.backdrop_path,
              belongsToCollection: filmCard.belongs_to_collection,
              budget: filmCard.budget,
              genres: filmCard.genres,
              originalCountry: filmCard.origin_country,
              originalTitle: filmCard.original_title,
              overview: filmCard.overview,
              posterPath: filmCard.poster_path,
              releaseDate: filmCard.release_date,
              runtime: filmCard.runtime,
              status: filmCard.status,
              title: filmCard.title,
              video: filmCard.video,
              vote_average: filmCard.vote_average,
              vote_count: filmCard.vote_count
        }

        return filmCardMapped;

    }
}