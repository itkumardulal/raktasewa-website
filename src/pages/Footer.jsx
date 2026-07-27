import React from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";
import { brand } from "../constants/brand";

const partners = [
  { name: "Nepal Red Cross", logo: "/redcross.jpg" },
  { name: "APF: Armed Police Force", logo: "/apf.png" },
  { name: "Nepal Police", logo: "/polis.png" },
  { name: "Nepal Army", logo: "/army.png" },
  { name: "Sindhuli Multiple Campus", logo: "/multiple-campus.png" },
  { name: "Sindhuli Community Technical Institute", logo: "/sinhuli.jpg" },
  { name: "Nepal Leadership Technology Pvt. Ltd", logo: "/nlt.jpg" },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 0,
        py: { xs: 6, md: 8 },
        px: 2,
        textAlign: "center",
        background: `linear-gradient(180deg, ${brand.surfaceAlt} 0%, #ebe4e7 100%)`,
        borderTop: `1px solid ${brand.line}`,
      }}
    >
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontFamily: "Fraunces, Georgia, serif", color: brand.ink }}
      >
        Our Partners
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 420, mx: "auto" }}>
        Trusted institutions helping us connect donors and patients faster.
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 4, maxWidth: 900, mx: "auto" }}
      >
        {partners.map((partner, index) => (
          <Grid item key={index}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={partner.logo}
                alt={partner.name}
                sx={{
                  width: 64,
                  height: 64,
                  mb: 1,
                  bgcolor: brand.white,
                  border: `1px solid ${brand.line}`,
                }}
              />
              <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 120 }}>
                {partner.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Typography variant="body2" color="text.secondary">
        © 2025 NLT-AJX Company. All rights reserved.
      </Typography>
    </Box>
  );
}
