/*  src/pages/Donors.jsx — real leaderboard data from public APIs */
import React, { useEffect, useState } from "react";
import { Link as RouterLink, useSearchParams } from "react-router-dom";
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
import { useLanguage } from "../i18n/LanguageContext";
import SectionTitle from "../components/SectionTitle";
import DonorTierBadge from "../components/DonorTierBadge";
import DonorTierRoadmap from "../components/DonorTierRoadmap";
import { getDonorTier } from "../utils/donorTier";
import {
  formatEligibilityDate,
  getDonationEligibility,
} from "../utils/donorEligibility";

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

function tabIndexFromKey(key) {
  if (!key) return 0;
  const index = TABS.findIndex((tab) => tab.key === key);
  return index >= 0 ? index : 0;
}

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
  const { t, lang } = useLanguage();
  const {
    id,
    fullname,
    blood_group,
    donation_count,
    score,
    joined_date,
    last_donation,
  } = donor;

  const donations = donation_count ?? 0;
  const tier = getDonorTier(donations);
  const eligibility = last_donation
    ? getDonationEligibility(last_donation, null)
    : null;

  const card = (
    <Paper
      elevation={0}
      sx={{
        flexBasis: { xs: "100%", sm: "47%", md: "30%" },
        maxWidth: 360,
        p: { xs: 1.5, sm: 2.25, md: 2.75 },
        textAlign: "center",
        borderRadius: `${brand.radius}px`,
        border: `1px solid ${brand.line}`,
        boxShadow: brand.cardShadow,
        height: "100%",
        transition: "transform 300ms ease, box-shadow 300ms ease, border-color 300ms ease",
        cursor: id ? "pointer" : "default",
        textDecoration: "none",
        color: "inherit",
        display: "block",
        "&:hover": id
          ? {
              transform: "translateY(-4px)",
              borderColor: maroon,
              boxShadow: brand.cardShadowHover,
            }
          : undefined,
      }}
      component={id ? RouterLink : "div"}
      to={id ? `/donors/${id}` : undefined}
    >
      <Box
        sx={{
          width: { xs: 96, sm: 120, md: 140 },
          height: { xs: 96, sm: 120, md: 140 },
          mx: "auto",
          mb: { xs: 1.25, sm: 2 },
          borderRadius: "50%",
          overflow: "hidden",
          border: `4px solid ${typeof tier.avatarRing === "string" && !tier.avatarRing.includes("gradient") ? tier.avatarRing : maroon}`,
          ...(tier.premium
            ? {
                boxShadow: "0 0 0 2px rgba(167, 139, 250, 0.35)",
              }
            : null),
        }}
      >
        <Avatar
          src="/user.jpg"
          alt={fullname}
          sx={{ width: "100%", height: "100%" }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <Typography variant="subtitle1" fontWeight={600}>
          {fullname || "Donor"}
        </Typography>
        <DonorTierBadge donationCount={donations} size="small" />
      </Box>

      <Typography variant="body2" color="text.secondary">
        Blood Type&nbsp;•&nbsp;<b>{blood_group || "—"}</b>
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        Donations&nbsp;•&nbsp;<b>{donations}</b>
        &nbsp;|&nbsp;Score&nbsp;•&nbsp;<b>{score ?? 0}</b>
      </Typography>

      {last_donation && (
        <Typography variant="caption" color="text.secondary" display="block">
          Last donation {formatDate(last_donation)}
        </Typography>
      )}
      {eligibility && eligibility.status !== "no_record" ? (
        <Typography
          variant="caption"
          display="block"
          sx={{
            mt: 0.75,
            lineHeight: 1.45,
            color: eligibility.eligibleNow ? "#166534" : brand.muted,
            fontWeight: 600,
          }}
        >
          {eligibility.eligibleNow
            ? t("donorTiers.cardEligibleNow")
            : String(t("donorTiers.cardEligibleOn")).replace(
                "{date}",
                formatEligibilityDate(eligibility.nextDate, lang)
              )}
          {!eligibility.eligibleNow && eligibility.daysRemaining > 0
            ? ` · ${String(t("donorTiers.cardDaysLeft")).replace("{days}", String(eligibility.daysRemaining))}`
            : null}
        </Typography>
      ) : null}
      {joined_date && (
        <Typography variant="caption" color="text.secondary" display="block">
          Joined {formatDate(joined_date)}
        </Typography>
      )}
      {id ? (
        <Typography
          variant="caption"
          sx={{ mt: 1.5, display: "block", color: maroon, fontWeight: 700 }}
        >
          View activity →
        </Typography>
      ) : null}
    </Paper>
  );

  return card;
}

export default function RecentDonors() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState(() => tabIndexFromKey(searchParams.get("tab")));
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTab(tabIndexFromKey(searchParams.get("tab")));
  }, [searchParams]);

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
    <Container className="section-pad" maxWidth="lg">
      <SectionTitle
        component="h1"
        variant="h1"
        eyebrow={t("donors.eyebrow")}
        title={t("donors.title")}
        subtitle={t("donors.subtitle")}
      />

      <DonorTierRoadmap />

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
              key={`${donor.id || donor.fullname}-${donor.last_donation || donor.joined_date}-${index}`}
              donor={donor}
            />
          ))}
        </Box>
      )}
    </Container>
  );
}
