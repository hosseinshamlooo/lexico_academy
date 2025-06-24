"use client";

import React from "react";
import "./globals.css";
import Hero from "./components/Hero";
import Navbar from "./components/NavBar";
import MainFeatures from "./components/MainFeatures";
import FeatureOne from "./components/FeatureOne";
import FeatureTwo from "./components/FeatureTwo";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <MainFeatures />
      <FeatureOne />
      <FeatureTwo />
    </div>
  );
};

export default page;
