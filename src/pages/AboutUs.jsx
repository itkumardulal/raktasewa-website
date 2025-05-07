/*  src/pages/AboutUs.jsx  */
import React from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link as RouterLink } from "react-router-dom"; // make sure this import is present

const maroon = "#800000";
const pinkBg = "#ffe9e9";

/* ───────────────────── 1. TESTIMONIAL ───────────────────── */
function Testimonial() {
  return (
    <Box sx={{ bgcolor: pinkBg, py: 4, borderRadius: 2 }}>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: 3,
          }}
        >
          <Avatar
            src="https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600nw-2481032615.jpg"
            sx={{
              width: 150,
              height: 150,
              mx: "auto",
              border: "4px solid #d7d7d7",
            }}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
              Emergency Blood Provider is a website that helps you feel better
              or get medical help anytime. Their blood-donor service was so
              convenient — saved me!
            </Typography>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2">Kumar Dulal</Typography>
              <Typography variant="caption" color="text.secondary">
                Patient · Blood Recipient
              </Typography>
            </Box>
          </Box>

          {/* arrow on desktop only */}
          <IconButton
            sx={{
              display: { xs: "none", sm: "flex" },
              alignSelf: "flex-start",
            }}
          >
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}

/* ───────────────────── 2. FEATURE ONE ───────────────────── */
function FeatureOne() {
  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {/* round image */}
        <Box
          sx={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            overflow: "hidden",
            border: `6px solid ${maroon}`,
            mx: "auto",
            flexShrink: 0,
          }}
        >
          <img
            src="https://st5.depositphotos.com/89887658/74340/v/450/depositphotos_743402710-stock-illustration-blood-types-diagram-blood-transfusion.jpg"
            alt="Blood types"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>

        {/* text */}
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Blood Groups Compatibility
          </Typography>
          <Typography variant="body2" paragraph color="text.secondary">
            Our system quickly checks donor / recipient blood-type compatibility
            to avoid any transfusion risk and save you precious time.
          </Typography>

          <Button
            component={RouterLink}
            to="/blood-group"
            variant="contained"
            sx={{
              bgcolor: maroon,
              color: "#fff", // Text is white normally
              "&:hover": {
                bgcolor: "#6a0000", // Darker background on hover
                color: "#fff", // Keep text white on hover
              },
              textDecoration: "none",
            }}
          >
            Learn More
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

/* ───────────────────── 3. FEATURE TWO ───────────────────── */
function FeatureTwo() {
  return (
    <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 12 }, mb: 10 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column-reverse", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 6,
        }}
      >
        {/* text */}
        <Box sx={{ maxWidth: 400 }}>
          <Typography variant="h6" gutterBottom>
            Find the right donor nearby…
          </Typography>

          <Stack spacing={1} sx={{ color: "text.secondary", mb: 3 }}>
            <Typography variant="body2">
              • Real-time donor availability
            </Typography>
            <Typography variant="body2">
              • Geo-based search within 10 km radius
            </Typography>
            <Typography variant="body2">
              • Instant chat with verified donors
            </Typography>
          </Stack>

          <Button
            component={RouterLink}
            to="/donate-blood-form"
            variant="contained"
            sx={{
              bgcolor: maroon,
              color: "#fff", // Text is white normally
              "&:hover": {
                bgcolor: "#6a0000", // Darker background on hover
                color: "#fff", // Keep text white on hover
              },
              textDecoration: "none",
            }}
          >
            Donate Blood
          </Button>
        </Box>

        {/* doctor half-circle */}
        <Box
          sx={{
            position: "relative",
            width: 300,
            height: 300,
            mx: "auto",
            overflow: "hidden",
            borderBottomLeftRadius: 300,
            borderBottomRightRadius: 300,
            bgcolor: maroon,
          }}
        >
          <img
            src="https://www.shutterstock.com/image-vector/male-doctor-smiling-happy-face-600nw-2481032615.jpg"
            alt="Doctor"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "110%",
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

/* ─────────────────────  PAGE  ───────────────────── */
export default function AboutUs() {
  return (
    <Box sx={{ textAlign: "center", mt: 6 }}>
      <Typography variant="h6">Our patients feedback about us</Typography>
      <Typography variant="caption" color="text.secondary">
        Real testimonials from people we’ve helped
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Testimonial />
      </Box>

      <FeatureOne />
      <FeatureTwo />
    </Box>
  );
}
