import { Box, Paper, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import { brand } from "../constants/brand";

/** Live snapshot card — design polish only */
export default function StatDonut({
  label,
  value,
  updatedAt = "April 26, 2025",
  basedOnLabel = "based on number of blood supply requests",
  lastUpdatedLabel = "Last updated on",
}) {
  const data = [
    { id: 0, value, color: brand.primary },
    { id: 1, value: Math.max(100 - Number(value || 0), 0), color: brand.accentSoft },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        textAlign: "center",
        p: { xs: 2.5, sm: 3 },
        borderRadius: `${brand.radius}px`,
        border: `1px solid ${brand.line}`,
        bgcolor: brand.white,
        width: "100%",
        maxWidth: 240,
        boxShadow: brand.cardShadow,
        transition: "transform 300ms ease, box-shadow 300ms ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: brand.cardShadowHover,
        },
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{ fontWeight: 700, color: brand.ink, letterSpacing: "-0.01em" }}
      >
        {label}
      </Typography>

      <Typography
        variant="caption"
        sx={{ display: "block", mb: 1.5, mt: 0.5, color: brand.muted, fontSize: "0.8rem" }}
      >
        {lastUpdatedLabel} : {updatedAt}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: 132,
          height: 132,
          mx: "auto",
        }}
      >
        <PieChart
          series={[
            {
              data,
              innerRadius: 36,
              outerRadius: 56,
              startAngle: -90,
              endAngle: 270,
              paddingAngle: 0,
            },
          ]}
          width={132}
          height={132}
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
            fontSize: "1.75rem",
            letterSpacing: "-0.04em",
            color: brand.primary,
            lineHeight: 1,
          }}
        >
          {value}
        </Typography>
      </Box>

      <Typography variant="caption" sx={{ display: "block", mt: 1.5, color: brand.muted }}>
        {basedOnLabel}
      </Typography>
    </Paper>
  );
}
