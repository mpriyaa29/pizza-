import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Prologue from "@/components/Prologue";
import MenuSection from "@/components/MenuSection";
import Stats from "@/components/Stats";
import Quote from "@/components/Quote";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import CartBubble from "@/components/CartBubble";
import ScrollProgress from "@/components/ScrollProgress";
import FilmGrain from "@/components/FilmGrain";
import RevealController from "@/components/RevealController";
import CheckoutModal from "@/components/CheckoutModal";
import FullMenuModal from "@/components/FullMenuModal";
import AdminOrdersList from "@/components/AdminOrdersList";
import LocationBooking from "@/components/LocationBooking";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-bg">
      {/* Utilities */}
      <RevealController />
      <FilmGrain />
      <ScrollProgress />
      <CartBubble />
      <CheckoutModal />
      <FullMenuModal />
      <Nav />

      {/* Page Content */}
      <main className="flex-1">
        <Hero />
        <Prologue />
        <MenuSection />
        <Stats />
        <Quote />
        <Features />
        <LocationBooking />
        <CTA />
        <AdminOrdersList />
      </main>

      <Footer />
    </div>
  );
}
