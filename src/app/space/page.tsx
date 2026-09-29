"use client";

import Link from "next/link";
import BrandWordmark from "@/components/layout/BrandWordmark";
import StaffAdminBar from "@/components/layout/StaffAdminBar";
import BlurredFooter from "@/components/layout/BlurredFooter";
import WhatsAppBookingModal from "@/components/modals/WhatsAppBookingModal";
import StaffLoginModal from "@/components/modals/StaffLoginModal";
import AddDishModal from "@/components/modals/AddDishModal";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { INTERIOR_IMAGES, CAFE_INFO } from "@/data/cafeData";
import { useCafeState } from "@/context/CafeStateContext";

export default function SpacePage() {
  const { setBookingModalOpen } = useCafeState();

  const interiorGallery = [
    {
      src: INTERIOR_IMAGES.windowView,
      title: "First-Floor Sunlit Window Tables",
      desc: "Wide glass panels looking out over K7 main road, bringing in uninterrupted daylight throughout the day.",
      span: "md:col-span-2 md:row-span-2",
      aspect: "aspect-[4/3] md:aspect-auto md:h-full",
    },
    {
      src: INTERIOR_IMAGES.frontDoor,
      title: "Front Door Welcome",
      desc: "Warm first-floor entryway welcoming guests into our sunlit botanical cafe and dining space.",
      span: "md:col-span-1",
      aspect: "aspect-[4/3]",
    },
    {
      src: INTERIOR_IMAGES.activityArea,
      title: "Workshop & Activity Area",
      desc: "Spacious tables dedicated to weekend clay modeling, Lippan mirror work, and Mandala art workshops.",
      span: "md:col-span-1",
      aspect: "aspect-[4/3]",
    },
    {
      src: INTERIOR_IMAGES.middleArea,
      title: "Botanical Central Lounge",
      desc: "Warm wooden furniture, indoor potted ferns, and hanging filament bulbs for quiet meetings and laptop work.",
      span: "md:col-span-2",
      aspect: "aspect-[16/9]",
    },
    {
      src: INTERIOR_IMAGES.singingArea,
      title: "Acoustic Jamming Stage",
      desc: "A dedicated corner for open mic nights, acoustic guitar performances, and community jam sessions.",
      span: "md:col-span-1",
      aspect: "aspect-[4/3]",
    },
  ];

  const events = [
    {
      title: "Open Mic & Acoustic Music Competition",
      schedule: "Friday & Saturday Evenings, 6:30 PM onwards",
      tag: "Live Music",
      description:
        "An intimate acoustic platform for college musicians, singer-songwriters, and indie instrumentalists. Bring your guitar or come support local artists.",
      buttonText: "Register / Book Event Spot",
      prefillNote: "Registering for Open Mic & Acoustic Music Competition",
    },
    {
      title: "Weekend Mandala & Lippan Art Workshop",
      schedule: "Sunday Afternoon, 3:00 PM – 5:30 PM",
      tag: "Craft & Workshop",
      price: "₹499 per person",
      description:
        "Hands-on guided art session covering traditional Kutch Lippan craft and intricate Mandala canvas patterns. All clay, mirror, and paint materials provided + 1 Signature Coffee.",
      buttonText: "Register / Book Event Spot",
      prefillNote: "Booking spot for Weekend Mandala & Lippan Art Workshop",
    },
    {
      title: "Board Game & Book Club Meetups",
      schedule: "Every Weekend (All Day)",
      tag: "Community",
      description:
        "Open tables with Catan, Scrabble, Chess, Monopoly, and an open reading library. Free entry for diners; just pick a board game from the shelf.",
      buttonText: "Reserve a Table for Games",
      prefillNote: "Reserving a table for board games / book meetup",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F6F3EC] text-[#222623]">
      <StaffAdminBar />

      {/* Top Header Bar matching /menu */}
      <header className="sticky top-0 z-40 bg-[#F6F3EC]/90 backdrop-blur-md border-b border-[#1B3B2B]/10">
        <div className="max-w-6xl mx-auto px-4 h-18 sm:h-24 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Interactive pill Back to Home button with animated chevron */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-[#1B3B2B]/15 bg-white/70 hover:bg-white text-xs sm:text-sm font-semibold text-[#1B3B2B] hover:text-[#C86446] transition-all shadow-sm"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 transform group-hover:-translate-x-1 transition-transform duration-300"
              aria-hidden
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back to Home</span>
          </Link>

          {/* Center: Enlarged circular emblem logo paired with BrandWordmark */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 border border-[#1B3B2B]/15 bg-[#84BE38] shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src="/images/brand_icon.png"
                alt="The Basil Cafe & Restro"
                className="w-full h-full object-cover scale-[1.05]"
              />
            </div>
            <BrandWordmark variant="dark" className="h-8 sm:h-11 w-auto" />
          </Link>

          {/* Right: Table Reservation CTA */}
          <div className="flex items-center">
            <button
              onClick={() => setBookingModalOpen(true)}
              className="bg-[#1B3B2B] text-[#F6F3EC] hover:bg-[#2a543f] text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2 sm:py-2.5 rounded-full transition cursor-pointer border-none shadow-sm"
            >
              Reserve a Table
            </button>
          </div>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="pt-8 md:pt-12 pb-20">
        {/* Editorial Intro Banner */}
        <section className="max-w-6xl mx-auto px-4 mb-16 md:mb-24 text-center">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-[0.3em] text-[#C86446] font-semibold mb-3">
              THE SPACE &amp; COMMUNITY &bull; KALINGANAGAR
            </p>
            <h1
              className="text-3xl sm:text-5xl md:text-6xl font-semibold text-[#1B3B2B] leading-tight max-w-4xl mx-auto mb-6"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              Sunlit Corners, Acoustic Evenings, and Unhurried Conversations.
            </h1>
            <p className="text-sm sm:text-base text-[#5A635D] max-w-2xl mx-auto leading-relaxed">
              Step inside our first-floor cafe in Shankarpur, Ghatikia. Built with brick accents,
              hanging warm filament bulbs, lush indoor plants, a public bookshelf, and a welcoming
              atmosphere for both students and families.
            </p>
          </ScrollReveal>
        </section>

        {/* Section A — The Sunlit Sanctuary (Interior Design Gallery) */}
        <section className="max-w-6xl mx-auto px-4 mb-20 md:mb-28">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p
                  className="text-[#C86446] text-lg italic mb-1"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  The Space
                </p>
                <h2
                  className="text-2xl sm:text-4xl font-bold text-[#1B3B2B]"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  The Sunlit Sanctuary
                </h2>
              </div>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1B3B2B] hover:text-[#C86446] transition group self-start sm:self-auto"
              >
                <span>View More Photos on Google Maps</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  aria-hidden
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {interiorGallery.map((item, index) => (
                <div
                  key={index}
                  className={`group relative rounded-3xl overflow-hidden shadow-sm border border-[#1B3B2B]/10 bg-[#FAF7F2] ${item.span}`}
                >
                  <div className={`w-full overflow-hidden ${item.aspect}`}>
                    <img
                      src={item.src}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="p-5 bg-[#FAF7F2] border-t border-[#1B3B2B]/10">
                    <h3
                      className="text-base sm:text-lg font-bold text-[#1B3B2B] mb-1"
                      style={{ fontFamily: "var(--font-serif)" }}
                    >
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A635D] leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Section B — Meet Radha & Rani (Our Resident Dogs) */}
        <section className="max-w-6xl mx-auto px-4 mb-20 md:mb-28">
          <ScrollReveal>
            <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 md:p-12 border border-[#1B3B2B]/15 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Dog Image */}
                <div className="lg:col-span-6 overflow-hidden rounded-2xl aspect-[4/3] bg-[#E9EFEA]">
                  <img
                    src={INTERIOR_IMAGES.radhaAndRani}
                    alt="Radha and Rani, resident dogs at The Basil Cafe"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="lg:col-span-6 flex flex-col">
                  <p className="text-xs uppercase tracking-[0.25em] text-[#C86446] font-semibold mb-2">
                    RESIDENT CAFE COMPANIONS
                  </p>
                  <h2
                    className="text-2xl sm:text-4xl font-bold text-[#1B3B2B] mb-4"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    Meet Radha &amp; Rani
                  </h2>
                  <p className="text-sm sm:text-base text-[#5A635D] leading-relaxed mb-4">
                    Radha and Rani are our two gentle resident dogs who call The Basil their home.
                    Calm, well-mannered, and accustomed to diner company, they usually spend their
                    afternoons napping near the bookshelf or welcoming guests at the entrance.
                  </p>
                  <p className="text-sm sm:text-base text-[#5A635D] leading-relaxed mb-6">
                    Our space is strictly maintained for cleanliness, and pet lovers are welcome to
                    bring their own well-behaved four-legged companions along for afternoon coffee.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="border border-[#1B3B2B]/15 bg-[#E9EFEA] text-[#1B3B2B] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                      Gentle &amp; Friendly
                    </span>
                    <span className="border border-[#1B3B2B]/15 bg-[#E9EFEA] text-[#1B3B2B] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                      Vaccinated &amp; Groomed
                    </span>
                    <span className="border border-[#1B3B2B]/15 bg-[#E9EFEA] text-[#1B3B2B] px-3.5 py-1.5 rounded-full text-xs font-semibold">
                      Pet-Welcoming Dining
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Section C — Live Music Competitions & Weekend Programs */}
        <section className="max-w-6xl mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p
                className="text-[#C86446] text-lg italic mb-1"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Community Events
              </p>
              <h2
                className="text-2xl sm:text-4xl font-bold text-[#1B3B2B] mb-3"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Weekend Programs &amp; Live Sessions
              </h2>
              <p className="text-sm text-[#5A635D] max-w-xl mx-auto">
                Join our weekend gatherings in Kalinganagar. Register your spot early as table and workshop
                slots are limited.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#1B3B2B]/10 shadow-sm flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider bg-[#1B3B2B]/10 text-[#1B3B2B] px-2.5 py-1 rounded-full">
                      {event.tag}
                    </span>
                    {event.price && (
                      <span className="text-xs font-bold text-[#C86446] tabular-nums">
                        {event.price}
                      </span>
                    )}
                  </div>

                  <h3
                    className="text-lg font-bold text-[#1B3B2B] mb-2 leading-snug"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {event.title}
                  </h3>

                  <p className="text-xs font-semibold text-[#C86446] mb-3">
                    {event.schedule}
                  </p>

                  <p className="text-xs sm:text-sm text-[#5A635D] leading-relaxed mb-6 flex-1">
                    {event.description}
                  </p>

                  <button
                    onClick={() => setBookingModalOpen(true, event.prefillNote)}
                    className="w-full bg-[#1B3B2B] hover:bg-[#2a543f] text-[#F6F3EC] py-2.5 rounded-full text-xs font-semibold transition cursor-pointer border-none shadow-sm"
                  >
                    {event.buttonText}
                  </button>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </section>
      </main>

      <BlurredFooter />
      <WhatsAppBookingModal />
      <StaffLoginModal />
      <AddDishModal />
    </div>
  );
}
