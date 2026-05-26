"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 300);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const SIZE = 48;
  const STROKE = 2.5;
  const RADIUS = (SIZE - STROKE) / 2;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          key="scroll-to-top"
          onClick={scrollToTop}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          initial={{ opacity: 0, scale: 0.6, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 24 }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
          className="
            fixed bottom-8 right-8 z-[99998]
            w-[48px] h-[48px]
            rounded-full
            glassmorphism
            flex items-center justify-center
            cursor-pointer
            focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/50
          "
          style={{ padding: 0 }}
        >
          {/* Progress ring */}
          <svg
            width={SIZE}
            height={SIZE}
            viewBox={`0 0 ${SIZE} ${SIZE}`}
            className="absolute inset-0 -rotate-90"
            aria-hidden="true"
          >
            <circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              className="text-foreground/10"
            />
            <motion.circle
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke="currentColor"
              strokeWidth={STROKE}
              strokeLinecap="round"
              className="text-accent"
              style={{ pathLength: smoothProgress }}
            />
          </svg>

          {/* Bouncing arrow */}
          <motion.span
            animate={{ y: isHovered ? -2 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
            className="relative z-10 text-accent flex items-center justify-center"
          >
            <ChevronUp size={20} strokeWidth={2.5} />
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
