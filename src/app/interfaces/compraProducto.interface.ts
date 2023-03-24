import { Compra } from "./compra.interface";
import { ProductoCantidad } from "./productoCantidad.interface";

export interface CompraProducto {
    compra: Compra;
    productos: ProductoCantidad[];
}


// Converts JSON strings to/from your types
export class Convert {
    public static toProductoResponse(json: string): CompraProducto[] {
        return JSON.parse(json);
    }

    public static productoResponseToJson(value: CompraProducto[]): string {
        return JSON.stringify(value);
    }
}
