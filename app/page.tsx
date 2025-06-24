"use client";

import React from "react";
import "./globals.css";
import Hero from "./components/Hero";
import Navbar from "./components/NavBar";
import MainFeatures from "./components/MainFeatures";
import FeatureOne from "./components/FeatureOne";
import FeatureTwo from "./components/FeatureTwo";
import TableComparison from "./components/Table";
import VideoSegment from "./components/Video";
import Testimonials from "./components/Testimonials";
import Pricing from "./components/Pricing";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <MainFeatures />
      <FeatureOne />
      <FeatureTwo />
      <TableComparison />
      <VideoSegment />
      <Testimonials />
      <Pricing />
    </div>
  );
};

export default page;
