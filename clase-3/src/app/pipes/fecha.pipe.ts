import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fecha',
  standalone: true
})

export class FechaPipe implements PipeTransform {
   
  transform(fecha: Date | string, formato: string = 'dd/MM/yyyy'): string {
    const date = new Date(fecha);

    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear();

    switch (formato) {
      case 'dd/MM/yyyy':
        return `${dia}/${mes}/${anio}`;
      case 'MM-dd-yyyy':
        return `${mes}-${dia}-${anio}`;
      case 'yyyy-MM-dd':
        return `${anio}-${mes}-${dia}`;
      default:
        return date.toLocaleDateString();
    }
  }
}
