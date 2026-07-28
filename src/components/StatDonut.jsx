import { Box, Paper, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { PieChart } from "@mui/x-charts/PieChart";
import { brand } from "../constants/brand";

/** Live snapshot card — compact on mobile, full on desktop */
export default function StatDonut({
  label,
  value,
  updatedAt = "April 26, 2025",
  basedOnLabel = "based on number of blood supply requests",
  lastUpdatedLabel = "Last updated on",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const chartSize = isMobile ? 88 : isTablet ? 110 : 132;
  const innerRadius = isMobile ? 26 : isTablet ? 32 : 36;
  const outerRadius = isMobile ? 38 : isTablet ? 48 : 56;

  const data = [
    { id: 0, value, color: brand.primary },
    { id: 1, value: Math.max(100 - Number(value || 0), 0), color: brand.accentSoft },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        textAlign: "center",
        p: { xs: 1.5, sm: 2, md: 2.75 },
        borderRadius: { xs: "14px", md: `${brand.radius}px` },
        border: `1px solid ${brand.line}`,
        bgcolor: brand.white,
        width: "100%",
        maxWidth: { xs: 156, sm: 200, md: 240 },
        minHeight: { xs: "auto", md: 280 },
        boxShadow: brand.cardShadow,
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
          fontSize: { xs: "0.8rem", sm: "0.875rem", md: "0.9375rem" },
          lineHeight: 1.25,
          px: 0.25,
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          display: "block",
          mb: { xs: 0.75, md: 1.25 },
          mt: 0.35,
          color: brand.muted,
          fontSize: { xs: "0.65rem", sm: "0.72rem", md: "0.8rem" },
          lineHeight: 1.35,
          fontWeight: 500,
        }}
      >
        {lastUpdatedLabel}: {updatedAt}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: chartSize,
          height: chartSize,
          mx: "auto",
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
            fontSize: { xs: "1.25rem", sm: "1.5rem", md: "1.75rem" },
            letterSpacing: "-0.04em",
            color: brand.primary,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Box>

      <Typography
        sx={{
          display: "block",
          mt: { xs: 0.75, md: 1.25 },
          color: brand.muted,
          fontSize: { xs: "0.62rem", sm: "0.72rem", md: "0.8125rem" },
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
