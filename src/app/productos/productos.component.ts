import { Component, Injectable, OnInit } from '@angular/core';
import { ProductoCantidad } from '../interfaces/productoCantidad.interface';
import { Producto } from '../interfaces/productos.interface';
import { ProductosService } from '../services/productos.service';
import Swal from 'sweetalert2';
import { PaginationInstance } from 'ngx-pagination';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
})
export class ProductosComponent implements OnInit{
   productos: ProductoCantidad={
    id_producto: "",
    nombre: "",
    cantidad: 0,
    precio: 0.00,
    total: 0.00
  };
  resultadoProductos: Producto[] = [];
  private guardaProductos: ProductoCantidad[]=[];
  private productosExistentes: ProductoCantidad[]=[];
  public config: PaginationInstance = {
    itemsPerPage: 8,
    currentPage: 1,
    totalItems: 0
};
  constructor(private productoService: ProductosService) {}

  ngOnInit(): void {
      this.productoService.productos.subscribe((response) => {   
          this.resultadoProductos = response;
          //console.log(this.resultadoProductos);
          this.config.totalItems = this.resultadoProductos.length;
           });
  }
  recibirProducto(producto: Producto){
      localStorage.setItem('id_producto',producto.id_producto);
  }
  agregar(producto: string, cantidad: string, nombre: string, precio: number){
    if (cantidad!="" && parseFloat(cantidad)>0) {
    console.log("id_producto: "+producto)
    if ((nombre == 'CHORIZOS DE TUSA' || nombre=='CHORIZO DE TUSA') && parseFloat(cantidad)%7!=0) {
      console.log("Cantidad... "+cantidad)
      Swal.fire({
        title: 'Advertencia',
        text: 'La cantidad de este producto deber ser multiplo de 7',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
    }else if((nombre == 'CHORIZOS ESPECIAL' || nombre=='CHORIZO ESPECIAL') && parseFloat(cantidad)%3 !=0){
      Swal.fire({
        title: 'Advertencia',
        text: 'La cantidad de este producto deber ser multiplo de 3',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
    }else{
     this.productos = {
      id_producto: producto,
      nombre: nombre,
      cantidad: parseFloat(cantidad),
      precio: precio,
      total: 0.00
    };
    console.log("agregando productos... ");
    this.productosExistentes = JSON.parse(localStorage.getItem('productos')!) || [];
    
    if (this.productosExistentes.length==0 || this.productosExistentes == null) {
      console.log("agregando productos... no hay productos en localStorage");
      this.guardaProductos.push(this.productos);
      Swal.fire({
        title: 'Éxito',
        text: 'Producto listo para comprar',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem("productos", JSON.stringify(this.guardaProductos));
        }
      });
    }else{
      console.log("agregando productos... hay productos en localStorage");
      const comparison = this.productosExistentes.some((item) => {
          return item.id_producto == this.productos.id_producto;
          });
      console.log(comparison);
      if (!comparison) {
        this.guardaProductos.push(this.productos);
        Swal.fire({
          title: 'Éxito',
          text: 'Producto listo para comprar',
          icon: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            this.productosExistentes.push(this.productos);
            localStorage.setItem("productos", JSON.stringify(this.productosExistentes));
          }
        });
      }else{
        Swal.fire({
          title: 'Advertencia',
          text: 'Este producto ya ha sido agregado',
          icon: 'info',
          showCancelButton: false,
          confirmButtonText: 'OK',
        })
      } 
    }
  }
  }else{
    Swal.fire({
      title: 'Advertencia',
      text: 'Cantidad no puede ser 0 ni estar vacío',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'OK',
    })
  }
  }
  
}
