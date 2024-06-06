import { ThemeProvider } from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { darkTheme } from "./styles/themes/darkTheme";
import { Router } from "./Routes";
import { CyclesContextProvider } from "./contexts/CyclesContext";

export function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
          <CyclesContextProvider>
            <Router />
          </CyclesContextProvider>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}
