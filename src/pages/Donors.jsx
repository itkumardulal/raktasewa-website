/*  src/pages/RecentDonors.jsx — real leaderboard data from public APIs */
import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Paper,
  Avatar,
  Typography,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import { brand } from "../constants/brand";
import { apiUrl } from "../config/api";

const maroon = brand.primary;

const TABS = [
  { key: "recent", label: "Recent", endpoint: "/public/donors/recent" },
  {
    key: "donated",
    label: "Recently Donated",
    endpoint: "/public/donors/recently-donated",
  },
  { key: "top", label: "Top", endpoint: "/public/donors/top" },
  { key: "repeat", label: "Repeat", endpoint: "/public/donors/repeat" },
];

function formatDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value);
  return d.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function DonorCard({ donor }) {
  const {
    fullname,
    blood_group,
    donation_count,
    score,
    joined_date,
    last_donation,
  } = donor;

  return (
    <Paper
      elevation={0}
      sx={{
        flexBasis: { xs: "100%", sm: "47%", md: "30%" },
        maxWidth: 360,
        p: 3,
        textAlign: "center",
        borderRadius: 3,
        border: `1px solid ${brand.line}`,
      }}
    >
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
          src="/user.jpg"
          alt={fullname}
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Typography variant="subtitle1" fontWeight={600}>
        {fullname || "Donor"}
      </Typography>

      <Typography variant="body2" color="text.secondary">
        Blood Type&nbsp;•&nbsp;<b>{blood_group || "—"}</b>
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Donations&nbsp;•&nbsp;<b>{donation_count ?? 0}</b>
        &nbsp;|&nbsp;Score&nbsp;•&nbsp;<b>{score ?? 0}</b>
      </Typography>

      {last_donation && (
        <Typography variant="caption" color="text.secondary" display="block">
          Last donation {formatDate(last_donation)}
        </Typography>
      )}
      {joined_date && (
        <Typography variant="caption" color="text.secondary" display="block">
          Joined {formatDate(joined_date)}
        </Typography>
      )}
    </Paper>
  );
}

export default function RecentDonors() {
  const [tab, setTab] = useState(0);
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const { endpoint } = TABS[tab];

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl(endpoint));
        const data = await res.json();
        if (!cancelled) {
          if (data.success && Array.isArray(data.donors)) {
            setDonors(data.donors);
          } else {
            setDonors([]);
          }
        }
      } catch (err) {
        console.error("Failed to load donors:", err);
        if (!cancelled) {
          setDonors([]);
          setError("Unable to load donors right now. Please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tab]);

  return (
    <Container sx={{ my: 8 }}>
      <Typography variant="h5" align="center" sx={{ mb: 2, fontWeight: 700 }}>
        Donor&nbsp;Recognition
      </Typography>
      <Typography
        align="center"
        color="text.secondary"
        sx={{ mb: 3, maxWidth: 480, mx: "auto" }}
      >
        Celebrating people who join and donate to keep our community safe.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
        <Tabs
          value={tab}
          onChange={(_e, next) => setTab(next)}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          textColor="primary"
          indicatorColor="primary"
        >
          {TABS.map((t) => (
            <Tab key={t.key} label={t.label} />
          ))}
        </Tabs>
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : error ? (
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
          {error}
        </Typography>
      ) : donors.length === 0 ? (
        <Typography align="center" color="text.secondary" sx={{ py: 4 }}>
          No donors to show in this list yet. Be the first to join or donate!
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 4,
          }}
        >
          {donors.map((donor, index) => (
            <DonorCard
              key={`${donor.fullname}-${donor.last_donation || donor.joined_date}-${index}`}
              donor={donor}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
