# My Gadgets Ecommerce Site - Backend

This is the backend of my full-stack ecommerce project. User can browse products by searching or by categories. A robust filtering system is implenented for filtering products. Authentication is implemented using JWT and it is required to purchase a product. Admin can manage full site information like products, categories, users, settings etc.

### [Live Site Link](https://my-gadgets-backend.vercel.app)

## Technology

1.  NodeJS
2.  ExpressJS
3.  Mongoose
4.  Zod
5.  Jose
6.  TypeScript

## Run the project in your local mechine

### Requirements

- Node Js (Make sure you have node js installed on your mechine).
- Mongodb Compass (optional: if you want to use local database).

### Installation

1. Clone this repo:
   - `git clone https://github.com/NaZmuZ-SaKiB/My-Gadgets-Server.git`
2. Install all necessary dependencies:
   - `cd My-Gadgets-Server`
   - `npm install` or `yarn`
3. Create a `.env` file in current directory and add following properties:

   - `NODE_ENV` = development/ production
   - `PORT` = (any port number)
   - `DATABASE_URL` = (your database url for connection)
   - `BCRYPT_SALT_ROUNDS` = 12
   - `JWT_ACCESS_SECRET` = secret for jwt
   - `JWT_ACCESS_EXPIRES_IN` = jwt expire time
   - `FRONT_END_URL` = Front end/ Client Side link

4. Run the development server using following command:
   - `npm run dev` or `yarn dev`
5. To build the project run following command:
   - `npm run build` or `yarn build`
6. To run the build version of the project run following command:
   - `npm run start` or `yarn start`

## API Documentation

### `GET /api/auth/me`

Get logged in user's profile info.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

### `POST /api/auth/sign-up`

New User Registration.

**Body** raw (json)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
}
```

### `POST /api/auth/sign-in`

User Login.

**Body** raw (json)

```json
{
  "email": "john@example.com",
  "password": "password"
}
```

### `PATCH /api/auth/change-password`

Change Password.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

**Body** raw (json)

```json
{
  "oldPassword": "123123",
  "newPassword": "456456"
}
```

### `GET /api/user`

Get All users data.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Query Parameters**

- page
- limit
- sort
- sortOrder
- searchTerm
- role

### `GET /api/user/dashboard`

Get dashboard data.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

### `GET /api/user/:id`

Get single dashboard data by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

### `POST /api/user/create-admin`

Create Admin.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN>
```

**Body** raw (json)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password"
}
```

### `PATCH /api/user`

Update Account info.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

**Body** raw (json)

```json
{
  "name": "John Doe",
  "email": "john@example.com"
}
```

### `PATCH /api/user/role-toggle`

Toggle user's role between `Admin` and `User`.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "id": "nvisy4das8asdf",
  "role": "admin"
}
```

### `GET /api/category`

Get all categories.

**Query Parameters**

- page
- limit
- sort
- sortOrder
- searchTerm
- onlyParent

### `GET /api/category/with-sub-cat`

Get all categories with sub-categories.

### `GET /api/category/:id`

Get category by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

### `POST /api/category`

Create New Category.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "asus",
  "Label": "Asus",
  "parent": "Parent Category ID",
  "image": "Media ID"
}
```

### `PATCH /api/category/:id`

Update a Category.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "asus",
  "Label": "Asus",
  "parent": "Parent Category ID",
  "image": "Media ID"
}
```

### `DELETE /api/category`

Delete Categories.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "ids": ["id1", "id2"]
}
```

### `GET /api/brand`

Get all brands.

**Query Parameters**

- page
- limit
- sort
- sortOrder
- searchTerm

### `GET /api/brand/:id`

Get brand by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

### `POST /api/brand`

Create New Brand.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "Asus",
  "image": "Media ID"
}
```

### `PATCH /api/brand/:id`

Update a Brand.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "asus",
  "image": "Media ID"
}
```

### `DELETE /api/brand`

Delete Brands.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "ids": ["id1", "id2"]
}
```

### `GET /api/media`

Get all media.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Query Parameters**

