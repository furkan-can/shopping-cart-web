# Project Description

This project aims to create a simple e-commerce site. Developed using React, this website provides users with functionality such as listing various products, viewing product details, adding products to the cart and purchasing using coupons.

## The Goal Of The Project

We aim to have the opportunity to be evaluated with a workshop that we will hold at the end of our 7-week training with TOM Academy.

## Project Structure

shopping-cart-web/
|-- src/
|   |-- Interfaces/
|   |   |-- interfaces.ts
|   |-- components/
|   |   |-- ProductCard/
|   |   |   |-- ProductCard.tsx
|   |   |   |-- ProductCard.scss
|   |   |-- Layout.tsx
|   |-- pages/
|   |   |-- Product/
|   |   |   |-- Product.tsx
|   |   |   |-- Product.scss
|   |   |-- ProductList/
|   |   |   |-- ProductList.tsx
|   |   |   |-- ProductList.scss
|   |   |-- ShoppingCart/
|   |   |   |-- ShoppingCart.tsx
|   |   |   |-- ShoppingCart.scss
|   |   |-- ...
|   |-- services/
|   |   |-- CartService.ts
|   |   |-- DiscountService.ts
|   |   |-- ProductService.ts
|   |-- App.tsx
|   |-- index.tsx
|-- ...

- The `src` directory contains the project source codes.
- The `components` directory contains the React components used in the project. Each component represents a part of the user interface and increases reusability.
- The `pages` directory contains React components of different pages. Each page corresponds to a URL route, allowing users to navigate different sections.
- The `interfaces` directory contains models prepared to provide type protection.
- The `services` directory contains service files used to access external services (eg API requests).
- The `App.tsx` is the main component of the React app and bundles the other components together.
- The `index.tsx` is the starting point of the React application and links the React application to HTML.

## Setup

After downloading the project run the following command inside the project directory to install the required dependencies:
- npm install
Run the following command to start the project:
- npm start
Go to http://localhost:3000 in your web browser and view the e-commerce site.

## Usage

- You can see the product list on the main page. Each product has a name, price, and a "Details" link.
- You can view the details of any product by clicking on the "Details" link.
- On the product details page, you can find the specifications and description of the product.
- On the product details page and the products list page, you can click the "Add to Cart" button to add the product to the cart.
- By going to the cart page, you can view the products you have selected and buy them at a discount using coupons.

## Demo Link

https://shopping-cart-web-omega.vercel.app/product-list

## Screenshots

### Product List Page
![Product-List](https://github.com/furkan-can/shopping-cart-web/assets/79963893/85c3dcde-a69c-4e7d-b738-a2d9248abf74)

### Product Details Page
![Product](https://github.com/furkan-can/shopping-cart-web/assets/79963893/ee218dfc-be97-42e4-8e9b-6f2f0bafe41a)

### Shopping Cart Page
![shopping-cart](https://github.com/furkan-can/shopping-cart-web/assets/79963893/07b85c53-0374-4af2-ad3a-85367aeb1f01)

### Discount Price
![discount](https://github.com/furkan-can/shopping-cart-web/assets/79963893/af370263-c442-4ba9-a792-55e4ea0f97e1)



