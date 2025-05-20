import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'runtime'
})

export class RuntimePipe implements PipeTransform {
    transform(runtime: number | undefined): string {
        if(!runtime) return ''

        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;

        return `${(hours > 0) ?`${hours}h`: ''} ${minutes}min`
    }
}