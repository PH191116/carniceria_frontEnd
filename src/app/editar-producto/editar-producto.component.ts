import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IDCategoria, Producto } from '../interfaces/productos.interface';
import { CategoriasService } from '../services/categorias.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
})
export class EditarProductoComponent {
  id_producto: string = '';
  public categoriasList: IDCategoria[]=[];
  private categoria: IDCategoria={
    id_categoria: 0,
    nombre:       ''
  }
  public productoUpdated: Producto ={
    id_producto: '',
    nombre:       '',
    precio:       0.00,
    id_categoria: {
      id_categoria: 0,
      nombre:       ''
    }
  }
  
  constructor(private categorias: CategoriasService, 
              private productoService: ProductosService,
              private router: Router) {
    this.categorias.categorias.subscribe((response)=>{
    this.categoriasList = response;      
     });
    this.id_producto = localStorage.getItem('id_producto')! || "";
    this.productoService.getProductoById(this.id_producto).subscribe((response)=>{
      this.productoUpdated = response;
    })
   }
  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required)
  })
  editarProducto(producto: Producto){
    console.log(this.formulario.value)
    if (producto.id_categoria!=null && producto.nombre!="" && producto.precio!=0) {
      this.categorias.categoriaById(producto.id_categoria.id_categoria.toString()).subscribe((response)=>{
        this.categoria = response;
        producto.id_categoria = this.categoria;
        producto.precio = parseFloat(this.formulario.value.precio! || "");
        this.productoService.editProducto(this.id_producto, producto).subscribe((response)=>{
          if (response!=null) {
            localStorage.clear();
            this.formulario.reset();
          }
            Swal.fire({
              title: 'Éxito',
              text: '!Producto actualizado exitosamente!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                  this.router.navigate(['/']);
              }
            });
        },
        error => {
          console.log(error);
          Swal.fire({
            title: 'Error',
            text: 'No se pudo actualizar el producto :(',
            icon: 'error',
            showCancelButton: false,
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
                this.router.navigate(['/']);
            }
          });
        }
        )
      })
  }else{
    Swal.fire({
      title: 'Advertencia',
      text: 'Todos los campos deben estar llenos',
      icon: 'info',
      showCancelButton: false,
      confirmButtonText: 'OK',
    })
  }

  }
}
