'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Home from '@/components/HomePage';
import Project from '@/components/ProjectPage';
import AboutPage from './AboutPage';
import BlogPage from './BlogPage';
import ContactPage from './ContactPage';

export default function VerticalDotScrollbar() {
  const sections = React.useMemo(
    () => [
      { id: 'home', component: <Home /> },
      { id: 'about', component: <AboutPage /> },
      { id: 'project', component: <Project /> },
      { id: 'blog', component: <BlogPage /> },
      { id: 'contact', component: <ContactPage /> },
    ],
    []
  );

  const [currentSection, setCurrentSection] = useState(0);

  const isTransitioning = useRef(false);
  const transitionTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startY = useRef(0);
  const currentSectionRef = useRef(0);

  useEffect(() => {
    currentSectionRef.current = currentSection;
  }, [currentSection]);

  const navigateToSection = useCallback(
    (index: number): void => {
      if (index < 0 || index >= sections.length) return;
      setCurrentSection(index);
      const section = document.getElementById(sections[index].id);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [sections]
  );

  const lockScroll = () => {
    if (isTransitioning.current) return true;
    isTransitioning.current = true;

    if (transitionTimeout.current) clearTimeout(transitionTimeout.current);
    transitionTimeout.current = setTimeout(() => {
      isTransitioning.current = false;
    }, 800);

    return false;
  };

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent): void => {
      if (lockScroll()) return;
      const current = currentSectionRef.current;

      if (event.key === 'ArrowDown' && current < sections.length - 1) {
        navigateToSection(current + 1);
      } else if (event.key === 'ArrowUp' && current > 0) {
        navigateToSection(current - 1);
      }
    };

    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();
      if (lockScroll()) return;
      const current = currentSectionRef.current;

      if (event.deltaY > 0 && current < sections.length - 1) {
        navigateToSection(current + 1);
      } else if (event.deltaY < 0 && current > 0) {
        navigateToSection(current - 1);
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      startY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent): void => {
      if (isTransitioning.current) return;

      const currentY = event.touches[0].clientY;
      const deltaY = startY.current - currentY;
      const current = currentSectionRef.current;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0 && current < sections.length - 1) {
          navigateToSection(current + 1);
        } else if (deltaY < 0 && current > 0) {
          navigateToSection(current - 1);
        }
        lockScroll();
      }
    };

    document.body.style.overflow = 'hidden';
    // document.body.classList.add('no-scroll');

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
  }, [navigateToSection, sections.length]);

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
                    ? 'bg-slate-900'
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

      {/* Sections */}
      <div>
        {sections.map((section) => (
          <div
            key={section.id}
            id={section.id}
            className="h-screen flex justify-center items-center"
          >
            {section.component}
          </div>
        ))}
      </div>
    </>
  );
}
