'use client';

import React, { useEffect, useState, useRef } from 'react';
import Home from '@/components/HomePage';
import Project from '@/components/ProjectPage';

export default function VerticalDotScrollbar() {
  const sections = [
    { id: 'home', component: <Home /> },
    { id: 'project', component: <Project /> },
  ];
  const [currentSection, setCurrentSection] = useState(0);

  const isTransitioning = useRef(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startY = useRef(0);

  const navigateToSection = (index: number): void => {
    if (index < 0 || index >= sections.length) return;
    setCurrentSection(index);
    const section = document.getElementById(sections[index].id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const lockScroll = () => {
    if (isTransitioning.current) return true; // block if already scrolling
    isTransitioning.current = true;

    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      isTransitioning.current = false;
    }, 800); // lock duration

    return false;
  };

  // Keyboard navigation
  const handleKeydown = (event: KeyboardEvent): void => {
    if (lockScroll()) return;

    if (event.key === 'ArrowDown' && currentSection < sections.length - 1) {
      navigateToSection(currentSection + 1);
    } else if (event.key === 'ArrowUp' && currentSection > 0) {
      navigateToSection(currentSection - 1);
    }
  };

  // Wheel navigation
  const handleWheel = (event: WheelEvent): void => {
    event.preventDefault(); // disable normal scroll
    if (lockScroll()) return;

    if (event.deltaY > 0 && currentSection < sections.length - 1) {
      navigateToSection(currentSection + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      navigateToSection(currentSection - 1);
    }
  };

  // Touch swipe navigation
  const handleTouchStart = (event: TouchEvent) => {
    startY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: TouchEvent): void => {
    if (isTransitioning.current) return;

    const currentY = event.touches[0].clientY;
    const deltaY = startY.current - currentY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentSection < sections.length - 1) {
        navigateToSection(currentSection + 1); // swipe up
      } else if (deltaY < 0 && currentSection > 0) {
        navigateToSection(currentSection - 1); // swipe down
      }
      lockScroll();
    }
  };

  useEffect(() => {
    // Prevent normal scrolling
    document.body.style.overflow = 'hidden';

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    };
  }, [currentSection]);

  return (
    <>
      {/* Dots Navigation */}
      <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        <ul className="space-y-2">
          {sections.map((section, index) => (
            <li key={section.id}>
              <span
                onClick={() => navigateToSection(index)}
                className={`my-3.5 block w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                  currentSection === index
                    ? 'bg-slate-800'
                    : 'bg-slate-300 hover:bg-slate-500'
                }`}
                aria-label={`Go to ${section.id}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    navigateToSection(index);
                  }
                }}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Sections Example */}
      <div>
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
          >
            {section.component}
          </div>
        ))}
      </div>
    </>
  );
}
