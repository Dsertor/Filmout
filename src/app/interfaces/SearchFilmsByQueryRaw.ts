
export interface SearchFilmsByQueryRaw {
    page:          number;
    results:       ResultSearch[];
    total_pages:   number;
    total_results: number;
}

export interface ResultSearch {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: string;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}
