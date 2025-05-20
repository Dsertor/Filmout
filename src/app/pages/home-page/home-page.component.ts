import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { GuestNavComponent } from "../../shared/guest-nav/guest-nav.component";
import { MainSectionComponent } from "./components/main-section/main-section.component";
import { FilmsService } from '../../services/films.service';
import { DiscoverFilmsMapped } from '../../interfaces/DiscoverFilmsMapped';

@Component({
  selector: 'home-page',
  imports: [MainSectionComponent],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {

  public filmsService = inject(FilmsService);
  public films = signal<DiscoverFilmsMapped[]>([])

  ngOnInit(): void {

    this.filmsService.getDiscoverfilms().subscribe({
      next: (response) =>{

        this.films.set(response)

      }
    })

  }


 }
