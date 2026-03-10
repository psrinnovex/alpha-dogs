import { useEffect, useRef, useState } from "react";
import { Phone, Calendar, Star, MapPin, Clock, ChevronDown, ChevronRight, Menu, X, Instagram, Facebook, ArrowRight, Shield, Award, Heart, Scissors, Sparkles, CheckCircle2, Quote } from "lucide-react";

const PHONE = "(617) 555-0192";
const PHONE_HREF = "tel:+16175550192";
const BOOKING_URL = "#contact";
const ADDRESS = "147 Newbury St, Suite 2, Boston, MA 02116";
const HOURS = [
  { day: "Monday – Friday", time: "8:00 AM – 7:00 PM" },
  { day: "Saturday", time: "8:00 AM – 6:00 PM" },
  { day: "Sunday", time: "10:00 AM – 4:00 PM" },
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) => {
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);
}

function useCounter(target: number, duration: number = 1800) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          setStarted(true);
          let start = 0;
          const step = target / (duration / 16);
          const timer = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, started]);

  return { count, ref };
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Gallery", href: "#gallery" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 glass-nav ${
        scrolled
          ? "bg-[#faf8f3]/92 border-b border-[#e8ddd0] luxury-shadow"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2.5 group" data-testid="link-logo">
            <div className="w-9 h-9 rounded-full bg-[#a0783a] flex items-center justify-center">
              <Scissors className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <span className="font-display text-xl font-semibold text-[#2c1f0e] tracking-wide block leading-none">Alpha Dogs</span>
              <span className="text-[10px] font-medium text-[#a0783a] tracking-[0.15em] uppercase block mt-0.5">Boston</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                  scrolled ? "text-[#3d2c1a] hover:text-[#a0783a]" : "text-[#2c1f0e] hover:text-[#a0783a]"
                }`}
                data-testid={`link-nav-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a
              href={PHONE_HREF}
              className="cta-button-outline flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              data-testid="button-call-nav"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <a
              href={BOOKING_URL}
              className="cta-button-primary flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold"
              data-testid="button-book-nav"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Appointment
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-[#2c1f0e]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            data-testid="button-mobile-menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#faf8f3]/98 glass-nav border-t border-[#e8ddd0] mobile-menu-slide">
          <div className="px-5 py-6 space-y-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="block text-base font-medium text-[#3d2c1a] hover:text-[#a0783a] transition-colors py-1"
                onClick={() => setMenuOpen(false)}
                data-testid={`link-mobile-${l.label.toLowerCase()}`}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-4 border-t border-[#e8ddd0] flex flex-col gap-3">
              <a
                href={PHONE_HREF}
                className="cta-button-outline flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium"
                data-testid="button-call-mobile"
              >
                <Phone className="w-4 h-4" />
                {PHONE}
              </a>
              <a
                href={BOOKING_URL}
                className="cta-button-primary flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold"
                data-testid="button-book-mobile"
              >
                <Calendar className="w-4 h-4" />
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-dog.png"
          alt="Professionally groomed dog at Alpha Dogs Boston"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c160e]/85 via-[#1c160e]/55 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c160e]/50 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-36 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 mb-6 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
            <div className="h-px w-8 bg-[#c9944a]" />
            <span className="text-[#c9944a] text-xs font-semibold tracking-[0.2em] uppercase">Boston's Premier Dog Grooming</span>
          </div>

          <h1
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#fdf8f0] leading-[1.1] mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Every Dog Deserves{" "}
            <em className="italic text-[#d4a96a] not-italic" style={{ fontStyle: "italic" }}>Exceptional</em>{" "}
            Care
          </h1>

          <p
            className="text-[#d4c8bc] text-lg sm:text-xl leading-relaxed mb-10 max-w-lg animate-fade-in-up"
            style={{ animationDelay: "0.35s" }}
          >
            Professional grooming with a personal touch. Boston's most trusted boutique dog grooming studio, where your pet's comfort and beauty come first.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
            <a
              href={BOOKING_URL}
              className="cta-button-primary flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold"
              data-testid="button-book-hero"
            >
              <Calendar className="w-5 h-5" />
              Book Appointment
            </a>
            <a
              href={PHONE_HREF}
              className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              data-testid="button-call-hero"
            >
              <Phone className="w-5 h-5" />
              {PHONE}
            </a>
          </div>

          <div className="flex flex-wrap gap-3 mt-8 animate-fade-in-up" style={{ animationDelay: "0.65s" }}>
            {["All Breeds Welcome", "Expert Groomers", "Safety First", "Boston Local"].map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium border border-white/20"
              >
                <CheckCircle2 className="w-3 h-3 text-[#c9944a]" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <a
        href="#trust"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors animate-bounce"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-7 h-7" />
      </a>
    </section>
  );
}

function TrustBadges() {
  const stats = [
    { value: 2000, suffix: "+", label: "Dogs Groomed", icon: <Heart className="w-6 h-6" /> },
    { value: 8, suffix: "+", label: "Years in Boston", icon: <Award className="w-6 h-6" /> },
    { value: 98, suffix: "%", label: "5-Star Reviews", icon: <Star className="w-6 h-6" /> },
    { value: 40, suffix: "+", label: "Breeds Served", icon: <Sparkles className="w-6 h-6" /> },
  ];

  const c1 = useCounter(2000);
  const c2 = useCounter(8);
  const c3 = useCounter(98);
  const c4 = useCounter(40);
  const refs = [c1.ref, c2.ref, c3.ref, c4.ref];
  const counts = [c1.count, c2.count, c3.count, c4.count];

  return (
    <section id="trust" className="bg-[#2c1f0e] py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={refs[i]}
              className="text-center reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
              data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <div className="flex justify-center mb-3 text-[#c9944a]">{s.icon}</div>
              <div className="font-display text-4xl sm:text-5xl font-bold text-[#fdf8f0] mb-1">
                {counts[i]}{s.suffix}
              </div>
              <div className="text-[#b5a090] text-sm font-medium tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-10 border-t border-white/10 flex flex-wrap justify-center gap-6 lg:gap-12">
          {[
            { icon: <Shield className="w-5 h-5" />, text: "Insured & Bonded" },
            { icon: <Award className="w-5 h-5" />, text: "Certified Groomers" },
            { icon: <Heart className="w-5 h-5" />, text: "Fear-Free Certified" },
            { icon: <Star className="w-5 h-5" />, text: "Top Rated on Yelp & Google" },
            { icon: <MapPin className="w-5 h-5" />, text: "Boston's Back Bay" },
          ].map((b) => (
            <div key={b.text} className="flex items-center gap-2.5 text-[#c9944a]">
              {b.icon}
              <span className="text-[#d4c8bc] text-sm font-medium">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    icon: <Scissors className="w-7 h-7" />,
    name: "Full Grooming",
    desc: "The complete luxury experience — bath, blow-dry, haircut, nail trim, ear cleaning, and finishing touches. Tailored to your dog's breed and coat.",
    duration: "2–3 hours",
    badge: "Most Popular",
  },
  {
    icon: <Sparkles className="w-7 h-7" />,
    name: "Bath & Brush",
    desc: "Premium shampoo and conditioning treatment, thorough blow-dry, and expert brushing to leave your dog's coat gleaming and soft.",
    duration: "1–1.5 hours",
    badge: null,
  },
  {
    icon: <Heart className="w-7 h-7" />,
    name: "Puppy First Groom",
    desc: "A gentle, patient introduction to grooming for your puppy. We take all the time needed to make it a positive, stress-free first experience.",
    duration: "1–2 hours",
    badge: "Gentle Care",
  },
  {
    icon: <Award className="w-7 h-7" />,
    name: "De-Shedding Treatment",
    desc: "Our professional de-shedding removes loose undercoat fur, dramatically reducing shedding in your home while improving coat health.",
    duration: "1.5–2.5 hours",
    badge: null,
  },
  {
    icon: <Shield className="w-7 h-7" />,
    name: "Specialty Coat Care",
    desc: "Expert handling of long coats, double coats, curly textures, and matted fur. We work patiently to restore and maintain your dog's coat.",
    duration: "2–4 hours",
    badge: "Expert Level",
  },
  {
    icon: <Star className="w-7 h-7" />,
    name: "Spa Add-Ons",
    desc: "Elevate the experience: teeth brushing, blueberry facial, conditioning mask, paw balm treatment, and premium cologne finish.",
    duration: "15–30 min each",
    badge: null,
  },
];

function ServicesSection() {
  return (
    <section id="services" className="py-20 sm:py-28 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#c9944a]" />
            <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Our Services</span>
            <div className="h-px w-10 bg-[#c9944a]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2c1f0e] mb-5 leading-tight">
            Premium Grooming, <em style={{ fontStyle: "italic" }}>Artfully Done</em>
          </h2>
          <p className="text-[#6b5740] text-lg max-w-2xl mx-auto leading-relaxed">
            Each grooming session is tailored to your dog's unique breed, coat, and personality. We never rush — every dog gets the time and attention they deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`reveal service-card-hover group bg-white rounded-2xl p-7 border border-[#e8ddd0] relative overflow-hidden cursor-default`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              data-testid={`card-service-${i}`}
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#b8895a] to-[#d4a96a] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

              {s.badge && (
                <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#f5efe6] text-[#a0783a] border border-[#e8ddd0]">
                  {s.badge}
                </span>
              )}

              <div className="w-12 h-12 rounded-xl bg-[#f5efe6] flex items-center justify-center text-[#a0783a] mb-5 group-hover:bg-[#a0783a] group-hover:text-white transition-all duration-300">
                {s.icon}
              </div>

              <h3 className="font-display text-2xl font-semibold text-[#2c1f0e] mb-3">{s.name}</h3>
              <p className="text-[#6b5740] text-sm leading-relaxed mb-5">{s.desc}</p>

              <div className="flex items-center justify-between pt-4 border-t border-[#f0e8de]">
                <div className="flex items-center gap-1.5 text-[#a0783a] text-xs font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  {s.duration}
                </div>
                <a
                  href={BOOKING_URL}
                  className="flex items-center gap-1 text-[#a0783a] text-xs font-semibold hover:gap-2 transition-all duration-200 group/link"
                  data-testid={`button-book-service-${i}`}
                >
                  Book Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <a
            href={BOOKING_URL}
            className="cta-button-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold"
            data-testid="button-book-services"
          >
            <Calendar className="w-5 h-5" />
            Book Your Dog's Appointment
          </a>
          <p className="text-[#9b8470] text-sm mt-3">Or call us at <a href={PHONE_HREF} className="text-[#a0783a] font-medium hover:underline" data-testid="link-phone-services">{PHONE}</a></p>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Genuine Love for Dogs",
      desc: "We treat every dog as our own. Our groomers are passionate pet owners who understand that your dog's comfort is everything.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe, Stress-Free Environment",
      desc: "Our calming studio is designed to minimize anxiety. We're certified in fear-free handling and take every precaution for safety.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certified Expert Groomers",
      desc: "Our team holds professional certifications with years of hands-on experience across all breeds, sizes, and coat types.",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Premium Products Only",
      desc: "We use professional-grade, pet-safe shampoos, conditioners, and finishing products — the same quality used at top dog shows.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "No Rush, Ever",
      desc: "We never double-book or rush through a groom. Your dog gets complete, unhurried attention from start to finish.",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Proudly Boston Local",
      desc: "We've been part of the Boston community for 8+ years. We know our neighbors and their dogs by name — it's personal.",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#f5efe6] to-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div>
            <div className="reveal-left">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-10 bg-[#c9944a]" />
                <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Why Alpha Dogs Boston</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2c1f0e] leading-tight mb-6">
                Boston Dog Parents{" "}
                <em style={{ fontStyle: "italic" }}>Trust Us</em>{" "}
                With Their Best Friend
              </h2>
              <p className="text-[#6b5740] text-lg leading-relaxed mb-8">
                We've built our reputation one happy dog at a time. Our clients return not just because their dogs look great, but because they can see how much their pet enjoyed the experience.
              </p>
              <a
                href={BOOKING_URL}
                className="cta-button-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold"
                data-testid="button-book-why"
              >
                <Calendar className="w-5 h-5" />
                Try Us Today
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="reveal bg-white p-5 rounded-xl border border-[#e8ddd0] luxury-shadow hover:luxury-shadow-lg transition-all duration-300"
                style={{ transitionDelay: `${i * 0.1}s` }}
                data-testid={`card-reason-${i}`}
              >
                <div className="w-10 h-10 rounded-lg bg-[#f5efe6] flex items-center justify-center text-[#a0783a] mb-3.5">
                  {r.icon}
                </div>
                <h3 className="font-semibold text-[#2c1f0e] mb-2 text-sm">{r.title}</h3>
                <p className="text-[#6b5740] text-xs leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const images = [
    { src: "/images/dog-gallery-1.png", alt: "Groomed fluffy white poodle" },
    { src: "/images/dog-gallery-2.png", alt: "Golden retriever being groomed" },
    { src: "/images/dog-gallery-3.png", alt: "Adorable small dog after groom" },
    { src: "/images/dog-gallery-4.png", alt: "Border collie in grooming studio" },
    { src: "/images/dog-gallery-5.png", alt: "Beautiful samoyed after grooming" },
    { src: "/images/hero-dog.png", alt: "Premium groomed dog at studio" },
  ];

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#2c1f0e]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#c9944a]" />
            <span className="text-[#c9944a] text-xs font-semibold tracking-[0.2em] uppercase">Happy Dogs Gallery</span>
            <div className="h-px w-10 bg-[#c9944a]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#fdf8f0] mb-4 leading-tight">
            See the{" "}
            <em style={{ fontStyle: "italic", color: "#d4a96a" }}>Transformation</em>
          </h2>
          <p className="text-[#b5a090] text-lg max-w-xl mx-auto">
            Every dog leaves our studio looking and feeling their absolute best. These are our happy clients.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`gallery-img-hover reveal relative overflow-hidden rounded-xl cursor-pointer group ${
                i === 0 ? "sm:row-span-2" : ""
              }`}
              style={{
                transitionDelay: `${i * 0.08}s`,
                aspectRatio: i === 0 ? "1/1.3" : "1/1",
              }}
              data-testid={`img-gallery-${i}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c1f0e]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10 reveal">
          <p className="text-[#b5a090] text-sm mb-4">Follow our happy dogs on Instagram</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c9944a] text-sm font-semibold hover:text-[#d4a96a] transition-colors border border-[#c9944a]/40 hover:border-[#c9944a] px-6 py-2.5 rounded-full"
            data-testid="link-instagram"
          >
            <Instagram className="w-4 h-4" />
            @alphadogsboston
          </a>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Sarah M.",
    dog: "Bella (Golden Retriever)",
    rating: 5,
    text: "Alpha Dogs is hands-down the best grooming experience in Boston. Bella came home looking like she just won a dog show. The team is so patient and loving — I could tell she actually enjoyed it.",
    neighborhood: "Back Bay",
  },
  {
    name: "James K.",
    dog: "Cooper (Standard Poodle)",
    rating: 5,
    text: "I've tried five different groomers in Boston before finding Alpha Dogs. The difference is night and day. Cooper's coat has never looked this healthy and the cut is absolutely perfect every single time.",
    neighborhood: "South End",
  },
  {
    name: "Priya L.",
    dog: "Mochi (Shih Tzu)",
    rating: 5,
    text: "Mochi is very anxious around new people but the team here is incredibly patient. They took things at her pace and the result was stunning. We're permanent customers now.",
    neighborhood: "Beacon Hill",
  },
  {
    name: "David R.",
    dog: "Bear (German Shepherd)",
    rating: 5,
    text: "They really do groom all breeds! Bear is a big boy and some places turn us away. Not here — they treat him like royalty. The de-shedding treatment alone is worth every penny.",
    neighborhood: "Fenway",
  },
  {
    name: "Emily W.",
    dog: "Daisy (Maltese)",
    rating: 5,
    text: "The attention to detail is incredible. They remembered exactly how I like Daisy's cut and even texted me when she was ready. Professional, warm, and just simply the best.",
    neighborhood: "Brookline",
  },
  {
    name: "Marcus T.",
    dog: "Zeus (Rottweiler)",
    rating: 5,
    text: "Finding a groomer who is confident and skilled with large breeds is so hard. Alpha Dogs handled Zeus with complete expertise and he came home calm and fresh. Highly recommend.",
    neighborhood: "Jamaica Plain",
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#faf8f3]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#c9944a]" />
            <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Client Stories</span>
            <div className="h-px w-10 bg-[#c9944a]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2c1f0e] mb-4 leading-tight">
            What Boston Dog Parents{" "}
            <em style={{ fontStyle: "italic" }}>Are Saying</em>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-[#c9944a] text-[#c9944a]" />
            ))}
          </div>
          <p className="text-[#9b8470] text-sm font-medium">4.9 / 5.0 — 200+ verified reviews</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card reveal bg-white p-6 rounded-2xl border border-[#e8ddd0] luxury-shadow"
              style={{ transitionDelay: `${i * 0.09}s` }}
              data-testid={`card-testimonial-${i}`}
            >
              <div className="flex items-start gap-1 mb-4">
                <Quote className="w-8 h-8 text-[#e8ddd0] fill-[#e8ddd0] flex-shrink-0 -mt-1" />
              </div>
              <p className="text-[#3d2c1a] text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
              <div className="flex items-center gap-1 mb-4">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#c9944a] text-[#c9944a]" />
                ))}
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-[#f0e8de]">
                <div>
                  <p className="font-semibold text-[#2c1f0e] text-sm">{t.name}</p>
                  <p className="text-[#9b8470] text-xs">{t.dog}</p>
                </div>
                <span className="text-xs text-[#c9944a] font-medium bg-[#f5efe6] px-2.5 py-1 rounded-full">
                  {t.neighborhood}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 parallax-section"
        style={{
          backgroundImage: "url('/images/dog-gallery-2.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-[#1c160e]/80" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center reveal">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 bg-[#c9944a]" />
          <span className="text-[#c9944a] text-xs font-semibold tracking-[0.2em] uppercase">Ready to Book?</span>
          <div className="h-px w-10 bg-[#c9944a]" />
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#fdf8f0] mb-5 leading-tight">
          Treat Your Dog to{" "}
          <em style={{ fontStyle: "italic", color: "#d4a96a" }}>Something Special</em>
        </h2>
        <p className="text-[#c8b8a8] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Boston's most-loved dog grooming studio is ready to welcome your pet. Appointments fill quickly — secure yours today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BOOKING_URL}
            className="cta-button-primary flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold animate-pulse-glow"
            data-testid="button-book-cta"
          >
            <Calendar className="w-5 h-5" />
            Book Appointment Online
          </a>
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            data-testid="button-call-cta"
          >
            <Phone className="w-5 h-5" />
            Call {PHONE}
          </a>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#f5efe6]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 reveal-right">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden luxury-shadow-lg">
                <img
                  src="/images/about-groomer.png"
                  alt="Alpha Dogs Boston professional groomer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-[#2c1f0e] text-white rounded-xl p-4 luxury-shadow-lg">
                <div className="font-display text-2xl font-bold text-[#d4a96a]">8+ Years</div>
                <div className="text-[#b5a090] text-xs font-medium">Serving Boston</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 reveal-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-[#c9944a]" />
              <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Our Story</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2c1f0e] mb-6 leading-tight">
              Grooming Born from{" "}
              <em style={{ fontStyle: "italic" }}>Passion & Care</em>
            </h2>
            <div className="space-y-4 text-[#6b5740] leading-relaxed">
              <p>
                Alpha Dogs Boston was founded with one simple belief: every dog deserves to be treated like the most important guest in the room. We opened our Back Bay studio over eight years ago with that philosophy guiding every decision — from the products we use to the time we take with each appointment.
              </p>
              <p>
                Our team of certified groomers brings genuine love, expert training, and infinite patience to every session. Whether your dog is a first-time visitor or a regular, they'll always be greeted by name, handled with care, and returned to you looking — and feeling — their very best.
              </p>
              <p>
                We groom all breeds and sizes, and we're proud to be the go-to studio for Boston's most discerning dog parents. Big or small, anxious or easygoing, every dog gets our full attention.
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href={BOOKING_URL}
                className="cta-button-primary flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold"
                data-testid="button-book-about"
              >
                <Calendar className="w-4 h-4" />
                Book with Us
              </a>
              <a
                href={PHONE_HREF}
                className="cta-button-outline flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold"
                data-testid="button-call-about"
              >
                <Phone className="w-4 h-4" />
                Say Hello
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Do you groom all breeds and sizes?",
    a: "Absolutely. We groom dogs of all breeds and sizes — from tiny Chihuahuas to large Great Danes. Our groomers have experience with all coat types including curly, double, long, and wire coats.",
  },
  {
    q: "How long does a grooming session take?",
    a: "It depends on your dog's size, breed, and the service selected. A Bath & Brush typically takes 1–1.5 hours. A Full Groom can take 2–3 hours. We never rush — your dog gets the time they need.",
  },
  {
    q: "What should I bring for my dog's appointment?",
    a: "Just your dog! Make sure they've had a walk and a bathroom break before coming in. If your dog has any medical conditions or sensitivities, please let us know when booking so we can prepare.",
  },
  {
    q: "How often should my dog be groomed?",
    a: "Most dogs benefit from professional grooming every 4–8 weeks depending on breed and coat type. Long-haired and double-coated breeds typically need more frequent visits to keep their coats healthy and tangle-free.",
  },
  {
    q: "Do you handle nervous or anxious dogs?",
    a: "Yes — we specialize in patient, low-stress grooming. Our team is trained in fear-free handling techniques and will always go at your dog's pace. We'd rather take a little longer than cause your pet any anxiety.",
  },
  {
    q: "How do I book an appointment?",
    a: "You can book by filling out our contact form below, or simply call us at " + PHONE + ". We'll find the perfect time that works for you and your dog.",
  },
  {
    q: "What products do you use?",
    a: "We use only premium, pet-safe, professional-grade shampoos, conditioners, and finishing products. All our products are free from harsh chemicals and are safe for sensitive skin.",
  },
  {
    q: "Do you offer any package deals or memberships?",
    a: "Yes! We offer grooming packages for regular clients that provide savings on multiple visits. Ask us about our loyalty program when you call or book online.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#faf8f3]">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#c9944a]" />
            <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Common Questions</span>
            <div className="h-px w-10 bg-[#c9944a]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2c1f0e] mb-4 leading-tight">
            Frequently Asked{" "}
            <em style={{ fontStyle: "italic" }}>Questions</em>
          </h2>
          <p className="text-[#6b5740] text-lg">Everything you need to know before your dog's first visit.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="reveal bg-white rounded-xl border border-[#e8ddd0] overflow-hidden luxury-shadow"
              style={{ transitionDelay: `${i * 0.05}s` }}
              data-testid={`faq-item-${i}`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#faf8f3] transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`button-faq-${i}`}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-[#2c1f0e] text-sm sm:text-base leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#a0783a] flex-shrink-0 transition-transform duration-300 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  open === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-5 pb-5 text-[#6b5740] text-sm leading-relaxed border-t border-[#f0e8de] pt-4">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dog: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-[#2c1f0e]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 bg-[#c9944a]" />
            <span className="text-[#c9944a] text-xs font-semibold tracking-[0.2em] uppercase">Visit Us</span>
            <div className="h-px w-10 bg-[#c9944a]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#fdf8f0] mb-4 leading-tight">
            Book Your Dog's{" "}
            <em style={{ fontStyle: "italic", color: "#d4a96a" }}>Grooming Session</em>
          </h2>
          <p className="text-[#b5a090] text-lg max-w-xl mx-auto">
            Fill out the form below or give us a call. We'll get back to you within a few hours to confirm your appointment.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-2 space-y-7 reveal-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="font-display text-2xl font-semibold text-[#fdf8f0] mb-5">Get in Touch</h3>
              <div className="space-y-5">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#a0783a]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#c9944a]" />
                  </div>
                  <div>
                    <p className="text-[#c9944a] text-xs font-semibold uppercase tracking-wider mb-1">Phone</p>
                    <a href={PHONE_HREF} className="text-[#fdf8f0] font-medium hover:text-[#d4a96a] transition-colors text-lg" data-testid="link-phone-contact">
                      {PHONE}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#a0783a]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#c9944a]" />
                  </div>
                  <div>
                    <p className="text-[#c9944a] text-xs font-semibold uppercase tracking-wider mb-1">Address</p>
                    <p className="text-[#d4c8bc] text-sm leading-snug">{ADDRESS}</p>
                    <a
                      href="https://maps.google.com/?q=147+Newbury+St+Boston+MA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#c9944a] text-xs font-medium mt-1.5 inline-flex items-center gap-1 hover:gap-2 transition-all"
                      data-testid="link-directions"
                    >
                      Get Directions <ChevronRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-lg bg-[#a0783a]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#c9944a]" />
                  </div>
                  <div>
                    <p className="text-[#c9944a] text-xs font-semibold uppercase tracking-wider mb-2">Hours</p>
                    <div className="space-y-1.5">
                      {HOURS.map((h) => (
                        <div key={h.day} className="flex justify-between gap-4 text-sm" data-testid={`hours-${h.day.toLowerCase().replace(/\s+/g, '-')}`}>
                          <span className="text-[#b5a090]">{h.day}</span>
                          <span className="text-[#fdf8f0] font-medium">{h.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.5!2d-71.081!3d42.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a0e5b81f3bd%3A0x5f0c0c94f9a5ab2b!2sNewbury+St%2C+Boston%2C+MA!5e0!3m2!1sen!2sus!4v1610000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(60%) sepia(20%)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Alpha Dogs Boston location map"
              />
            </div>
          </div>

          <div className="lg:col-span-3 reveal-right">
            <div className="bg-white rounded-2xl p-7 sm:p-8 luxury-shadow-lg">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#f5efe6] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-[#a0783a]" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#2c1f0e] mb-2">Request Received!</h3>
                  <p className="text-[#6b5740] text-sm leading-relaxed max-w-xs mx-auto">
                    Thank you! We'll reach out within a few hours to confirm your appointment. We can't wait to meet your pup.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-2xl font-semibold text-[#2c1f0e] mb-6">Request an Appointment</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Your Name *</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all"
                          placeholder="Jane Smith"
                          data-testid="input-name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Email Address *</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all"
                          placeholder="jane@email.com"
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all"
                          placeholder="(617) 555-0100"
                          data-testid="input-phone"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Dog's Name & Breed *</label>
                        <input
                          required
                          type="text"
                          value={formData.dog}
                          onChange={(e) => setFormData({ ...formData, dog: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all"
                          placeholder="Bella — Golden Retriever"
                          data-testid="input-dog"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Service Interested In</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all appearance-none cursor-pointer"
                        data-testid="select-service"
                      >
                        <option value="">Select a service...</option>
                        {services.map((s) => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Additional Notes</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all resize-none"
                        placeholder="Any special requests, sensitivities, or preferred times..."
                        data-testid="textarea-message"
                      />
                    </div>
                    <button
                      type="submit"
                      className="cta-button-primary w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-base font-semibold"
                      data-testid="button-submit-form"
                    >
                      <Calendar className="w-5 h-5" />
                      Request Appointment
                    </button>
                    <p className="text-center text-[#9b8470] text-xs">
                      Or call us directly at{" "}
                      <a href={PHONE_HREF} className="text-[#a0783a] font-medium hover:underline" data-testid="link-phone-form">{PHONE}</a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#1a1008] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4" data-testid="link-footer-logo">
              <div className="w-9 h-9 rounded-full bg-[#a0783a] flex items-center justify-center">
                <Scissors className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-[#fdf8f0] block leading-none">Alpha Dogs</span>
                <span className="text-[10px] font-medium text-[#c9944a] tracking-[0.15em] uppercase block mt-0.5">Boston</span>
              </div>
            </a>
            <p className="text-[#8b7660] text-sm leading-relaxed mb-5 max-w-xs">
              Boston's premier boutique dog grooming studio. Expert care, premium products, and genuine love for every dog.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#a0783a]/30 flex items-center justify-center text-[#b5a090] hover:text-[#c9944a] transition-all" aria-label="Instagram" data-testid="link-instagram-footer">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#a0783a]/30 flex items-center justify-center text-[#b5a090] hover:text-[#c9944a] transition-all" aria-label="Facebook" data-testid="link-facebook-footer">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[#fdf8f0] font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <a href="#services" className="text-[#8b7660] hover:text-[#c9944a] text-sm transition-colors" data-testid={`link-footer-service-${s.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#fdf8f0] font-semibold text-sm uppercase tracking-wider mb-4">Navigate</h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: "#" },
                { label: "Services", href: "#services" },
                { label: "Gallery", href: "#gallery" },
                { label: "About Us", href: "#about" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-[#8b7660] hover:text-[#c9944a] text-sm transition-colors" data-testid={`link-footer-nav-${l.label.toLowerCase().replace(/\s+/g, '-')}`}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[#fdf8f0] font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <div className="space-y-3 mb-6">
              <a href={PHONE_HREF} className="flex items-center gap-2.5 text-[#8b7660] hover:text-[#c9944a] transition-colors text-sm" data-testid="link-footer-phone">
                <Phone className="w-4 h-4 text-[#c9944a]" />
                {PHONE}
              </a>
              <div className="flex items-start gap-2.5 text-[#8b7660] text-sm">
                <MapPin className="w-4 h-4 text-[#c9944a] flex-shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#8b7660] text-sm">
                <Clock className="w-4 h-4 text-[#c9944a] flex-shrink-0 mt-0.5" />
                <span>Mon–Fri: 8am–7pm<br/>Sat: 8am–6pm<br/>Sun: 10am–4pm</span>
              </div>
            </div>
            <a
              href={BOOKING_URL}
              className="cta-button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold"
              data-testid="button-book-footer"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Now
            </a>
          </div>
        </div>

        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#6b5740] text-xs">
            © {new Date().getFullYear()} Alpha Dogs Boston. All rights reserved.
          </p>
          <p className="text-[#6b5740] text-xs">
            147 Newbury St, Boston, MA · Professional Dog Grooming
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useReveal();

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <Navbar />
      <HeroSection />
      <TrustBadges />
      <ServicesSection />
      <WhyChooseUs />
      <GallerySection />
      <TestimonialsSection />
      <CTABand />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
