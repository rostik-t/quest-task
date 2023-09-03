import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    const hours = Math.ceil(value / 60);
    const minutes = value % 60;
    return `${hours}h ${minutes}m`;
  }

}
