/*  src/App.jsx  */
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import theme from "./theme";
import DrawerAppBar from "./components/DrawerAppBar";
import AppRouter from "./routes/AppRouter";
import { LanguageProvider } from "./i18n/LanguageContext";
import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LanguageProvider>
        <BrowserRouter>
          <ScrollToTop />
          <DrawerAppBar>
            <AppRouter />
          </DrawerAppBar>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
