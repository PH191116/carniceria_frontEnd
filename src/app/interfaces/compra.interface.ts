export interface Compra {
    id_compra: string;
    fecha: string;
}


// Converts JSON strings to/from your types
export class Convert {
    public static toProductoResponse(json: string): Compra[] {
        return JSON.parse(json);
    }

    public static productoResponseToJson(value: Compra[]): string {
        return JSON.stringify(value);
    }
}
