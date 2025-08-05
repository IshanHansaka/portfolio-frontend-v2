'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function VerticalDotScrollbar() {
  const sections = ['section1', 'section2', 'section3', 'section4', 'section5'];
  const [currentSection, setCurrentSection] = useState(0);
  const isSwiping = useRef(false);
  const swipeTimeout = useRef(null);
  const startY = useRef(0);

  const navigateToSection = (index: number): void => {
    setCurrentSection(index);
    const section: HTMLElement | null = document.getElementById(
      sections[index]
    );
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Keyboard event handler
  interface KeyboardEventWithKey extends KeyboardEvent {
    key: string;
  }

  const handleKeydown = (event: KeyboardEventWithKey): void => {
    if (event.key === 'ArrowDown' && currentSection < sections.length - 1) {
      navigateToSection(currentSection + 1);
    } else if (event.key === 'ArrowUp' && currentSection > 0) {
      navigateToSection(currentSection - 1);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    startY.current = event.touches[0].clientY;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>): void => {
    if (isSwiping.current) return;

    const currentY: number = event.touches[0].clientY;
    const deltaY: number = startY.current - currentY;

    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0 && currentSection < sections.length - 1) {
        navigateToSection(currentSection + 1); // Swipe up
      } else if (deltaY < 0 && currentSection > 0) {
        navigateToSection(currentSection - 1); // Swipe down
      }
      isSwiping.current = true;

      if (swipeTimeout.current)
        clearTimeout(swipeTimeout.current as NodeJS.Timeout);
      swipeTimeout.current = setTimeout(() => {
        isSwiping.current = false;
      }, 500) as unknown as null;
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sections.findIndex((sec) => sec === entry.target.id);
          if (idx !== -1) setCurrentSection(idx);
        }
      });
    }, options);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      observer.disconnect();
      if (swipeTimeout.current) clearTimeout(swipeTimeout.current);
    };
  }, [currentSection]); // currentSection is used in handlers

  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <ul className="space-y-2">
        {sections.map((section, index) => (
          <li key={section}>
            <span
              onClick={() => navigateToSection(index)}
              className={`my-3.5 block w-3 h-3 rounded-full cursor-pointer transition-colors duration-300 ${
                currentSection === index
                  ? 'bg-gray-900'
                  : 'bg-gray-300 hover:bg-gray-500'
              }`}
              aria-label={`Go to ${section}`}
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
  );
}
