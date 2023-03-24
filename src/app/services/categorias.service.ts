import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDCategoria } from '../interfaces/productos.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private categoria: IDCategoria[]=[];
  constructor(private http: HttpClient) { }

  get categorias(){
    return this.http.get<IDCategoria[]>(`http://localhost:8080/categorias`)
  }
  categoriaById(id: string){
    return this.http.get<IDCategoria>(`http://localhost:8080/categorias/${id}`);
  }
}
