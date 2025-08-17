'use client';

import { useState, useEffect } from 'react';
import { NotebookPen } from 'lucide-react';
import { fetchAllBlogs } from '@/service/blogService';
import { Blog } from '@/types/BlogType';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export interface GoToBlogFn {
  (index: number): void;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await fetchAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.log('Failed to fetch blogs', error);
      }
    };

    fetchBlogs();
  }, []);

  // Auto-slide every 10 seconds
  useEffect(() => {
    if (blogs.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % blogs.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [blogs]);

  const goToBlog: GoToBlogFn = (index) => {
    setCurrentIndex(index);
  };

  const currentBlog = blogs[currentIndex];

  if (!currentBlog) {
    return (
      <div className="flex text-lg justify-center items-center min-h-screen">
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] md:min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center bg-fixed bg-no-repeat bg-cover bg-center px-6 pt-10 pb-16 md:px-10 md:py-24 font-sans">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-1">
            Blogs
          </h1>
          <p className="text-sm md:text-lg text-slate-600 max-w-2xl mx-auto">
            Check out my latest blog posts:{' '}
            <Link
              href="https://medium.com/@ishanhansakasilva"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              view more
            </Link>
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl shadow-2xl overflow-hidden mb-6 relative bg-slate-50 md:border-t md:border-r border border-slate-200 min-h-[380px] md:min-h-[380px]"
          >
            <div className="grid md:grid-cols-2">
              {/* Image section - hidden on mobile */}
              <div className="hidden md:block relative h-[380px] bg-gray-200 overflow-hidden">
                <Image
                  src={currentBlog?.imageUrl || '/placeholder.png'}
                  alt={currentBlog?.title || 'Blog image'}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Content section */}
              <motion.div
                key={currentIndex + '-content'}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="px-6 py-12 sm:p-8 md:px-12 md:py-4 flex flex-col justify-center"
              >
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-3 text-center md:text-left">
                  {currentBlog.title}
                </h2>

                <p className="text-gray-600 text-sm md:text-lg leading-relaxed mb-5 text-center md:text-left">
                  {currentBlog.content}
                </p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {currentBlog.date && (
                      <span className="px-3 py-1.5 rounded-full text-sm bg-slate-200 text-slate-700 border border-slate-200 font-medium cursor-default">
                        Published:{' '}
                        {new Date(currentBlog.date).toLocaleDateString(
                          'en-US',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          }
                        )}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 justify-center md:justify-start">
                  {currentBlog.medium_link && (
                    <Link
                      href={currentBlog.medium_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-5 py-2.5 bg-slate-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium text-sm sm:text-base"
                    >
                      <NotebookPen size={18} className="mr-2" />
                      Medium
                    </Link>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-4">
          <div className="flex gap-2">
            {blogs.map((_, index) => (
              <button
                key={index}
                onClick={() => goToBlog(index)}
                className={`h-3.5 cursor-pointer rounded-full transition-all duration-500 ease-in-out ${
                  index === currentIndex
                    ? 'bg-slate-600 w-6'
                    : 'bg-slate-300 hover:bg-slate-500 w-3.5'
                }`}
                aria-label={`Go to blog ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
