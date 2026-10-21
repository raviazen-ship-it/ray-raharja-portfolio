'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/components/providers/LanguageProvider';

export function CustomCursor() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [enabled, setEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorMode, setCursorMode] = useState<'default' | 'project' | 'interactive'>('default');

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 360, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Strictly disable on touch devices or reduced motion or inside /admin
    const isTouchDevice =
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(hover: none)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isTouchDevice || prefersReducedMotion || pathname?.startsWith('/admin')) {
      setEnabled(false);
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      if (projectEl) {
        setCursorMode('project');
        return;
      }

      const interactiveEl = target.closest('a, button, input, textarea, select, [role="button"]');
      if (interactiveEl) {
        setCursorMode('interactive');
        return;
      }

      setCursorMode('default');
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [pathname, isVisible, mouseX, mouseY]);

  if (!enabled) return null;

  const size =
    cursorMode === 'project' ? 84 : cursorMode === 'interactive' ? 36 : 14;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:flex items-center justify-center rounded-full"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: size,
        height: size,
        opacity: isVisible ? 1 : 0,
        backgroundColor:
          cursorMode === 'project'
            ? 'rgba(181, 137, 59, 0.94)'
            : cursorMode === 'interactive'
              ? 'rgba(181, 137, 59, 0.14)'
              : 'rgba(181, 137, 59, 0)',
        borderColor:
          cursorMode === 'project'
            ? 'rgba(212, 175, 106, 1)'
            : 'rgba(181, 137, 59, 0.75)',
        borderWidth: cursorMode === 'project' ? 1 : 1.25,
      }}
      transition={{
        type: 'spring',
        stiffness: 320,
        damping: 26,
      }}
    >
      {cursorMode === 'project' && (
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#0A0A0B]"
        >
          {t.cursor.view}
        </motion.span>
      )}
    </motion.div>
  );
}
