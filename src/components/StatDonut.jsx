import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PieChart } from "@mui/x-charts/PieChart";
import { brand } from "../constants/brand";

/** Live snapshot card — always compact & centered-friendly on mobile */
export default function StatDonut({
  label,
  value,
  updatedAt = "April 26, 2025",
  basedOnLabel = "Live network data",
  lastUpdatedLabel = "Updated",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const chartSize = isMobile ? 72 : isTablet ? 100 : 128;
  const innerRadius = isMobile ? 22 : isTablet ? 30 : 36;
  const outerRadius = isMobile ? 32 : isTablet ? 44 : 54;

  const data = [
    { id: 0, value, color: brand.primary },
    { id: 1, value: Math.max(100 - Number(value || 0), 0), color: brand.accentSoft },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        textAlign: "center",
        p: { xs: 1, sm: 1.75, md: 2.5 },
        borderRadius: { xs: "12px", md: `${brand.radius}px` },
        border: `1px solid ${brand.line}`,
        bgcolor: brand.white,
        width: "100%",
        height: "100%",
        maxWidth: { xs: "100%", sm: 200, md: 240 },
        mx: "auto",
        boxShadow: brand.cardShadow,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        transition: "transform 300ms ease, box-shadow 300ms ease",
        "&:hover": {
          transform: { xs: "none", md: "translateY(-4px)" },
          boxShadow: { xs: brand.cardShadow, md: brand.cardShadowHover },
        },
      }}
    >
      <Typography
        sx={{
          fontWeight: 700,
          color: brand.ink,
          letterSpacing: "-0.01em",
          fontSize: { xs: "0.7rem", sm: "0.85rem", md: "0.9375rem" },
          lineHeight: 1.2,
          px: 0.25,
          minHeight: { xs: "2.4em", sm: "auto" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          display: "block",
          mb: { xs: 0.5, md: 1 },
          mt: 0.25,
          color: brand.muted,
          fontSize: { xs: "0.58rem", sm: "0.7rem", md: "0.78rem" },
          lineHeight: 1.25,
          fontWeight: 500,
        }}
      >
        {lastUpdatedLabel} {updatedAt}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: chartSize,
          height: chartSize,
          mx: "auto",
          flexShrink: 0,
        }}
      >
        <PieChart
          series={[
            {
              data,
              innerRadius,
              outerRadius,
              startAngle: -90,
              endAngle: 270,
              paddingAngle: 0,
            },
          ]}
          width={chartSize}
          height={chartSize}
          slotProps={{ legend: { hidden: true } }}
        />

        <Typography
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            fontFamily: '"Manrope", "Inter", sans-serif',
            fontWeight: 800,
            fontSize: { xs: "1.1rem", sm: "1.4rem", md: "1.75rem" },
            letterSpacing: "-0.04em",
            color: brand.primary,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Box>

      {/* Short caption — hidden on very small screens to save space */}
      <Typography
        sx={{
          display: { xs: "none", sm: "block" },
          mt: { sm: 0.75, md: 1.25 },
          color: brand.muted,
          fontSize: { sm: "0.68rem", md: "0.8rem" },
          lineHeight: 1.35,
          fontWeight: 500,
          px: 0.25,
        }}
      >
        {basedOnLabel}
      </Typography>
    </Paper>
  );
}
