export interface ProductoTotal {
    id_producto: string;
    nombre: string;
    cantidad: number;
    precio: number;
}


// Converts JSON strings to/from your types
export class Convert {
    public static toProductoResponse(json: string): ProductoTotal[] {
        return JSON.parse(json);
    }

    public static productoResponseToJson(value: ProductoTotal[]): string {
        return JSON.stringify(value);
    }
}
