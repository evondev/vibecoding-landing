"use client";

import { useState } from "react";
import NavBar from "./nav-bar";
import HeroSection from "./hero-section";
import PainSection from "./pain-section";
import HowItWorksSection from "./how-it-works-section";
import FeaturesSection from "./features-section";
import BenefitsSection from "./benefits-section";
import PricingSection from "./pricing-section";
import FaqSection from "./faq-section";
import SurveySection from "./survey-section";
import FinalCtaSection from "./final-cta-section";
import FooterSection from "./footer-section";
import LeadModal from "./lead-modal";

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <NavBar onOpenModal={openModal} />
      <HeroSection onOpenModal={openModal} />
      <PainSection />
      <HowItWorksSection />
      <FeaturesSection onOpenModal={openModal} />
      <BenefitsSection />
      <PricingSection onOpenModal={openModal} />
      <FaqSection />
      <SurveySection />
      <FinalCtaSection onOpenModal={openModal} />
      <FooterSection />
      <LeadModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
