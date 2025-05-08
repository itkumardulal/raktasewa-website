// /* src/router/AppRouter.jsx */
// import React from "react";
// import { Routes, Route, Navigate } from "react-router-dom";

// // import Home from "../pages/Home";
// import AboutUs from "../pages/AboutUs";
// import OurTeam from "../pages/OurTeam";
// import BloodGroup from "../pages/BloodGroup";
// import Donors from "../pages/donors";
// import DonateBloodForm from "../pages/DonateBloodForm";
// import RequestBloodForm from "../pages/RequestBloodForm";
// import RequestMatchResult from "../pages/RequestMatchResult.";
// import Index from "../pages";

// export default function AppRouter() {
//   return (
//     <Routes>
//       <Route index element={<Index />} /> {/* Now using Index as homepage */}
//       <Route path="about" element={<AboutUs />} />
//       <Route path="team" element={<OurTeam />} />
//       <Route path="blood-group" element={<BloodGroup />} />
//       <Route path="recent-donors" element={<Donors />} />
//       <Route path="donate-blood-form" element={<DonateBloodForm />} />
//       <Route path="request-blood-form" element={<RequestBloodForm />} />
//       <Route
//         path="match-result/:requestId/:bloodGroup"
//         element={<RequestMatchResult />}
//       />
//       <Route path="*" element={<Navigate to="/" replace />} />
//     </Routes>
//   );
// }

import React, { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Dynamically import pages using React.lazy
const AboutUs = lazy(() => import("../pages/AboutUs"));
const OurTeam = lazy(() => import("../pages/OurTeam"));
const BloodGroup = lazy(() => import("../pages/BloodGroup"));
const Donors = lazy(() => import("../pages/donors"));
const DonateBloodForm = lazy(() => import("../pages/DonateBloodForm"));
const RequestBloodForm = lazy(() => import("../pages/RequestBloodForm"));
const RequestMatchResult = lazy(() => import("../pages/RequestMatchResult."));
const Index = lazy(() => import("../pages"));

export default function AppRouter() {
  return (
    // Wrap Routes with Suspense to handle lazy-loaded components
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route index element={<Index />} /> {/* Now using Index as homepage */}
        <Route path="about" element={<AboutUs />} />
        <Route path="team" element={<OurTeam />} />
        <Route path="blood-group" element={<BloodGroup />} />
        <Route path="recent-donors" element={<Donors />} />
        <Route path="donate-blood-form" element={<DonateBloodForm />} />
        <Route path="request-blood-form" element={<RequestBloodForm />} />
        <Route
          path="match-result/:requestId/:bloodGroup"
          element={<RequestMatchResult />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
