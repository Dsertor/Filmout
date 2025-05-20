import { ChangeDetectorRef, Component, ElementRef, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavCategories } from '../../interfaces/NavCategories';
import { LucideAngularModule } from 'lucide-angular';
import { JsonPipe, NgClass, NgFor } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subscription, switchMap } from 'rxjs';
import { FilmsService } from '../../services/films.service';
import { FilmSearchCardComponent } from "../film-search-card/film-search-card.component";
import { SearchFilmsByQueryMapped } from '../../interfaces/SearchFilmsByQueryMapped';

@Component({
  selector: 'guest-nav',
  imports: [RouterLink, RouterLinkActive, LucideAngularModule, NgClass, ReactiveFormsModule, FilmSearchCardComponent],
  templateUrl: './guest-nav.component.html',
  styleUrl: './guest-nav.component.css'
})
export class GuestNavComponent {
  public navCategories: NavCategories[] = [
    { name: 'Home', path: '' },
    { name: 'Genres', path: 'genres' },
    { name: 'Action', path: 'action' },
    { name: 'Themes', path: 'themes' },
    { name: 'Gift shop', path: 'shop' },
    { name: 'Support', path: 'support' }
  ];
  public isPressed = signal(false);
  public searchFilms = signal<SearchFilmsByQueryMapped[]>([])
  public inputRef = viewChild<ElementRef>('inputRef');
  public searchControl = new FormControl()
  public filmsService = inject(FilmsService);
  private cdr = inject(ChangeDetectorRef);
  private subscription: Subscription | null = null;




  changeIsPressed(){
    this.isPressed.update(prevValue => !prevValue);

  }

  onFocus(){
    this.changeIsPressed();
    this.onChange();
    this.cdr.detectChanges();
    const inputElement = this.inputRef()?.nativeElement;
    inputElement?.focus();
  }

  onBlur() {
    this.subscription?.unsubscribe();
    this.searchControl.reset();
    this.searchFilms.set([])
    this.isPressed.set(false)

  }

  onChange(){
    this.subscription = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      switchMap(query => {
        if(!query) return []


        return this.filmsService.searchFilmByQuery(query)

      })

    ).subscribe(response => (this.searchFilms.set(response)
    ))

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }


}
