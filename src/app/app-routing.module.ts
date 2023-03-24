import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { CompraComponent } from './compras/compra/compra.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { ProductosComponent } from './productos/productos.component';

const routes: Routes = [
  {path: 'compras', component: CompraComponent},
  {path: '', component: ProductosComponent},
  {path: 'compras/detalle', component: DetalleComponent},
  {path: 'productos/agregar', component: AgregarProductoComponent},
  {path: 'productos/editar', component: EditarProductoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
