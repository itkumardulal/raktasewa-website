/*  src/pages/RecentDonors.jsx  */
import React from "react";
import { Container, Box, Paper, Avatar, Typography } from "@mui/material";

const maroon = "#800000";

/* Replace with real data / API */
const donors = [
  {
    name: "Sita Rai",
    bloodType: "A+",
    date: "26 Apr 2025",
    img: "/user.jpg",
  },
  {
    name: "Ramesh Thapa",
    bloodType: "O-",
    date: "25 Apr 2025",
    img: "/user.jpg",
  },
  {
    name: "Maya Gurung",
    bloodType: "B+",
    date: "24 Apr 2025",
    img: "/user.jpg",
  },
  {
    name: "Bikash Shrestha",
    bloodType: "AB-",
    date: "23 Apr 2025",
    img: "/user.jpg",
  },
  {
    name: "Anjali Lama",
    bloodType: "O+",
    date: "22 Apr 2025",
    img: "/user.jpg",
  },
  {
    name: "Dipesh Karki",
    bloodType: "A-",
    date: "21 Apr 2025",
    img: "/user.jpg",
  },
];

export default function RecentDonors() {
  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h5" align="center" sx={{ mb: 4, fontWeight: 700 }}>
        Recent&nbsp;Donors
      </Typography>

      {/* flexbox wrapper (replaces Grid) */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4, // row + column gap (32 px)
        }}
      >
        {donors.map(({ name, bloodType, date, img }) => (
          <Paper
            key={name}
            elevation={1}
            sx={{
              flexBasis: { xs: "100%", sm: "47%", md: "30%" }, // 1 / 2 / 3 per row
              maxWidth: 360,
              p: 3,
              textAlign: "center",
              borderRadius: 2,
            }}
          >
            {/* avatar with maroon border */}
            <Box
              sx={{
                width: 140,
                height: 140,
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                overflow: "hidden",
                border: `4px solid ${maroon}`,
              }}
            >
              <Avatar
                src={img}
                alt={name}
                sx={{ width: "100%", height: "100%" }}
              />
            </Box>

            <Typography variant="subtitle1" fontWeight={600}>
              {name}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Blood Type&nbsp;•&nbsp;<b>{bloodType}</b>
            </Typography>

            <Typography variant="caption" color="text.secondary">
              Donated on {date}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
