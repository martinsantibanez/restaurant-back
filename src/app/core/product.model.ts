import { Ingredient } from './ingredient.model';

class RecipeItem {
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
