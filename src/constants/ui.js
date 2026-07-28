import { brand } from "./brand";

/** Shared card surface styles (design system) */
export const cardSx = {
  p: { xs: 2.5, sm: 3.25 },
  height: "100%",
  borderRadius: `${brand.radius}px`,
  border: `1px solid ${brand.line}`,
  boxShadow: brand.cardShadow,
  bgcolor: brand.white,
  transition: "transform 300ms ease, box-shadow 300ms ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: brand.cardShadowHover,
  },
};

export const iconBoxSx = {
  color: brand.primary,
  mb: 1.5,
  display: "inline-flex",
  "& .MuiSvgIcon-root": { fontSize: 22 },
};
