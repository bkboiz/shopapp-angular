import { Product } from "./product.response";

export interface GetProductResponse {
    totalPages: number;
    lstProduct: Product[];
}