import { Product } from './product.model';
export class Category {
    _id: string;
    name: string;
    show: boolean;
    products: Product[];
}
