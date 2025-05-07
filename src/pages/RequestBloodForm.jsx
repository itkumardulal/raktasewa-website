/*  src/pages/RequestBloodForm.jsx  */
import React, { useState } from "react";
import Swal from "sweetalert2";

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

const maroon = "#ff3b30";

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
const urgencyLevels = [
  "Emergency (Within 1 hour)",
  "Critical (Within 6 hours)",
  "Needed by Today",
  "Standard Request",
];
const yesNoOptions = ["Yes", "No"];

export default function RequestBloodForm() {
  const [form, setForm] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    patientBloodGroup: "",
    reason: "",
    amount: "",
    urgency: "",
    requiredDateTime: "",
    hospitalName: "",
    hospitalAddress: "",
    cityDistrict: "",
    contactPerson: "",
    requesterName: "",
    requesterPhone: "",
    altPhone: "",
    requesterEmail: "",
    willingToReplace: "",
    specialNote: "",
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const handleCheck = (e) => setForm({ ...form, agree: e.target.checked });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/request/blood`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patient_name: form.patientName,
          patient_age: form.patientAge,
          patient_gender: form.patientGender,
          patient_blood_group: form.patientBloodGroup,
          reason_for_request: form.reason,
          blood_amount_needed: form.amount,
          urgency_level: form.urgency,
          required_datetime: form.requiredDateTime,
          hospital_name: form.hospitalName,
          hospital_address: form.hospitalAddress,
          city_district: form.cityDistrict,
          contact_person_at_hospital: form.contactPerson,
          requester_name: form.requesterName,
          requester_phone: form.requesterPhone,
          requester_alt_phone: form.altPhone,
          requester_email: form.requesterEmail,
          willing_to_replace: form.willingToReplace,
          special_note: form.specialNote,
          agree_to_terms: form.agree ? 1 : 0,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: "Request submitted successfully!",
        });
        setForm({
          patientName: "",
          patientAge: "",
          patientGender: "",
          patientBloodGroup: "",
          reason: "",
          amount: "",
          urgency: "",
          requiredDateTime: "",
          hospitalName: "",
          hospitalAddress: "",
          cityDistrict: "",
          contactPerson: "",
          requesterName: "",
          requesterPhone: "",
          altPhone: "",
          requesterEmail: "",
          willingToReplace: "",
          specialNote: "",
          agree: false,
        });

        // Swal.fire({
        //   title: "Finding matches...",
        //   text: "Please wait while we find matching donors for you.",
        //   allowOutsideClick: false,
        //   allowEscapeKey: false,
        //   didOpen: () => {
        //     Swal.showLoading();
        //   },
        // });

        // ✅ Open match result page in new tab
        const url = `/match-result/${data.id}/${form.patientBloodGroup}`;
        window.open(url, "_blank");

        // const matchRes = await fetch(
        //   `${import.meta.env.VITE_API_URL}/request/find/match`,
        //   {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify({
        //       blood_group: form.patientBloodGroup,
        //       request_id: data.id, // 👈 pass the request ID
        //     }),
        //   }
        // ).then((res) => res.json());

        // setTimeout(() => {
        //   Swal.close(); // 👈 MUST close loading first

        //   if (matchRes.success && matchRes.matches.length > 0) {
        //     const donorListHtml = matchRes.matches
        //       .map((donor) => {
        //         const cleanNumber = donor.phone_number.replace(/[^0-9]/g, ""); // Remove spaces/dashes
        //         return `
        //         <div style="text-align:left;margin-bottom:20px;">

        //           <strong>Name:</strong> ${donor.fullname}<br/>

        //           <strong>Phone:</strong>
        //           <a
        //             href="https://wa.me/${cleanNumber}?text=${encodeURIComponent(
        //           "Hi! I found your contact from the blood donation app. Are you available to donate blood?"
        //         )}"
        //             target="_blank"
        //             style="text-decoration:none;color:inherit;display:inline-flex;align-items:center;gap:6px;"
        //           >
        //             ${donor.phone_number}
        //             <img
        //               src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        //               alt="WhatsApp"
        //               width="30"
        //               height="30"
        //               style="vertical-align:middle;"
        //             />
        //           </a><br/>

        //           <strong>Blood Group:</strong> ${donor.blood_group}
        //         </div>
        //       `;
        //       })
        //       .join("");

        //     Swal.fire({
        //       title: "You have a match!",
        //       html: `
        //           <div style="
        //             max-height: 400px;
        //             overflow-y: auto;
        //             padding-right: 10px;
        //             text-align: left;
        //             scrollbar-width: none; /* Firefox */
        //             -ms-overflow-style: none; /* IE and Edge */
        //           "
        //           class="custom-scroll">
        //             ${donorListHtml}
        //           </div>
        //           <style>
        //             .custom-scroll::-webkit-scrollbar {
        //               display: none; /* Chrome, Safari */
        //             }
        //           </style>
        //         `,
        //       icon: "success",
        //       width: 600,
        //       showConfirmButton: true,
        //       confirmButtonText: "OK",
        //     });
        //   } else {
        //     Swal.fire({
        //       title: "No Matching Donors Found",
        //       html: `
        //         <p>
        //           We're sorry, there are currently no available donors matching the requested blood group.
        //         </p>
        //         <p>
        //           We've added your request to our <strong>waitlist</strong>.
        //           You'll be notified as soon as a matching donor becomes available.
        //         </p>
        //       `,
        //       icon: "info",
        //       confirmButtonText: "OK",
        //     });
        //   }
        // }, 2000); // 2 seconds delay
      } else {
        setMessage({
          type: "error",
          text: data.message || "Submission failed.",
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
    <Container maxWidth="lg" sx={{ my: 8 }}>
      <Paper
        elevation={6}
        sx={{
          mx: "auto",
          borderRadius: 3,
          p: { xs: 3, sm: 5 },
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* ✅ Message Box */}
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
            Request Blood Form
          </Typography>

          {/* Two Column Layout */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {/* LEFT COLUMN */}
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                1. Patient Information
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Patient Name"
                  value={form.patientName}
                  onChange={handleChange("patientName")}
                  fullWidth
                />
                <TextField
                  label="Age"
                  type="number"
                  value={form.patientAge}
                  onChange={handleChange("patientAge")}
                  fullWidth
                  slotProps={{ input: { min: 0 } }}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <FormControl fullWidth>
                  <InputLabel>Patient Gender</InputLabel>
                  <Select
                    label="Patient Gender"
                    value={form.patientGender}
                    onChange={handleChange("patientGender")}
                  >
                    {genders.map((g) => (
                      <MenuItem key={g} value={g}>
                        {g}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel>Patient Blood Group</InputLabel>
                  <Select
                    label="Patient Blood Group"
                    value={form.patientBloodGroup}
                    onChange={handleChange("patientBloodGroup")}
                    required
                  >
                    {bloodGroups.map((b) => (
                      <MenuItem key={b} value={b}>
                        {b}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Reason for Blood Request"
                  value={form.reason}
                  onChange={handleChange("reason")}
                  fullWidth
                  multiline
                  minRows={2}
                />
              </Stack>
            </Box>

            {/* RIGHT COLUMN */}
            <Box sx={{ flex: 1, minWidth: 280 }}>
              <Typography variant="subtitle1" fontWeight={600} mb={2}>
                2. Request Details
              </Typography>

              <Stack spacing={2}>
                <TextField
                  label="Amount of Blood Needed"
                  value={form.amount}
                  onChange={handleChange("amount")}
                  fullWidth
                />
                <FormControl fullWidth>
                  <InputLabel>Urgency Level</InputLabel>
                  <Select
                    label="Urgency Level"
                    value={form.urgency}
                    onChange={handleChange("urgency")}
                  >
                    {urgencyLevels.map((u) => (
                      <MenuItem key={u} value={u}>
                        {u}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Required Date and Time"
                  type="datetime-local"
                  value={form.requiredDateTime}
                  onChange={handleChange("requiredDateTime")}
                  fullWidth
                  slotProps={{
                    inputLabel: { shrink: true },
                  }}
                />
                <TextField
                  label="Hospital Name"
                  value={form.hospitalName}
                  onChange={handleChange("hospitalName")}
                  fullWidth
                />
                <TextField
                  label="Hospital Address"
                  value={form.hospitalAddress}
                  onChange={handleChange("hospitalAddress")}
                  fullWidth
                />
                <TextField
                  label="City / District"
                  value={form.cityDistrict}
                  onChange={handleChange("cityDistrict")}
                  fullWidth
                />
                <TextField
                  label="Contact Person at Hospital"
                  value={form.contactPerson}
                  onChange={handleChange("contactPerson")}
                  fullWidth
                />
              </Stack>
            </Box>
          </Box>

          {/* 3. Requester's Contact Info + Additional */}
          <Box sx={{ mt: 6 }}>
            <Typography variant="subtitle1" fontWeight={600} mb={2}>
              3. Requester's Contact Information
            </Typography>

            <Stack spacing={2}>
              <TextField
                label="Your Name (Requester)"
                value={form.requesterName}
                onChange={handleChange("requesterName")}
                fullWidth
              />
              <TextField
                label="Phone Number"
                value={form.requesterPhone}
                onChange={handleChange("requesterPhone")}
                fullWidth
              />
              <TextField
                label="Alternative Contact Number"
                value={form.altPhone}
                onChange={handleChange("altPhone")}
                fullWidth
              />
              <TextField
                label="Email Address"
                value={form.requesterEmail}
                onChange={handleChange("requesterEmail")}
                fullWidth
              />
            </Stack>

            <Typography variant="subtitle1" fontWeight={600} sx={{ mt: 4 }}>
              4. Additional Optional Fields
            </Typography>

            <Stack spacing={2} sx={{ mt: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Willing to Replace Blood Later?</InputLabel>
                <Select
                  label="Willing to Replace"
                  value={form.willingToReplace}
                  onChange={handleChange("willingToReplace")}
                >
                  {yesNoOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Special Note"
                value={form.specialNote}
                onChange={handleChange("specialNote")}
                fullWidth
                multiline
                minRows={2}
              />
            </Stack>
          </Box>

          {/* Agreement & Submit */}
          <Stack spacing={2} sx={{ mt: 4 }}>
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
                  for processing my blood request.
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
                "Request for Blood"
              )}
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Footer />
    </Container>
  );
}
