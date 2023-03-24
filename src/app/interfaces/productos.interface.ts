// To parse this data:
//
//   import { Convert } from "./file";
//
//   const productoResponse = Convert.toProductoResponse(json);

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
    public static toProductoResponse(json: string): Producto[] {
        return JSON.parse(json);
    }

    public static productoResponseToJson(value: Producto[]): string {
        return JSON.stringify(value);
    }
}
