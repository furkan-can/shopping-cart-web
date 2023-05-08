import { useState, useEffect } from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
} from "@mui/material";

import axios from "axios";
import { ICart, IProduct } from "../../Interfaces/interfaces";
import { Page404 } from "../Page404";
import "./ShoppingCart.scss";
import { Clear } from "@mui/icons-material";

function ShoppingCart() {
  const [cart, setCart] = useState<ICart | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  const handleApplyDiscount = () => {
    const isValidDiscountCode = discountCode === "ABC123";

    if (isValidDiscountCode) {
      setDiscount(0.1);
      setIsDiscountApplied(true);
      return;
    }

    setDiscount(0);
    setDiscountCode("");
    alert("Invalid discount code");
  };

  const cancelDiscount = () => {
    setDiscount(0);
    setDiscountCode("");
    setIsDiscountApplied(false);
  };

  const totalPrice = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const discountedPrice = totalPrice * (1 - discount);

  useEffect(() => {
    async function fetchCart() {
      try {
        setLoading(true);
        const response = await axios.get<ICart>(
          "https://fakestoreapi.com/carts/1 "
        );
        setCart(response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
  }, []);

  useEffect(() => {
    if (cart) {
      getProductsFromCart(cart);
    }
  }, [cart]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Page404 />;
  }

  if (!cart || !products) {
    return <div>Your shopping cart is empty.</div>;
  }

  async function getProductsFromCart(cart: ICart) {
    const productIds = cart.products.map((p) => p.productId);

    const response = await axios.get<IProduct[]>(
      "https://fakestoreapi.com/products"
    );

    const products = response.data.filter((product) =>
      productIds.includes(product.id)
    );

    const productsWithQuantity = products.map((product) => {
      const cartProduct = cart.products.find((p) => p.productId === product.id);
      return {
        ...product,
        quantity: cartProduct ? cartProduct.quantity : 0,
      };
    });

    setProducts(productsWithQuantity);
  }

  async function handleRemoveFromCart(productId: number) {
    console.log("eski", products);
    const newProducts = products.filter((p) => p.id !== productId);
    setProducts(newProducts);

    axios
      .patch("https://fakestoreapi.com/carts/1", {
        userId: 1,
        date: Date.now(),
        products: newProducts.map((p) => ({
          productId: p.id,
          quantity: p.quantity,
        })),
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <img src={product.image} alt={product.title} height="100" />
                </TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.price}₺</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.price * product.quantity}₺</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="pay-container">
        <div className="price location">
          <strong>Total Price:</strong>
          {isDiscountApplied ? (
            <del>{totalPrice}₺</del>
          ) : (
            <span>{totalPrice}₺</span>
          )}
        </div>
        <div className="discount location">
          <div className="discount-code">
            <TextField
              label="Discount Code"
              value={discountCode}
              disabled={isDiscountApplied}
              onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
            />
            {discountCode && isDiscountApplied && (
              <IconButton onClick={() => cancelDiscount()}>
                <Clear />
              </IconButton>
            )}
          </div>
          <Button
            variant="contained"
            color="success"
            onClick={handleApplyDiscount}
          >
            Apply
          </Button>
        </div>
        <div className="discount-price location">
          <strong>Total Price after Discount:</strong>
          <span>{discountedPrice.toFixed(2)}₺</span>
        </div>
        <Button className="buy-button" variant="contained" color="primary">
          Buy Now
        </Button>
      </div>
    </>
  );
}

export default ShoppingCart;
