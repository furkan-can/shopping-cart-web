import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { IProduct } from "./../Interfaces/interfaces";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/${id}`).then((response) => {
      setProduct(response.data);
    });
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {product?.title}
      </Typography>
    </>
  );
}

export default Product;
