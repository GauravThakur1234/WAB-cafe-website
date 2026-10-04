"use client"
import React, { useState, useEffect, useRef} from 'react';
import { 
  Coffee, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Search, 
  X, 
  ChevronRight, 
  Menu, 
  Award, 
  Sparkles, 
  Heart, 
  Send, 
  CheckCircle2, 
  Play,
  Navigation, 
  ExternalLink, 
  Eye, 
  Utensils, 
  Smile, 
  Users, 
  Flame, 
  Filter,
  MessageSquare,
  Share2,
  Compass,
  ArrowRight
} from 'lucide-react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface MenuItem {
  id: string;
  name: string;
  category: string;
  badge: string;
  description: string;
  tastingNotes: string;
  ingredients: string;
  image: string;
  featured: boolean;
  prepTime: string;
  pairWith: string;
  price?: string;
}

interface GalleryImage {
  id: number;
  title: string;
  category: string;
  image: string;
  caption: string;
}

// Signature coffee and food item catalog with rich metadata
const MENU_ITEMS: MenuItem[] = [
  {
    id: 'c1',
    name: 'Pistachio Latte',
    category: 'Specialty Coffee',
    badge: 'Signature Brew',
    description: 'Smooth espresso infused with velvety pistachio cream and fine crushed pistachios.',
    tastingNotes: 'Nutty, Velvety Microfoam, Sweet Espresso Finish',
    ingredients: 'Double shot Arabica espresso, steamed full-cream milk, artisanal pistachio paste, crushed Iranian pistachios.',
    image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80&w=800',
    featured: true,
    prepTime: '4-6 mins',
    pairWith: 'Fresh French Toast'
  },
  {
    id: 'c2',
    name: 'Mishti Doi Latte',
    category: 'Specialty Coffee',
    badge: 'Bengal Fusion Icon',
    description: 'An inventive signature twist combining traditional Bengal sweet curd undertones with bold espresso.',
    tastingNotes: 'Caramelized Sweetness, Creamy Yogurt Tang, Bold Dark Roast',
    ingredients: 'Specialty espresso roast, cultured sweet doi reduction, velvety foam, touch of cardamom spice.',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=80&w=800',
    featured: true,
    prepTime: '5-7 mins',
    pairWith: 'Authentic Neapolitan Pizza'
  },
  {
    id: 'c3',
    name: 'Classic Cappuccino',
    category: 'Specialty Coffee',
    badge: 'Barista Essential',
    description: 'Classic, velvety microfoam poured over rich double-shot Arabica espresso.',
    tastingNotes: 'Balanced Cocoa, Silky Milk Texture, Crisp Espresso Body',
    ingredients: '100% Single-origin Arabica, steam-stretched microfoam milk, dark cocoa dusting.',
    image: 'https://images.unsplash.com/photo-1572442388796-11668ba69e54?auto=format&fit=crop&q=80&w=800',
    featured: true,
    prepTime: '3-5 mins',
    pairWith: 'Juicy Cheesy Burger'
  },
  {
    id: 'f1',
    name: 'Authentic Neapolitan Pizza',
    category: 'Neapolitan Pizzas',
    badge: 'In-Store Favorite',
    description: 'Wood-fired style crust with rich San Marzano tomato sauce, fresh mozzarella, and aromatic basil.',
    tastingNotes: 'Smoky Charred Crust, Rich Tangy Tomato, Melted Fior di Latte',
    ingredients: '48-hour fermented Italian flour dough, crushed San Marzano tomatoes, fresh mozzarella, extra virgin olive oil, fresh basil leaves.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800',
    featured: true,
    prepTime: '12-15 mins',
    pairWith: 'Mishti Doi Latte'
  },
  {
    id: 'f2',
    name: 'Juicy Cheesy Burger',
    category: 'Gourmet Burgers',
    badge: 'Chef Special',
    description: 'Crafted artisanal brioche bun loaded with a juicy gourmet patty, melted cheddar, and secret WAB sauce.',
    tastingNotes: 'Savory Umami, Buttery Toast, Creamy Tangy Glaze',
    ingredients: 'Handcrafted toasted brioche bun, double-seared gourmet patty, aged cheddar cheese slice, caramelized onions, crisp iceberg, house secret WAB sauce.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    featured: true,
    prepTime: '10-12 mins',
    pairWith: 'Cold Brew or Cappuccino'
  },
  {
    id: 'f3',
    name: 'Fresh French Toast',
    category: 'Bowls & Toast',
    badge: 'Morning Classic',
    description: 'Thick golden brioche slices caramelized in cinnamon butter, topped with fresh berries and maple drizzle.',
    tastingNotes: 'Caramel Cinnamon, Soft Custard Interior, Tart Fresh Berries',
    ingredients: 'Thick-cut milk brioche, Madagascar vanilla custard bath, organic maple syrup, wild blueberries, strawberries, powdered sugar.',
    image: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&q=80&w=800',
    featured: true,
    prepTime: '8-10 mins',
    pairWith: 'Pistachio Latte'
  },
  {
    id: 'f4',
    name: 'Mexican Burrito',
    category: 'Bowls & Toast',
    badge: 'Hearty Pick',
    description: 'Packed with seasoned rice, slow-cooked black beans, charred corn salsa, and fresh guacamole.',
    tastingNotes: 'Smoky Chipotle Heat, Zesty Lime, Creamy Guacamole',
    ingredients: 'Large flour tortilla, cilantro-lime basmati rice, spiced black beans, charred sweet corn salsa, smashed Hass avocado, sour cream drizzle.',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&q=80&w=800',
    featured: false,
    prepTime: '8-10 mins',
    pairWith: 'Iced Americano'
  },
  {
    id: 'f5',
    name: 'Chipotle Bowl',
    category: 'Bowls & Toast',
    badge: 'Nutritious & Fresh',
    description: 'Nutritious quinoa base topped with grilled smoky chipotle vegetables, fresh salsa, and cilantro-lime dressing.',
    tastingNotes: 'Clean Earthy Grains, Zesty Pico de Gallo, Smoky Grilled Roast',
    ingredients: 'Tri-color organic quinoa, fire-roasted fajita bell peppers & onions, pico de gallo salsa, roasted pumpkin seeds, house cilantro-lime emulsion.',
    image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&q=80&w=800',
    featured: false,
    prepTime: '10 mins',
    pairWith: 'Pistachio Latte'
  }
];

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    title: 'Warm Welcoming Interiors',
    category: 'Café Ambience',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1000',
    caption: 'Designed with comfortable plush seating, ambient gold accent lighting, and green aesthetic corners.'
  },
  {
    id: 2,
    title: 'Artisanal Latte Pour',
    category: 'Coffee & Brews',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=1000',
    caption: 'Our expert baristas craft every single cup with single-origin Arabica beans and silky microfoam.'
  },
  {
    id: 3,
    title: 'Wood-Fired Neapolitan Pizza',
    category: 'Gourmet Food',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=1000',
    caption: 'Baked fresh at high heat for that perfect blistered leoparding and authentic Italian taste.'
  },
  {
    id: 4,
    title: 'Casual Catchup Tables',
    category: 'Café Ambience',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1000',
    caption: 'Spacious seating curated for intimate coffee dates, work sessions, or family weekend hangouts.'
  },
  {
    id: 5,
    title: 'Pistachio & Specialty Coffees',
    category: 'Coffee & Brews',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1000',
    caption: 'Signature milk creations crafted to delight both coffee purists and adventurous palates.'
  },
  {
    id: 6,
    title: 'Gourmet Burger Platter',
    category: 'Gourmet Food',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=1000',
    caption: 'Served with golden potato wedges and house-prepared savory dips.'
  }
];

