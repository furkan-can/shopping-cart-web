import { Typography, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IProduct } from "./../../Interfaces/interfaces";
import "./Product.scss";
import { CartService } from "../../services/CartService";
import { ProductService } from "../../services/ProductService";
import { Page404 } from "../Page404";

// Ürün detay sayfası.
function Product() {
  // React Router'dan useParams hook'unu kullanarak url'den id parametresini alıyoruz.
  const { id } = useParams();
  // id parametresini number tipine çeviriyoruz.
  const productId = Number(id);
  // CartService'i kullanarak sepete ürün eklemek için cartService'i oluşturuyoruz.
  const cartService = new CartService(1);
  // Ürünü sepete eklerken oluşan hataları tutmak için state.
  const [error, setError] = useState<string | null>(null);
  // Ürünü tutmak için state.
  const [product, setProduct] = useState<IProduct | null>(null);
  // Ürün açıklamasının tamamını göstermek veya gizlemek için state.
  const [showFullDescription, setShowFullDescription] = useState(false);

  // useEffect hook'unu kullanarak, component yüklendiğinde ürünü getiriyoruz.
  useEffect(() => {
    const productService = new ProductService();
    const fetchProduct = async () => {
      try {
        const response = await productService.getProduct(productId);
        setProduct(response);
      } catch (error) {
        setError("Error fetching product.");
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

  // Ürün yüklenene kadar "Loading..." yazdırıyoruz.
  if (!product) {
    return <div>Loading...</div>;
  }

  // Ürün başlığının maksimum uzunluğu.
  const maxDescriptionLength = 200;
  // Ürün açıklamasını kısaltıyoruz.
  const truncatedDescription = product.description.substring(
    0,
    maxDescriptionLength
  );

  // Ürünü sepete ekle butonuna tıklandığında çalışacak fonksiyon.
  const handleAddToCartClick = async () => {
    try {
      await cartService.addItemToCart(productId);
    } catch (error) {
      setError("Error adding product to cart.");
      console.error(error);
    }
  };

  // Eğer ürün yüklenirken veya sepete ekleme işlemi yapılırken hata oluşursa Page404 componentini gösteriyoruz.
  if (error) {
    return <Page404 error={error} />;
  }

  return (
    <Grid className="container" item xs={12} md={10}>
      <img className="image" src={product.image} alt={product.title} />

      <Typography className="title" variant="h4" gutterBottom>
        {product.title}
      </Typography>
      <Typography className="capitalize" variant="subtitle1" gutterBottom>
        {product.category}
      </Typography>
      <Typography className="description" variant="body1" gutterBottom>
        {!showFullDescription ? truncatedDescription : product.description}

        {product.description.length > maxDescriptionLength && (
          <Button onClick={() => setShowFullDescription(!showFullDescription)}>
            {showFullDescription ? "Less" : "More"}
          </Button>
        )}
      </Typography>
      <Typography variant="h5" align="right">
        {product.price}₺
      </Typography>
      <Button
        className="btn"
        variant="contained"
        color="primary"
        onClick={() => handleAddToCartClick()}
      >
        Add to Cart
      </Button>
    </Grid>
  );
}

export default Product;
