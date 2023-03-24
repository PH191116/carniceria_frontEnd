export interface ProductoCantidad {
    id_producto: string;
    nombre: string;
    cantidad: number;
    precio: number;
    total: number;
}


// Converts JSON strings to/from your types
export class Convert {
    public static toProductoResponse(json: string): ProductoCantidad[] {
        return JSON.parse(json);
    }

    public static productoResponseToJson(value: ProductoCantidad[]): string {
        return JSON.stringify(value);
    }
}