const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Yash Verma',
    rating: 5,
    date: 'Recent Google Review',
    comment: 'Nice ambience and delicious coffee! The perfect spot in Palwal to hang out with friends.',
    avatar: 'YV',
    tag: 'Local Guide'
  },
  {
    id: 2,
    name: 'Rohan JM',
    rating: 5,
    date: 'Recent Google Review',
    comment: 'Tasty food and great overall experience. The Neapolitan pizza and Mishti Doi Latte are absolute must-tries!',
    avatar: 'RJ',
    tag: 'Food Enthusiast'
  },
  {
    id: 3,
    name: 'Valid Ahmad',
    rating: 5,
    date: 'Recent Google Review',
    comment: 'Good service, friendly staff, and great environment. Really comfortable place for family gatherings.',
    avatar: 'VA',
    tag: 'Verified Guest'
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuFilter, setMenuFilter] = useState('All Items');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFood, setSelectedFood] = useState<MenuItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState('All Photos');
  const [selectedGalleryImg, setSelectedGalleryImg] = useState<GalleryImage | null>(null);
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', phone: '', note: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Filter menu items based on tab & search query
  const filteredMenuItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      menuFilter === 'All Items' ? true : item.category === menuFilter;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Filter gallery items
  const filteredGallery = GALLERY_IMAGES.filter((img) => {
    if (galleryFilter === 'All Photos') return true;
    return img.category === galleryFilter;
  });

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (contactForm.name && contactForm.phone) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: '', phone: '', note: '' });
      }, 5000);
    }
  };
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // GSAP Context for cleanup and scoping
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Cinematic Background Reveal
      tl.fromTo(
        ".hero-bg",
        { scale: 1.15, opacity: 0, filter: "blur(10px)" },
        { scale: 1.05, opacity: 0.4, filter: "blur(0px)", duration: 2.5, ease: "power3.out" }
      );

      // 2. Staggered Text Reveal
      tl.fromTo(
        ".reveal-up",
        { y: 60, opacity: 0, clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
        { 
          y: 0, 
          opacity: 1, 
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", 
          stagger: 0.15, 
          duration: 1.2 
        },
        "-=1.8"
      );

      // 3. Image Card 3D Slide In
      tl.fromTo(
        ".hero-card",
        { x: 100, y: 50, opacity: 0, rotationY: 15, scale: 0.9 },
        { x: 0, y: 0, opacity: 1, rotationY: 0, scale: 1, duration: 1.5, ease: "expo.out" },
        "-=1.2"
      );

      // 4. Floating Badge Pop In
      tl.fromTo(
        ".floating-badge",
        { scale: 0, rotation: -20, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" },
        "-=0.8"
      );

      // 5. Continuous Floating Animation for the Card and Badge
      gsap.to(".hero-card-wrapper", {
        y: -15,
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2
      });
      
      gsap.to(".floating-badge", {
        y: 10,
        rotation: 2,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 2.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Image Parallax & Reveal
      gsap.fromTo(
        ".about-image-wrapper",
        { y: 100, opacity: 0, clipPath: "inset(20% 0% 20% 0% round 30px)" },
        {
          y: 0,
          opacity: 1,
          clipPath: "inset(0% 0% 0% 0% round 30px)",
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // Inner image slight scale effect for premium feel
      gsap.fromTo(
        imageRef.current,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        }
      );

      // 2. Floating Badge Animation (Pop and Float)
      const badgeTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-image-wrapper",
          start: "top 60%",
        },
      });
      badgeTl.fromTo(
        ".about-badge",
        { scale: 0, rotation: 15, opacity: 0 },
        { scale: 1, rotation: 0, opacity: 1, duration: 1, ease: "back.out(1.5)" }
      );
      
      // Continuous float
      gsap.to(".about-badge", {
        y: -12,
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        delay: 1, // Start after entrance animation
      });

      // 3. Staggered Text Reveal
      gsap.fromTo(
        ".about-text-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-text-content",
            start: "top 80%",
          },
        }
      );

      // 4. Feature Cards Stagger In
      gsap.fromTo(
        ".feature-card",
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".feature-grid",
            start: "top 85%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans antialiased selection:bg-amber-500 selection:text-stone-900">
      
      {}
      <header className="sticky top-0 z-40 bg-emerald-950/95 backdrop-blur-md border-b border-emerald-900/60 shadow-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="cursor-pointer flex items-center space-x-3 group"
          >
            <div className="w-20 h-20 py-5 rounded-xlflex items-center justify-center transition-transform">
              <img src="https://res.cloudinary.com/dwzeamxpa/image/upload/v1791102524/image-removebg-preview_tumkts.png" alt="" />
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-wide text-white font-serif flex items-center gap-1.5">
                WAB COFFEE CO.
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900 text-amber-300 font-sans font-semibold border border-amber-400/30">
                  PALWAL
                </span>
              </div>
              <p className="text-xs text-emerald-300/80 tracking-widest uppercase">Specialty Café & Dining</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7 text-sm font-medium">
            {[
              { name: 'About', id: 'about' },
              { name: 'Signature Coffees', id: 'coffees' },
              { name: 'Gourmet Food', id: 'menu' },
              { name: 'Gallery', id: 'gallery' },
              { name: 'Reviews', id: 'reviews' },
              { name: 'Location', id: 'location' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-stone-300 hover:text-amber-400 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-400 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* CTA Header Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => scrollToSection('location')}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-bold text-sm shadow-md hover:shadow-amber-500/20 hover:from-amber-400 hover:to-amber-500 active:scale-95 transition-all"
            >
              <Navigation className="w-4 h-4 fill-emerald-950" />
              Visit Us
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-emerald-900/60 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-emerald-950 border-b border-emerald-800/80 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-300 shadow-2xl">
            {[
              { name: 'Home', id: 'hero' },
              { name: 'About WAB', id: 'about' },
              { name: 'Signature Coffees', id: 'coffees' },
              { name: 'Gourmet Food Menu', id: 'menu' },
              { name: 'Gallery & Ambience', id: 'gallery' },
              { name: 'Guest Reviews', id: 'reviews' },
              { name: 'Location & Map', id: 'location' },
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left py-2.5 text-base font-medium text-stone-200 hover:text-amber-400 border-b border-emerald-900/40"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => scrollToSection('location')}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-500 text-emerald-950 font-bold shadow-lg"
              >
                <MapPin className="w-5 h-5" />
                Get Directions to Café
              </button>
            </div>
          </div>
        )}
      </header>

      {}
      <section 
      ref={containerRef} 
      id="hero" 
      className="relative bg-emerald-950 overflow-hidden min-h-[95vh] flex items-center perspective-[1000px]"
    >
      {/* 
        Background Architecture 
        Using layered gradients over an unspalsh image for a premium cinematic depth 
      */}
      <div className="absolute inset-0 z-0 bg-emerald-950">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=2000"
          alt="Premium Café Ambience"
          className="hero-bg w-full h-full object-cover object-center mix-blend-overlay"
        />
        {/* Radial vignette for focus */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#022c22_100%)] opacity-80" />
        {/* Linear gradients for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-emerald-950/30" />
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-[1400px] w-full mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          
          {/* --- LEFT COLUMN: Typography & CTAs --- */}
          <div className="lg:col-span-7 space-y-10 text-center lg:text-left pt-10">
            
            {/* Status Pill */}
            <div className="reveal-up inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_10px_#10b981]"></span>
              </span>
              <span className="text-white text-sm font-medium tracking-wide">Open Daily till 11:30 PM</span>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <span className="text-emerald-200 text-sm font-medium">Agra Chowk, Palwal</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-6">
              <h1 className="reveal-up text-5xl sm:text-6xl lg:text-7xl xl:text-[5rem] font-black tracking-tight text-white font-serif leading-[1.05]">
                Where Exceptional Coffee Meets <br className="hidden lg:block" />
                <span className="relative inline-block mt-2">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-100 to-white">
                    Great Food.
                  </span>
                  {/* Decorative underline */}
                  <svg className="absolute w-full h-4 -bottom-1 left-0 text-emerald-500 opacity-80" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.00015 6.64368C48.0642 1.48705 151.782 -2.15857 197.922 7.02706" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                  </svg>
                </span>
              </h1>
              <p className="reveal-up text-lg sm:text-xl text-emerald-50/80 font-light leading-relaxed max-w-2xl mx-auto lg:mx-0">
                A premium café experience in the heart of Palwal. Designed for morning coffees, casual meals, relaxed catch-ups, and unforgettable moments.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="reveal-up flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
              <button
                className="group relative w-full sm:w-auto px-8 py-4 rounded-full bg-white text-emerald-950 font-bold text-base shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Utensils className="w-5 h-5" />
                  Explore Our Menu
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <button
                className="group w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-900/40 hover:bg-emerald-800/60 text-white font-medium text-base border border-emerald-500/30 backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1"
              >
                <span className="bg-emerald-500/20 p-1.5 rounded-full group-hover:bg-emerald-500/40 transition-colors">
                  <Navigation className="w-4 h-4 text-white" />
                </span>
                Get Directions
              </button>
            </div>

            {/* Google Reviews Trust Section */}
            <div className="reveal-up pt-8 mt-4 border-t border-emerald-800/50 flex flex-wrap items-center justify-center lg:justify-start gap-8">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {/* Mock user avatars for social proof */}
                  {['1534528741775-53994a69daeb', '1506863530036-1ef0ebce29ca', '1531746020798-e6953c6e8e04'].map((id, i) => (
                    <img key={i} className="w-10 h-10 rounded-full border-2 border-emerald-950 object-cover" src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=100&q=80`} alt="Reviewer" />
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-950 bg-emerald-800 flex items-center justify-center text-xs font-bold text-white">
                    99+
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />)}
                  </div>
                  <div className="text-white text-sm font-semibold">
                    4.8 Rating <span className="text-emerald-300/60 font-normal">on Google</span>
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-10 bg-emerald-800/50" />
              
              <div className="flex items-center gap-3 text-emerald-100">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm">
                  <Award className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-sm font-medium">
                  Premium Quality <br />
                  <span className="text-emerald-300/60 font-normal">₹200–₹400 for two</span>
                </div>
              </div>
            </div>

          </div>

          {/* --- RIGHT COLUMN: Visual Showcase --- */}
          <div className="lg:col-span-5 relative w-full aspect-square sm:aspect-[4/5] lg:aspect-auto lg:h-[700px] flex items-center justify-center">
            
            <div className="hero-card-wrapper relative w-full max-w-[420px]">
              
              {/* Soft glow behind the card */}
              <div className="absolute inset-0 bg-emerald-500 rounded-[2.5rem] blur-[80px] opacity-20" />
              
              {/* Main Glass/Image Card */}
              <div className="hero-card relative z-10 rounded-[2rem] overflow-hidden border border-white/10 bg-emerald-900/20 backdrop-blur-md shadow-2xl p-3">
                <div className="relative rounded-[1.5rem] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=800"
                    alt="WAB Signature Coffee"
                    className="w-full h-[400px] sm:h-[500px] object-cover transform scale-105 hover:scale-100 transition-transform duration-1000 ease-out"
                  />
                  
                  {/* Overlay Gradient on Image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/40 to-transparent" />
                  
                  {/* Card Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold uppercase tracking-wider mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Signature Menu
                    </div>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-1">Pistachio Latte</h3>
                        <p className="text-emerald-50/80 text-sm line-clamp-2">
                          Smooth espresso infused with velvety pistachio cream and fine crushed nuts.
                        </p>
                      </div>
                      <button className="flex-shrink-0 w-12 h-12 rounded-full bg-white text-emerald-950 flex items-center justify-center hover:scale-110 transition-transform">
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Community Badge */}
              <div className="floating-badge absolute -bottom-8 -left-4 sm:-left-12 z-20 bg-white p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center relative">
                  {/* Decorative rotating dashed border */}
                  <div className="absolute inset-0 border-2 border-dashed border-emerald-300 rounded-full animate-[spin_10s_linear_infinite]" />
                  <Users className="w-5 h-5 relative z-10" />
                </div>
                <div className="pr-2">
                  <div className="text-[10px] text-emerald-600/80 uppercase tracking-widest font-bold mb-0.5">Top Rated</div>
                  <div className="text-sm font-black text-emerald-950">Community Favorite</div>
                </div>
              </div>
              
              {/* Play Video Button Element */}
              <div className="floating-badge absolute top-12 -right-4 sm:-right-8 z-20 group cursor-pointer">
                <div className="relative w-16 h-16 rounded-full bg-emerald-900/80 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-xl overflow-hidden hover:bg-emerald-800 transition-colors">
                  <Play className="w-6 h-6 text-white ml-1" />
                  {/* Ripple effect */}
                  <div className="absolute inset-0 rounded-full border border-white/50 animate-ping" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>

      {}
      <section 
      id="about" 
      ref={containerRef} 
      className="relative py-24 lg:py-32 bg-white text-emerald-950 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-emerald-50/50 blur-3xl" />
        <div className="absolute bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-emerald-50/50 blur-3xl" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* --- Left Image Showcase Column --- */}
          <div className="lg:col-span-6 relative">
            {/* Background offset architectural frame */}
            <div className="absolute inset-0 bg-emerald-900 rounded-[2rem] transform translate-x-4 translate-y-4 opacity-10" />
            
            <div className="about-image-wrapper relative rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(2,44,34,0.15)] border border-emerald-100 bg-emerald-50">
              <img
                ref={imageRef}
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=1200"
                alt="WAB Coffee Co Ambience Interiors"
                className="w-full h-[500px] lg:h-[650px] object-cover"
              />
              {/* Elegant internal gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/90 via-emerald-950/20 to-transparent" />
              
              {/* Image bottom typography */}
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-[1px] bg-amber-400" />
                  <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-bold">Agra Chowk, Palwal</p>
                </div>
                <p className="text-2xl lg:text-3xl font-serif font-bold leading-snug max-w-sm">
                  Designed for Warm Moments & Casual Gatherings
                </p>
              </div>
            </div>

            {/* Accent Floating Badge */}
            <div className="about-badge hidden sm:flex absolute -top-8 -right-8 bg-emerald-950/95 backdrop-blur-md text-white p-6 rounded-[1.5rem] shadow-2xl border border-emerald-700/50 max-w-[260px] flex-col space-y-3">
              <div className="flex text-amber-400 gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                ))}
              </div>
              <p className="text-sm font-medium text-emerald-50 leading-relaxed italic">
                "From one to all, there’s always a place for you at WAB."
              </p>
              <div className="w-10 h-10 absolute -bottom-4 -left-4 bg-amber-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <Sparkles className="w-4 h-4 text-emerald-950" />
              </div>
            </div>
          </div>

          {/* --- Right Narrative Column --- */}
          <div className="about-text-content lg:col-span-6 space-y-10 pt-8 lg:pt-0">
            
            {/* Headers */}
            <div className="space-y-5">
              <div className="about-text-reveal inline-flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-bold uppercase tracking-[0.15em] text-emerald-600">
                  Welcome To WAB Coffee Co.
                </span>
              </div>
              <h2 className="about-text-reveal text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-emerald-950 font-serif leading-[1.1] tracking-tight">
                From one to all, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-950">
                  there’s a place for you.
                </span>
              </h2>
            </div>

            {/* Paragraphs */}
            <div className="space-y-6">
              <p className="about-text-reveal text-emerald-900/70 text-lg leading-relaxed font-light">
                Situated prominently near HDFC Bank at Agra Chowk in Panchwati Colony, WAB Coffee Co. brings a refined, high-end café culture to Palwal. We created WAB with a simple promise: to offer an inviting, beautiful space where premium artisanal coffee meets freshly prepared gourmet food.
              </p>
              
              <p className="about-text-reveal text-emerald-900/70 text-lg leading-relaxed font-light">
                Whether you are dropping in alone for your morning espresso ritual, holding a relaxed business conversation, or catching up over wood-fired style pizzas with your family, our café is tailored for warm, welcoming hospitality.
              </p>
            </div>

            {/* 4 Feature Value Highlights */}
            <div className="feature-grid grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4">
              {[
                {
                  title: 'Artisanal Coffee',
                  desc: 'Brewed from ethically sourced 100% Arabica beans.',
                  icon: Coffee,
                },
                {
                  title: 'Fresh Food',
                  desc: 'Made to order with premium, fresh ingredients.',
                  icon: Utensils,
                },
                {
                  title: 'Plush Ambience',
                  desc: 'Beautiful interiors designed for your relaxation.',
                  icon: Smile,
                },
                {
                  title: 'Warm Hospitality',
                  desc: 'Attentive service to make you feel right at home.',
                  icon: Heart,
                },
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="feature-card group flex items-start space-x-4 p-4 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.08)] transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-950 text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-emerald-700/60 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Action CTA */}
            <div className="about-text-reveal pt-6">
              <button
                onClick={() => scrollToSection('menu')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-emerald-950 text-white font-semibold overflow-hidden shadow-[0_10px_20px_rgba(2,44,34,0.2)] hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-emerald-900 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10">Discover Signature Brews</span>
                <span className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-emerald-950 transition-colors duration-300">
                  <ChevronRight className="w-4 h-4" />
                </span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>

      {}
      <section id="coffees" className="py-24 bg-emerald-950 text-white relative overflow-hidden">
        {/* Subtle Decorative Background Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-emerald-900/80 border border-amber-400/20">
              Barista Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white">
              Artisanal Coffee Collection
            </h2>
            <p className="text-stone-300 text-base sm:text-lg">
              Handcrafted coffee brewed from premium beans to start your morning or elevate your evening.
            </p>
          </div>

          {/* 3 Featured Signature Coffees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MENU_ITEMS.filter((item) => item.category === 'Specialty Coffee').map((coffee) => (
              <div
                key={coffee.id}
                className="group rounded-2xl bg-emerald-900/50 border border-emerald-800/80 hover:border-amber-400/50 overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={coffee.image}
                      alt={coffee.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-emerald-950 shadow-md">
                        {coffee.badge}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 bg-emerald-950/90 text-amber-300 font-extrabold px-3 py-1 rounded-lg text-lg border border-emerald-700/60 shadow-lg">
                      {coffee.price}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-2xl font-bold font-serif text-white group-hover:text-amber-300 transition-colors">
                      {coffee.name}
                    </h3>
                    <p className="text-stone-300 text-sm leading-relaxed">
                      {coffee.description}
                    </p>
                    <div className="pt-2 border-t border-emerald-800/60">
                      <p className="text-xs text-amber-400/90 font-medium">
                        <span className="text-stone-400 uppercase font-semibold text-[10px] block">Flavor Notes:</span>
                        {coffee.tastingNotes}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => setSelectedFood(coffee)}
                    className="w-full py-2.5 rounded-xl bg-emerald-950 hover:bg-amber-500 hover:text-emerald-950 text-stone-200 border border-emerald-700 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details & Pairing
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="menu" className="py-24 bg-white text-stone-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-900 px-3.5 py-1.5 rounded-md bg-emerald-100">
              Culinary Delights
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
              Freshly Prepared Food Menu
            </h2>
            <p className="text-stone-600 text-base sm:text-lg">
              From authentic wood-fired style pizzas to juicy burgers and wholesome bowls. Visit us in-store to dine in or enjoy at the outlet.
            </p>
          </div>

          {/* Search & Category Filter Control Bar */}
          <div className="space-y-6 mb-12">
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pizzas, burgers, toasts, lattes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-stone-50 border border-stone-300 text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-900 focus:border-transparent text-sm transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
              {[
                'All Items',
                'Specialty Coffee',
                'Neapolitan Pizzas',
                'Gourmet Burgers',
                'Bowls & Toast',
              ].map((category) => (
                <button
                  key={category}
                  onClick={() => setMenuFilter(category)}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 ${
                    menuFilter === category
                      ? 'bg-emerald-950 text-white shadow-md scale-105'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

          </div>

          {/* Menu Item Grid */}
          {filteredMenuItems.length === 0 ? (
            <div className="text-center py-16 bg-stone-50 rounded-2xl border border-stone-200 max-w-md mx-auto">
              <Utensils className="w-12 h-12 text-stone-300 mx-auto mb-3" />
              <p className="text-stone-700 font-bold">No menu items found</p>
              <p className="text-stone-500 text-xs mt-1">Try clearing your search query or switching tabs.</p>
              <button
                onClick={() => {
                  setMenuFilter('All Items');
                  setSearchQuery('');
                }}
                className="mt-4 px-4 py-2 bg-emerald-950 text-white text-xs font-semibold rounded-lg"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenuItems.map((item) => (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-white border border-stone-200 hover:border-emerald-800/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden"
                >
                  <div>
                    {/* Item Photo */}
                    <div className="relative h-56 overflow-hidden bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-950 text-amber-300 shadow-md">
                          {item.badge}
                        </span>
                      </div>
                    </div>

                    {/* Item Body */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-xl font-bold font-serif text-stone-900 group-hover:text-emerald-950 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                      <p className="text-stone-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Item Footer Button */}
                  <div className="p-6 pt-0">
                    <button
                      onClick={() => setSelectedFood(item)}
                      className="w-full py-2.5 rounded-xl bg-stone-100 hover:bg-emerald-950 hover:text-white text-stone-800 font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 border border-stone-200"
                    >
                      <Eye className="w-4 h-4 text-emerald-800 group-hover:text-amber-400" />
                      View Details & Ingredients
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Static Notice Note */}
          <div className="mt-16 p-6 rounded-2xl bg-stone-50 border border-stone-200 text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <MapPin className="w-4 h-4" />
              In-Store Counter Ordering Only
            </div>
            <p className="text-stone-600 text-xs leading-relaxed">
              Our food and coffee are freshly prepared to order at our physical café counter at Agra Chowk, Palwal. Visit us today to experience the full menu!
            </p>
          </div>

        </div>
      </section>

      {}
      <section id="gallery" className="py-24 bg-stone-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 px-3 py-1 rounded-full bg-emerald-900/60 border border-amber-400/20">
              The WAB Experience
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white">
              Gallery & Ambience
            </h2>
            <p className="text-stone-300 text-base sm:text-lg">
              Take a look inside our Palwal outlet — designed for comfort, luxury aesthetics, and memorable moments.
            </p>
          </div>

          {/* Gallery Category Filter */}
          <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
            {['All Photos', 'Café Ambience', 'Coffee & Brews', 'Gourmet Food'].map((cat) => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  galleryFilter === cat
                    ? 'bg-amber-500 text-emerald-950 shadow-md'
                    : 'bg-emerald-950/80 text-stone-300 hover:text-white border border-emerald-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry / Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setSelectedGalleryImg(photo)}
                className="group relative h-72 rounded-2xl overflow-hidden border border-stone-800 bg-stone-950 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-4 left-4 right-4 space-y-1 transform group-hover:translate-y-0 transition-transform">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-amber-400/20">
                    {photo.category}
                  </span>
                  <h3 className="text-lg font-bold text-white font-serif">{photo.title}</h3>
                  <p className="text-xs text-stone-300 line-clamp-1">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {}
      <section id="reviews" className="py-24 bg-white text-stone-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-900 px-3.5 py-1.5 rounded-md bg-emerald-100">
                Loved By Palwal
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-stone-900">
                What Our Guests Say
              </h2>
              <p className="text-stone-600 text-base">
                Real feedback from our guests on Google Maps. We take immense pride in delivering top-tier coffee, food, and hospitality.
              </p>
            </div>

            {/* Google Score Summary Box */}
            <div className="bg-stone-50 border border-stone-200 p-6 rounded-2xl flex items-center gap-5 shrink-0 shadow-sm">
              <div className="text-center border-r border-stone-200 pr-5">
                <div className="text-3xl font-extrabold text-stone-900">4.8</div>
                <div className="flex text-amber-400 text-xs mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm font-bold text-stone-900">Google Verified Rating</div>
                <div className="text-xs text-stone-500 mt-0.5">Based on 114+ Customer Reviews</div>
              </div>
            </div>
          </div>

          {/* 3 Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS_DATA.map((rev) => (
              <div
                key={rev.id}
                className="p-8 rounded-2xl bg-stone-50 border border-stone-200/90 shadow-sm hover:shadow-md transition-shadow space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex text-amber-400 gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                      {rev.tag}
                    </span>
                  </div>
                  <p className="text-stone-700 text-sm sm:text-base italic leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-200/80 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-950 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0">
                    {rev.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900">{rev.name}</div>
                    <div className="text-xs text-stone-400">{rev.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=WAB+Coffee+Co+Palwal+Agra+Chowk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-950 text-white font-bold text-sm hover:bg-emerald-900 transition-colors shadow-md"
            >
              <ExternalLink className="w-4 h-4 text-amber-400" />
              View All 114 Reviews on Google Maps
            </a>
          </div>

        </div>
      </section>

      {}
      <section id="location" className="py-24 bg-emerald-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Address & Details Info */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300 px-3 py-1 rounded-full bg-emerald-950 border border-amber-400/20">
                  Visit Outlet
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif text-white">
                  Find Us in Palwal
                </h2>
                <p className="text-stone-200 text-base sm:text-lg">
                  Conveniently situated at Agra Chowk in Panchwati Colony with easy parking and comfortable seating.
                </p>
              </div>

              {/* Detail Blocks */}
              <div className="space-y-4">
                
                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Address</h3>
                    <p className="text-stone-200 text-sm mt-0.5">
                      Ground Floor, Agra Chowk, near HDFC Bank, Panchwati Colony, Palwal, Haryana 121102
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Operating Hours</h3>
                    <p className="text-stone-200 text-sm mt-0.5">
                      Open Daily | Closes at <span className="text-amber-300 font-semibold">11:30 PM</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-700/60 flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Direct Call</h3>
                    <a
                      href="tel:09599251516"
                      className="text-amber-300 font-bold text-base hover:underline mt-0.5 block"
                    >
                      095992 51516
                    </a>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=WAB+Coffee+Co+Palwal+Agra+Chowk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-emerald-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition-transform active:scale-95"
                >
                  <Navigation className="w-4 h-4 fill-emerald-950" />
                  Get Directions on Google Maps
                </a>
                <a
                  href="tel:09599251516"
                  className="px-6 py-3.5 rounded-xl bg-emerald-950 hover:bg-emerald-950/80 text-white border border-emerald-700 font-bold text-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  Call Café
                </a>
              </div>

            </div>

            {/* Simulated Interactive Map Card */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-emerald-700/80 shadow-2xl bg-emerald-950 p-2">
                <div className="relative h-80 sm:h-96 rounded-xl overflow-hidden bg-stone-800 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000"
                    alt="Palwal Area Map Illustration"
                    className="w-full h-full object-cover opacity-60 filter contrast-125"
                  />
                  <div className="absolute inset-0 bg-emerald-950/40" />
                  
                  {/* Pin Callout */}
                  <div className="absolute z-10 bg-emerald-950 border border-amber-400/50 p-4 rounded-xl shadow-2xl max-w-xs text-center space-y-2 animate-bounce">
                    <div className="w-48 h-48 rounded-full flex items-center justify-center mx-auto font-bold shadow-md">
                      <img src="https://res.cloudinary.com/dwzeamxpa/image/upload/v1791102524/image-removebg-preview_tumkts.png" alt="" />
                    </div>
                    <div className="text-white font-bold text-sm font-serif">WAB Coffee Co.</div>
                    <div className="text-stone-300 text-xs">Agra Chowk, near HDFC Bank, Palwal</div>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/90 backdrop-blur-md p-3 rounded-lg text-xs text-stone-300 flex items-center justify-between border border-emerald-800">
                    <span className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                      <Compass className="w-4 h-4 text-amber-400" /> Panchwati Colony, Palwal
                    </span>
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=WAB+Coffee+Co+Palwal+Agra+Chowk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                    >
                      Open Map <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>
      {}
      <footer className="bg-emerald-950 text-stone-300 border-t border-emerald-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Brand Summary */}
            <div className="md:col-span-5 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-52 h-52 rounded-xl flex items-center justify-center font-bold">
                  <img src="https://res.cloudinary.com/dwzeamxpa/image/upload/v1791102524/image-removebg-preview_tumkts.png" alt="WAB Coffee Co." className="w-full h-full object-contain" />
                </div>
                <span className="text-xl font-extrabold text-white font-serif tracking-wide">
                  WAB COFFEE CO. | PALWAL
                </span>
              </div>
              <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
                Where exceptional coffee meets great food. A premium café experience in the heart of Palwal designed for warm moments with friends and family.
              </p>
              <p className="text-xs text-amber-300/80 font-medium italic">
                "From one to all, there’s always a place for you at WAB."
              </p>
            </div>

            {/* Quick Links */}
            <div className="md:col-span-3 space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Quick Navigation</h4>
              <ul className="space-y-2 text-xs">
                {['About', 'Signature Coffees', 'Gourmet Food', 'Gallery', 'Reviews', 'Location'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, ''))}
                      className="hover:text-amber-400 transition-colors"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Operating Details */}
            <div className="md:col-span-4 space-y-3">
              <h4 className="text-white font-bold text-sm uppercase tracking-wider">Café Information</h4>
              <div className="space-y-2 text-xs text-stone-300">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  Ground Floor, Agra Chowk, near HDFC Bank, Panchwati Colony, Palwal, Haryana 121102
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  Open Daily till 11:30 PM
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                  095992 51516
                </p>
              </div>
            </div>

          </div>

          <div className="border-t border-emerald-900/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
            <p>© {new Date().getFullYear()} WAB Coffee Co. | Palwal. All rights reserved.</p>
          </div>

        </div>
      </footer>

      {}
      {selectedFood && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-emerald-950 border border-emerald-800 text-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 overflow-hidden shrink-0">
              <img
                src={selectedFood.image}
                alt={selectedFood.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedFood(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-emerald-950/80 text-white hover:bg-emerald-900 transition-colors border border-emerald-700"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-emerald-950">
                  {selectedFood.category}
                </span>
              </div>
            </div>

            {/* Modal Details Scroll Content */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold font-serif text-white">{selectedFood.name}</h3>
                  <p className="text-amber-400 font-semibold text-sm mt-0.5">{selectedFood.badge}</p>
                </div>
                <div className="text-2xl font-black text-amber-300 bg-emerald-900/60 px-3 py-1 rounded-xl border border-emerald-700/60">
                  {selectedFood.price}
                </div>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed">
                {selectedFood.description}
              </p>

              <div className="space-y-4 pt-2 border-t border-emerald-900">
                <div>
                  <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider">Key Ingredients</h4>
                  <p className="text-stone-200 text-sm mt-1">{selectedFood.ingredients}</p>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase text-stone-400 tracking-wider">Flavor Profile</h4>
                  <p className="text-amber-300 text-sm font-medium mt-1">{selectedFood.tastingNotes}</p>
                </div>

                {selectedFood.pairWith && (
                  <div className="p-3.5 rounded-xl bg-emerald-900/40 border border-emerald-800 text-xs flex items-center justify-between">
                    <span className="text-stone-300 font-medium">Recommended Pairing:</span>
                    <span className="text-amber-300 font-bold">{selectedFood.pairWith}</span>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSelectedFood(null);
                    scrollToSection('location');
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-emerald-950 font-bold text-sm shadow-xl hover:from-amber-400 hover:to-amber-500 transition-all flex items-center justify-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Visit Outlet at Agra Chowk to Enjoy
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {}
      {selectedGalleryImg && (
        <div
          onClick={() => setSelectedGalleryImg(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full bg-emerald-950 border border-emerald-800 rounded-2xl overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedGalleryImg(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="max-h-[75vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedGalleryImg.image}
                alt={selectedGalleryImg.title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 bg-emerald-950 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-serif text-white">{selectedGalleryImg.title}</h3>
                <span className="text-xs font-semibold text-amber-400 bg-emerald-900 px-3 py-1 rounded-full">
                  {selectedGalleryImg.category}
                </span>
              </div>
              <p className="text-stone-300 text-sm">{selectedGalleryImg.caption}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}