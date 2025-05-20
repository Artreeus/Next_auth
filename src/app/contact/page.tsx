'use client'

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Sparkles, CheckCircle, Mail, User, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // For the floating particles effect
  useEffect(() => {
    const createParticles = () => {
      const container = document.querySelector('.particle-container');
      if (!container) return;
      
      // Clear any existing particles
      container.innerHTML = '';
      
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'contact-particle';
        
        // Random properties
        const size = 2 + Math.random() * 4;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = 15 + Math.random() * 15;
        
        // Set styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        
        container.appendChild(particle);
      }
    };
    
    createParticles();
    
    // Recreate particles on window resize
    window.addEventListener('resize', createParticles);
    return () => window.removeEventListener('resize', createParticles);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading time
    await new Promise(resolve => setTimeout(resolve, 1500));
  
    // Safely parse localStorage value with a fallback
    const messages = JSON.parse(localStorage.getItem('messages') || '[]');
    messages.push(formData);
    localStorage.setItem('messages', JSON.stringify(messages));
  
    setIsLoading(false);
    setSubmitted(true);
    
    // Reset form after showing success message
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 500);
    
    // Reset success message after a delay
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="flex justify-center items-center p-4 sm:p-8 md:p-12 min-h-screen relative overflow-hidden">
      {/* Floating particles container */}
      <div className="particle-container absolute inset-0 z-0"></div>
      
      {/* Glowing orb effects */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-600/10 blur-3xl z-0 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-3xl z-0 animate-pulse-slow-delayed"></div>
      
      <div className="w-full max-w-6xl mx-auto z-10 flex flex-col lg:flex-row rounded-2xl overflow-hidden shadow-[0_0_70px_rgba(128,0,255,0.2)]">
        {/* Left side - Image section */}
        <div className="w-full lg:w-5/12 relative overflow-hidden">
          {/* Dynamic image from Unsplash */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-900 to-indigo-900 opacity-50 z-10"></div>
          <div className="absolute inset-0">
            
          </div>
          
          {/* Content overlay */}
          <div className="relative z-20 h-full flex flex-col justify-center p-8 lg:p-12">
            <h2 className="text-white text-3xl lg:text-4xl font-bold mb-6 neon-text leading-tight">
              Let's Start <br />Something <span className="gradient-text">Special</span> Together
            </h2>
            
            <p className="text-blue-100 mb-8 max-w-md">
              Have a project in mind or just want to say hello? Fill out the form and I'll get back to you as soon as possible.
            </p>
            
            {/* Contact info */}
            <div className="space-y-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-blue-300" />
                </div>
                <span>ratulhasan048@gmail.com</span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-300" />
                </div>
                <span>Available for freelance projects</span>
              </div>
            </div>
          </div>
          
          {/* Animated stars overlay */}
          <div className="stars-overlay absolute inset-0 z-10 opacity-60"></div>
        </div>
        
        {/* Right side - Form section */}
        <div className="w-full lg:w-7/12 bg-glassmorphism relative overflow-hidden border-t lg:border-l border-white/10">
          {/* Animated shine effect */}
          <div className="absolute inset-0 z-0 shine-effect"></div>
          
          <CardContent className="relative z-10 p-6 sm:p-8 md:p-10 lg:p-12">
            <div className="pb-6 text-center lg:text-left">
              <h1 className="text-3xl font-bold mb-2 tracking-tight neon-text flex items-center justify-center lg:justify-start gap-2">
                <Sparkles className="w-6 h-6 text-blue-400" />
                <span>Get In Touch</span>
              </h1>
              <p className="text-blue-200/80 text-sm">We'd love to hear from you</p>
            </div>
            
            {submitted && (
              <div className="p-5 mb-8 bg-green-500/20 border border-green-500/30 backdrop-blur-sm rounded-lg text-green-400 flex items-center gap-3 text-sm font-medium animate-fade-in">
                <CheckCircle className="w-6 h-6 flex-shrink-0" />
                <span>Thank you! Your message has been sent successfully. We'll get back to you soon.</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${focusedField === 'name' ? 'text-blue-400' : 'text-white/80'}`}>
                    <User className="w-4 h-4" />
                    <span>Your Name</span>
                    {focusedField === 'name' && <span className="inline-block w-1 h-1 rounded-full bg-blue-400 animate-ping"></span>}
                  </label>
                  <div className={`relative ${focusedField === 'name' ? 'input-focused' : ''}`}>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => handleFocus('name')}
                      onBlur={handleBlur}
                      placeholder="Enter your name"
                      required
                      className="w-full p-4 bg-white/5 border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 pl-4"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${focusedField === 'email' ? 'text-blue-400' : 'text-white/80'}`}>
                    <Mail className="w-4 h-4" />
                    <span>Your Email</span>
                    {focusedField === 'email' && <span className="inline-block w-1 h-1 rounded-full bg-blue-400 animate-ping"></span>}
                  </label>
                  <div className={`relative ${focusedField === 'email' ? 'input-focused' : ''}`}>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => handleFocus('email')}
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      required
                      className="w-full p-4 bg-white/5 border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 pl-4"
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${focusedField === 'subject' ? 'text-blue-400' : 'text-white/80'}`}>
                  <span>Subject</span>
                  {focusedField === 'subject' && <span className="inline-block w-1 h-1 rounded-full bg-blue-400 animate-ping"></span>}
                </label>
                <div className={`relative ${focusedField === 'subject' ? 'input-focused' : ''}`}>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => handleFocus('subject')}
                    onBlur={handleBlur}
                    placeholder="What's this about?"
                    required
                    className="w-full p-4 bg-white/5 border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 pl-4"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className={`text-sm font-medium transition-colors duration-200 flex items-center gap-1.5 ${focusedField === 'message' ? 'text-blue-400' : 'text-white/80'}`}>
                  <MessageCircle className="w-4 h-4" />
                  <span>Your Message</span>
                  {focusedField === 'message' && <span className="inline-block w-1 h-1 rounded-full bg-blue-400 animate-ping"></span>}
                </label>
                <div className={`relative ${focusedField === 'message' ? 'input-focused' : ''}`}>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => handleFocus('message')}
                    onBlur={handleBlur}
                    placeholder="Tell us about your project or inquiry..."
                    rows={6}
                    required
                    className="w-full p-4 bg-white/5 border-white/10 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 resize-none pl-4"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-6 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700 font-semibold rounded-lg transition-all duration-300 relative overflow-hidden shadow-[0_4px_20px_rgba(125,137,255,0.3)] text-base"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </span>
              </Button>
            </form>
            
            {/* Bottom accent */}
            <div className="text-xs text-center mt-6 text-white/50">
              We respect your privacy and will never share your information
            </div>
          </CardContent>
        </div>
      </div>
      
      <style jsx>{`
        .particle-container {
          pointer-events: none;
        }
        
        .contact-particle {
          position: absolute;
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          pointer-events: none;
          opacity: 0.7;
          animation: float-around linear infinite;
        }
        
        @keyframes float-around {
          0% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(20px, 30px);
          }
          50% {
            transform: translate(-10px, 20px);
          }
          75% {
            transform: translate(-20px, -30px);
          }
          100% {
            transform: translate(0, 0);
          }
        }
        
        .shine-effect {
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.02) 25%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.02) 75%,
            rgba(255, 255, 255, 0) 100%
          );
          animation: shine 8s infinite;
        }
        
        @keyframes shine {
          0% {
            opacity: 0;
            transform: translateX(-100%) translateY(-100%) rotate(35deg);
          }
          15%, 25% {
            opacity: 0.5;
            transform: translateX(100%) translateY(100%) rotate(35deg);
          }
          100% {
            opacity: 0;
            transform: translateX(100%) translateY(100%) rotate(35deg);
          }
        }
        
        .input-focused::before {
          content: '';
          position: absolute;
          left: -10px;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          background-color: #60a5fa;
          border-radius: 50%;
          filter: blur(1px);
          box-shadow: 0 0 10px 2px rgba(96, 165, 250, 0.5);
          animation: pulse 1.5s infinite;
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 0.5;
            transform: translateY(-50%) scale(1);
          }
          50% {
            opacity: 1;
            transform: translateY(-50%) scale(1.3);
          }
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delayed {
          animation: pulseSlow 4s ease-in-out 2s infinite;
        }
        
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.9);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .stars-overlay {
          background-image: 
            radial-gradient(2px 2px at 40px 60px, #fff, rgba(0,0,0,0)),
            radial-gradient(2px 2px at 20px 50px, rgba(255,255,255,0.4), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 30px 100px, rgba(255,255,255,0.7), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 40px 60px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 110px 90px, rgba(255,255,255,0.6), rgba(0,0,0,0)),
            radial-gradient(2px 2px at 190px 150px, rgba(255,255,255,0.5), rgba(0,0,0,0));
          background-repeat: repeat;
          background-size: 200px 200px;
          animation: twinkle 5s ease-in-out infinite;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        .gradient-text {
          background: linear-gradient(to right, #60a5fa, #c084fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
};

export default ContactPage;