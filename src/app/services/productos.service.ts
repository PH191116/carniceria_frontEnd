import { Injectable } from '@angular/core';
import { Producto } from '../interfaces/productos.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ProductoCantidad } from '../interfaces/productoCantidad.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {
 
  public resultadoProductos: Producto [] = [];
  constructor(private http: HttpClient) { }
  
  get productos(){
   return this.http.get<Producto[]>(`http://localhost:8080/productos`);
  }

 getProductoById(id: string){
    return this.http.get<Producto>(`http://localhost:8080/productos/${id}`);
 }
  addProducto(producto: Producto){
    return this.http.post<Producto>(`http://localhost:8080/productos`, producto);
  }

  editProducto(id: string, producto: Producto){
    return this.http.put<Producto>(`http://localhost:8080/productos/${id}`, producto);
  }
}
