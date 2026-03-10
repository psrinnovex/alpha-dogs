import { useEffect, useRef, useState, useCallback } from "react";
import { Phone, Calendar, Star, MapPin, Clock, ChevronDown, ChevronRight, Menu, X, Instagram, Facebook, ArrowRight, Shield, Award, Heart, Scissors, Sparkles, CheckCircle2, Quote } from "lucide-react";
import {
  AntigravityParticles,
  WindsurfWaves,
  ReptileScalePattern,
  SerpentineLine,
  FloatingDiamond,
  WindTrail,
  MagneticOrb,
} from "@/components/AnimatedBackground";

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
          if (e.isIntersecting) e.target.classList.add("revealed");
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px 0px" }
    );
    document.querySelectorAll(".reveal, .reveal-left, .reveal-right").forEach((el) =>
      observer.observe(el)
    );
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const el = document.documentElement;
      setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return progress;
}

function useCounter(target: number, duration = 1800) {
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
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
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

function useMagneticEffect() {
  const ref = useRef<HTMLAnchorElement>(null);
  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.25;
    const dy = (e.clientY - cy) * 0.25;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  }, []);
  const handleMouseLeave = useCallback(() => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.closest("section") || document.body;
    parent.addEventListener("mousemove", handleMouseMove as EventListener);
    el.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      parent.removeEventListener("mousemove", handleMouseMove as EventListener);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);
  return ref;
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 glass-nav ${
        scrolled
          ? "bg-[#faf8f3]/94 border-b border-[#e8ddd0] luxury-shadow"
          : "bg-transparent"
      }`}
    >
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
          <div className="wind-trail-1" style={{ top: 0, height: "1px", animation: "windsurf-wave 4s ease-in-out infinite" }} />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#" className="flex items-center gap-2.5 group" data-testid="link-logo">
            <div className="w-9 h-9 rounded-full bg-[#a0783a] flex items-center justify-center scale-pulse">
              <Scissors className="w-4 h-4 text-white" />
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
                className={`text-sm font-medium tracking-wide transition-all duration-200 underline-wave relative ${
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
              className="cta-button-outline flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium windsurf-blow"
              style={{ animationDuration: "8s" }}
              data-testid="button-call-nav"
            >
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <a
              href={BOOKING_URL}
              className="cta-button-primary flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold neon-bronze"
              data-testid="button-book-nav"
            >
              <Calendar className="w-3.5 h-3.5" />
              Book Appointment
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-[#2c1f0e]"
            onClick={() => setMenuOpen(!menuOpen)}
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
              <a href={PHONE_HREF} className="cta-button-outline flex items-center justify-center gap-2 py-3 rounded-full text-sm font-medium" data-testid="button-call-mobile">
                <Phone className="w-4 h-4" />{PHONE}
              </a>
              <a href={BOOKING_URL} className="cta-button-primary flex items-center justify-center gap-2 py-3 rounded-full text-sm font-semibold" data-testid="button-book-mobile">
                <Calendar className="w-4 h-4" />Book Appointment
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const magRef = useMagneticEffect();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" id="home">
      <div className="absolute inset-0 z-0">
        <div className="hero-ken-burns absolute inset-0">
          <img
            src="/images/hero-dog.png"
            alt="Professionally groomed dog at Alpha Dogs Boston"
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1c160e]/90 via-[#1c160e]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c160e]/55 via-transparent to-transparent" />
      </div>

      <AntigravityParticles count={32} />

      <WindsurfWaves color="#c9944a" opacity={0.10} speed={0.6} />

      <ReptileScalePattern />

      <MagneticOrb className="-right-20 top-1/4 opacity-60" />
      <MagneticOrb className="-right-32 bottom-1/3 opacity-30" />

      <FloatingDiamond size={16} delay={0} className="left-[12%] top-[22%] opacity-40" />
      <FloatingDiamond size={10} delay={1.2} className="left-[18%] top-[65%] opacity-30" />
      <FloatingDiamond size={20} delay={2.4} className="right-[15%] top-[30%] opacity-25" />
      <FloatingDiamond size={8} delay={0.8} className="left-[35%] top-[75%] opacity-35" />
      <FloatingDiamond size={14} delay={3.2} className="right-[28%] bottom-[25%] opacity-20" />

      <div
        className="absolute top-24 right-1/4 w-32 h-32 rounded-full opacity-5"
        style={{
          background: "radial-gradient(circle, #d4a96a, transparent)",
          animation: "morphing-blob 10s ease-in-out infinite",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-28 lg:py-36 w-full">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2.5 mb-6 hero-text-rise" style={{ animationDelay: "0.1s" }}>
            <div className="h-px w-8 bg-[#c9944a] border-trace" />
            <span className="text-[#c9944a] text-xs font-semibold tracking-[0.2em] uppercase">Boston's Premier Dog Grooming</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-[#fdf8f0] leading-[1.08] mb-6">
            <span className="hero-text-rise block" style={{ animationDelay: "0.2s" }}>Every Dog</span>
            <span className="hero-text-rise block" style={{ animationDelay: "0.35s" }}>Deserves{" "}
              <em className="text-shimmer-gold italic">Exceptional</em>
            </span>
            <span className="hero-text-rise block" style={{ animationDelay: "0.5s" }}>Care</span>
          </h1>

          <p className="text-[#d4c8bc] text-lg sm:text-xl leading-relaxed mb-10 hero-text-rise" style={{ animationDelay: "0.65s" }}>
            Professional grooming with a personal touch. Boston's most trusted boutique dog grooming studio, where your pet's comfort and beauty come first.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 hero-text-rise" style={{ animationDelay: "0.8s" }}>
            <a
              href={BOOKING_URL}
              ref={magRef as any}
              className="cta-button-primary flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold neon-bronze"
              data-testid="button-book-hero"
              style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)" }}
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

          <div className="flex flex-wrap gap-3 mt-8">
            {["All Breeds Welcome", "Expert Groomers", "Safety First", "Boston Local"].map((tag, i) => (
              <span
                key={tag}
                className="hero-badge-pop flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-xs font-medium border border-white/20"
                style={{ animationDelay: `${0.9 + i * 0.12}s` }}
              >
                <CheckCircle2 className="w-3 h-3 text-[#c9944a]" />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <SerpentineLine className="absolute bottom-0 left-0 right-0 h-16 z-10" />

      <a
        href="#trust"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/50 hover:text-white transition-colors antigravity-bounce"
        style={{ animationDuration: "3s" }}
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

  const counters = [
    useCounter(2000),
    useCounter(8),
    useCounter(98),
    useCounter(40),
  ];

  return (
    <section id="trust" className="relative bg-[#2c1f0e] py-16 overflow-hidden">
      <ReptileScalePattern />
      <WindsurfWaves color="#c9944a" opacity={0.06} speed={0.4} />

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full radiance-orb opacity-20"
          style={{ background: "radial-gradient(ellipse, rgba(201,148,74,0.3) 0%, transparent 70%)" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={counters[i].ref}
              className="text-center stagger-item levitate"
              style={{
                animationDelay: `${i * 0.12}s`,
                animationDuration: `${4 + i * 0.5}s`,
              }}
              data-testid={`stat-${s.label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex justify-center mb-3 text-[#c9944a] scale-pulse" style={{ animationDuration: `${3 + i * 0.4}s` }}>
                {s.icon}
              </div>
              <div className="font-display text-5xl sm:text-6xl font-bold text-[#fdf8f0] mb-1">
                {counters[i].count}{s.suffix}
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
          ].map((b, i) => (
            <div
              key={b.text}
              className="flex items-center gap-2.5 text-[#c9944a] stagger-item"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <span className="antigravity-float" style={{ animationDuration: `${5 + i * 0.6}s`, animationDelay: `${i * 0.4}s` }}>
                {b.icon}
              </span>
              <span className="text-[#d4c8bc] text-sm font-medium">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  { icon: <Scissors className="w-7 h-7" />, name: "Full Grooming", desc: "The complete luxury experience — bath, blow-dry, haircut, nail trim, ear cleaning, and finishing touches.", duration: "2–3 hours", badge: "Most Popular" },
  { icon: <Sparkles className="w-7 h-7" />, name: "Bath & Brush", desc: "Premium shampoo and conditioning treatment, thorough blow-dry, and expert brushing.", duration: "1–1.5 hours", badge: null },
  { icon: <Heart className="w-7 h-7" />, name: "Puppy First Groom", desc: "A gentle, patient introduction to grooming for your puppy — a positive, stress-free first experience.", duration: "1–2 hours", badge: "Gentle Care" },
  { icon: <Award className="w-7 h-7" />, name: "De-Shedding Treatment", desc: "Professionally removes loose undercoat fur, dramatically reducing shedding while improving coat health.", duration: "1.5–2.5 hours", badge: null },
  { icon: <Shield className="w-7 h-7" />, name: "Specialty Coat Care", desc: "Expert handling of long coats, double coats, curly textures, and matted fur.", duration: "2–4 hours", badge: "Expert Level" },
  { icon: <Star className="w-7 h-7" />, name: "Spa Add-Ons", desc: "Teeth brushing, blueberry facial, conditioning mask, paw balm treatment, and premium cologne finish.", duration: "15–30 min each", badge: null },
];

function ServicesSection() {
  return (
    <section id="services" className="relative py-20 sm:py-28 bg-[#faf8f3] overflow-hidden">
      <WindsurfWaves color="#a0783a" opacity={0.055} speed={0.5} />
      <WindTrail className="inset-0" />

      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{
        background: "linear-gradient(to top, rgba(245,239,230,0.8) 0%, transparent 100%)"
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-16 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
            <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Our Services</span>
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2c1f0e] mb-5 leading-tight depth-zoom">
            Premium Grooming,{" "}
            <em style={{ fontStyle: "italic" }} className="text-shimmer-gold">Artfully Done</em>
          </h2>
          <p className="text-[#6b5740] text-lg max-w-2xl mx-auto leading-relaxed">
            Each session is tailored to your dog's unique breed, coat, and personality. We never rush — every dog gets the time and attention they deserve.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`reveal card-3d group bg-white rounded-2xl p-7 border border-[#e8ddd0] relative overflow-hidden cursor-default`}
              style={{ transitionDelay: `${i * 0.08}s` }}
              data-testid={`card-service-${i}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ReptileScalePattern />
              </div>

              <div className="absolute top-0 left-0 right-0 h-1 aurora-bg transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />

              {s.badge && (
                <span className="absolute top-5 right-5 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-[#f5efe6] text-[#a0783a] border border-[#e8ddd0]">
                  {s.badge}
                </span>
              )}

              <div className="w-12 h-12 rounded-xl bg-[#f5efe6] flex items-center justify-center text-[#a0783a] mb-5 group-hover:bg-[#a0783a] group-hover:text-white transition-all duration-300 group-hover:scale-pulse relative z-10">
                {s.icon}
              </div>

              <h3 className="font-display text-2xl font-semibold text-[#2c1f0e] mb-3 relative z-10">{s.name}</h3>
              <p className="text-[#6b5740] text-sm leading-relaxed mb-5 relative z-10">{s.desc}</p>

              <div className="flex items-center justify-between pt-4 border-t border-[#f0e8de] relative z-10">
                <div className="flex items-center gap-1.5 text-[#a0783a] text-xs font-medium">
                  <Clock className="w-3.5 h-3.5 antigravity-float" style={{ animationDuration: "4s", animationDelay: `${i * 0.3}s` }} />
                  {s.duration}
                </div>
                <a href={BOOKING_URL} className="flex items-center gap-1 text-[#a0783a] text-xs font-semibold hover:gap-2.5 transition-all duration-300" data-testid={`button-book-service-${i}`}>
                  Book Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <a href={BOOKING_URL} className="cta-button-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold neon-bronze" data-testid="button-book-services">
            <Calendar className="w-5 h-5" />Book Your Dog's Appointment
          </a>
          <p className="text-[#9b8470] text-sm mt-3">Or call <a href={PHONE_HREF} className="text-[#a0783a] font-medium hover:underline" data-testid="link-phone-services">{PHONE}</a></p>
        </div>
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const reasons = [
    { icon: <Heart className="w-6 h-6" />, title: "Genuine Love for Dogs", desc: "We treat every dog as our own. Our groomers are passionate pet owners who understand your dog's comfort is everything." },
    { icon: <Shield className="w-6 h-6" />, title: "Safe, Stress-Free", desc: "Our calming studio minimizes anxiety. We're fear-free certified and take every precaution for safety." },
    { icon: <Award className="w-6 h-6" />, title: "Certified Experts", desc: "Our team holds professional certifications with years of hands-on experience across all breeds and coat types." },
    { icon: <Sparkles className="w-6 h-6" />, title: "Premium Products", desc: "Professional-grade, pet-safe shampoos and conditioners — the same quality used at top dog shows." },
    { icon: <Clock className="w-6 h-6" />, title: "No Rush, Ever", desc: "We never double-book or rush through a groom. Your dog gets complete, unhurried attention from start to finish." },
    { icon: <MapPin className="w-6 h-6" />, title: "Proudly Boston Local", desc: "We've been part of the Boston community for 8+ years. We know our neighbors and their dogs by name." },
  ];

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "linear-gradient(135deg, #f5efe6 0%, #ede4d8 50%, #faf8f3 100%)" }}>
      <ReptileScalePattern />
      <WindsurfWaves color="#b8895a" opacity={0.07} speed={0.35} />

      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full radiance-orb opacity-30 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,148,74,0.2) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="reveal-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
              <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Why Alpha Dogs Boston</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2c1f0e] leading-tight mb-6 depth-zoom">
              Boston Dog Parents{" "}
              <em style={{ fontStyle: "italic" }} className="text-shimmer-gold">Trust Us</em>{" "}
              With Their Best Friend
            </h2>
            <p className="text-[#6b5740] text-lg leading-relaxed mb-8">
              We've built our reputation one happy dog at a time. Clients return not just because their dogs look great — but because they can see how much their pet enjoyed it.
            </p>
            <a href={BOOKING_URL} className="cta-button-primary inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold neon-bronze" data-testid="button-book-why">
              <Calendar className="w-5 h-5" />Try Us Today
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {reasons.map((r, i) => (
              <div
                key={r.title}
                className="reveal card-3d bg-white p-5 rounded-xl border border-[#e8ddd0] luxury-shadow group overflow-hidden relative"
                style={{ transitionDelay: `${i * 0.1}s` }}
                data-testid={`card-reason-${i}`}
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ReptileScalePattern />
                </div>
                <div className="w-10 h-10 rounded-lg bg-[#f5efe6] flex items-center justify-center text-[#a0783a] mb-3.5 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <span className="group-hover:antigravity-float">
                    {r.icon}
                  </span>
                </div>
                <h3 className="font-semibold text-[#2c1f0e] mb-2 text-sm relative z-10">{r.title}</h3>
                <p className="text-[#6b5740] text-xs leading-relaxed relative z-10">{r.desc}</p>
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
    <section id="gallery" className="relative py-20 sm:py-28 bg-[#2c1f0e] overflow-hidden">
      <ReptileScalePattern />
      <AntigravityParticles count={18} />
      <WindsurfWaves color="#c9944a" opacity={0.08} speed={0.55} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] radiance-orb opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(201,148,74,0.25) 0%, transparent 70%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
            <span className="text-[#c9944a] text-xs font-semibold tracking-[0.2em] uppercase">Happy Dogs Gallery</span>
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#fdf8f0] mb-4 leading-tight depth-zoom">
            See the{" "}
            <em style={{ fontStyle: "italic" }} className="text-shimmer-gold">Transformation</em>
          </h2>
          <p className="text-[#b5a090] text-lg max-w-xl mx-auto">
            Every dog leaves looking and feeling their absolute best. These are our happy clients.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`reveal group relative overflow-hidden rounded-xl cursor-pointer ${i === 0 ? "sm:row-span-2" : ""}`}
              style={{
                transitionDelay: `${i * 0.08}s`,
                aspectRatio: i === 0 ? "1/1.3" : "1/1",
              }}
              data-testid={`img-gallery-${i}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
                style={{ filter: "saturate(0.9)" }}
                loading="lazy"
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ReptileScalePattern />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c160e]/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-4">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-400">
                  <span className="text-white text-sm font-medium block">{img.alt}</span>
                  <div className="flex gap-0.5 mt-1">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-[#c9944a] text-[#c9944a]" />
                    ))}
                  </div>
                </div>
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
            className="inline-flex items-center gap-2 text-[#c9944a] text-sm font-semibold hover:text-[#d4a96a] transition-colors border border-[#c9944a]/40 hover:border-[#c9944a] px-6 py-2.5 rounded-full windsurf-blow"
            style={{ animationDuration: "6s" }}
            data-testid="link-instagram"
          >
            <Instagram className="w-4 h-4 antigravity-float" style={{ animationDuration: "3s" }} />
            @alphadogsboston
          </a>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  { name: "Sarah M.", dog: "Bella (Golden Retriever)", rating: 5, text: "Alpha Dogs is hands-down the best grooming experience in Boston. Bella came home looking like she just won a dog show. The team is so patient and loving.", neighborhood: "Back Bay" },
  { name: "James K.", dog: "Cooper (Standard Poodle)", rating: 5, text: "I've tried five different groomers in Boston before finding Alpha Dogs. The difference is night and day. Cooper's coat has never looked this healthy.", neighborhood: "South End" },
  { name: "Priya L.", dog: "Mochi (Shih Tzu)", rating: 5, text: "Mochi is very anxious around new people but the team here is incredibly patient. They took things at her pace and the result was stunning.", neighborhood: "Beacon Hill" },
  { name: "David R.", dog: "Bear (German Shepherd)", rating: 5, text: "They really do groom all breeds! Bear is a big boy and some places turn us away. Not here — they treat him like royalty.", neighborhood: "Fenway" },
  { name: "Emily W.", dog: "Daisy (Maltese)", rating: 5, text: "The attention to detail is incredible. They remembered exactly how I like Daisy's cut and even texted when she was ready. Simply the best.", neighborhood: "Brookline" },
  { name: "Marcus T.", dog: "Zeus (Rottweiler)", rating: 5, text: "Finding a groomer skilled with large breeds is so hard. Alpha Dogs handled Zeus with complete expertise and he came home calm and fresh.", neighborhood: "Jamaica Plain" },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="relative py-20 sm:py-28 bg-[#faf8f3] overflow-hidden">
      <WindsurfWaves color="#a0783a" opacity={0.05} speed={0.45} />
      <WindTrail className="inset-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
            <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Client Stories</span>
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#2c1f0e] mb-4 leading-tight depth-zoom">
            What Boston Dog Parents{" "}
            <em style={{ fontStyle: "italic" }} className="text-shimmer-gold">Are Saying</em>
          </h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-[#c9944a] text-[#c9944a] scale-pulse" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
          <p className="text-[#9b8470] text-sm font-medium">4.9 / 5.0 — 200+ verified reviews</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="testimonial-card reveal card-3d bg-white p-6 rounded-2xl border border-[#e8ddd0] luxury-shadow group relative overflow-hidden"
              style={{ transitionDelay: `${i * 0.09}s` }}
              data-testid={`card-testimonial-${i}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ReptileScalePattern />
              </div>
              <div className="relative z-10">
                <div className="flex items-start gap-1 mb-4">
                  <Quote className="w-8 h-8 text-[#e8ddd0] fill-[#e8ddd0] flex-shrink-0 -mt-1 scale-pulse" style={{ animationDuration: "5s" }} />
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
                  <span className="text-xs text-[#c9944a] font-medium bg-[#f5efe6] px-2.5 py-1 rounded-full">{t.neighborhood}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABand() {
  const magRef = useMagneticEffect();

  return (
    <section className="relative py-20 overflow-hidden">
      <div
        className="absolute inset-0 parallax-section"
        style={{ backgroundImage: "url('/images/dog-gallery-2.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div className="absolute inset-0 bg-[#1c160e]/82" />
      <ReptileScalePattern />
      <AntigravityParticles count={20} />
      <WindsurfWaves color="#c9944a" opacity={0.12} speed={0.7} />

      <SerpentineLine className="absolute top-0 left-0 right-0 h-12 z-10" />

      <FloatingDiamond size={18} delay={0} className="left-[8%] top-[20%]" />
      <FloatingDiamond size={12} delay={1.5} className="right-[10%] top-[30%]" />
      <FloatingDiamond size={22} delay={0.7} className="left-[22%] bottom-[20%]" />
      <FloatingDiamond size={9} delay={2.1} className="right-[25%] bottom-[35%]" />

      <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 text-center reveal">
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
          <span className="text-[#c9944a] text-xs font-semibold tracking-[0.2em] uppercase">Ready to Book?</span>
          <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
        </div>
        <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#fdf8f0] mb-5 leading-tight depth-zoom">
          Treat Your Dog to{" "}
          <em style={{ fontStyle: "italic" }} className="text-shimmer-gold">Something Special</em>
        </h2>
        <p className="text-[#c8b8a8] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          Boston's most-loved dog grooming studio is ready to welcome your pet. Appointments fill quickly — secure yours today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={BOOKING_URL}
            ref={magRef as any}
            className="cta-button-primary flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold neon-bronze"
            style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1)" }}
            data-testid="button-book-cta"
          >
            <Calendar className="w-5 h-5" />
            Book Appointment Online
          </a>
          <a
            href={PHONE_HREF}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-semibold border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 windsurf-blow"
            style={{ animationDuration: "7s" }}
            data-testid="button-call-cta"
          >
            <Phone className="w-5 h-5" />Call {PHONE}
          </a>
        </div>
      </div>

      <SerpentineLine className="absolute bottom-0 left-0 right-0 h-12 z-10" />
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 overflow-hidden" style={{ background: "linear-gradient(160deg, #f5efe6 0%, #ede4d8 60%, #f0e8dc 100%)" }}>
      <ReptileScalePattern />
      <WindsurfWaves color="#b8895a" opacity={0.065} speed={0.4} />

      <MagneticOrb className="-left-20 bottom-10 opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="order-2 lg:order-1 reveal-right">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden luxury-shadow-lg group">
                <img
                  src="/images/about-groomer.png"
                  alt="Alpha Dogs Boston professional groomer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <ReptileScalePattern />
                </div>
              </div>

              <div className="absolute -bottom-5 -right-5 bg-[#2c1f0e] text-white rounded-xl p-4 luxury-shadow-lg levitate">
                <div className="font-display text-2xl font-bold text-shimmer-gold">8+ Years</div>
                <div className="text-[#b5a090] text-xs font-medium">Serving Boston</div>
              </div>

              <FloatingDiamond size={16} delay={0.5} className="top-4 left-4" />
              <FloatingDiamond size={10} delay={1.8} className="bottom-16 left-6" />
            </div>
          </div>

          <div className="order-1 lg:order-2 reveal-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
              <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Our Story</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2c1f0e] mb-6 leading-tight depth-zoom">
              Grooming Born from{" "}
              <em style={{ fontStyle: "italic" }} className="text-shimmer-gold">Passion & Care</em>
            </h2>
            <div className="space-y-4 text-[#6b5740] leading-relaxed">
              <p>Alpha Dogs Boston was founded with one simple belief: every dog deserves to be treated like the most important guest in the room. We opened our Back Bay studio over eight years ago with that philosophy guiding every decision.</p>
              <p>Our team of certified groomers brings genuine love, expert training, and infinite patience to every session. Whether your dog is a first-time visitor or a regular, they'll always be greeted by name, handled with care, and returned to you looking — and feeling — their very best.</p>
              <p>We groom all breeds and sizes, and we're proud to be the go-to studio for Boston's most discerning dog parents. Big or small, anxious or easygoing, every dog gets our full attention.</p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href={BOOKING_URL} className="cta-button-primary flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold neon-bronze" data-testid="button-book-about">
                <Calendar className="w-4 h-4" />Book with Us
              </a>
              <a href={PHONE_HREF} className="cta-button-outline flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold windsurf-blow" style={{ animationDuration: "9s" }} data-testid="button-call-about">
                <Phone className="w-4 h-4" />Say Hello
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Do you groom all breeds and sizes?", a: "Absolutely. We groom dogs of all breeds and sizes — from tiny Chihuahuas to large Great Danes. Our groomers have experience with all coat types including curly, double, long, and wire coats." },
  { q: "How long does a grooming session take?", a: "It depends on your dog's size, breed, and service selected. A Bath & Brush typically takes 1–1.5 hours. A Full Groom can take 2–3 hours. We never rush." },
  { q: "What should I bring for my dog's appointment?", a: "Just your dog! Make sure they've had a walk and bathroom break before. Let us know of any medical conditions or sensitivities when booking." },
  { q: "How often should my dog be groomed?", a: "Most dogs benefit from professional grooming every 4–8 weeks depending on breed and coat type. Long-haired breeds typically need more frequent visits." },
  { q: "Do you handle nervous or anxious dogs?", a: "Yes — we specialize in patient, low-stress grooming. Our team is trained in fear-free handling and will always go at your dog's pace." },
  { q: "How do I book an appointment?", a: "Fill out our contact form below, or call us at " + PHONE + ". We'll confirm your appointment within a few hours." },
  { q: "What products do you use?", a: "We use only premium, pet-safe, professional-grade shampoos, conditioners, and finishing products. Free from harsh chemicals and safe for sensitive skin." },
  { q: "Do you offer package deals or memberships?", a: "Yes! We offer grooming packages for regular clients. Ask about our loyalty program when you call or book online." },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-[#faf8f3] overflow-hidden">
      <WindsurfWaves color="#a0783a" opacity={0.05} speed={0.4} />
      <WindTrail className="inset-0" />

      <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
            <span className="text-[#a0783a] text-xs font-semibold tracking-[0.2em] uppercase">Common Questions</span>
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#2c1f0e] mb-4 leading-tight depth-zoom">
            Frequently Asked{" "}
            <em style={{ fontStyle: "italic" }} className="text-shimmer-gold">Questions</em>
          </h2>
          <p className="text-[#6b5740] text-lg">Everything you need to know before your dog's first visit.</p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="reveal bg-white rounded-xl border border-[#e8ddd0] overflow-hidden luxury-shadow group relative"
              style={{ transitionDelay: `${i * 0.05}s` }}
              data-testid={`faq-item-${i}`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <ReptileScalePattern />
              </div>
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-[#faf8f3] transition-colors relative z-10"
                onClick={() => setOpen(open === i ? null : i)}
                data-testid={`button-faq-${i}`}
                aria-expanded={open === i}
              >
                <span className="font-semibold text-[#2c1f0e] text-sm sm:text-base leading-snug">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[#a0783a] flex-shrink-0 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out relative z-10 ${
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
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", dog: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-[#2c1f0e] overflow-hidden">
      <ReptileScalePattern />
      <AntigravityParticles count={14} />
      <WindsurfWaves color="#c9944a" opacity={0.07} speed={0.5} />

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] radiance-orb opacity-15"
          style={{ background: "radial-gradient(ellipse, rgba(201,148,74,0.2) 0%, transparent 70%)" }} />
      </div>

      <SerpentineLine className="absolute top-0 left-0 right-0 h-14 z-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="text-center mb-14 reveal">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
            <span className="text-[#c9944a] text-xs font-semibold tracking-[0.2em] uppercase">Visit Us</span>
            <div className="h-px w-10 aurora-bg rounded-full" style={{ height: "2px" }} />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-semibold text-[#fdf8f0] mb-4 leading-tight depth-zoom">
            Book Your Dog's{" "}
            <em style={{ fontStyle: "italic" }} className="text-shimmer-gold">Grooming Session</em>
          </h2>
          <p className="text-[#b5a090] text-lg max-w-xl mx-auto">Fill out the form below or give us a call. We'll get back to you within a few hours.</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-2 space-y-7 reveal-left">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ReptileScalePattern />
              </div>
              <h3 className="font-display text-2xl font-semibold text-[#fdf8f0] mb-5 relative z-10">Get in Touch</h3>
              <div className="space-y-5 relative z-10">
                {[
                  { icon: <Phone className="w-4 h-4 text-[#c9944a]" />, label: "Phone", content: <a href={PHONE_HREF} className="text-[#fdf8f0] font-medium hover:text-[#d4a96a] transition-colors text-lg" data-testid="link-phone-contact">{PHONE}</a> },
                  { icon: <MapPin className="w-4 h-4 text-[#c9944a]" />, label: "Address", content: <><p className="text-[#d4c8bc] text-sm leading-snug">{ADDRESS}</p><a href="https://maps.google.com/?q=147+Newbury+St+Boston+MA" target="_blank" rel="noopener noreferrer" className="text-[#c9944a] text-xs font-medium mt-1.5 inline-flex items-center gap-1 hover:gap-2 transition-all" data-testid="link-directions">Get Directions <ChevronRight className="w-3 h-3" /></a></> },
                  {
                    icon: <Clock className="w-4 h-4 text-[#c9944a]" />, label: "Hours", content: (
                      <div className="space-y-1.5">
                        {HOURS.map((h) => (
                          <div key={h.day} className="flex justify-between gap-4 text-sm" data-testid={`hours-${h.day.toLowerCase().replace(/\s+/g, "-")}`}>
                            <span className="text-[#b5a090]">{h.day}</span>
                            <span className="text-[#fdf8f0] font-medium">{h.time}</span>
                          </div>
                        ))}
                      </div>
                    )
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-[#a0783a]/20 flex items-center justify-center flex-shrink-0 mt-0.5 scale-pulse" style={{ animationDuration: "4s" }}>
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[#c9944a] text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.5!2d-71.081!3d42.35!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e37a0e5b81f3bd%3A0x5f0c0c94f9a5ab2b!2sNewbury+St%2C+Boston%2C+MA!5e0!3m2!1sen!2sus!4v1610000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(60%) sepia(20%) brightness(0.85)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Alpha Dogs Boston location map"
              />
            </div>
          </div>

          <div className="lg:col-span-3 reveal-right">
            <div className="bg-white rounded-2xl p-7 sm:p-8 luxury-shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                <ReptileScalePattern />
              </div>
              {submitted ? (
                <div className="text-center py-12 relative z-10">
                  <div className="w-16 h-16 bg-[#f5efe6] rounded-full flex items-center justify-center mx-auto mb-4 levitate">
                    <CheckCircle2 className="w-8 h-8 text-[#a0783a]" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-[#2c1f0e] mb-2">Request Received!</h3>
                  <p className="text-[#6b5740] text-sm leading-relaxed max-w-xs mx-auto">
                    Thank you! We'll reach out within a few hours to confirm. We can't wait to meet your pup.
                  </p>
                </div>
              ) : (
                <div className="relative z-10">
                  <h3 className="font-display text-2xl font-semibold text-[#2c1f0e] mb-6">Request an Appointment</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Your Name *</label>
                        <input required type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all" placeholder="Jane Smith" data-testid="input-name" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Email Address *</label>
                        <input required type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all" placeholder="jane@email.com" data-testid="input-email" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Phone Number</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all" placeholder="(617) 555-0100" data-testid="input-phone" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Dog's Name & Breed *</label>
                        <input required type="text" value={formData.dog} onChange={(e) => setFormData({ ...formData, dog: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all" placeholder="Bella — Golden Retriever" data-testid="input-dog" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Service Interested In</label>
                      <select value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all appearance-none cursor-pointer" data-testid="select-service">
                        <option value="">Select a service...</option>
                        {services.map((s) => <option key={s.name} value={s.name}>{s.name}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#6b5740] uppercase tracking-wider mb-1.5">Additional Notes</label>
                      <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full px-4 py-3 rounded-xl border border-[#e8ddd0] bg-[#faf8f3] text-[#2c1f0e] text-sm placeholder-[#b5a090] focus:outline-none focus:border-[#a0783a] focus:ring-2 focus:ring-[#a0783a]/15 transition-all resize-none" placeholder="Any special requests, sensitivities, or preferred times..." data-testid="textarea-message" />
                    </div>
                    <button type="submit" className="cta-button-primary w-full flex items-center justify-center gap-2.5 py-4 rounded-xl text-base font-semibold neon-bronze" data-testid="button-submit-form">
                      <Calendar className="w-5 h-5" />Request Appointment
                    </button>
                    <p className="text-center text-[#9b8470] text-xs">Or call <a href={PHONE_HREF} className="text-[#a0783a] font-medium hover:underline" data-testid="link-phone-form">{PHONE}</a></p>
                  </form>
                </div>
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
    <footer className="relative bg-[#1a1008] border-t border-white/10 overflow-hidden">
      <ReptileScalePattern />
      <WindsurfWaves color="#c9944a" opacity={0.05} speed={0.3} />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="flex items-center gap-2.5 mb-4" data-testid="link-footer-logo">
              <div className="w-9 h-9 rounded-full bg-[#a0783a] flex items-center justify-center scale-pulse">
                <Scissors className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-display text-xl font-semibold text-[#fdf8f0] block leading-none">Alpha Dogs</span>
                <span className="text-[10px] font-medium text-[#c9944a] tracking-[0.15em] uppercase block mt-0.5">Boston</span>
              </div>
            </a>
            <p className="text-[#8b7660] text-sm leading-relaxed mb-5 max-w-xs">Boston's premier boutique dog grooming studio. Expert care, premium products, and genuine love for every dog.</p>
            <div className="flex gap-3">
              {[
                { href: "https://instagram.com", icon: <Instagram className="w-4 h-4" />, label: "Instagram", testid: "link-instagram-footer" },
                { href: "https://facebook.com", icon: <Facebook className="w-4 h-4" />, label: "Facebook", testid: "link-facebook-footer" },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/5 hover:bg-[#a0783a]/30 flex items-center justify-center text-[#b5a090] hover:text-[#c9944a] transition-all antigravity-float" style={{ animationDuration: "5s" }} aria-label={s.label} data-testid={s.testid}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[#fdf8f0] font-semibold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s.name}>
                  <a href="#services" className="text-[#8b7660] hover:text-[#c9944a] text-sm transition-colors underline-wave" data-testid={`link-footer-service-${s.name.toLowerCase().replace(/\s+/g, "-")}`}>
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
                  <a href={l.href} className="text-[#8b7660] hover:text-[#c9944a] text-sm transition-colors underline-wave" data-testid={`link-footer-nav-${l.label.toLowerCase().replace(/\s+/g, "-")}`}>
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
                <Phone className="w-4 h-4 text-[#c9944a]" />{PHONE}
              </a>
              <div className="flex items-start gap-2.5 text-[#8b7660] text-sm">
                <MapPin className="w-4 h-4 text-[#c9944a] flex-shrink-0 mt-0.5" />
                <span>{ADDRESS}</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#8b7660] text-sm">
                <Clock className="w-4 h-4 text-[#c9944a] flex-shrink-0 mt-0.5" />
                <span>Mon–Fri: 8am–7pm<br />Sat: 8am–6pm<br />Sun: 10am–4pm</span>
              </div>
            </div>
            <a href={BOOKING_URL} className="cta-button-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold neon-bronze" data-testid="button-book-footer">
              <Calendar className="w-3.5 h-3.5" />Book Now
            </a>
          </div>
        </div>

        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#6b5740] text-xs">© {new Date().getFullYear()} Alpha Dogs Boston. All rights reserved.</p>
          <p className="text-[#6b5740] text-xs">147 Newbury St, Boston, MA · Professional Dog Grooming</p>
        </div>
      </div>
    </footer>
  );
}

export default function Home() {
  useReveal();
  const scrollProgress = useScrollProgress();

  return (
    <div className="min-h-screen bg-[#faf8f3]">
      <div
        className="progress-bar"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
        aria-hidden="true"
      />
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
