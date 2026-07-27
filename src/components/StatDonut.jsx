import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Paper, Typography } from "@mui/material";
import { brand } from "../constants/brand";

/** Donut with animated arc + centred value */
export default function StatDonut({
  label,
  value,
  updatedAt = "April 26, 2025",
}) {
  const data = [
    { id: 0, value, color: brand.primary },
    { id: 1, value: Math.max(100 - Number(value || 0), 0), color: "#EAD6DB" },
  ];

  return (
    <Paper
      elevation={0}
      sx={{
        textAlign: "center",
        p: 2.5,
        borderRadius: 3,
        border: `1px solid ${brand.line}`,
        bgcolor: brand.white,
        width: "100%",
        maxWidth: 220,
      }}
    >
      <Typography variant="subtitle2" fontWeight={700}>
        {label}
      </Typography>

      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ display: "block", mb: 1 }}
      >
        Last updated on : {updatedAt}
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: 140,
          height: 140,
          mx: "auto",
        }}
      >
        <PieChart
          series={[
            {
              data,
              innerRadius: 38,
              outerRadius: 60,
              startAngle: -90,
              endAngle: 270,
              paddingAngle: 0,
            },
          ]}
          width={140}
          height={140}
          slotProps={{ legend: { hidden: true } }}
        />

        <Typography
          variant="h6"
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            fontWeight: 700,
            color: brand.primary,
          }}
        >
          {value}
        </Typography>
      </Box>

      <Typography variant="caption" color="text.secondary">
        based on number of blood supply requests
      </Typography>
    </Paper>
  );
}
