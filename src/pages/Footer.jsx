import React from "react";
import { Box, Typography, Grid, Avatar } from "@mui/material";

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
        mt: 8,
        py: 6,
        px: 2,
        textAlign: "center",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Our Partners
      </Typography>

      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{ mb: 4 }}
      >
        {partners.map((partner, index) => (
          <Grid item key={index}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Avatar
                src={partner.logo}
                alt={partner.name}
                sx={{ width: 56, height: 56, mb: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
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
