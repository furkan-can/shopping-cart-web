import { CssBaseline } from "@mui/material";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { BrowserRouter } from "react-router-dom";
import { RouteList } from "./routes";

export const App = (): JSX.Element => {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
  });

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <RouteList />
        </BrowserRouter>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
