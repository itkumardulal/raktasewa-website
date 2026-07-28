import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Box } from "@mui/material";
import { useT } from "../i18n/LanguageContext";

const AboutUs = lazy(() => import("../pages/AboutUs"));
const OurTeam = lazy(() => import("../pages/OurTeam"));
const BloodGroup = lazy(() => import("../pages/BloodGroup"));
const Donors = lazy(() => import("../pages/Donors"));
const DonorProfile = lazy(() => import("../pages/DonorProfile"));
const DonateBloodForm = lazy(() => import("../pages/DonateBloodForm"));
const RequestBloodForm = lazy(() => import("../pages/RequestBloodForm"));
const RequestMatchResult = lazy(() => import("../pages/RequestMatchResult."));
const Index = lazy(() => import("../pages"));
const FAQPage = lazy(() => import("../pages/FAQPage"));
const BlogList = lazy(() => import("../pages/BlogPost"));
const BlogArticle = lazy(() => import("../pages/BlogArticle"));
const KnowledgePage = lazy(() => import("../pages/KnowledgePage"));
const ContactPage = lazy(() => import("../pages/ContactPage"));
const HowItWorksPage = lazy(() => import("../pages/HowItWorksPage"));

export default function AppRouter() {
  const t = useT();

  return (
    <Suspense
      fallback={
        <Box
          sx={{
            minHeight: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
          }}
        >
          {t("common.loading")}
        </Box>
      }
    >
      <Routes>
        <Route index element={<Index />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="team" element={<OurTeam />} />
        <Route path="blood-group" element={<BloodGroup />} />
        <Route path="recent-donors" element={<Donors />} />
        <Route path="donors/:id" element={<DonorProfile />} />
        <Route path="donate-blood-form" element={<DonateBloodForm />} />
        <Route path="request-blood-form" element={<RequestBloodForm />} />
        <Route path="match-result/:requestId/:bloodGroup" element={<RequestMatchResult />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="blog" element={<BlogList />} />
        <Route path="blog/:slug" element={<BlogArticle />} />
        <Route path="knowledge" element={<KnowledgePage />} />
        <Route path="how-it-works" element={<HowItWorksPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
