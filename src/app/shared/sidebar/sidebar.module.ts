import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { CompraComponent } from 'src/app/compras/compra/compra.component';



@NgModule({
  declarations: [
    SidebarComponent,
  ],
  imports: [
    CommonModule
    ],
  exports: [
    SidebarComponent
  ]
})
export class SidebarModule { }
