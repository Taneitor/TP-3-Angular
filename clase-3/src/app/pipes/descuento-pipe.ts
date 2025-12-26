import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento',
  standalone: true
})
export class DescuentoPipe implements PipeTransform {

  transform(precio: number, porcentaje: number = 0): number {
    //Si el precio o el porcentaje es invalido devolver el precio original
    if(precio === null || isNaN(precio) || porcentaje === null || isNaN(porcentaje)){
      return precio
    }
    //Calculamos el porcentaje de descuento
    const precio_final = precio - (precio * porcentaje / 100)
    return Math.round(precio_final * 100) / 100
  }

}
