/**
 * Local Unsplash photos (Nepal + healthcare).
 * Free to use under the Unsplash License — https://unsplash.com/license
 */
export const SITE_IMAGES = {
  logo: "/logo.png",
  nepalHimalaya: "/images/nepal-himalaya.jpg",
  nepalPrayerFlags: "/images/nepal-prayer-flags.jpg",
  nepalVillage: "/images/nepal-village.jpg",
  nepalMountains: "/images/nepal-mountains.jpg",
  nepalValley: "/images/nepal-valley.jpg",
  nepalCommunity: "/images/nepal-community.jpg",
  nepalTrek: "/images/nepal-trek.jpg",
  nepalPeaks: "/images/nepal-peaks.jpg",
  nepalSunset: "/images/nepal-sunset.jpg",
  nepalGreen: "/images/nepal-green.jpg",
  nepalSnow: "/images/nepal-snow.jpg",
  nepalHills: "/images/nepal-hills.jpg",
  bloodDonation: "/images/blood-donation.jpg",
  healthcare: "/images/healthcare.jpg",
  hospitalCare: "/images/hospital-care.jpg",
};

/** Rotate Nepal covers for blog posts */
export const BLOG_COVERS = [
  SITE_IMAGES.nepalHimalaya,
  SITE_IMAGES.bloodDonation,
  SITE_IMAGES.nepalPrayerFlags,
  SITE_IMAGES.healthcare,
  SITE_IMAGES.nepalMountains,
  SITE_IMAGES.nepalVillage,
  SITE_IMAGES.hospitalCare,
  SITE_IMAGES.nepalCommunity,
  SITE_IMAGES.nepalValley,
  SITE_IMAGES.nepalTrek,
  SITE_IMAGES.nepalPeaks,
  SITE_IMAGES.nepalSunset,
];

export function blogCoverForSlug(slug, index = 0) {
  const hash = String(slug || "")
    .split("")
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return BLOG_COVERS[(hash + index) % BLOG_COVERS.length];
}
