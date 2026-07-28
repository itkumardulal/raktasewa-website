import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { apiUrl } from "../config/api";
import { brand } from "../constants/brand";
import { cardSx } from "../constants/ui";
import { useLanguage } from "../i18n/LanguageContext";
import SectionTitle from "./SectionTitle";
import DonorTierBadge from "./DonorTierBadge";
import { getDonorTier } from "../utils/donorTier";

const RANK_MEDALS = ["🥇", "🥈", "🥉"];

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

function CompactDonorRow({ donor, rank, variant = "top" }) {
  const { t } = useLanguage();
  const donations = donor.donation_count ?? 0;
  const tier = getDonorTier(donations);

  return (
    <Paper
      component={donor.id ? RouterLink : "div"}
      to={donor.id ? `/donors/${donor.id}` : undefined}
      elevation={0}
      sx={{
        ...cardSx,
        p: { xs: 1.75, sm: 2 },
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        textDecoration: "none",
        color: "inherit",
        "&:hover": donor.id
          ? { borderColor: brand.primary, boxShadow: brand.cardShadowHover }
          : undefined,
      }}
    >
      <Typography
        sx={{
          width: 32,
          textAlign: "center",
          fontSize: rank != null ? "1.25rem" : "0.85rem",
          fontWeight: 800,
          color: brand.muted,
          flexShrink: 0,
        }}
        aria-hidden
      >
        {rank != null ? RANK_MEDALS[rank] ?? rank + 1 : "❤️"}
      </Typography>

      <Avatar
        src="/user.jpg"
        alt={donor.fullname}
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          border: `2px solid ${
            typeof tier.avatarRing === "string" && !tier.avatarRing.includes("gradient")
              ? tier.avatarRing
              : brand.primary
          }`,
        }}
      />

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography fontWeight={700} noWrap sx={{ fontSize: "0.9375rem" }}>
          {donor.fullname || "Donor"}
        </Typography>
        <Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" useFlexGap sx={{ mt: 0.35 }}>
          <DonorTierBadge donationCount={donations} size="small" />
          <Typography variant="caption" color="text.secondary">
            {donor.blood_group || "—"}
          </Typography>
        </Stack>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.35 }}>
          {variant === "top"
            ? `${donations} ${t("homeSpotlight.donations")} · ${t("homeSpotlight.score")} ${donor.score ?? 0}`
            : String(t("homeSpotlight.savedOn")).replace("{date}", formatDate(donor.last_donation))}
        </Typography>
      </Box>
    </Paper>
  );
}

function HighlightColumn({ title, icon, donors, variant, seeMoreTo, seeMoreLabel, emptyLabel, loading }) {
  return (
    <Paper
      elevation={0}
      sx={{
        ...cardSx,
        height: "100%",
        p: { xs: 2.5, sm: 3 },
        "&:hover": { transform: "none", boxShadow: brand.cardShadow },
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: "grid",
            placeItems: "center",
            bgcolor: brand.accentSoft,
            color: brand.primary,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h4" component="h3" sx={{ fontSize: "1.15rem", fontWeight: 800 }}>
          {title}
        </Typography>
      </Stack>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
          <CircularProgress size={28} color="primary" />
        </Box>
      ) : donors.length === 0 ? (
        <Typography variant="body2" color="text.secondary" sx={{ py: 2, lineHeight: 1.75 }}>
          {emptyLabel}
        </Typography>
      ) : (
        <Stack spacing={1.25}>
          {donors.map((donor, index) => (
            <CompactDonorRow
              key={`${variant}-${donor.id || donor.fullname}-${index}`}
              donor={donor}
              rank={variant === "top" ? index : null}
              variant={variant}
            />
          ))}
        </Stack>
      )}

      <Button
        component={RouterLink}
        to={seeMoreTo}
        endIcon={<ArrowForwardIcon />}
        sx={{
          mt: 2.5,
          fontWeight: 700,
          textTransform: "none",
          alignSelf: "flex-start",
        }}
      >
        {seeMoreLabel}
      </Button>
    </Paper>
  );
}

export default function HomeDonorHighlights() {
  const { t } = useLanguage();
  const [topDonors, setTopDonors] = useState([]);
  const [recentSaved, setRecentSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      setLoading(true);
      try {
        const [topRes, savedRes] = await Promise.all([
          fetch(apiUrl("/public/donors/top")),
          fetch(apiUrl("/public/donors/recently-donated")),
        ]);
        const topData = await topRes.json();
        const savedData = await savedRes.json();

        if (!cancelled) {
          setTopDonors(
            topData.success && Array.isArray(topData.donors) ? topData.donors.slice(0, 3) : []
          );
          setRecentSaved(
            savedData.success && Array.isArray(savedData.donors) ? savedData.donors.slice(0, 3) : []
          );
        }
      } catch (err) {
        console.error("Failed to load home donor highlights:", err);
        if (!cancelled) {
          setTopDonors([]);
          setRecentSaved([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <Box component="section" className="section-pad" sx={{ bgcolor: brand.surfaceAlt, px: 2 }}>
      <Container maxWidth="lg">
        <SectionTitle
          eyebrow={t("homeSpotlight.eyebrow")}
          title={t("homeSpotlight.title")}
          subtitle={t("homeSpotlight.subtitle")}
        />
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <HighlightColumn
              title={t("homeSpotlight.topDonorsTitle")}
              icon={<EmojiEventsOutlinedIcon fontSize="small" />}
              donors={topDonors}
              variant="top"
              seeMoreTo="/recent-donors?tab=top"
              seeMoreLabel={t("homeSpotlight.seeMoreTop")}
              emptyLabel={t("homeSpotlight.emptyTop")}
              loading={loading}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <HighlightColumn
              title={t("homeSpotlight.recentSavedTitle")}
              icon={<FavoriteIcon fontSize="small" />}
              donors={recentSaved}
              variant="saved"
              seeMoreTo="/recent-donors?tab=donated"
              seeMoreLabel={t("homeSpotlight.seeMoreSaved")}
              emptyLabel={t("homeSpotlight.emptySaved")}
              loading={loading}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
