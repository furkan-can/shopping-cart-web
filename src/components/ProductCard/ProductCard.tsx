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
import { FC } from "react";

const Product: FC<{
  product: IProduct;
  handleAddToCart: (productId: number) => void;
}> = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();
  const maxTitleLength = 50;

  const navigateTo = (path: string) => {
    navigate(path);
  };

  const handleAddToCartClick = (event: any) => {
    event.stopPropagation();
    handleAddToCart(product.id);
  };

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
