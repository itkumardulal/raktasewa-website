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
import { apiUrl } from "../config/api";
import DonorContactActions from "../components/DonorContactActions";
import { usePersistentValue } from "../hooks/usePersistentForm";

export default function RequestMatchResult() {
  const { requestId, bloodGroup } = useParams();
  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState([]);
  const [answer, setAnswer, clearAnswer] = usePersistentValue(
    `raktasewa_draft_match_answer_${requestId || "unknown"}`,
    ""
  );

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(apiUrl("/request/find/match"), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blood_group: bloodGroup,
            request_id: requestId,
          }),
        });

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

    await fetch(apiUrl("/request/update/status"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request_id: requestId, status }),
    });

    clearAnswer();
    alert("Thank you! Your response has been saved.");
    window.close();
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3, md: 4 },
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
                  p: { xs: 1.5, sm: 2 },
                  textAlign: "left",
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  width: { xs: "100%", sm: "45%", md: "60%" },
                  minWidth: 0,
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

                <DonorContactActions
                  phone={donor.phone_number}
                  donorName={donor.fullname}
                />
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
