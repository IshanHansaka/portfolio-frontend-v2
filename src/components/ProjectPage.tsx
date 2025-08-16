'use client';

import { useState, useEffect } from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { fetchAllProjects } from '@/service/projectService';
import { Project } from '@/types/ProjectType';
import Image from 'next/image';
import Link from 'next/link';

export interface GoToProjectFn {
  (index: number): void;
}

export default function ProjectPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await fetchAllProjects();
        setProjects(data);
      } catch {
        console.log('Failed to fetch projects');
      }
    };

    fetchProjects();
  }, []);

  const goToProject: GoToProjectFn = (index) => {
    setCurrentIndex(index);
  };

  const currentProject = projects[currentIndex];

  if (!currentProject) {
    return (
      <div className="flex text-lg justify-center items-center min-h-screen">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center px-4 py-8 md:px-10 md:py-12 font-sans min-h-screen">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-1">
            Projects
          </h1>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
            Explore some of my recent projects below;{' '}
            <Link
              href="https://github.com/IshanHansaka?tab=repositories"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              view more
            </Link>
          </p>
        </div>

        <div className="rounded-2xl shadow-2xl overflow-hidden mb-6 relative bg-slate-50">
          <div className="grid md:grid-cols-2">
            {/* Hide image on mobile */}
            <div className="hidden md:block relative h-[380px] bg-gray-200 overflow-hidden">
              <Image
                src={currentProject?.imageURL || '/placeholder.png'}
                alt={currentProject?.name || 'Project image'}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="px-6 py-2 sm:p-8 md:px-12 md:py-4 flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center md:text-left">
                {currentProject.name}
              </h2>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4 text-center md:text-left">
                {currentProject.description}
              </p>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {currentProject.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full text-sm hover:text-white text-slate-700 hover:bg-slate-700 border-2 border-slate-700 font-semibold cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 justify-center md:justify-start">
                {currentProject.github_link && (
                  <a
                    href={currentProject.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-5 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-sm sm:text-base"
                  >
                    <Github size={18} className="mr-2" />
                    GitHub
                  </a>
                )}

                {currentProject.live_link && (
                  <a
                    href={currentProject.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-5 py-2.5 bg-blue-800 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm sm:text-base"
                  >
                    <ExternalLink size={18} className="mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`h-3.5 cursor-pointer rounded-full transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? 'bg-slate-600 w-6'
                    : 'bg-slate-300 hover:bg-slate-500 w-3.5'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
