"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLang } from '@/app/hooks/useLang';
import { useTheme } from '@/app/hooks/useTheme';
import { useSplash } from '@/app/context/SplashContext';
import { heroContent } from '@/app/translations/hero';
import Image from 'next/image';
import { FaChevronLeft, FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Download } from 'lucide-react';
import { FaMobile } from 'react-icons/fa6';

export default function Hero() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const { splashDone } = useSplash();
  const content = heroContent[lang];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        scrollMarginTop: '100px',
      }}
    >
      {/* Social Icons */}
      <motion.ul
        initial={{ opacity: 0, x: lang === 'en' ? 20 : -20 }}
        animate={splashDone ? { opacity: 1, x: 0 } : { opacity: 0, x: lang === 'en' ? 20 : -20 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`absolute bottom-30 hidden md:flex gap-6 translate-x-0 top-95 -translate-y-1/2 flex-col gap-10 z-20 ${lang === 'en' ? 'right-40 ' : 'left-40'}`}
      >
        {socialIcons.map((icon: { id: number, name: string, icon: React.ReactNode, href: string, hover: string }) => (
          <motion.li
            key={icon.id}
            whileHover={{ scale: 1.25, x: lang === 'en' ? 6 : -6 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex items-center justify-center"
          >
            <a
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-foreground/60 text-2xl transition-colors duration-300 flex items-center justify-center ${icon.hover}`}
              aria-label={icon.name}
            >
              {icon.icon}
            </a>
          </motion.li>
        ))}
      </motion.ul>
      {/* Hero Background Pattern */}
      <Image
        src="/RandomPattern.png"
        alt="Hero Background"
        fill
        className="object-cover z-[-1] absolute opacity-6"
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 max-w-7xl w-full px-6 md:px-10 z-10 pt-20 md:pt-0"
      >
        {/* content */}
        <motion.div className="flex flex-col gap-6 justify-center items-center text-center md:items-start md:text-start order-2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-6xl md:text-7xl font-[700] text-foreground uppercase tracking-wide"
          >
            {content.name}
          </motion.h1>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent uppercase tracking-wider"
          >
            {content.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='text-base sm:text-lg font-light text-foreground/80 tracking-wide w-full md:w-[90%] lg:w-[80%]'
          >
            {content.description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={splashDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className='w-full sm:w-[80%] flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4'
          >
            <a
              href="/Seif Mamdouh CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <button className="
              w-full sm:w-auto relative group text-accent border border-accent/15 transition-all duration-300 ps-6 pe-6 py-3 rounded-xl text-base font-semibold hover:pe-11 hover:bg-accent/5
                cursor-pointer
                ">
                <span className="relative z-10 uppercase tracking-wider">{content.downloadCV}</span>
                <span className='absolute opacity-0 ms-0 group-hover:opacity-100 group-hover:ms-2 transition-all duration-300'><Download className='w-5 h-5' /></span>
              </button>
            </a>
            <a
              href="#contact"
              className="w-full sm:w-auto"
            >
              <button className="
              w-full sm:w-auto relative group bg-accent border-transparent text-white transition-all duration-300 ps-6 pe-6 py-3 rounded-xl text-base font-semibold hover:pe-11 hover:bg-accent/90
                cursor-pointer
                ">
                <span className="relative z-10 uppercase tracking-wider">{content.contactMe}</span>
                <span className='absolute opacity-0 ms-0 group-hover:opacity-100 group-hover:ms-2 transition-all duration-300'><FaMobile className='w-5 h-5' /></span>
              </button>
            </a>
          </motion.div>
        </motion.div>

        {/* image column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={splashDone ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 100 }}
          className="flex items-center justify-center relative w-[240px] h-[240px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px] lg:w-[360px] lg:h-[360px] justify-self-center self-center order-1 md:order-2"
        >
          {/* Static Background Glow Aura */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-accent/25 to-secondary-accent/25 blur-3xl opacity-75 dark:opacity-50 z-0 pointer-events-none rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]"
          />

          {/* Static Image Frame */}
          <motion.div
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 w-full h-full overflow-hidden border-4 border-foreground/20 dark:border-foreground/10 shadow-2xl transition-all duration-300 hover:border-accent cursor-pointer rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]"
          >
            <Image
              src="/profile.jpeg"
              alt="Profile"
              fill
              className="object-cover scale-110"
              priority
            />
          </motion.div>
        </motion.div>

      </motion.div>


    </section>
  );
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