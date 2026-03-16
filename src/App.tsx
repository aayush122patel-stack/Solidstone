import React, { useState, useEffect, useRef } from 'react';
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Clock, 
  Users, 
  Menu, 
  X,
  ArrowUpRight,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Wind,
  Zap,
  Droplets,
  Car,
  Trees
} from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';

// --- Types ---
interface Project {
  id: number;
  title: string;
  category: 'Ongoing' | 'Completed' | 'Upcoming';
  image: string;
  description: string;
  amenities: string[];
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    id: 1,
    title: "Stone Heights",
    category: "Ongoing",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
    description: "Luxury 2 & 3 BHK apartments with modern amenities and panoramic views.",
    amenities: ["24/7 Security", "Power Backup", "Gymnasium", "Swimming Pool"]
  },
  {
    id: 2,
    title: "Solid Residency",
    category: "Completed",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    description: "A premium residential complex delivered ahead of schedule, housing 200+ families.",
    amenities: ["Children's Play Area", "Jogging Track", "Intercom Facility", "Rainwater Harvesting"]
  },
  {
    id: 3,
    title: "The Grand Plaza",
    category: "Upcoming",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    description: "Upcoming commercial hub featuring state-of-the-art office spaces and retail outlets.",
    amenities: ["High-speed Elevators", "Central Air Conditioning", "Ample Parking", "Fire Safety Systems"]
  }
];

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Residential Development",
    description: "Crafting homes that blend luxury with comfort, designed for modern living.",
    icon: <Building2 className="w-8 h-8" />
  },
  {
    id: 2,
    title: "Commercial Spaces",
    description: "Building iconic business centers that drive growth and innovation.",
    icon: <ArrowUpRight className="w-8 h-8" />
  },
  {
    id: 3,
    title: "Redevelopment",
    description: "Transforming old structures into modern landmarks with enhanced value.",
    icon: <ShieldCheck className="w-8 h-8" />
  },
  {
    id: 4,
    title: "Consultancy",
    description: "Expert guidance on real estate investment and project management.",
    icon: <Users className="w-8 h-8" />
  }
];

const WHATSAPP_URL = "https://wa.me/918233135505";
const PHONE_NUMBER = "+91 8233135505";
const ADDRESS = "Suite 402, Hemkunt Tower, Nehru Place, New Delhi, Delhi 110019";

// --- Components ---

