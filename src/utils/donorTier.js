/** Donor recognition tiers — computed from settled donation count only (UI). */

export const DONOR_TIER_ORDER = [
  "new",
  "lifesaver",
  "bronze",
  "silver",
  "gold",
  "diamond",
  "platinum",
  "legend",
];

const TIERS = [
  {
    id: "new",
    min: 0,
    max: 0,
    badge: "🌱",
    chipBg: "#ECFDF5",
    chipColor: "#166534",
    chipBorder: "#86EFAC",
    avatarRing: "#22C55E",
  },
  {
    id: "lifesaver",
    min: 1,
    max: 2,
    badge: "❤️",
    chipBg: "#FDECEC",
    chipColor: "#B71C1C",
    chipBorder: "#F5A5A5",
    avatarRing: "#B71C1C",
  },
  {
    id: "bronze",
    min: 3,
    max: 5,
    badge: "🥉",
    chipBg: "linear-gradient(135deg, #FFF4E6 0%, #FFE0B2 100%)",
    chipColor: "#8B4513",
    chipBorder: "#CD7F32",
    avatarRing: "#CD7F32",
  },
  {
    id: "silver",
    min: 6,
    max: 10,
    badge: "🥈",
    chipBg: "linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)",
    chipColor: "#374151",
    chipBorder: "#9CA3AF",
    avatarRing: "#9CA3AF",
  },
  {
    id: "gold",
    min: 11,
    max: 20,
    badge: "🥇",
    chipBg: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)",
    chipColor: "#92400E",
    chipBorder: "#D97706",
    avatarRing: "#D97706",
  },
  {
    id: "diamond",
    min: 21,
    max: 35,
    badge: "💎",
    chipBg: "linear-gradient(135deg, #EFF6FF 0%, #BFDBFE 100%)",
    chipColor: "#1D4ED8",
    chipBorder: "#2563EB",
    avatarRing: "#2563EB",
  },
  {
    id: "platinum",
    min: 36,
    max: 50,
    badge: "👑",
    chipBg: "linear-gradient(135deg, #F5F3FF 0%, #DDD6FE 100%)",
    chipColor: "#5B21B6",
    chipBorder: "#7C3AED",
    avatarRing: "#7C3AED",
  },
  {
    id: "legend",
    min: 51,
    max: Infinity,
    badge: "🌟",
    chipBg: "linear-gradient(135deg, #FEF3C7 0%, #E9D5FF 55%, #C4B5FD 100%)",
    chipColor: "#6D28D9",
    chipBorder: "#A78BFA",
    avatarRing: "linear-gradient(135deg, #D97706, #7C3AED)",
    premium: true,
  },
];

/** Public tier catalog for roadmap UI */
export function getTierCatalog() {
  return TIERS.map((tier) => ({ ...tier }));
}

/** Resolve tier from successful donation count (never stored server-side). */
export function getDonorTier(donationCount) {
  const count = Math.max(0, Number(donationCount) || 0);

  if (count === 0) return { ...TIERS[0], count };

  for (let i = TIERS.length - 1; i >= 0; i -= 1) {
    const tier = TIERS[i];
    if (count >= tier.min) {
      return { ...tier, count };
    }
  }

  return { ...TIERS[0], count };
}

/** Progress toward the next recognition tier */
export function getNextTierProgress(donationCount) {
  const count = Math.max(0, Number(donationCount) || 0);
  const current = getDonorTier(count);
  const currentIndex = DONOR_TIER_ORDER.indexOf(current.id);

  if (currentIndex < 0 || currentIndex >= DONOR_TIER_ORDER.length - 1) {
    return {
      current,
      next: null,
      donationsNeeded: 0,
      progressPercent: 100,
      isMaxTier: true,
    };
  }

  const nextId = DONOR_TIER_ORDER[currentIndex + 1];
  const next = TIERS.find((t) => t.id === nextId);
  const donationsNeeded = Math.max(0, next.min - count);
  const spanStart = current.max === Infinity ? current.min : current.min;
  const spanEnd = next.min;
  const progressPercent =
    spanEnd <= spanStart
      ? 100
      : Math.min(100, Math.round(((count - spanStart) / (spanEnd - spanStart)) * 100));

  return {
    current,
    next: { ...next },
    donationsNeeded,
    progressPercent,
    isMaxTier: false,
  };
}

export function formatTierRange(tier, t) {
  if (tier.max === Infinity) return t("donorTiers.rangeLegend");
  if (tier.min === tier.max) return t("donorTiers.rangeZero");
  if (tier.min === 0) return t("donorTiers.rangeZero");
  return String(t("donorTiers.range"))
    .replace("{min}", String(tier.min))
    .replace("{max}", String(tier.max));
}

export function getDonorTierChipSx(tier) {
  const base = {
    fontWeight: 700,
    letterSpacing: "-0.01em",
    border: `1px solid ${tier.chipBorder}`,
    background: tier.chipBg,
    color: tier.chipColor,
    boxShadow: tier.premium ? "0 4px 14px rgba(124, 58, 237, 0.18)" : "none",
  };

  return base;
}
