"use client";

import React from "react";
import "./globals.css";
import Hero from "./components/Hero";
import Navbar from "./components/NavBar";
import MainFeatures from "./components/MainFeatures";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <MainFeatures />
    </div>
  );
};

export default page;
