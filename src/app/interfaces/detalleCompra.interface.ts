// To parse this data:
//
//   import { Convert, DetalleCompra } from "./file";
//
//   const detalleCompra = Convert.toDetalleCompra(json);

export interface DetalleCompra {
    id_detalle: number;
    compra:     Compra;
    producto:   Producto;
    cantidad:   number;
    precio:     number;
    total:      number;
}

export interface Compra {
    id_compra: string;
    fecha:     Date;
}

export interface Producto {
    id_producto:  string;
    nombre:       string;
    precio:       number;
    id_categoria: IDCategoria;
}

export interface IDCategoria {
    id_categoria: number;
    nombre:       string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toDetalleCompra(json: string): DetalleCompra {
        return JSON.parse(json);
    }

    public static detalleCompraToJson(value: DetalleCompra): string {
        return JSON.stringify(value);
    }
}
