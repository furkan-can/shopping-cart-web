import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const StyledContainer = styled(Container)(() => ({
  display: "flex",
  minHeight: "100%",
  alignItems: "center",
  justifyContent: "center",
}));

export const Page404 = (props: any): JSX.Element => {
  const navigate = useNavigate();

  const navigateToDashboard = () => {
    navigate("/");
  };

  return (
    <StyledContainer>
      <Box
        sx={{
          maxWidth: 640,
          margin: "auto",
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100vh",
        }}
      >
        <Typography
          color={"error"}
          sx={{
            fontSize: { xs: "64px", md: "96px" },
            fontWeight: "700",
          }}
          justifyContent="center"
        >
          404
        </Typography>

        <Typography
          color={"error"}
          sx={{
            fontSize: { xs: "32px", md: "38px" },
            fontWeight: "500",
            textAlign: "center",
          }}
          variant="subtitle1"
        >
          {props.error}
        </Typography>

        <Button
          variant="contained"
          fullWidth
          onClick={() => navigateToDashboard()}
        >
          Anasayfa
        </Button>
      </Box>
    </StyledContainer>
  );
};
