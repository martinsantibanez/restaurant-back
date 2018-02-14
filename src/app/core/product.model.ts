import { Ingredient } from './ingredient.model';

export class RecipeItem {
  _id: string;
  ingredient: Ingredient;
  quantity: number;
}

export class Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  recipe: RecipeItem[];
}
