import { Typography, Button, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { IProduct } from "./../../Interfaces/interfaces";
import "./Product.scss";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!product) {
    return <div>Loading...</div>;
  }
  const maxDescriptionLength = 200;
  let truncatedDescription = product.description.substring(
    0,
    maxDescriptionLength
  );

  const handleAddToCart = () => {
    // Sepete ekleme işlemleri burada yapılabilir.
  };

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
        {product.price + "₺"}
      </Typography>
      <Button
        className="btn"
        variant="contained"
        color="primary"
        onClick={handleAddToCart}
      >
        Add to Cart
      </Button>
    </Grid>
  );
}

export default Product;
