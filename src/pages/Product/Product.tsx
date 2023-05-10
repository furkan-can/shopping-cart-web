import { Typography, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { IProduct } from "./../../Interfaces/interfaces";
import "./Product.scss";
import { CartService } from "../../services/CartService";
import { ProductService } from "../../services/ProductService";
import { Page404 } from "../Page404";

function Product() {
  const { id } = useParams();
  const productId = Number(id);
  const cartService = new CartService(1);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);

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

  if (!product) {
    return <div>Loading...</div>;
  }

  const maxDescriptionLength = 200;
  const truncatedDescription = product.description.substring(
    0,
    maxDescriptionLength
  );

  const handleAddToCartClick = async () => {
    try {
      await cartService.addItemToCart(productId);
    } catch (error) {
      setError("Error adding product to cart.");
      console.error(error);
    }
  };

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
