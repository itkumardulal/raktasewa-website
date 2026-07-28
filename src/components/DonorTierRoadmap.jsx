import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { brand } from "../constants/brand";
import { useLanguage } from "../i18n/LanguageContext";
import {
  DONOR_TIER_ORDER,
  formatTierRange,
  getDonorTierChipSx,
  getTierCatalog,
} from "../utils/donorTier";

/** CTA button + modal with full recognition ladder and safe-donation guidance */
export default function DonorTierRoadmap({ highlightTierId = null }) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const tiers = getTierCatalog();

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3.5 }}>
        <Button
          onClick={() => setOpen(true)}
          startIcon={<EmojiEventsOutlinedIcon />}
          sx={{
            px: { xs: 2.5, sm: 3.5 },
            py: 1.35,
            borderRadius: 999,
            fontWeight: 800,
            fontSize: { xs: "0.9rem", sm: "0.975rem" },
            letterSpacing: "-0.01em",
            textTransform: "none",
            color: brand.white,
            background: `linear-gradient(135deg, ${brand.primary} 0%, #8B1515 100%)`,
            boxShadow: `0 8px 24px ${brand.primary}40`,
            border: "1px solid transparent",
            transition: "transform 200ms ease, box-shadow 200ms ease",
            "&:hover": {
              background: `linear-gradient(135deg, #9E1818 0%, ${brand.primary} 100%)`,
              boxShadow: `0 12px 28px ${brand.primary}55`,
              transform: "translateY(-2px)",
            },
          }}
        >
          {t("donorTiers.roadmapCta")}
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        scroll="paper"
        aria-labelledby="donor-tier-roadmap-title"
        PaperProps={{
          sx: {
            borderRadius: 3,
            border: `1px solid ${brand.line}`,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle
          id="donor-tier-roadmap-title"
          sx={{
            pr: 6,
            pb: 1,
            display: "flex",
            alignItems: "flex-start",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: brand.accentSoft,
              color: brand.primary,
              flexShrink: 0,
              mt: 0.25,
            }}
          >
            <FavoriteBorderIcon fontSize="small" />
          </Box>
          <Box>
            <Typography component="span" variant="h6" sx={{ fontWeight: 800, display: "block", lineHeight: 1.3 }}>
              {t("donorTiers.roadmapTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75, lineHeight: 1.7 }}>
              {t("donorTiers.roadmapIntro")}
            </Typography>
          </Box>
          <IconButton
            aria-label="Close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ px: { xs: 2, sm: 3 }, py: 2.5 }}>
          <Stack spacing={1.15}>
            {DONOR_TIER_ORDER.map((id, index) => {
              const tier = tiers.find((item) => item.id === id);
              if (!tier) return null;
              const active = highlightTierId === id;
              const chipSx = getDonorTierChipSx(tier);

              return (
                <Box
                  key={id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    p: 1.35,
                    borderRadius: 2,
                    border: `1px solid ${active ? tier.chipBorder : brand.line}`,
                    bgcolor: active ? "rgba(183, 28, 28, 0.04)" : brand.white,
                  }}
                >
                  <Typography
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      display: "grid",
                      placeItems: "center",
                      fontSize: "0.75rem",
                      fontWeight: 800,
                      bgcolor: brand.surfaceAlt,
                      color: brand.muted,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Box
                    sx={{
                      width: 36,
                      textAlign: "center",
                      fontSize: "1.25rem",
                      flexShrink: 0,
                    }}
                    aria-hidden
                  >
                    {tier.badge}
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontWeight: 700, fontSize: "0.9375rem", color: brand.ink }}>
                      {t(`donorTiers.${tier.id}.name`)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: "block", lineHeight: 1.4 }}>
                      {formatTierRange(tier, t)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      ...chipSx,
                      px: 1.25,
                      py: 0.35,
                      borderRadius: 999,
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {active ? t("donorTiers.currentTier") : t("donorTiers.tierStep")}
                  </Box>
                </Box>
              );
            })}
          </Stack>

          <Box
            sx={{
              mt: 2.5,
              p: 2,
              borderRadius: 2,
              bgcolor: brand.surface,
              border: `1px solid ${brand.line}`,
            }}
          >
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.75 }}>
              {t("donorTiers.consistencyTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 2 }}>
              {t("donorTiers.consistencyBody")}
            </Typography>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.75 }}>
              {t("donorTiers.safeGapOverviewTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.75, mb: 1 }}>
              {t("donorTiers.safeGapOverview")}
            </Typography>
            <Stack spacing={0.5}>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                • {t("donorTiers.gapNote.male")}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.5 }}>
                • {t("donorTiers.gapNote.female")}
              </Typography>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5, lineHeight: 1.5 }}>
              {t("donorTiers.medicalDisclaimer")}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
