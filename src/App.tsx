import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";

// Only the home page is in the first bundle; the rest arrive on navigation.
const Work = lazy(() => import("./pages/Work"));
const Artists = lazy(() => import("./pages/Artists"));
const Studio = lazy(() => import("./pages/Studio"));
const Booking = lazy(() => import("./pages/Booking"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  const location = useLocation();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <div className="grain" aria-hidden="true" />

      <Navbar />
      <ScrollToTop />

      <main id="main">
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<div className="route-fallback" aria-busy="true" />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/studio" element={<Studio />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>

      <Footer />
    </>
  );
}
