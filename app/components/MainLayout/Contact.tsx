"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '@/app/hooks/useLang';
import { contactContent } from '@/app/translations/contact';
import SectionHeader from '../shared/SectionHeader';
import { Mail, Phone, MapPin, Send, Loader2, Check } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Contact() {
  const { lang } = useLang();
  const content = contactContent[lang];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
      style={{ scrollMarginTop: '80px' }}
    >
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-secondary-accent/10 to-accent/10 blur-[120px] rounded-full -z-10 pointer-events-none" />

      <div className="max-w-7xl w-full px-6 md:px-10 z-10">
        <SectionHeader eyebrow={content.eyebrow} title={content.title} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mt-12">

          {/* Info Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? -40 : 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`flex flex-col gap-8 ${lang === 'ar' ? 'lg:order-2' : 'lg:order-1'}`}
          >
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              {content.description}
            </p>

            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl glassmorphism">
                <span className="p-3 bg-foreground/5 rounded-xl text-accent"><Mail size={24} /></span>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-foreground/50 font-bold">{lang === 'en' ? 'Email' : 'البريد الإلكتروني'}</h4>
                  <a href={`mailto:${content.email}`} className="text-sm md:text-base font-semibold text-foreground/80 hover:text-accent transition-colors">{content.email}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl glassmorphism">
                <span className="p-3 bg-foreground/5 rounded-xl text-accent"><Phone size={24} /></span>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-foreground/50 font-bold">{lang === 'en' ? 'Phone' : 'الهاتف'}</h4>
                  <a href={`tel:${content.phone}`} className="text-sm md:text-base font-semibold text-foreground/80 hover:text-accent transition-colors">{content.phone}</a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl glassmorphism">
                <span className="p-3 bg-foreground/5 rounded-xl text-accent"><MapPin size={24} /></span>
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-foreground/50 font-bold">{lang === 'en' ? 'Location' : 'الموقع'}</h4>
                  <span className="text-sm md:text-base font-semibold text-foreground/80">{content.location}</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h4 className="text-xs uppercase tracking-wider text-foreground/50 font-bold">{lang === 'en' ? 'Follow Me' : 'تابعني على'}</h4>
              <ul className="flex gap-4">
                {socialIcons.map((icon) => (
                  <motion.li
                    key={icon.id}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center"
                  >
                    <a
                      href={icon.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-xl glassmorphism text-foreground/60 hover:text-accent flex items-center justify-center transition-colors text-lg ${icon.hover}`}
                      aria-label={icon.name}
                    >
                      {icon.icon}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, x: lang === 'en' ? 40 : -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`glassmorphism p-6 md:p-8 rounded-2xl relative overflow-hidden ${lang === 'ar' ? 'lg:order-1' : 'lg:order-2'}`}
          >
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-6"
                >
                  {/* Name Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-xs uppercase tracking-wider text-foreground/60 font-bold">
                      {content.nameLabel}
                    </label>
                    <input
                      required
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={content.namePlaceholder}
                      className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-foreground placeholder:text-foreground/40 text-sm md:text-base"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-xs uppercase tracking-wider text-foreground/60 font-bold">
                      {content.emailLabel}
                    </label>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={content.emailPlaceholder}
                      className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-foreground placeholder:text-foreground/40 text-sm md:text-base"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="text-xs uppercase tracking-wider text-foreground/60 font-bold">
                      {content.messageLabel}
                    </label>
                    <textarea
                      required
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={content.messagePlaceholder}
                      className="bg-foreground/5 border border-foreground/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent/60 focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-foreground placeholder:text-foreground/40 text-sm md:text-base resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full relative group bg-accent border-transparent text-white transition-all duration-300 px-6 py-3.5 rounded-xl text-base font-semibold hover:bg-accent/90 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>{content.sendingButton}</span>
                      </>
                    ) : (
                      <>
                        <span className="uppercase tracking-wider">{content.submitButton}</span>
                        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-1 rtl:group-hover:scale-x-[-1]" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center py-12 gap-4"
                >
                  <div className="w-16 h-16 bg-accent/10 border border-accent/20 text-accent rounded-full flex items-center justify-center text-3xl">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{lang === 'en' ? 'Thank You!' : 'شكراً لك!'}</h3>
                  <p className="text-foreground/70 max-w-sm text-sm md:text-base">
                    {content.successMessage}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
