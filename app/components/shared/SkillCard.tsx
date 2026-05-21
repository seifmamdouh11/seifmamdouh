"use client";

import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  icon: React.ReactNode;
  color?: string;
  delay?: number;
}

export default function SkillCard({ name, icon, color = "currentColor", delay = 0 }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl glassmorphism transition-all duration-300 hover:border-accent/50 cursor-pointer group"
    >
      <div 
        className="text-4xl transition-transform duration-300 group-hover:scale-110" 
        style={{ color: color }}
      >
        {icon}
      </div>
      <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground">
        {name}
      </span>
    </motion.div>
  );
}
