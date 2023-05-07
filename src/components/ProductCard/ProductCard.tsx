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

function Product(props: IProduct) {
  const navigate = useNavigate();
  const maxTitleLength = 50;

  const navigateTo = (path: string) => {
    navigate(path);
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
            navigateTo("/products/" + props.id);
          }}
        >
          <CardMedia
            className="image"
            component="img"
            image={props.image}
            alt={props.title}
          />
          <CardContent>
            <Typography className="title" variant="h6">
              {props.title.length > maxTitleLength
                ? props.title.substring(0, maxTitleLength) + "..."
                : props.title}
            </Typography>
            <Typography className="category" variant="subtitle1">
              {props.category}
            </Typography>
            <div className="price-button-container">
              <Button
                variant="contained"
                color="success"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                Add to Cart
              </Button>

              <Typography variant="h5" align="right">
                {props.price + "₺"}
              </Typography>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}

export default Product;
