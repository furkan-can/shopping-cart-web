import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { IProduct } from "../../Interfaces/interfaces";
import { useNavigate } from "react-router-dom";
import "./ProductCard.scss";
import { FC, useState } from "react";
import { CartService } from "../../services/CartService";
import { Page404 } from "../../pages/Page404";

const Product: FC<{
  product: IProduct;
}> = ({ product }) => {
  const cartService = new CartService(1);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const maxTitleLength = 50;

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const handleAddToCartClick = async (event: any) => {
    event.stopPropagation();
    try {
      await cartService.addItemToCart(product.id);
    } catch (error) {
      setError("Error adding item to cart");
      console.error(error);
    }
  };

  if (error) {
    return <Page404 error={error} />;
  }

  return (
    <div
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <Card className="product-card">
        <div
          onClick={() => {
            navigateTo("/products/" + product.id);
          }}
        >
          <CardMedia
            className="image"
            component="img"
            image={product.image}
            alt={product.title}
          />
          <CardContent>
            <Typography className="title" variant="h6">
              {product.title.length > maxTitleLength
                ? product.title.substring(0, maxTitleLength) + "..."
                : product.title}
            </Typography>
            <Typography className="category" variant="subtitle1">
              {product.category}
            </Typography>
            <div className="price-button-container">
              <Button
                variant="contained"
                color="success"
                onClick={(event) => handleAddToCartClick(event)}
              >
                Add to Cart
              </Button>

              <Typography variant="h5" align="right">
                {product.price + "₺"}
              </Typography>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default Product;
