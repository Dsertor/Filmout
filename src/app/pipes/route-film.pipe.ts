import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'RouteFilm',
})
export class RouteFilmPipe implements PipeTransform {

  transform(value: string | undefined, sendByRoute: boolean = true ): string {
    if(!value) return ''

    return sendByRoute ? value.replaceAll(' ','_') : value.replaceAll('_',' ');
  }

}
