import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SidebarModule } from '../shared/sidebar/sidebar.module';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    ProductosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    HttpClientModule,
    SidebarModule
  ]
  ,
  exports:[
    ProductosComponent
  ]
})
export class ProductosModule { }
