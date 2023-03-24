import { Component } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination';
import { DetalleCompra } from 'src/app/interfaces/detalleCompra.interface';
import { ComprasService } from 'src/app/services/compras.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
})
export class DetalleComponent {
  detalles: DetalleCompra[] = [];
  public config: PaginationInstance = {
    itemsPerPage: 5,
    currentPage: 1,
    totalItems: 0
};
  constructor(private detalle: ComprasService) {}
  ngOnInit() {
    this.detalle.comprasDetalle.subscribe((response)=>{
        this.detalles = response;
        this.config.totalItems = this.detalles.length;
        //console.log(this.detalles);
    })
  }
  obtenerPdf(){
    this.detalle.pdf.subscribe((response) => {
      if (response.size==0) {
        Swal.fire({
          title: 'Advertencia',
          text: 'No hay reporte, ya que deben existir compras del día actual',
          icon: 'warning',
          showCancelButton: false,
          confirmButtonText: 'OK',
        })
      }else{
      const fileUrl = URL.createObjectURL(response);
      window.open(fileUrl);
      }
    })
  }
}
