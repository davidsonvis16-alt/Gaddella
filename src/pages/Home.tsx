import { motion, useReducedMotion } from "framer-motion";
import Hero from "../components/Hero";
import FeaturedWork from "../components/FeaturedWork";
import ArtistsSection from "../components/ArtistsSection";
import StudioSection from "../components/StudioSection";
import BookingCTA from "../components/BookingCTA";
import { SITE } from "../data/site";
import { pageFade } from "../lib/motion";
import { useSeo } from "../lib/seo";

export default function Home() {
  const reduced = useReducedMotion() ?? false;
  useSeo({ title: SITE.name, path: "/" });

  return (
    <motion.div variants={pageFade(reduced)} initial="hidden" animate="visible" exit="exit">
      <Hero />
      <FeaturedWork />
      <ArtistsSection />
      <StudioSection />
      <BookingCTA />
    </motion.div>
  );
}
