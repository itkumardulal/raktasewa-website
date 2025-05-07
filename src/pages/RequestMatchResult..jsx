import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Paper,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function RequestMatchResult() {
  const { requestId, bloodGroup } = useParams();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/request/find/match`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              blood_group: bloodGroup,
              request_id: requestId,
            }),
          }
        );

        const data = await res.json();
        if (data.success) {
          setMatches(data.matches);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [requestId, bloodGroup]);

  const handleSubmit = async () => {
    if (!answer) return alert("Please select Yes or No");

    const status = answer === "yes" ? "new" : "unsettled";

    await fetch(`${import.meta.env.VITE_API_URL}/request/update/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: requestId, status }),
    });

    alert("Thank you! Your response has been saved.");
    window.close();
  };

  return (
    <Box
      sx={{
        p: 4,
        maxWidth: 800,
        mx: "auto",
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          letterSpacing: "2px", // space between letters
          fontFamily: "'Roboto Slab', serif", // change font (load via Google Fonts if needed)
          fontWeight: 700,
          textTransform: "uppercase", // optional: make it all caps
        }}
      >
        Donors Information
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : matches.length > 0 ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap", // ✅ wrap into rows
              justifyContent: "center", // ✅ center-align cards
              gap: 2, // ✅ space between cards
              mt: 3,
              mb: 4,
            }}
          >
            {matches.map((donor) => (
              <Paper
                key={donor.id}
                elevation={3}
                sx={{
                  p: 2,
                  textAlign: "left",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  width: { xs: "100%", sm: "45%", md: "60%" },
                  minWidth: 260,
                  maxWidth: 350,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Typography>
                    <strong>Name:</strong> {donor.fullname}
                  </Typography>
                  <Typography>
                    <strong>Phone:</strong> {donor.phone_number}
                  </Typography>
                  <Typography>
                    <strong>Blood Group:</strong> {donor.blood_group}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
                  {/* Call Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    color="primary"
                    href={`tel:${donor.phone_number}`}
                    sx={{
                      py: 1.2, // Vertical padding (increased height)
                      px: 2, // Horizontal padding (optional)
                    }}
                  >
                    Call <CallIcon fontSize="small" sx={{ ml: 1 }} />
                  </Button>

                  {/* WhatsApp Button */}
                  <Button
                    fullWidth
                    variant="outlined"
                    color="success"
                    href={`https://wa.me/${donor.phone_number.replace(
                      /[^0-9]/g,
                      ""
                    )}?text=${encodeURIComponent(
                      "Hi! I found your contact from the blood donation app. Are you available to donate blood?"
                    )}`}
                    target="_blank"
                    sx={{
                      py: 1.2, // Vertical padding (increased height)
                      px: 2, // Horizontal padding (optional)
                    }}
                  >
                    WhatsApp <WhatsAppIcon fontSize="small" sx={{ ml: 1 }} />
                  </Button>
                </Box>
              </Paper>
            ))}
          </Box>

          <hr style={{ marginBottom: "30px" }} />

          <FormControl sx={{ textAlign: "left", maxWidth: 400, mx: "auto" }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Did you successfully contact the donor?
            </Typography>
            <RadioGroup
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ mt: 3, width: "100%" }}
            >
              Submit Response
            </Button>
          </FormControl>
        </>
      ) : (
        <Typography>No matching donors found.</Typography>
      )}
    </Box>
  );
}
