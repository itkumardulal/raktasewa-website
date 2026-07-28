import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { brand } from "../constants/brand";
import { apiUrl } from "../config/api";
import DonorTierBadge from "../components/DonorTierBadge";
import DonorRecognitionPanel from "../components/DonorRecognitionPanel";
import { getDonorTier } from "../utils/donorTier";

function formatDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function StatTile({ icon, label, value }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 1.5, sm: 2 },
        height: "100%",
        borderRadius: 3,
        border: `1px solid ${brand.line}`,
        background: `linear-gradient(160deg, ${brand.primary}08, transparent 55%)`,
      }}
    >
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: `${brand.primary}14`,
            color: brand.primary,
          }}
        >
          {icon}
        </Box>
        <Typography variant="body2" color="text.secondary">
          {label}
        </Typography>
      </Stack>
      <Typography variant="h5" fontWeight={700} sx={{ letterSpacing: "-0.02em" }}>
        {value}
      </Typography>
    </Paper>
  );
}

export default function DonorProfile() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [donor, setDonor] = useState(null);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl(`/public/donors/${id}`));
        const data = await res.json();
        if (!cancelled) {
          if (res.ok && data.success && data.donor) {
            setDonor(data.donor);
            setHistory(Array.isArray(data.history) ? data.history : []);
            setStats(data.stats || null);
          } else {
            setError(data.error || "Donor not found");
          }
        }
      } catch (err) {
        console.error(err);
        if (!cancelled) setError("Unable to load donor profile right now.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 12 }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error || !donor) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {error || "Donor not found"}
        </Typography>
        <Button
          component={RouterLink}
          to="/recent-donors"
          startIcon={<ArrowBackIcon />}
          variant="contained"
        >
          Back to Donor Recognition
        </Button>
      </Container>
    );
  }

  const totalDonations = stats?.total_donations ?? donor.donation_count ?? 0;
  const tier = getDonorTier(totalDonations);

  return (
    <Box
      sx={{
        pb: 8,
        background: `
          radial-gradient(ellipse at top, ${brand.primary}10, transparent 45%),
          ${brand.surface}
        `,
      }}
    >
      <Container sx={{ pt: 4, maxWidth: 960 }}>
        <Button
          component={RouterLink}
          to="/recent-donors"
          startIcon={<ArrowBackIcon />}
          sx={{ mb: 3 }}
        >
          Donor Recognition
        </Button>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.75, sm: 2.5, md: 3 },
            mb: 3,
            borderRadius: 4,
            border: `1px solid ${brand.line}`,
            overflow: "hidden",
          }}
        >
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            alignItems={{ xs: "center", sm: "flex-start" }}
          >
            <Avatar
              src="/user.jpg"
              alt={donor.fullname}
              sx={{
                width: 120,
                height: 120,
                border: `4px solid ${
                  typeof tier.avatarRing === "string" && !tier.avatarRing.includes("gradient")
                    ? tier.avatarRing
                    : brand.primary
                }`,
                ...(tier.premium
                  ? { boxShadow: "0 0 0 3px rgba(167, 139, 250, 0.35)" }
                  : null),
              }}
            />
            <Box sx={{ textAlign: { xs: "center", sm: "left" }, flex: 1 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                alignItems={{ xs: "center", sm: "center" }}
                flexWrap="wrap"
                useFlexGap
                sx={{ mb: 1 }}
              >
                <Typography variant="h4" sx={{ mb: 0 }}>
                  {donor.fullname || "Donor"}
                </Typography>
                <DonorTierBadge donationCount={totalDonations} size="medium" />
              </Stack>
              <Stack
                direction="row"
                spacing={1}
                flexWrap="wrap"
                useFlexGap
                justifyContent={{ xs: "center", sm: "flex-start" }}
                sx={{ mb: 1.5 }}
              >
                <Chip
                  label={`Blood ${donor.blood_group || "—"}`}
                  color="primary"
                  sx={{ fontWeight: 700 }}
                />
                {donor.gender ? (
                  <Chip label={donor.gender} variant="outlined" />
                ) : null}
              </Stack>
              {donor.address ? (
                <Typography variant="body2" color="text.secondary">
                  {donor.address}
                </Typography>
              ) : null}
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Joined {formatDate(donor.joined_date)}
              </Typography>
            </Box>
          </Stack>
        </Paper>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatTile
              icon={<FavoriteBorderIcon fontSize="small" />}
              label="Total donations"
              value={totalDonations}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatTile
              icon={<EmojiEventsOutlinedIcon fontSize="small" />}
              label="Recognition score"
              value={stats?.score ?? donor.score ?? 0}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatTile
              icon={<EventAvailableOutlinedIcon fontSize="small" />}
              label="Last donation"
              value={formatDate(stats?.last_donation || donor.last_donation)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <StatTile
              icon={<HistoryOutlinedIcon fontSize="small" />}
              label="First recorded"
              value={formatDate(stats?.first_donation)}
            />
          </Grid>
        </Grid>

        <DonorRecognitionPanel
          donationCount={totalDonations}
          lastDonation={stats?.last_donation || donor.last_donation}
          gender={donor.gender}
        />

        <Paper
          elevation={0}
          sx={{
            p: { xs: 1.5, sm: 2.25, md: 2.75 },
            borderRadius: 4,
            border: `1px solid ${brand.line}`,
          }}
        >
          <Typography variant="h5" sx={{ mb: 0.5 }}>
            Donation history
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Settled donations recorded in the Raktasewa program.
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {history.length === 0 ? (
            <Typography color="text.secondary" sx={{ py: 3 }}>
              No settled donations recorded yet for this donor.
            </Typography>
          ) : (
            <Stack spacing={1.5}>
              {history.map((item, index) => (
                <Box
                  key={item.settled_id || index}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    border: `1px solid ${brand.line}`,
                    bgcolor: brand.white,
                  }}
                >
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    gap={1}
                  >
                    <Box>
                      <Typography fontWeight={700}>
                        {item.hospital_name || "Hospital n/a"}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {[item.city_district, item.patient_blood_group && `For ${item.patient_blood_group}`]
                          .filter(Boolean)
                          .join(" · ") || "Location n/a"}
                      </Typography>
                      {(item.blood_amount_needed || item.urgency_level) && (
                        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                          {[item.blood_amount_needed, item.urgency_level]
                            .filter(Boolean)
                            .join(" · ")}
                        </Typography>
                      )}
                    </Box>
                    <Chip
                      size="small"
                      label={formatDateTime(item.settled_at)}
                      variant="outlined"
                      sx={{ alignSelf: { xs: "flex-start", sm: "center" } }}
                    />
                  </Stack>
                </Box>
              ))}
            </Stack>
          )}
        </Paper>
      </Container>
    </Box>
  );
}
