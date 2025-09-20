import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  const experiences = [
    {
      image: '/images/ieee-sb-logo.webp',
      role: 'WebMaster',
      organization: 'IEEE Student Branch University of Moratuwa',
    },
    {
      image: '/images/intecs-logo.webp',
      role: 'committee member',
      organization: 'INTECS University of Moratuwa',
    },
    {
      image: '/images/freelancer-logo.webp',
      role: 'Web Development Freelancer',
      organization: 'Local Clients',
    },
  ];

  const education = [
    {
      image: '/images/uom-logo.webp',
      degree: 'B.Sc. (Hons.) in Information Technology',
      institution: 'University of Moratuwa',
    },
    {
      image: '/images/asm-logo.webp',
      degree: 'G.C.E. Advanced Level',
      institution: 'Ananda Sastralaya National School',
    },
    {
      image: '/images/avns-logo.webp',
      degree: 'G.C.E. Ordinary Level',
      institution: 'Aluthgama Maha Vidyalaya',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] md:min-h-screen flex flex-col items-center justify-start md:justify-center bg-fixed bg-no-repeat bg-cover bg-center px-4 pt-6 pb-12 sm:px-6 md:px-10 md:py-24 font-sans">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-3 md:mb-8">
          <h1 className="text-3xl sm:text-3xl md:text-5xl font-bold text-slate-800 md:mb-4">
            About Me
          </h1>
          {/* Short description for mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="block sm:hidden text-sm text-slate-600 max-w-md mx-auto leading-relaxed px-2"
          >
            Passionate IT undergraduate eager to learn and contribute to
            real-world projects.{' '}
            <Link
              href="https://www.linkedin.com/in/ishanhansakasilva/"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Connect with me
            </Link>
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden sm:block text-sm sm:text-base md:text-lg mx-auto text-slate-600 max-w-5xl leading-relaxed"
          >
            A self-motivated and adaptable IT undergraduate with strong
            technical knowledge, problem-solving skills, and a passion for
            software engineering, who learns new technologies quickly and excels
            in collaborative team environments. Currently seeking opportunities
            to contribute to real-world projects and gain hands-on industry
            experience.{' '}
            <Link
              href="https://www.linkedin.com/in/ishanhansakasilva/"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Connect with me
            </Link>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-slate-100 cursor-default mb-2"
          >
            <div className="flex items-center mb-4">
              <BookOpen className="text-slate-700 mr-3 shrink-0" size={22} />
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800">
                Education
              </h2>
            </div>

            <div className="space-y-4 pl-2">
              {education.map((edu, index) => (
                <div className="flex items-center gap-3 sm:gap-4" key={index}>
                  <Image
                    src={edu.image}
                    alt={edu.degree}
                    width={40}
                    height={40}
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-slate-800">
                      {edu.degree}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-[1rem] text-slate-600 font-normal">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-50 rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border-2 border-slate-100 cursor-default"
          >
            <div className="flex items-center mb-4">
              <Users className="text-slate-700 mr-3 shrink-0" size={22} />
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-800">
                Experience
              </h2>
            </div>

            <div className="space-y-4 pl-2">
              {experiences.map((exp, index) => (
                <div className="flex items-center gap-3 sm:gap-4" key={index}>
                  <Image
                    src={exp.image}
                    alt={exp.role}
                    width={40}
                    height={40}
                    className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base md:text-lg font-medium text-slate-800">
                      {exp.role}
                    </h3>
                    <p className="text-xs sm:text-sm md:text-[1rem] text-slate-600 font-normal">
                      {exp.organization}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
