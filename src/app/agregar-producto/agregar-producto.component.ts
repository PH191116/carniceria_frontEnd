import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IDCategoria, Producto } from '../interfaces/productos.interface';
import { CategoriasService } from '../services/categorias.service';
import { ProductosService } from '../services/productos.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
})
export class AgregarProductoComponent {
  public categoriasList: IDCategoria[]=[];
  private categoria: IDCategoria={
    id_categoria: 0,
    nombre:       ''
  }
  private productoNuevo: Producto ={
    id_producto: '',
    nombre:       '',
    precio:       0.00,
    id_categoria: {
      id_categoria: 0,
      nombre:       ''
    }

  }
    
  constructor(private categorias: CategoriasService, 
              private producto: ProductosService,
              private router: Router) {
     this.categorias.categorias.subscribe((response)=>{
      this.categoriasList = response;
     });
   }
  formulario = new FormGroup({
    nombre: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required),
    categoria: new FormControl('', Validators.required)
  })
  enviar() {
    if (this.formulario.value.categoria!="" && this.formulario.value.nombre!="" && parseFloat(this.formulario.value.precio!)!=0) {
      this.categorias.categoriaById(this.formulario.value.categoria! || "").subscribe(
        (response)=>{
          this.categoria = response;
          this.productoNuevo.id_producto='';
          this.productoNuevo.nombre=this.formulario.value.nombre! || "";
          this.productoNuevo.precio= parseFloat(this.formulario.value.precio!) || 0.00;
          this.productoNuevo.id_categoria={
            id_categoria: this.categoria.id_categoria,
            nombre: this.categoria.nombre
          }
          this.producto.addProducto(this.productoNuevo).subscribe(
            (response)=>{
              if (response!=null) {
                this.formulario.reset();
              }
              Swal.fire({
                title: 'Éxito',
                text: '!Producto agregado exitosamente!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                      this.router.navigate(['/']);
                }
              });
            },
            (error) =>{
              Swal.fire({
                title: 'Ups!',
                text: 'Este producto ya esta registrado',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
              })/*.then((result) => {
                if (result.isConfirmed) {
                      this.router.navigate(['/']);
                }
              });*/
            }
            
          );
          
          //console.log(this.productoNuevo);
        }
        ,
    error => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo agregar el producto :(',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
              this.router.navigate(['/']);
        }
      });
    });
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
