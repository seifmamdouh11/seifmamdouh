"use client";

import { motion } from 'framer-motion';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  className?: string;
}

export default function SectionHeader({ eyebrow, title, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center justify-center text-center gap-2 mb-12 ${className}`}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-accent uppercase tracking-widest text-sm font-semibold"
      >
        {eyebrow}
      </motion.span>
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-5xl font-bold text-foreground relative inline-block"
      >
        {title}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-accent rounded-full opacity-50" />
      </motion.h2>
    </div>
  );
}
