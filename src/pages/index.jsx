// src/pages/Index.jsx
import React from "react";
import Home from "./Home";
import AboutUs from "./AboutUs";
import OurTeam from "./OurTeam";
import BloodGroup from "./BloodGroup";
import Donors from "./donors";
import DonateBloodForm from "./DonateBloodForm";
import RequestBloodForm from "./RequestBloodForm";
import Footer from "./Footer";

export default function Index() {
  return (
    <>
      <section id="home">
        <Home />
      </section>
      <section id="about-us">
        <AboutUs />
      </section>
      <section id="our-team">
        <OurTeam />
      </section>
      <section id="blood-group">
        <BloodGroup />
      </section>
      <section id="recent-donors">
        <Donors />
      </section>
      {/* <section id="donate-blood-form">
        <DonateBloodForm />
      </section>
      <section id="request-blood-form">
        <RequestBloodForm />
      </section> */}
      <Footer />
    </>
  );
}
