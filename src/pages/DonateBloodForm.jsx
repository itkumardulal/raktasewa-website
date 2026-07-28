/*  src/pages/DonateBloodForm.jsx  */
import React, { useState } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Checkbox,
  FormControlLabel,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import Footer from "./Footer";
import { apiUrl } from "../config/api";
import { brand } from "../constants/brand";
import { usePersistentForm } from "../hooks/usePersistentForm";

const maroon = brand.primary;

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "I don't know",
];
const genders = ["Male", "Female", "Other"];

const INITIAL_DONATE_FORM = {
  name: "",
  age: "",
  gender: "",
  blood: "",
  email: "",
  phone: "",
  address: "",
  agree: false,
};

export default function DonateBloodForm() {
  const [form, setForm, resetForm] = usePersistentForm(
    "raktasewa_draft_donate_blood",
    INITIAL_DONATE_FORM
  );

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // { type: "success" | "error", text: "..." }

  const handleChange = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const handleCheck = (e) => setForm({ ...form, agree: e.target.checked });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(apiUrl("/donors/add"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name,
          age: form.age,
          gender: form.gender,
          blood_group: form.blood,
          email: form.email,
          phone_number: form.phone,
          address: form.address,
          agree_to_terms: form.agree,
          source: "website",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: data.message || "Thank you for donating!",
        });
        resetForm();
      } else {
        setMessage({
          type: "error",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Network error. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ my: 10 }}>
      <Paper
        elevation={0}
        sx={{
          mx: "auto",
          maxWidth: 480,
          borderRadius: 3,
          p: { xs: 3, sm: 5 },
          border: `1px solid ${brand.line}`,
          boxShadow: "0 12px 40px rgba(26, 21, 35, 0.06)",
        }}
      >
        {/* Success or Error Message */}
        {message && (
          <Alert severity={message.type} sx={{ mb: 3 }}>
            {message.text}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Typography
            variant="h5"
            sx={{ mb: 4, fontWeight: 700, textAlign: "center" }}
          >
            Please send us your details
          </Typography>

          <Stack spacing={3}>
            <TextField
              placeholder="Full Name"
              label="Full Name"
              value={form.name}
              onChange={handleChange("name")}
              fullWidth
            />

            <TextField
              placeholder="Age"
              label="Age"
              type="number"
              value={form.age}
              onChange={handleChange("age")}
              fullWidth
              slotProps={{
                input: { min: 0 }, // 👈 replace inputProps with slotProps.input
              }}
              onKeyDown={(e) => {
                if (["e", "E", "+", "-"].includes(e.key)) {
                  e.preventDefault();
                }
              }}
            />

            <FormControl fullWidth>
              <InputLabel>Gender</InputLabel>
              <Select
                label="Gender"
                value={form.gender}
                onChange={handleChange("gender")}
              >
                {genders.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Blood Group</InputLabel>
              <Select
                label="Blood Group"
                value={form.blood}
                onChange={handleChange("blood")}
              >
                {bloodGroups.map((g) => (
                  <MenuItem key={g} value={g}>
                    {g}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              placeholder="Email"
              label="Email"
              value={form.email}
              onChange={handleChange("email")}
              fullWidth
            />

            <TextField
              placeholder="Phone"
              label="Phone"
              value={form.phone}
              onChange={handleChange("phone")}
              fullWidth
            />

            <TextField
              placeholder="Address"
              label="Address"
              value={form.address}
              onChange={handleChange("address")}
              fullWidth
              multiline
              minRows={2}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={form.agree}
                  onChange={handleCheck}
                  size="small"
                />
              }
              label={
                <Typography variant="caption">
                  I agree to the collection and use of my personal information
                  for processing my blood donation request.
                </Typography>
              }
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={!form.agree || loading}
              sx={{
                py: 1.3,
                fontSize: "1rem",
                bgcolor: maroon,
                "&:hover": { bgcolor: "#d6342c" },
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "#fff" }} />
              ) : (
                "Be a Donor"
              )}
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Footer />
    </Container>
  );
}
