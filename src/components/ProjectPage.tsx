'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Github, ExternalLink } from 'lucide-react';
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

  const nextProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  // const prevProject = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? projects.length - 1 : prevIndex - 1
  //   );
  // };

  const goToProject: GoToProjectFn = (index) => {
    setCurrentIndex(index);
  };

  const currentProject = projects[currentIndex];

  if (!currentProject) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading project...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:items-start md:justify-center items-center justify-center bg-fixed bg-no-repeat bg-cover bg-center px-6 py-12 md:px-10 md:py-16 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            Projects
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Explore my latest work and creative solutions{' '}
            <Link
              href="https://github.com/IshanHansaka?tab=repositories"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              view more
            </Link>
          </p>
        </div>

        <div className="rounded-2xl shadow-2xl overflow-hidden mb-4 relative h-[600px] md:h-[400px] bg-slate-50">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-[600px] md:h-[400px] bg-gray-200 overflow-hidden">
              <div className="relative h-[600px] md:h-[400px] bg-gray-200 overflow-hidden">
                <Image
                  src={currentProject?.imageURL || '/placeholder.png'}
                  alt={currentProject?.name || 'Project image'}
                  fill
                  className="object-contain md:object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            <div className="p-8 md:px-12 md:pt-2 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {currentProject.name}
              </h2>

              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {currentProject.description}
              </p>

              <div className="mb-8">
                <div className="flex flex-wrap gap-3">
                  {currentProject.tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 backdrop-blur-md rounded-full text-sm hover:text-white text-slate-700 hover:bg-slate-700 border-2 border-slate-700 font-semibold cursor-default"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                {currentProject.github_link && (
                  <a
                    href={currentProject.github_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                  >
                    <Github size={20} className="mr-2" />
                    GitHub
                  </a>
                )}

                {currentProject.live_link && (
                  <a
                    href={currentProject.live_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                  >
                    <ExternalLink size={20} className="mr-2" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0">
            {/* <button
              onClick={prevProject}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-gray-800"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button> */}
            <button
              onClick={nextProject}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow duration-200 text-gray-600 hover:text-gray-800"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6">
          <div className="flex gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`h-3 rounded-full transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? 'bg-slate-600 w-6'
                    : 'bg-slate-300 hover:bg-slate-500 w-3'
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
