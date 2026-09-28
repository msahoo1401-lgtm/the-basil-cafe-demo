import PageLoader from "@/components/layout/PageLoader";
import TopNavbar from "@/components/layout/TopNavbar";
import StaffAdminBar from "@/components/layout/StaffAdminBar";
import HeroSection from "@/components/sections/HeroSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import AboutAndSpaceSection from "@/components/sections/AboutAndSpaceSection";
import SpecialsMenuSection from "@/components/sections/SpecialsMenuSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import LocationAndHoursSection from "@/components/sections/LocationAndHoursSection";
import BlurredFooter from "@/components/layout/BlurredFooter";
import WhatsAppBookingModal from "@/components/modals/WhatsAppBookingModal";
import StaffLoginModal from "@/components/modals/StaffLoginModal";
import AddDishModal from "@/components/modals/AddDishModal";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F3EC] text-[#222623]">
      {/* 0.9s Initial Curtain Loading Animation with Masked Logo */}
      <PageLoader />

      {/* Sticky Staff Mode Admin Bar when logged in */}
      <StaffAdminBar />

      {/* Floating Navigation */}
      <TopNavbar />

      {/* Full-Bleed Atmospheric Hero */}
      <HeroSection />

      {/* Scroll-Revealed Sections */}
      <ScrollReveal>
        <AchievementsSection />
      </ScrollReveal>

      <ScrollReveal>
        <AboutAndSpaceSection />
      </ScrollReveal>

      <ScrollReveal>
        <SpecialsMenuSection />
      </ScrollReveal>

      <ScrollReveal>
        <ReviewsSection />
      </ScrollReveal>

      <ScrollReveal>
        <LocationAndHoursSection />
      </ScrollReveal>

      <BlurredFooter />

      {/* Modals */}
      <WhatsAppBookingModal />
      <StaffLoginModal />
      <AddDishModal />
    </main>
  );
}
