import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompraComponent } from './compra.component';
import { ProductosModule } from 'src/app/productos/productos.module';



@NgModule({
  declarations: [
    CompraComponent,
  ],
  imports: [
    CommonModule,
    ProductosModule
  ],
  exports: [
    CompraModule
  ]
})
export class CompraModule { }
