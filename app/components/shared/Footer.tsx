"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/app/hooks/useLang';
import { navItems } from '@/app/translations/navbar';
import { heroContent } from '@/app/translations/hero';
import { contactContent } from '@/app/translations/contact';
import { TbHexagonLetterSFilled } from 'react-icons/tb';
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const { lang } = useLang();
  const navLinks = navItems[lang];
  const hero = heroContent[lang];
  const contact = contactContent[lang];

  const socialIcons = [
    {
      id: 1,
      name: "Facebook",
      icon: <FaFacebook />,
      href: "https://www.facebook.com/seif.mamdouh.1257",
      hover: "hover:text-[#1877F2]",
    },
    {
      id: 2,
      name: "Instagram",
      icon: <FaInstagram />,
      href: "https://www.instagram.com/seif.mamdouh.1257",
      hover: "hover:text-[#E1306C]",
    },
    {
      id: 3,
      name: "LinkedIn",
      icon: <FaLinkedin />,
      href: "https://www.linkedin.com/seif.mamdouh.1257",
      hover: "hover:text-[#0077B5]",
    }
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href === "#" ? "home" : href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (href === "#") {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-foreground/10 bg-background transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col gap-12">
        
        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          
          {/* Brand Column */}
          <div className="flex flex-col gap-5">
            <div className="text-primary text-xl flex items-center gap-2 font-bold">
              <TbHexagonLetterSFilled size={40} />
              <span className="text-foreground">{hero.name}</span>
            </div>
            <p className="text-sm font-light text-foreground/75 leading-relaxed">
              {hero.tagline}
            </p>
            {/* Social Links */}
            <ul className="flex gap-3 mt-2">
              {socialIcons.map((icon) => (
                <motion.li
                  key={icon.id}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <a
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-9 h-9 rounded-lg glassmorphism text-foreground/60 hover:text-accent flex items-center justify-center transition-colors text-base ${icon.hover}`}
                    aria-label={icon.name}
                  >
                    {icon.icon}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-accent rounded-full inline-block" />
              {lang === 'en' ? 'Quick Links' : 'روابط سريعة'}
            </h4>
            <ul className="flex flex-col gap-3">
              {navLinks.navItem.map((item: { label: string, href: string }) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-foreground/70 hover:text-accent text-sm font-semibold uppercase tracking-wider transition-colors inline-block"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-5">
            <h4 className="text-sm font-bold uppercase tracking-widest text-foreground/50 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-accent rounded-full inline-block" />
              {lang === 'en' ? 'Contact' : 'تواصل'}
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-semibold text-foreground/70">
              <li className="flex items-center gap-3">
                <span className="text-accent"><Mail size={18} /></span>
                <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors">{contact.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent"><Phone size={18} /></span>
                <a href={`tel:${contact.phone}`} className="hover:text-accent transition-colors">{contact.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent"><MapPin size={18} /></span>
                <span>{contact.location}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="border-t border-foreground/5 pt-8 text-center">
          <p className="text-xs text-foreground/45">
            &copy; {new Date().getFullYear()} {hero.name}. {lang === 'en' ? 'All rights reserved.' : 'جميع الحقوق محفوظة.'}
          </p>
        </div>

      </div>
    </footer>
  );
}
