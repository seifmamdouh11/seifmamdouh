"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/app/hooks/useLang';
import { useTheme } from '@/app/hooks/useTheme';
import { heroContent } from '@/app/translations/hero';
import { navItems } from '@/app/translations/navbar';
import { Sun, Moon, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TbHexagonLetterSFilled } from 'react-icons/tb';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

const socialIcons = [
  {
    id: 1,
    name: "Facebook",
    icon: <FaFacebook />,
    href: "https://www.facebook.com/SeifMamd0uh",
    hover: "hover:text-[#1877F2]",
  },
  {
    id: 2,
    name: "Instagram",
    icon: <FaInstagram />,
    href: "https://www.instagram.com/seifmamdouh10/",
    hover: "hover:text-[#E1306C]",
  },
  {
    id: 3,
    name: "LinkedIn",
    icon: <FaLinkedin />,
    href: "https://www.linkedin.com/in/seifmamdouh",
    hover: "hover:text-[#0077B5]",
  }
];

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const content = heroContent[lang];
  const navLinks = navItems[lang];
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showMenu, setShowMenu] = useState(false);

  // Lock scroll when menu is open
  useEffect(() => {
    if (showMenu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
    return () => { document.documentElement.style.overflow = "auto"; };
  }, [showMenu]);

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = ["home", "about", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      return { observer, el };
    });
    return () => {
      observers.forEach((obs) => { if (obs) obs.observer.unobserve(obs.el); });
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setShowMenu(false);
    setTimeout(() => {
      const targetId = href === "#" ? "home" : href.replace("#", "");
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else if (href === "#") {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 400);
  };

  return (
    <>
      <nav
        className={`z-[100000] w-full fixed top-0 transition-all duration-300 border-b ${
          showMenu ? 'border-transparent bg-transparent' : 'border-foreground/5'
        } ${isScrolled ? 'glassmorphism py-1' : 'bg-background/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none py-2'}`}
      >
        <div className='flex justify-between items-center max-w-7xl mx-auto py-3 px-6 md:px-10'>

          {/* Logo */}
          <motion.h2
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`text-accent text-xl flex items-center gap-2 font-bold transition-opacity duration-300 ${
              showMenu ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <TbHexagonLetterSFilled size={40} />
            <span className="text-foreground hidden md:block">{content.name}</span>
          </motion.h2>

          {/* Desktop links + toggles */}
          <div className='flex items-center gap-6 md:gap-8'>

            {/* Desktop nav links */}
            <ul className='hidden md:flex items-center gap-5 md:gap-6'>
              {navLinks.navItem.map((item: { label: string, href: string }) => {
                const targetId = item.href === "#" ? "home" : item.href.replace("#", "");
                const isActive = activeSection === targetId;
                return (
                  <li key={item.label}>
                    <motion.a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className={`${isActive ? 'text-accent p-2 rounded-lg bg-accent/10 font-bold' : 'text-foreground/90'
                        } hover:text-accent text-sm tracking-wider uppercase transition-all duration-300`}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                );
              })}
            </ul>

            {/* Action Buttons */}
            <div className={`flex items-center gap-3 border-l border-foreground/10 pl-5 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-5 transition-opacity duration-300 ${
              showMenu ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}>
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 cursor-pointer flex items-center justify-center transition-all duration-300 glassmorphism"
                aria-label="Toggle theme"
              >
                {theme === "light" ? (
                  <Moon className="w-4 h-4 text-foreground" />
                ) : (
                  <Sun className="w-4 h-4 text-foreground" />
                )}
              </motion.button>

              {/* Language Toggle */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleLang}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 cursor-pointer text-sm font-bold transition-all duration-300 glassmorphism"
                aria-label="Toggle language"
              >
                <Globe className="w-4 h-4 text-foreground" />
                <span className="text-foreground text-xs uppercase tracking-wider">
                  {lang === "en" ? "AR" : "EN"}
                </span>
              </motion.button>
            </div>

             {/* Hamburger — mobile only */}
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={() => setShowMenu(!showMenu)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-[5px] cursor-pointer z-[100001]"
              aria-label="Toggle menu"
            >
              <motion.span
                animate={showMenu
                  ? { rotate: 45, y: 6 }
                  : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className={`block w-6 h-[2px] rounded-full origin-center transition-colors duration-300 ${
                  showMenu ? "bg-accent" : "bg-foreground"
                }`}
              />
              <motion.span
                animate={showMenu
                  ? { opacity: 0, scaleX: 0 }
                  : { opacity: 1, scaleX: 1 }
                }
                transition={{ duration: 0.2 }}
                className="block w-4 h-[2px] rounded-full bg-foreground self-start ms-2 origin-left transition-colors duration-300"
              />
              <motion.span
                animate={showMenu
                  ? { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                className={`block w-6 h-[2px] rounded-full origin-center transition-colors duration-300 ${
                  showMenu ? "bg-accent" : "bg-foreground"
                }`}
              />
            </motion.button>

          </div>
        </div>
      </nav>

      {/* ── Full-Screen Mobile Menu Overlay ── */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 52px) 36px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 52px) 36px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-x-0 top-0 h-[100dvh] z-[99999] bg-background flex flex-col"
          >
            {/* Top bar inside overlay */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-foreground/5">
              <div className="text-accent flex items-center gap-2 font-bold">
                <TbHexagonLetterSFilled size={36} />
                <span className="text-foreground font-semibold text-lg">{content.name}</span>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col justify-between px-6 py-8 overflow-y-auto">

              {/* Navigation links */}
              <nav className="flex flex-col gap-1">
                {navLinks.navItem.map((item: { label: string, href: string }, idx: number) => {
                  const targetId = item.href === "#" ? "home" : item.href.replace("#", "");
                  const isActive = activeSection === targetId;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: lang === 'en' ? -40 : 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: lang === 'en' ? -40 : 40 }}
                      transition={{ duration: 0.4, delay: 0.1 + idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      className="group"
                    >
                      <a
                        href={item.href}
                        onClick={(e) => handleLinkClick(e, item.href)}
                        className={`
                          flex items-center gap-4 py-4 border-b border-foreground/5
                          transition-all duration-300 group-hover:ps-3
                          ${isActive ? 'text-accent' : 'text-foreground/60 hover:text-foreground'}
                        `}
                      >
                        {/* Number tag */}
                        <span className={`
                          text-xs font-mono font-bold tracking-widest w-7 shrink-0
                          ${isActive ? 'text-accent' : 'text-foreground/25 group-hover:text-foreground/40'}
                          transition-colors duration-300
                        `}>
                          0{idx + 1}
                        </span>

                        {/* Link text */}
                        <span className="text-4xl font-extrabold uppercase tracking-tight leading-none">
                          {item.label}
                        </span>

                        {/* Active dot */}
                        {isActive && (
                          <motion.span
                            layoutId="active-dot"
                            className="ms-auto w-2 h-2 rounded-full bg-accent shrink-0"
                          />
                        )}
                      </a>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Bottom section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="flex flex-col gap-6 pt-8"
              >
                {/* Social row */}
                <div className="flex items-center gap-4">
                  <span className="text-xs text-foreground/30 uppercase tracking-widest font-bold shrink-0">
                    {lang === 'en' ? 'Follow' : 'تابعني'}
                  </span>
                  <span className="flex-1 h-px bg-foreground/10" />
                  <ul className="flex items-center gap-3">
                    {socialIcons.map((icon) => (
                      <motion.li
                        key={icon.id}
                        whileHover={{ scale: 1.15, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <a
                          href={icon.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={icon.name}
                          className={`
                            w-10 h-10 rounded-xl glassmorphism
                            flex items-center justify-center text-lg
                            text-foreground/50 transition-colors duration-300
                            ${icon.hover}
                          `}
                        >
                          {icon.icon}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA + toggles row */}
                <div className="flex items-center gap-3">
                  {/* Contact CTA */}
                  <a
                    href="#contact"
                    onClick={(e) => handleLinkClick(e, "#contact")}
                    className="flex-1 py-3.5 rounded-xl bg-accent text-white text-sm font-bold uppercase tracking-widest text-center
                      hover:bg-accent/90 transition-all duration-300 active:scale-95"
                  >
                    {lang === 'en' ? "Let's Talk" : 'تواصل معي'}
                  </a>
                </div>

                {/* Copyright */}
                <p className="text-xs text-foreground/25 text-center pb-2">
                  © {new Date().getFullYear()} {content.name}
                </p>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}