// src/pages/Index.jsx
import React from "react";
import { Box } from "@mui/material";
import Home from "./Home";
import OurTeam from "./OurTeam";
import BloodGroup from "./BloodGroup";
import Donors from "./Donors";
import Footer from "./Footer";
import { brand } from "../constants/brand";

/** Homepage composition — forms & workflows remain on their existing routes */
export default function Index() {
  return (
    <Box sx={{ width: "100%" }}>
      <section id="home" aria-label="Home">
        <Home />
      </section>
      <section id="our-team" aria-label="Team">
        <Box sx={{ bgcolor: brand.surface }}>
          <OurTeam />
        </Box>
      </section>
      <section id="blood-group" aria-label="Blood groups">
        <Box sx={{ bgcolor: brand.white }}>
          <BloodGroup />
        </Box>
      </section>
      <section id="recent-donors" aria-label="Donor recognition">
        <Box sx={{ bgcolor: brand.surfaceAlt }}>
          <Donors />
        </Box>
      </section>
      <Footer />
    </Box>
  );
}
