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
import { CartService } from "../../services/CartService";
import { DiscountService } from "../../services/DiscountService";
import { ICartProduct, IProduct } from "../../Interfaces/interfaces";
import { Page404 } from "../Page404";
import "./ShoppingCart.scss";
import { Clear } from "@mui/icons-material";
import { ProductService } from "./../../services/ProductService";
import { useNavigate } from "react-router-dom";

// Alışveriş Sepeti sayfası.
function ShoppingCart() {
  const cartService = new CartService(1);
  const discountService = new DiscountService();
  const productService = new ProductService();
  const navigate = useNavigate();

  const [totalPrice, setTotalPrice] = useState(0);
  const [discountedPrice, setDiscountedPrice] = useState(totalPrice);

  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);

  // Sepetteki ürünlerin toplam fiyatını hesaplamak için fonksiyon.
  useEffect(() => {
    setTotalPrice(
      products.reduce(
        (acc, product) => acc + product.price * product.quantity,
        0
      )
    );
    setDiscountedPrice(totalPrice);
  }, [products, totalPrice]);

  // İndirim kodunu uygulamak için fonksiyon.
  const handleApplyDiscount = () => {
    try {
      if (discountCode === "") {
        alert("Please enter a discount code.");
        return;
      }

      if (isDiscountApplied) {
        alert("Discount code already applied.");
        return;
      }

      if (totalPrice === 0) {
        alert("You can't apply discount code to empty cart.");
        return;
      }

      setDiscountedPrice(
        discountService.calculateDiscountedPrice(totalPrice, discountCode)
      );
      setIsDiscountApplied(true);
      return;
    } catch (error) {
      setDiscountCode("");
      alert("Invalid discount code");
      console.error(error);
    }
  };

  // İndirim kodunu iptal etmek için fonksiyon.
  const handleCancelDiscount = () => {
    setDiscountCode("");
    setIsDiscountApplied(false);
    setDiscountedPrice(totalPrice);
  };

  // Sepetteki ürünleri çekmek için fonksiyon.
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        // Sepetteki ürünleri çekiyoruz.
        const productsInfoInCart = await cartService.getCartProducts();
        // Sepetteki ürünlerin detaylarını çekiyoruz.
        await getProductsDetailsFromCart(productsInfoInCart);
      } catch (error: any) {
        setError(`Error fetching cart.`);
      } finally {
        setLoading(false);
      }
    }

    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sepetteki ürünlerin detaylarını çekmek için fonksiyon.
  async function getProductsDetailsFromCart(
    productsInfoInCart: ICartProduct[]
  ) {
    // Sepetteki ürünlerin id'lerini alıyoruz.
    const productIds = productsInfoInCart.map((p) => p.productId);
    try {
      // Sepetteki ürünlerin detaylarını çekiyoruz.
      const cartProductsDetails = await productService.getProductsByIds(
        productIds
      );
      // Sepetteki ürünlerin detaylarını, sepetteki ürün sayısı ile birleştiriyoruz.
      const cartProductsDetailsWithQuantity = cartProductsDetails.map(
        (product) => {
          const cartProduct = productsInfoInCart.find(
            (p) => p.productId === product.id
          );
          return {
            ...product,
            quantity: cartProduct ? cartProduct.quantity : 0,
          };
        }
      );
      // Sepetteki ürünleri state'e atıyoruz.
      setProducts(cartProductsDetailsWithQuantity);
    } catch (error) {
      console.error(error);
    }
  }

  // Sepetten bir ürün kaldırmak için fonksiyon.
  async function handleRemoveFromCart(productId: number) {
    try {
      const success = await cartService.removeItemFromCart(productId);
      if (success) {
        const newProducts = products.filter((p) => p.id !== productId);
        setProducts(newProducts);
        handleCancelDiscount();
      }
    } catch (error) {
      console.error(error);
    }
  }

  // Satın al butonuna basıldığında çalışacak fonksiyon.
  async function handleBuy() {
    if (products.length === 0) {
      alert("Your shopping cart is empty.");
      return;
    }
    alert("Thank you for your purchase!");
    navigate("/");
  }

  // Ürün bilgileri tamamlanana kadar "Loading..." yazdırıyoruz.
  if (loading) {
    return <div>Loading...</div>;
  }

  // Sepetteki ürünlerin detaylarını çekerken hata oluşursa Page404 componentini gösteriyoruz.
  if (error) {
    return <Page404 error={error} />;
  }

  // Sepetteki ürün yoksa "Your shopping cart is empty." yazdırıyoruz.
  if (!products) {
    return <div>Your shopping cart is empty.</div>;
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
              <IconButton onClick={() => handleCancelDiscount()}>
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
        {isDiscountApplied && (
          <div className="discount-price location">
            <strong>Total Price after Discount:</strong>
            <span>{discountedPrice.toFixed(2)}₺</span>
          </div>
        )}
        <Button
          className="buy-button"
          variant="contained"
          color="primary"
          onClick={handleBuy}
        >
          Buy Now
        </Button>
      </div>
    </>
  );
}

export default ShoppingCart;
