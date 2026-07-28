import { brand } from "./brand";

/** Shared card surface — tighter on mobile, keeps page side gutters via Container */
export const cardSx = {
  p: { xs: 1.5, sm: 2.25, md: 2.75 },
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

/** Form shell Paper — compact on phones, readable on desktop */
export const formPaperSx = {
  mx: "auto",
  borderRadius: 3,
  p: { xs: 1.75, sm: 3, md: 4 },
  border: `1px solid ${brand.line}`,
  boxShadow: "0 12px 40px rgba(26, 21, 35, 0.06)",
};

export const iconBoxSx = {
  color: brand.primary,
  mb: 1.25,
  display: "inline-flex",
  "& .MuiSvgIcon-root": { fontSize: 22 },
};
