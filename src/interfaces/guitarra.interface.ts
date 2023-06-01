export interface IGuitarra {
  id: number;
  nombre: string;
  imagen: string;
  descripcion: string;
  precio: number;
}

export interface ICarrito extends IGuitarra {
  cantidad: number;
}
