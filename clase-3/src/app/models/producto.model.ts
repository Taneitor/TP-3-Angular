
/* Contrato de tipo de como es el tipado de un Producto en la aplicacion */
export interface Producto {
    id: number,
    nombre: string,
    precio: number,
    descripcion?: string,
    fechaAlta: string /* ISO */
}