import { createTheme } from "@mui/material/styles";
import { brand } from "./constants/brand";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: brand.primary,
      dark: brand.primaryDark,
      light: brand.primaryLight,
      contrastText: brand.white,
    },
    secondary: {
      main: brand.accent,
      contrastText: brand.white,
    },
    background: {
      default: brand.surface,
      paper: brand.white,
    },
    text: {
      primary: brand.ink,
      secondary: brand.muted,
    },
  },
  typography: {
    fontFamily: '"Manrope", "Segoe UI", sans-serif',
    h1: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
    },
    h2: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
    },
    h4: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
    },
    h5: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: '"Fraunces", Georgia, serif',
      fontWeight: 600,
    },
    button: {
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
  },
  shape: { borderRadius: 14 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 999,
          fontWeight: 700,
          boxShadow: "none",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: brand.primaryDark,
            boxShadow: "0 8px 24px rgba(139, 21, 56, 0.28)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: brand.surface,
          color: brand.ink,
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
      },
    },
  },
});

export default theme;
