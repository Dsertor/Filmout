import { Component, input, signal } from '@angular/core';
import { DiscoverFilmsMapped } from '../../../../interfaces/DiscoverFilmsMapped';
import { LucideAngularModule } from 'lucide-angular';
import { RuntimePipe } from '../../../../pipes/runtime-film.pipe';

@Component({
  selector: 'trailer-film-article',
  imports: [LucideAngularModule, RuntimePipe],
  templateUrl: './trailer-film-article.component.html',
  styleUrl: './trailer-film-article.component.css',
})
export class TrailerFilmArticleComponent {
  public filmInfo = input<DiscoverFilmsMapped>();
  public isOverComponent = signal<boolean>(false);

  changeIsOver(): void{
    this.isOverComponent.update(prevValue => !prevValue);

  }

}
