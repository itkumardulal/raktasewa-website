import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        py: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 NLT-AJX Company. All rights reserved.
      </Typography>
    </Box>
  );
}
