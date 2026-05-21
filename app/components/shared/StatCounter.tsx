"use client";

import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatCounterProps {
  value: number;
  label: string;
  delay?: number;
}

export default function StatCounter({ value, label, delay = 0 }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        motionValue.set(value);
      }, delay * 1000);
    }
  }, [isInView, motionValue, value, delay]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat().format(Math.round(latest)) + "+";
      }
    });
  }, [springValue]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center justify-center p-4 rounded-xl glassmorphism border-t-2 border-t-accent/20"
    >
      <span ref={ref} className="text-3xl md:text-4xl font-extrabold text-accent mb-2">
        0+
      </span>
      <span className="text-sm font-medium text-foreground/70 uppercase tracking-wider text-center">
        {label}
      </span>
    </motion.div>
  );
}
