import { Box, Typography } from "@mui/material";

/** Shared section header — eyebrow + heading + short description */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  id,
  light = false,
  component = "h2",
  variant = "h2",
}) {
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 4, md: 5 },
        maxWidth: 720,
        mx: align === "center" ? "auto" : 0,
        px: 1,
      }}
    >
      {eyebrow ? (
        <Typography
          className="eyebrow"
          component="p"
          sx={{
            mb: 1.5,
            ...(light ? { color: "rgba(255,255,255,0.85)" } : null),
          }}
        >
          {eyebrow}
        </Typography>
      ) : null}
      <Typography
        id={id}
        variant={variant}
        component={component}
        sx={{
          mb: subtitle ? 2.5 : 0,
          ...(light ? { color: "#fff" } : null),
          ...(component === "h1"
            ? {
                fontSize: { xs: "2rem", md: "2.625rem" },
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.15,
              }
            : null),
        }}
      >
        {title}
      </Typography>
      {subtitle ? (
        <Typography
          className="readable"
          sx={{
            color: light ? "rgba(255,255,255,0.9)" : "text.secondary",
            fontSize: { xs: "1.05rem", md: "1.125rem" },
            lineHeight: 1.8,
            mx: align === "center" ? "auto" : 0,
            textAlign: align,
          }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
}
