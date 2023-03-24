import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../interfaces/compra.interface';
import { CompraProducto } from '../interfaces/compraProducto.interface';
import { DetalleCompra } from '../interfaces/detalleCompra.interface';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  public resultadoProductos: Compra [] = [];
  constructor(private http: HttpClient) { }
  
  get compras(){
   return this.http.get<Compra[]>(`http://localhost:8080/compras`);
  }
  get comprasDetalle(){
    return this.http.get<DetalleCompra[]>(`http://localhost:8080/detalle/todos`);
  }
  get pdf(){
    return this.http.get(`http://localhost:8080/reportes/pdf`, {responseType: 'blob'});
  }
  addCompra(compra: Compra){
    return this.http.post<Compra>(`http://localhost:8080/compras`, compra);
  }
  addCompraDetalle(compraDetalle: CompraProducto){
    return this.http.post<CompraProducto>(`http://localhost:8080/detalle`, compraDetalle)
  }

  calcularCambio(total: number, recibido: number){
      return this.http.get<number>(`http://localhost:8080/detalle/calcular/${total}/${recibido}`);
  }
}
