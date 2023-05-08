import { useRoutes } from "react-router-dom";
import DashboardLayout from "./components/Layout";
import Product from "./pages/Product/Product";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import ProductList from "./pages/ProductList/ProductList";
import { Page404 } from "./pages/Page404";
import Home from "./pages/Home";

export const RouteList: React.FC = () => {
  return useRoutes([
    {
      path: "/*",
      element: <Page404 />,
    },
    {
      element: <DashboardLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/products/:id",
          element: <Product />,
        },
        {
          path: "/product-list",
          element: <ProductList />,
        },
        {
          path: "/shopping-cart",
          element: <ShoppingCart />,
        },
      ],
    },
  ]);
};
