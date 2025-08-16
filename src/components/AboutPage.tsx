'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Users } from 'lucide-react';

export default function AboutPage() {
  const experiences = [
    {
      image: '/images/ieee-sb-logo.jpg',
      role: 'Lead of the Events Committee',
      organization: 'IEEE Student Branch University of Moratuwa',
    },
    {
      image: '/images/intecs-logo.png',
      role: 'Technical Writer',
      organization: 'LinkIT by INTECS',
    },
    {
      image: '/images/freelancer-logo.jpg',
      role: 'Web Development Freelancer',
      organization: 'Local Clients',
    },
  ];

  const education = [
    {
      image: '/images/uom-logo.png',
      degree: 'B.Sc. (Hons.) in IT',
      institution: 'University of Moratuwa',
    },
    {
      image: '/images/asm-logo.png',
      degree: 'G.C.E. Advanced Level',
      institution: 'Ananda Sastralaya National School',
    },
    {
      image: '/images/avns-logo.jpg',
      degree: 'G.C.E. Ordinary Level',
      institution: 'Aluthgama Maha Vidyalaya',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] md:min-h-screen flex flex-col items-center justify-start md:justify-center bg-fixed bg-no-repeat bg-cover bg-center px-6 pt-10 pb-16 md:px-10 md:py-24 font-sans">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            About Me
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm md:text-lg text-slate-600 max-w-6xl mx-auto leading-relaxed"
          >
            A self-motivated and adaptable IT undergraduate with strong
            technical knowledge, problem-solving skills, and a passion for
            software engineering, who learns new technologies quickly and excels
            in collaborative team environments. Currently seeking opportunities
            to contribute to real-world projects and gain hands-on industry
            experience.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-slate-50 rounded-2xl p-4 md:py-6 md:px-8 shadow-lg border border-slate-100"
          >
            <div className="flex items-center mb-2">
              <BookOpen className="text-slate-700 mr-3" size={24} />
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                Education
              </h2>
            </div>

            <div className="space-y-3">
              {education.map((edu, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <img
                    src={edu.image}
                    alt={edu.degree}
                    className="w-7 h-7 md:w-10 md:h-10 rounded-full mb-2"
                  />
                  <div>
                    <h3 className="text-sm md:text-lg font-medium text-slate-800">
                      {edu.degree}
                    </h3>

                    <p className="text-xs md:text-[1rem] text-slate-600 font-normal">
                      {edu.institution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-50 rounded-2xl p-4 md:py-6 md:px-8 shadow-lg border border-slate-100"
          >
            <div className="flex items-center mb-2">
              <Users className="text-slate-700 mr-3" size={24} />
              <h2 className="text-xl md:text-2xl font-semibold text-slate-800">
                Experience
              </h2>
            </div>

            <div className="space-y-3">
              {experiences.map((exp, index) => (
                <div className="flex items-center gap-4" key={index}>
                  <img
                    src={exp.image}
                    alt={exp.role}
                    className="w-7 h-7 md:w-10 md:h-10 rounded-full mb-2"
                  />
                  <div>
                    <h3 className="text-sm md:text-lg font-medium text-slate-800">
                      {exp.role}
                    </h3>
                    <p className="text-xs md:text-[1rem] text-slate-600 font-normal">
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
