import {
  Box,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import HealthAndSafetyOutlinedIcon from "@mui/icons-material/HealthAndSafetyOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import { brand } from "../constants/brand";
import { cardSx } from "../constants/ui";
import { useLanguage } from "../i18n/LanguageContext";
import DonorTierBadge from "./DonorTierBadge";
import {
  formatEligibilityDate,
  getDonationEligibility,
  getDonationIntervalDays,
} from "../utils/donorEligibility";
import { getNextTierProgress } from "../utils/donorTier";

/** Profile panel: next tier + safe re-donation timing */
export default function DonorRecognitionPanel({
  donationCount = 0,
  lastDonation = null,
  gender = null,
}) {
  const { t, lang } = useLanguage();
  const progress = getNextTierProgress(donationCount);
  const eligibility = getDonationEligibility(lastDonation, gender);
  const intervalDays = getDonationIntervalDays(gender);

  return (
    <Paper
      elevation={0}
      sx={{
        ...cardSx,
        mb: 3,
        "&:hover": { transform: "none", boxShadow: brand.cardShadow },
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 0.5, fontSize: { xs: "1.15rem", md: "1.35rem" } }}>
        {t("donorTiers.panelTitle")}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.75 }}>
        {t("donorTiers.panelIntro")}
      </Typography>

      <Stack spacing={2.5}>
        {/* Tier progress */}
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            border: `1px solid ${brand.line}`,
            bgcolor: brand.surface,
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={1} sx={{ mb: 1.5 }}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <TrendingUpOutlinedIcon sx={{ color: brand.primary, fontSize: 20 }} />
              <Typography fontWeight={700}>{t("donorTiers.yourTier")}</Typography>
            </Stack>
            <DonorTierBadge donationCount={donationCount} size="small" />
          </Stack>

          {progress.isMaxTier ? (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75 }}>
              {t("donorTiers.maxTierCelebrate")}
            </Typography>
          ) : (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, lineHeight: 1.75 }}>
                {String(t("donorTiers.nextTierMessage"))
                  .replace("{count}", String(progress.donationsNeeded))
                  .replace("{tier}", t(`donorTiers.${progress.next.id}.name`))}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={progress.progressPercent}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: brand.line,
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    bgcolor: brand.primary,
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.75 }}>
                {progress.progressPercent}% {t("donorTiers.towardNext")}
              </Typography>
            </>
          )}
        </Box>

        {/* Safe donation gap */}
        <Box
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            border: `1px solid ${brand.line}`,
            bgcolor: eligibility.eligibleNow ? "#ECFDF5" : brand.accentSoft,
          }}
        >
          <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1 }}>
            {eligibility.eligibleNow ? (
              <EventAvailableOutlinedIcon sx={{ color: "#166534", fontSize: 22, mt: 0.15 }} />
            ) : (
              <HealthAndSafetyOutlinedIcon sx={{ color: brand.primary, fontSize: 22, mt: 0.15 }} />
            )}
            <Box>
              <Typography fontWeight={700} sx={{ mb: 0.5 }}>
                {t("donorTiers.safeGapTitle")}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 1 }}>
                {String(t("donorTiers.safeGapBody"))
                  .replace("{days}", String(intervalDays))
                  .replace("{genderNote}", t(`donorTiers.gapNote.${normalizeGenderKey(gender)}`))}
              </Typography>

              {eligibility.status === "no_record" ? (
                <Typography variant="body2" sx={{ fontWeight: 600, color: brand.ink }}>
                  {t("donorTiers.eligibleFirst")}
                </Typography>
              ) : eligibility.eligibleNow ? (
                <Typography variant="body2" sx={{ fontWeight: 600, color: "#166534" }}>
                  {t("donorTiers.eligibleNow")}
                </Typography>
              ) : (
                <>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: brand.primary }}>
                    {String(t("donorTiers.eligibleOn"))
                      .replace("{date}", formatEligibilityDate(eligibility.nextDate, lang))}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, lineHeight: 1.5 }}>
                    {String(t("donorTiers.daysRemaining")).replace("{days}", String(eligibility.daysRemaining))}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, lineHeight: 1.5 }}>
                    {t("donorTiers.restMessage")}
                  </Typography>
                </>
              )}
            </Box>
          </Stack>
        </Box>

        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.6, display: "block" }}>
          {t("donorTiers.medicalDisclaimer")}
        </Typography>
      </Stack>
    </Paper>
  );
}

function normalizeGenderKey(gender) {
  const g = String(gender || "")
    .trim()
    .toLowerCase();
  if (g.startsWith("f")) return "female";
  if (g.startsWith("m")) return "male";
  return "default";
}
