import TopNavbar from "@/components/layout/TopNavbar";
import HeroSection from "@/components/sections/HeroSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import AboutAndSpaceSection from "@/components/sections/AboutAndSpaceSection";
import SpecialsMenuSection from "@/components/sections/SpecialsMenuSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import LocationAndHoursSection from "@/components/sections/LocationAndHoursSection";
import BlurredFooter from "@/components/layout/BlurredFooter";
import WhatsAppBookingModal from "@/components/modals/WhatsAppBookingModal";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F6F3EC] text-[#222623]">
      <TopNavbar />
      <HeroSection />
      <AchievementsSection />
      <AboutAndSpaceSection />
      <SpecialsMenuSection />
      <ReviewsSection />
      <LocationAndHoursSection />
      <BlurredFooter />
      <WhatsAppBookingModal />
    </main>
  );
}
