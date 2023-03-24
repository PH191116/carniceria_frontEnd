import { Component, Input, OnInit } from '@angular/core';
import { Compra } from 'src/app/interfaces/compra.interface';
import { CompraProducto } from 'src/app/interfaces/compraProducto.interface';
import { ProductoCantidad } from 'src/app/interfaces/productoCantidad.interface';
import { ComprasService } from 'src/app/services/compras.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
})
export class CompraComponent implements OnInit{
  private compraProducto: CompraProducto={
    compra: {
      id_compra: "",
      fecha: ""
    },
    productos: []
  }
  productosStorage: ProductoCantidad[]=[];
  compra: Compra= {
    id_compra: "",
    fecha:  ""
  };
  total: number = 0.00;
  cambio: number = 0.00;
  constructor(private productoService: ProductosService, 
              private compraService: ComprasService,
              private router: Router){}
  ngOnInit(): void {
    
    this.productosStorage = JSON.parse(localStorage.getItem('productos')!) || [];
    //console.log(this.productosStorage);
    this.productosStorage.forEach(product =>{
      if(product.nombre == 'CHORIZOS DE TUSA' || product.nombre=='CHORIZO DE TUSA'){
        product.total = (product.cantidad/7)*product.precio;
        this.total += product.total;
      }else if (product.nombre == 'CHORIZOS ESPECIAL' || product.nombre=='CHORIZO ESPECIAL') {
        product.total = (product.cantidad/3)*product.precio;
        this.total += product.total;
      }else{
        product.total = parseFloat((product.cantidad * product.precio).toFixed(2));
        this.total= parseFloat((this.total +product.total).toFixed(2));
      }
      
    })
  }
  cleanCompra(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
  eliminarProducto(id_producto: string){
    if (this.productosStorage.length>0) {
     this.productosStorage = this.productosStorage.filter(producto => id_producto !== producto.id_producto);
     //console.log("Nuevos valores del arreglo: ");
     //console.log(this.productosStorage);
     Swal.fire({
      title: 'Éxito',
      text: 'Producto eliminado exitosamente',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem('productos', JSON.stringify(this.productosStorage));
        window.location.href= "./compras";
      }
    });
    }
  }
  addCompra(){
    //Creando una nueva compra
   this.compraService.addCompra(this.compra).subscribe((response)=>{
      this.compra = response;
      this.compraProducto.compra =this.compra;
      //console.log("compra creada: "+this.compra.id_compra);
      this.compraProducto.productos = this.productosStorage;
      Swal.fire({
        title: "Calcular cambio: Ingrese la cantidad recibida",
        input: "text",
        showCancelButton: true,
        confirmButtonText: "Calcular",
        cancelButtonText: "Cancelar",
    })
    .then(resultado => {
        if (resultado.value) {
          this.compraService.calcularCambio(this.total, parseFloat(resultado.value)).subscribe(response=>{
            this.cambio = parseFloat(response.toFixed(2));
            Swal.fire({
              title: 'Éxito',
              text: 'Cantidad a devolver es: $'+this.cambio.toFixed(2),
              icon: 'success',
              showCancelButton: false,
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                this.compraService.addCompraDetalle(this.compraProducto).subscribe((response)=>{
                  this.compraProducto = response;
                  //console.log(this.compraProducto);
                });
                  this.router.navigate(['/']);
              }
            });
          })
        }
    });
      
    },
    error => {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo realizar la compra :(',
        icon: 'error',
        showCancelButton: false,
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
              this.router.navigate(['/']);
        }
      });
    });
    //Creando la compra con sus respectivos productos
    localStorage.clear();
    //console.log(this.compraProducto);
  }
}
