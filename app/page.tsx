"use client";

import React from "react";
import "./globals.css";
import Hero from "./components/Hero";
import Navbar from "./components/NavBar";

const page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
    </div>
  );
};

export default page;
