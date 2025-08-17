'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, User, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // This ensures client-only rendering for dynamic elements
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'ishanhansakasilva@gmail.com',
      href: 'mailto:ishanhansakasilva@gmail.com',
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: '+94 77 543 7008',
      href: 'tel:+94775437008',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'Aluthgama, Kaluthara, Sri Lanka',
      href: 'https://maps.app.goo.gl/JnKL39ABamZNVxLB9',
    },
  ];

  return (
    <div className="min-h-[calc(100vh-100px)] md:min-h-screen flex flex-col md:flex-row items-center justify-start md:justify-center bg-fixed bg-no-repeat bg-cover bg-center px-6 pt-10 pb-16 md:px-10 md:py-24 font-sans">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-4 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2">
            Get In Touch
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-base sm:text-lg text-slate-600 max-w-4xl mx-auto"
          >
            Thinking about a new project, a problem to solve, or just want to
            connect? Let&apos;s do it!
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[30%_70%] gap-8 md:gap-12 max-w-8xl w-full">
          {/* Contact Information (Client-only) */}
          {isMounted && (
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-8 w-full md:w-[400px] hidden lg:block"
            >
              <div className="bg-slate-50 rounded-2xl p-4 md:p-6 shadow-lg border border-slate-200">
                <h2 className="text-2xl font-semibold text-slate-800 mb-6">
                  Contact Information
                </h2>

                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center text-slate-700 mr-4">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-sm text-slate-600 font-medium">
                          {info.label}
                        </p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-slate-800 hover:text-blue-600 transition-colors duration-200"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-slate-800">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-slate-50 rounded-2xl p-4 md:p-6 shadow-lg border border-slate-200 w-full md:w-[600px] mx-auto"
          >
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              Send Me a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Your Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Your Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Your Message
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none">
                    <MessageCircle className="h-5 w-5 text-slate-400" />
                  </div>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="block w-full pl-10 pr-3 py-1.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 transition-colors duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello!"
                  />
                </div>
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg font-medium text-white transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-slate-400 cursor-not-allowed'
                    : 'bg-slate-800 hover:bg-slate-700'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Send size={18} className="mr-2" />
                    Send Message
                  </div>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
