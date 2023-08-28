import { CartProduct } from "./cartProduct";
import { Product } from "./product";

export class CustomerCart{
    cartId!: number;
    customerEmailId!: string;
    cartProducts!: CartProduct[];
    product: Product;
    quantity: number;
}