- page
- limit
- sort
- sortOrder
- searchTerm

### `GET /api/media/:id`

Get media by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

### `POST /api/media`

Create New Media.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "Asus",
  "publicId": "Public ID",
  "height": "100px",
  "width": "200px",
  "format": "png",
  "url": "https://example.com/image1.png",
  "secureUrl": "https://example.com/image1-secure.png",
  "thumbnailUrl": "https://example.com/image1-thumb.png"
}
```

### `PATCH /api/media/:id`

Update a Media.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "Asus",
  "publicId": "Public ID",
  "height": "100px",
  "width": "200px",
  "format": "png",
  "url": "https://example.com/image1.png",
  "secureUrl": "https://example.com/image1-secure.png",
  "thumbnailUrl": "https://example.com/image1-thumb.png"
}
```

### `DELETE /api/media`

Delete Medias.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "ids": ["id1", "id2"]
}
```

### `GET /api/product`

Get All Products.

**Query Parameters**

- page
- limit
- sort
- sortOrder
- searchTerm
- os
- minPrice/maxPrice
- minQuantity/maxQuantity
- minCamera/maxCamera
- minWeight/maxWeight
- minDisplaySize/maxDisplaySize
- brand
- category
- powerSource
- connectivity
- compatibility
- chargingPort

### `GET /api/product/top-selling`

Get Top selling Products.

### `GET /api/product/:id`

Get Product by ID.

### `POST /api/product`

Create New Product.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "Asus Laptop",
  "slug": "asus-laptop",
  "model": "Asus 123",
  "quantity": 10,
  "salePrice": 1000,
  "regularPrice": 1200,
  "shippingCost": 10,
  "badgeText": "New",
  "images": ["Media ID"],
  "description": "Product Description",
  "shortDescription": "Product Short Description",
  "brand": "Brand ID",
  "categories": ["Category ID"],
  "operatingSystem": "Windows",
  "connectivity": "Bluetooth",
  "powerSource": "Battery",
  "compatibility": "Windows",
  "chargingPort": "USB",
  "weight": 2,
  "camera": 5,
  "displaySize": 15
}
```

### `PATCH /api/product/:id`

Update Product Info.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "Asus Laptop",
  "slug": "asus-laptop",
  "model": "Asus 123",
  "quantity": 10,
  "salePrice": 1000,
  "regularPrice": 1200,
  "shippingCost": 10,
  "badgeText": "New",
  "images": ["Media ID"],
  "description": "Product Description",
  "shortDescription": "Product Short Description",
  "brand": "Brand ID",
  "categories": ["Category ID"],
  "operatingSystem": "Windows",
  "connectivity": "Bluetooth",
  "powerSource": "Battery",
  "compatibility": "Windows",
  "chargingPort": "USB",
  "weight": 2,
  "camera": 5,
  "displaySize": 15
}
```

### `DELETE /api/product`

Delete Products.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "ids": ["id1", "id2"]
}
```

### `GET /api/review`

Get all reviews.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Query Parameters**

- page
- limit
- sort
- sortOrder
- searchTerm
- status

### `GET /api/review/:productId`

Get all reviews of a product.

### `GET /api/review/:id`

Get review by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

### `POST /api/review`

Create New Review.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

**Body** raw (json)

```json
{
  "product": "product id",
  "rating": 3.5,
  "comment": "Review Comment"
}
```

### `PATCH /api/review/:id`

Update a Review.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "status": "approved"
}
```

### `DELETE /api/review/:id`

Delete Review by id.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

### `GET /api/branch`

Get all branch.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Query Parameters**

- page
- limit
- sort
- sortOrder
- searchTerm

### `GET /api/branch/:id`

Get branch by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

### `POST /api/branch`

Create New Review.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "Dhaka",
  "address": "Dhaka, Bangladesh",
  "phone": "01712345678",
  "mapLink": "https://example.com/map"
}
```

### `PATCH /api/branch/:id`

