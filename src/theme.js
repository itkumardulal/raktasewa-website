import { createTheme } from "@mui/material/styles";
import { brand } from "./constants/brand";

const fontHeading =
  '"Manrope", "Inter", "Noto Sans Devanagari", "Mukta", system-ui, sans-serif';
const fontBody =
  '"Inter", "Manrope", "Noto Sans Devanagari", "Mukta", system-ui, sans-serif';

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
      main: brand.secondary,
      contrastText: brand.white,
    },
    background: {
      default: brand.surface,
      paper: brand.white,
    },
    text: {
      primary: brand.ink,
      secondary: brand.body,
    },
    divider: brand.line,
  },
  typography: {
    fontFamily: fontBody,
    fontSize: 16,
    htmlFontSize: 16,
    h1: {
      fontFamily: fontHeading,
      fontWeight: 800,
      fontSize: "clamp(2.25rem, 4vw, 4rem)",
      letterSpacing: "-0.04em",
      lineHeight: 1.05,
      color: brand.ink,
    },
    h2: {
      fontFamily: fontHeading,
      fontWeight: 700,
      fontSize: "clamp(1.75rem, 3vw, 2.625rem)",
      letterSpacing: "-0.03em",
      lineHeight: 1.2,
      color: brand.ink,
    },
    h3: {
      fontFamily: fontHeading,
      fontWeight: 700,
      fontSize: "clamp(1.5rem, 2.4vw, 1.875rem)",
      letterSpacing: "-0.02em",
      lineHeight: 1.25,
      color: brand.ink,
    },
    h4: {
      fontFamily: fontHeading,
      fontWeight: 600,
      fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
      letterSpacing: "-0.02em",
      lineHeight: 1.3,
      color: brand.ink,
    },
    h5: {
      fontFamily: fontHeading,
      fontWeight: 700,
      fontSize: "1.25rem",
      letterSpacing: "-0.02em",
      lineHeight: 1.35,
      color: brand.ink,
    },
    h6: {
      fontFamily: fontHeading,
      fontWeight: 700,
      fontSize: "1.125rem",
      letterSpacing: "-0.01em",
      lineHeight: 1.4,
      color: brand.ink,
    },
    subtitle1: {
      fontFamily: fontBody,
      fontWeight: 500,
      fontSize: "1.125rem",
      lineHeight: 1.7,
      color: brand.body,
    },
    subtitle2: {
      fontFamily: fontBody,
      fontWeight: 500,
      fontSize: "0.9375rem",
      lineHeight: 1.6,
      color: brand.muted,
    },
    body1: {
      fontFamily: fontBody,
      fontWeight: 400,
      fontSize: "1.125rem",
      lineHeight: 1.8,
      color: brand.body,
    },
    body2: {
      fontFamily: fontBody,
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.75,
      color: brand.body,
    },
    caption: {
      fontFamily: fontBody,
      fontWeight: 500,
      fontSize: "0.9375rem",
      lineHeight: 1.6,
      color: brand.muted,
    },
    overline: {
      fontFamily: fontHeading,
      fontWeight: 700,
      fontSize: "0.75rem",
      letterSpacing: "0.12em",
      lineHeight: 1.5,
      textTransform: "uppercase",
      color: brand.primary,
    },
    button: {
      fontFamily: fontHeading,
      fontWeight: 700,
      letterSpacing: "-0.01em",
      textTransform: "none",
    },
  },
  shape: { borderRadius: brand.radiusBtn },
  shadows: [
    "none",
    "0 1px 2px rgba(15,23,42,0.04)",
    "0 4px 12px rgba(15,23,42,0.06)",
    brand.cardShadow,
    brand.cardShadow,
    brand.cardShadow,
    brand.cardShadowHover,
    ...Array(18).fill(brand.cardShadow),
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: brand.surface,
          color: brand.body,
          fontFamily: fontBody,
        },
        "html[lang='ne'] body, html[lang='ne']": {
          fontFamily:
            '"Noto Sans Devanagari", "Mukta", "Inter", "Manrope", system-ui, sans-serif',
        },
        "html[lang='ne'] h1, html[lang='ne'] h2, html[lang='ne'] h3, html[lang='ne'] h4, html[lang='ne'] h5, html[lang='ne'] h6":
          {
            fontFamily:
              '"Noto Sans Devanagari", "Mukta", "Manrope", system-ui, sans-serif',
          },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        "p, .prose": {
          maxWidth: "42rem",
        },
        ":focus-visible": {
          outline: `2px solid ${brand.primary}`,
          outlineOffset: 2,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: brand.radiusBtn,
          fontWeight: 700,
          minHeight: 48,
          paddingLeft: 22,
          paddingRight: 22,
          transition:
            "transform 300ms ease, box-shadow 300ms ease, background-color 300ms ease, border-color 300ms ease",
          "&:hover": {
            transform: "translateY(-1px)",
          },
          "&.MuiButton-sizeLarge": {
            minHeight: 52,
            paddingLeft: 26,
            paddingRight: 26,
            fontSize: "1rem",
          },
        },
        containedPrimary: {
          boxShadow: "0 6px 20px rgba(183, 28, 28, 0.22)",
          "&:hover": {
            backgroundColor: brand.primaryDark,
            boxShadow: "0 10px 28px rgba(183, 28, 28, 0.28)",
          },
        },
        outlinedPrimary: {
          borderWidth: 1.5,
          borderColor: brand.primary,
          "&:hover": {
            borderWidth: 1.5,
            backgroundColor: brand.accentSoft,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
          borderRadius: brand.radius,
        },
        elevation0: {
          border: `1px solid ${brand.line}`,
        },
        elevation1: {
          boxShadow: brand.cardShadow,
          border: `1px solid ${brand.line}`,
        },
        elevation3: {
          boxShadow: brand.cardShadow,
          border: `1px solid ${brand.line}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: brand.radius,
          border: `1px solid ${brand.line}`,
          boxShadow: brand.cardShadow,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 16,
          paddingRight: 16,
          "@media (min-width: 600px)": {
            paddingLeft: 24,
            paddingRight: 24,
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          transition: "color 200ms ease",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundColor: brand.white,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
  },
});

export default theme;
