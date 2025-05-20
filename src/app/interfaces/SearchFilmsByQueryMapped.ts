export interface SearchFilmsByQueryMapped {
    id: number,
    genre_ids: string[],
    original_title: string,
    poster_path: string | null,
    release_date: string
    title: string
}