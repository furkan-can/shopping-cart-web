import { Typography } from "@mui/material";

function Home() {
  return (
    <>
      <Typography paragraph>
        <b>ProductList:</b> This component will render a list of products that
        the user can add to the shopping cart.
      </Typography>
      <Typography paragraph>
        <b>Product:</b> This component will render a single product and its
        details.
      </Typography>
      <Typography paragraph>
        <b>ShoppingCart:</b> This component will render the items in the
        shopping cart, as well as the coupon code input and the total price.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Implement the functionality
      </Typography>
      <Typography variant="h6">
        User can add a new item to the shopping cart by clicking the "Add to
        Cart" button.
      </Typography>
      <Typography paragraph>
        User can remove an existing item from the shopping cart by clicking the
        "Remove" button.
      </Typography>
      <Typography paragraph>
        User can apply a coupon to the shopping cart by entering a coupon code
        and clicking the "Apply" button.
      </Typography>
      <Typography paragraph>
        User can see the original price and discount price of the items in the
        shopping cart.
      </Typography>
      <Typography paragraph>
        User can list all items in the shopping cart.
      </Typography>
    </>
  );
}

export default Home;