Update a Branch.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "name": "Dhaka",
  "address": "Dhaka, Bangladesh",
  "phone": "01712345678",
  "mapLink": "https://example.com/map"
}
```

### `DELETE /api/branch`

Delete branches.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "ids": ["id1", "id2"]
}
```

### `GET /api/settings`

Get settings.

### `PATCH /api/settings`

Update settings.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

```
Role: <SUPER_ADMIN | ADMIN>
```

**Body** raw (json)

```json
{
  "homepage": {
    "sliderImages": ["Media ID"],
    "bannerImage1": "Media ID",
    "featuredCategories": ["Category ID"]
    // ...other fields
  },
  "category": {
    "showOnTopMenu": ["Category ID"]
  },
  "footer": {
    "slogan": "Slogan",
    "copyright": "Copyright"
    // ...other fields
  },
  "social": {
    "facebook": "https://facebook.com"
    // ...other fields
  }
}
```

### `GET /api/shipping-address`

Get all shipping address of logged in user.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

### `GET /api/shipping-address/:id`

Get shipping address by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

### `POST /api/shipping-address`

Create New Shipping Address.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

**Body** raw (json)

```json
{
  "addressLine1": "Dhaka, Bangladesh",
  "addressLine2": "Dhaka, Bangladesh",
  "city": "Dhaka",
  "district": "Dhaka",
  "zipCode": "1205",
  "division": "Dhaka",
  "phone": "01712345678",
  "default": true
}
```

### `PATCH /api/shipping-address/:id`

Update Shipping Address.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

**Body** raw (json)

```json
{
  "addressLine1": "Dhaka, Bangladesh",
  "addressLine2": "Dhaka, Bangladesh",
  "city": "Dhaka",
  "district": "Dhaka",
  "zipCode": "1205",
  "division": "Dhaka",
  "phone": "01712345678",
  "default": true
}
```

### `DELETE /api/shipping-address/:id`

Delete Shipping Address by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

### `GET /api/order`

Get All Orders.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

**Query Parameters**

- page
- limit
- sort
- sortOrder
- searchTerm
- status
- isPaid
- cancelRequested
- user

### `GET /api/order/:id`

Get Order by ID.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

### `POST /api/order`

Create New Order.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

**Body** raw (json)

```json
{
  "orderId": "123456",
  "orderItems": [
    {
      "name": "Product name",
      "slug": "product-slug",
      "image": "Media ID",
      "price": 1000,
      "quantity": 2,
      "product": "Product ID"
    }
  ],
  "shippingAddress": "Shipping Address ID",
  "paymentMethod": "Cash on Delivery",
  "shippingCharge": 10,
  "totalPrice": 2010,
  "paymentResult": "string",
  "isPaid": true,
  "paidAt": "2021-09-01T00:00:00.000Z",
  "deliveryOption": "Standard",
  "transactionId": "123456"
}
```

### `PATCH /api/order/:id`

Update Order.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

**Body** raw (json)

```json
{
  "shippingAddress": "Shipping Address ID",
  "paymentResult": "string",
  "isPaid": true,
  "transactionId": "123456",
  "status": "Delivered",
  "cancelRequested": false
}
```

### `GET /api/wishlist`

Get user's wishlist.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

### `PUT /api/wishlist/:productId`

Add product to wishlist.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

### `PATCH /api/wishlist/:productId`

Remove product from wishlist.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

### `DELETE /api/wishlist`

Clear wishlist.

**Request Headers**

```
Authorization: <JWT_TOKEN>
```

## Success Response

```json
{
  "success": true,
  "statusCode": "status code",
  "message": "success message",
  "data": "data",
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 40
  }
}
```

## Error Response

```json
{
  "success": false,
  "message": "error message",
  "errorType": "Error Type",
  "stack": "Error Stack",
  "error": "Error"
}
```

## Deployment

1. Build the project.
2. Install Vercel CLI:
   - `npm i -g vercel` or `yarn global add vercel`
3. Log in to vercel:
   - `vercel login`
4. For first time deploy run `vercel`
5. For next deploys:
   - Build the project each time.
   - Run: `vercel --prod`
