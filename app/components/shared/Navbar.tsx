"use client"
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/app/hooks/useLang';
import { useTheme } from '@/app/hooks/useTheme';
import { heroContent } from '@/app/translations/hero';
import { navItems } from '@/app/translations/navbar';
import { Laptop, Sun, Moon, Globe, X, Menu } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { TbHexagonLetterSFilled } from 'react-icons/tb';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Navbar() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();
  const content = heroContent[lang];
  const navLinks = navItems[lang];
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [showMenu, setShowMenu] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

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
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["home", "about", "projects", "contact"];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        {
          rootMargin: "-40% 0px -50% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) {
          obs.observer.unobserve(obs.el);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (showMenu) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [showMenu]);

  return (
    <nav ref={navRef} className={`z-100000 w-full fixed top-0 transition-all duration-300 border-b border-foreground/1 ${isScrolled ?
      'glassmorphism py-1' : ''}`}>
      <div className='flex justify-between items-center max-w-7xl mx-auto py-3 px-6 md:px-10'>
        {/* Logo */}
        <motion.div>
          <motion.h2
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='text-primary text-xl flex items-center gap-2 font-bold'
          >
            <TbHexagonLetterSFilled size={40} />
            <span className="text-foreground hidden md:block">{content.name}</span>
          </motion.h2>
        </motion.div>
        {/* Links & Toggles Container */}
        <div className='flex items-center gap-6 md:gap-8'>
          {/* Mobile Social Icons */}
          <ul
            className={`bottom-8 md:hidden flex  gap-2 z-20 ${lang === 'en' ? 'right-40 ' : 'left-40'}`}
          >
            {socialIcons.map((icon: { id: number, name: string, icon: React.ReactNode, href: string, hover: string }) => (
              <motion.li
                key={icon.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                className="flex items-center justify-center"
              >
                <a
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-foreground/60 text-xl transition-colors duration-300 flex items-center justify-center ${icon.hover}`}
                  aria-label={icon.name}
                >
                  {icon.icon}
                </a>
              </motion.li>
            ))}
          </ul>
          {/* links */}
          <ul className='flex items-center gap-5 md:gap-6 hidden md:flex'>
            {navLinks.navItem.map((item: { label: string, href: string }) => {
              const targetId = item.href === "#" ? "home" : item.href.replace("#", "");
              const isActive = activeSection === targetId;
              return (
                <li key={item.label}>
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className={`${isActive ? 'text-accent font-extrabold py-2 rounded-lg' : 'text-foreground/90 font-semibold'
                      } hover:text-accent text-sm tracking-wider uppercase transition-all duration-200`}
                  >
                    {item.label}
                  </motion.a>
                </li>
              );
            })}
          </ul>

          {/* Action Buttons (Theme + Language) */}
          <div className='flex items-center gap-3 border-l border-foreground/10 pl-5 dark:border-foreground/10 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-5'>
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

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(!showMenu)}
            className="md:hidden p-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 border border-foreground/10 cursor-pointer flex items-center justify-center transition-all duration-300 glassmorphism"
            aria-label="Toggle menu"
          >
            {showMenu ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </motion.button>

          {/* Mobile Menu */}

        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-2xl border-t border-foreground/10 overflow-hidden"
          >
            <div className="flex flex-col px-8 py-10 gap-8">
              {navLinks.navItem.map((item: { label: string, href: string }, idx: number) => {
                const targetId = item.href === "#" ? "home" : item.href.replace("#", "");
                const isActive = activeSection === targetId;

                return (
                  <motion.a
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className={`text-3xl font-bold transition-all ${isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                      }`}
                  >
                    {item.label}
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
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