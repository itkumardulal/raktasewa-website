/** Safe whole-blood donation spacing — UI guidance only (not medical advice). */

export const DONATION_INTERVAL_DAYS = {
  male: 90,
  female: 120,
  default: 120,
};

export function normalizeDonorGender(gender) {
  const g = String(gender || "")
    .trim()
    .toLowerCase();
  if (g.startsWith("f")) return "female";
  if (g.startsWith("m")) return "male";
  return "default";
}

export function getDonationIntervalDays(gender) {
  const key = normalizeDonorGender(gender);
  return DONATION_INTERVAL_DAYS[key] ?? DONATION_INTERVAL_DAYS.default;
}

/** Next calendar date when another whole-blood donation is typically recommended. */
export function getNextEligibleDonationDate(lastDonation, gender) {
  if (!lastDonation) return null;
  const last = new Date(lastDonation);
  if (Number.isNaN(last.getTime())) return null;

  const next = new Date(last);
  next.setDate(next.getDate() + getDonationIntervalDays(gender));
  next.setHours(0, 0, 0, 0);
  return next;
}

/**
 * Eligibility snapshot for celebrating consistency — never pressure early donation.
 * @returns {{ status: 'no_record'|'eligible'|'waiting', eligibleNow: boolean, nextDate: Date|null, daysRemaining: number, intervalDays: number }}
 */
export function getDonationEligibility(lastDonation, gender) {
  const intervalDays = getDonationIntervalDays(gender);
  const nextDate = getNextEligibleDonationDate(lastDonation, gender);

  if (!nextDate) {
    return {
      status: "no_record",
      eligibleNow: true,
      nextDate: null,
      daysRemaining: 0,
      intervalDays,
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eligibleNow = today >= nextDate;
  const msLeft = nextDate.getTime() - today.getTime();
  const daysRemaining = eligibleNow ? 0 : Math.max(1, Math.ceil(msLeft / 86400000));

  return {
    status: eligibleNow ? "eligible" : "waiting",
    eligibleNow,
    nextDate,
    daysRemaining,
    intervalDays,
  };
}

export function formatEligibilityDate(date, locale) {
  if (!date) return "—";
  return date.toLocaleDateString(locale === "ne" ? "ne-NP" : undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
