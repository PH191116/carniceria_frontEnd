import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosModule } from './productos/productos.module';
import { CompraComponent } from './compras/compra/compra.component';
import { SidebarModule } from './shared/sidebar/sidebar.module';
import { DetalleComponent } from './detalle/detalle.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';

@NgModule({
  declarations: [
    AppComponent,
    CompraComponent,
    DetalleComponent,
    AgregarProductoComponent,
    EditarProductoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    ProductosModule,
    SidebarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
