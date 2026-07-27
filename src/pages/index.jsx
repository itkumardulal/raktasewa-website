// src/pages/Index.jsx
import React from "react";
import { Box } from "@mui/material";
import Home from "./Home";
import AboutUs from "./AboutUs";
import OurTeam from "./OurTeam";
import BloodGroup from "./BloodGroup";
import Donors from "./Donors";
import Footer from "./Footer";
import { brand } from "../constants/brand";

export default function Index() {
  return (
    <Box sx={{ width: "100%" }}>
      <section id="home">
        <Home />
      </section>
      <section id="about-us">
        <Box sx={{ bgcolor: brand.white, py: { xs: 2, md: 3 } }}>
          <AboutUs />
        </Box>
      </section>
      <section id="our-team">
        <Box sx={{ bgcolor: brand.surface }}>
          <OurTeam />
        </Box>
      </section>
      <section id="blood-group">
        <Box sx={{ bgcolor: brand.white }}>
          <BloodGroup />
        </Box>
      </section>
      <section id="recent-donors">
        <Box sx={{ bgcolor: brand.surfaceAlt }}>
          <Donors />
        </Box>
      </section>
      <Footer />
    </Box>
  );
}
