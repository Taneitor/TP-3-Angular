import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  /* Lista inicial de productos */
  private inicial: Producto[] = [
    {
      id: 1,
      nombre: 'Camiseta',
      descripcion: '100% algodon',
      precio: 2500,
      fechaAlta: new Date(2025, 0, 10).toISOString() //Obtener la fecha en formato ISO string
    },
    {
      id: 2,
      nombre: 'Pantalon',
      descripcion: '100% algodon',
      precio: 3500,
      fechaAlta: new Date(2025, 1, 20).toISOString() //Obtener la fecha en formato ISO string
    },
    {
      id: 3,
      nombre: 'Zapatillas',
      descripcion: '100% originales',
      precio: 4500,
      fechaAlta: new Date(2025, 3, 30).toISOString() //Obtener la fecha en formato ISO string
    }
  ]


  //Estado de productos
  private productosSubject = new BehaviorSubject<Producto[]>([...this.inicial])
  
  //Averiguar cual es el id mas alto de productos inciales y sumarle uno mas para que ese sea nuestro proximo id
  private nextId  = Math.max(...this.inicial.map(product => product.id)) + 1

  constructor (){}

  /* Obtener productos */
  getProductos () : Observable<Producto[]> {
    return this.productosSubject.asObservable()
  }

  /* 
  Partial: Nos permite marcar al objeto con propiedades opcionales
  Como generaremos el ID nosotros, el producto es parcial, no tiene todas las propiedades que debe tener, es una parte/porcion del producto
  */
  addProducto (producto_parcial: Partial<Producto>){
    const productos_actuales = this.productosSubject.getValue()
    //Guardamos y incrementamos el contador de ids
    const new_id = this.nextId++
    const new_producto: Producto = {
      id: new_id,
      nombre: producto_parcial.nombre || '',
      precio: producto_parcial.precio ?? 0,
      descripcion: producto_parcial.descripcion || '',
      fechaAlta: producto_parcial.fechaAlta || new Date().toISOString()
    }

    //Añade un nuevo producto a la lista de productos
    this.productosSubject.next([...productos_actuales, new_producto])
  }

  deleteProducto(product_id: number){
    //Creamos una lista sin el producto que queriamos eliminar
    const productos_filtrados = this.productosSubject.getValue().filter(product => product.id !== product_id)

    //Seteamos la lista como nuevo valor de estado
    this.productosSubject.next(productos_filtrados)
  }


  /* Volver al estado inicial */
  reset (){
    this.productosSubject.next([...this.inicial])
    this.nextId = Math.max(...this.inicial.map(product => product.id)) + 1
  }

}