const Counter = ({ target, duration = 2000 }: { target: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const numericTarget = parseInt(target.replace(/[^0-9]/g, ''));
  const suffix = target.replace(/[0-9]/g, '');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * numericTarget));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [numericTarget, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rounded-lg">
            <Building2 className="text-white w-6 h-6" />
          </div>
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            SOLID<span className="text-emerald-500">STONE</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-emerald-500 ${isScrolled ? 'text-slate-600' : 'text-white/90'}`}
            >
              {link.name}
            </a>
          ))}
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20"
          >
            Enquire Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-slate-900' : 'text-white'} /> : <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  className="text-slate-600 font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-500 text-white py-3 rounded-xl font-semibold text-center"
              >
                Enquire Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://t3.ftcdn.net/jpg/04/53/98/02/360_F_453980244_inXbrVL4FUhxvkBK7DOF41oYpElUxcsZ.jpg" 
          alt="Indian High Rise Skyscraper" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl text-center"
        >
          <span className="inline-block px-4 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-full text-xs font-bold tracking-widest uppercase mb-6">
            Building Excellence Since 1997
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-oswald text-white leading-tight mb-6 uppercase tracking-tight">
            Crafting Spaces That <span className="italic text-emerald-400">Inspire</span> Living
          </h1>
          <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-2xl mx-auto">
            SolidStone Builders is a premier real estate developer dedicated to creating high-quality residential and commercial landmarks across the region.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a 
              href="#projects"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 group"
            >
              View Projects <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-800 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 border border-slate-700 group flex flex-col md:flex-row"
    >
      <div className="md:w-2/5 relative overflow-hidden h-64 md:h-[360px]">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            project.category === 'Ongoing' ? 'bg-blue-500 text-white' : 
            project.category === 'Completed' ? 'bg-emerald-500 text-white' : 
            'bg-amber-500 text-white'
          }`}>
            {project.category}
          </span>
        </div>
      </div>
      <div className="p-6 md:p-8 md:w-3/5 flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-slate-400 mb-8 leading-relaxed text-sm md:text-base">
            {project.description}
          </p>
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20 group/btn"
          >
            Enquire Now <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </a>
        </div>
        
        <div className="md:w-48 shrink-0 border-t md:border-t-0 md:border-l border-slate-700 pt-6 md:pt-0 md:pl-8">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Amenities</h4>
          <ul className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {project.amenities.map((amenity, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-slate-300 font-medium">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></div>
                <span className="truncate">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center rounded-lg">
              <Building2 className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              SOLID<span className="text-emerald-500">STONE</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">
            Redefining the skyline with integrity, innovation, and excellence. We build more than just structures; we build legacies.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><a href="#" className="hover:text-emerald-500 transition-colors">About Company</a></li>
            <li><a href="#projects" className="hover:text-emerald-500 transition-colors">Our Projects</a></li>
            <li><a href="#services" className="hover:text-emerald-500 transition-colors">Services</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-emerald-500 transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="leading-relaxed">{ADDRESS}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
              <span>{PHONE_NUMBER}</span>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
              <span className="break-all">info@solidstonebuilders.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold mb-6">Newsletter</h4>
          <p className="text-slate-400 text-sm mb-4">Subscribe to get latest project updates.</p>
          <div className="flex gap-2">
            <input 
              type="email" 
              placeholder="Your email" 
              className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button className="bg-emerald-500 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 text-center text-slate-500 text-xs">
        <p>© {new Date().getFullYear()} SolidStone Builders & Developers. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default function App() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <Hero />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:bg-emerald-600 transition-colors"
          >
            <ArrowUpRight className="w-6 h-6 rotate-[-45deg]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4 block">What We Do</span>
            <h2 className="text-4xl font-serif text-slate-900 mb-6">Comprehensive Real Estate Solutions</h2>
            <p className="text-slate-500">From conceptualization to keys, we provide end-to-end construction and development services tailored to your needs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <motion.div 
                key={service.id}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { label: 'Projects Delivered', value: '50+' },
              { label: 'Happy Families', value: '2500+' },
              { label: 'Years Experience', value: '25+' },
              { label: 'Acres Developed', value: '100+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-4xl font-bold text-emerald-500 mb-2">
                  <Counter target={stat.value} />
                </p>
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4 block">About SolidStone</span>
          <h2 className="text-4xl font-serif text-slate-900 mb-8 leading-tight">We Don't Just Build Houses, We Build <span className="text-emerald-500 italic">Dreams</span>.</h2>
          <p className="text-slate-600 mb-12 leading-relaxed text-lg">
            With over two decades of experience in the construction industry, SolidStone Builders has established itself as a name synonymous with trust and quality. Our commitment to excellence is reflected in every brick we lay and every space we design.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Clock className="w-6 h-6" />, title: 'Timely Delivery', desc: 'Projects handed over as promised.' },
              { icon: <ShieldCheck className="w-6 h-6" />, title: 'Quality Assurance', desc: 'Rigorous checks at every stage.' },
              { icon: <Building2 className="w-6 h-6" />, title: 'Modern Amenities', desc: 'Latest lifestyle features included.' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-emerald-600 font-bold text-xs uppercase tracking-widest mb-4 block">Our Portfolio</span>
            <h2 className="text-4xl font-serif text-white">Landmarks We've Created</h2>
          </div>

          <div className="flex flex-col gap-12 mb-16">
            {PROJECTS.map((project) => (
              <div key={project.id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-emerald-500 pb-1 hover:text-emerald-500 transition-colors group">
              View All Projects <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-20 bg-emerald-500 text-white">
              <span className="text-emerald-100 font-bold text-xs uppercase tracking-widest mb-4 block">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-serif mb-8">Ready to Find Your New Home?</h2>
              <p className="text-emerald-50/80 mb-12">Visit our office or reach out to us directly. Our property experts are ready to assist you.</p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100 mb-1 font-medium">Call Us</p>
                    <p className="text-lg md:text-xl font-bold">{PHONE_NUMBER}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-emerald-100 mb-1 font-medium">Email Us</p>
                    <p className="text-lg md:text-xl font-bold break-all sm:break-normal">info@solidstonebuilders.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-emerald-100 mb-1 font-medium">Visit Us</p>
                    <p className="text-lg md:text-xl font-bold leading-tight">{ADDRESS}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 p-8 md:p-12 lg:p-20">
              <h3 className="text-2xl font-serif text-white mb-8">Send us a Message</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <input 
                    type="text" 
                    placeholder="Full Name" 
                    required
                    pattern="[A-Za-z\s]+"
                    title="Please enter only alphabets"
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors w-full"
                  />
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    required
                    className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-colors w-full"
                  />
                </div>
                <input 
                  type="tel" 
                  placeholder="Phone Number (10 digits)" 
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white w-full focus:outline-none focus:border-emerald-500 transition-colors"
                />
                <textarea 
                  placeholder="Message (Optional)" 
                  rows={4}
                  className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white w-full focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                ></textarea>
                <button 
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-4 rounded-xl font-bold transition-all shadow-xl shadow-emerald-500/20"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
