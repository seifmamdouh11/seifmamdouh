"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TbHexagonLetterSFilled } from 'react-icons/tb';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Lock scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    // Lightning-fast and highly performant loading duration (1.2 seconds)
    const timeout = setTimeout(() => {
      setIsVisible(false);
      // Unlock scroll
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }, 1200);

    return () => {
      clearTimeout(timeout);
      // Ensure scroll is unlocked when unmounting
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.3, ease: 'easeOut' }
          }}
          className="fixed inset-0 bg-[#0e0f14] z-[1000000] flex flex-col items-center justify-center text-white"
        >
          {/* Central Logo Container */}
          <div className="flex flex-col items-center gap-5 relative z-10">
            {/* Hexagon Brand Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -360 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
                transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } // Premium easeOutExpo deceleration curve
              }}
              className="relative flex items-center justify-center"
            >
              {/* Performance-friendly glow (static and light-weight) */}
              <div className="absolute inset-[-4px] text-[#FF5656]/20 blur-[1px]">
                <TbHexagonLetterSFilled size={76} />
              </div>

              {/* Main Brand Icon */}
              <div className="text-[#FF5656] relative">
                <TbHexagonLetterSFilled size={68} />
              </div>
            </motion.div>

            {/* Loading Indicator (100% GPU Composed Shimmer, Zero React Re-renders) */}
            <div className="w-[120px] h-[2px] bg-white/10 rounded-full mt-3 overflow-hidden relative">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  repeat: Infinity,
                  duration: 1.1,
                  ease: 'easeInOut'
                }}
                className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-[#FF5656] to-transparent"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
