import { Chip, Tooltip } from "@mui/material";
import { getDonorTier, getDonorTierChipSx } from "../utils/donorTier";
import { useLanguage } from "../i18n/LanguageContext";

/**
 * Dynamic donor recognition tier — derived from donation count at render time.
 */
export default function DonorTierBadge({
  donationCount = 0,
  size = "small",
  sx = {},
}) {
  const { t } = useLanguage();
  const tier = getDonorTier(donationCount);
  const tierName = t(`donorTiers.${tier.id}.name`);
  const tierHint = t(`donorTiers.${tier.id}.hint`);
  const count = tier.count;
  const countLabel = String(t("donorTiers.tooltipCount")).replace("{count}", String(count));

  const tooltip = (
    <>
      <strong>{tierName}</strong>
      <br />
      {t("donorTiers.tooltipIntro")}
      <br />
      <br />
      {tierHint}
      <br />
      <br />
      {countLabel}
    </>
  );

  return (
    <Tooltip
      title={tooltip}
      arrow
      placement="top"
      enterTouchDelay={0}
      slotProps={{
        tooltip: {
          sx: {
            maxWidth: 260,
            fontSize: "0.8125rem",
            lineHeight: 1.55,
            p: 1.25,
          },
        },
      }}
    >
      <Chip
        size={size}
        label={
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span aria-hidden="true">{tier.badge}</span>
            <span>{tierName}</span>
          </span>
        }
        sx={{
          ...getDonorTierChipSx(tier),
          height: size === "small" ? 28 : 34,
          fontSize: size === "small" ? "0.75rem" : "0.8125rem",
          "& .MuiChip-label": {
            px: size === "small" ? 1 : 1.25,
          },
          ...sx,
        }}
      />
    </Tooltip>
  );
}
