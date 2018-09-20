# RESTaurant [backend]
Backend for RESTaurant management system.

Frontend in [mertinop/restaurant-front](https://github.com/mertinop/restaurant-front)

## Stack
- Express 
- Mongoose (MongoDB)
- Passport
- connect-roles

## Useful links
*Used or to use during the development*

### ToCheck
- https://github.com/saurabh1e/open-pos

### Open Source Projects
- https://github.com/shoumma/ReForum
- https://github.com/iurii-kyrylenko/hobbies

### Tutorials
- https://code.tutsplus.com/es/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
- https://gist.github.com/staltz/868e7e9bc2a7b8c1f754
- http://thecodebarbarian.com/mongoose-virtual-populate

### Docs
- http://www.passportjs.org/docs/username-password/
- http://expressjs.com/es/api.html
- http://mongoosejs.com/docs/api.html
- https://github.com/ForbesLindesay/connect-roles


## Models
### Category
 - name - string (required)
 - show - boolean
 - products - [Products]
### Product
 - name - string (required)
 - price - number
 - description - string
 - recipe - [RecipeItem]
  *RecipeItem:*
   - ingredient - Ingredient
   - quantity (number)
### Ingredient
 - name - string (required)
 - stock - number
 - unit - string
## Endpoints
### `POST` /products/:id/recipe
Add an ingredient to the product's recipe.
#### Request Body
	{ ingredient: IngredientId, quantity: number }
#### Returns
Updated product
### `DELETE` /products/:id/recipe/:ingredient_id
Remove an ingredient from the product's recipe
