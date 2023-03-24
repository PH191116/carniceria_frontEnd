import { Component } from '@angular/core';
import { ProductoCantidad } from 'src/app/interfaces/productoCantidad.interface';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  productosStorage: ProductoCantidad[];
  
  constructor(private productoService: ProductosService){
    this.productosStorage = JSON.parse(localStorage.getItem('productos')!) || [];
  }
}
