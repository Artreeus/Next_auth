'use client'

import { useEffect } from 'react';
import Hero from "@/components/ui/Hero";
import InfiniteCarousel from "@/components/shared/InfiniteCarousel";
import Footer from '@/components/ui/Footer';
import Education from '@/components/shared/Education';
import Experience from '@/components/shared/Experience';
import FeaturedProjects from '@/components/shared/FeaturedProject';
import LatestBlogs from '@/components/shared/LatestBlogs';
import Contact from '@/components/shared/Contact';

// Function to create stars dynamically
function createStars() {
  const starsFragment = document.createDocumentFragment();
  const starCount = 100;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    // Random size
    if (Math.random() > 0.7) {
      star.classList.add('medium');
    } else if (Math.random() > 0.9) {
      star.classList.add('large');
    }
    
    // Random position
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    
    // Random animation timing
    star.style.setProperty('--duration', `${2 + Math.random() * 6}s`);
    star.style.setProperty('--delay', `${Math.random() * 10}s`);
    star.style.setProperty('--opacity', `${0.5 + Math.random() * 0.5}`);
    
    starsFragment.appendChild(star);
  }
  
  document.body.appendChild(starsFragment);
}

// Function to create shooting stars
function createShootingStars() {
  const starsFragment = document.createDocumentFragment();
  const starCount = 5;
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    // Random position (top half of the screen)
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 50}vh`;
    
    // Random animation timing
    star.style.setProperty('--duration', `${7 + Math.random() * 15}s`);
    star.style.setProperty('--delay', `${Math.random() * 20}s`);
    
    starsFragment.appendChild(star);
  }
  
  document.body.appendChild(starsFragment);
}

export default function Home() {
  useEffect(() => {
    // Create stars and shooting stars on component mount
    createStars();
    createShootingStars();
    
    // Cleanup on component unmount
    return () => {
      const stars = document.querySelectorAll('.star, .shooting-star');
      stars.forEach(star => star.remove());
    };
  }, []);

  return (
    <>
      {/* Animated background orbs */}
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>
      <div className="orb orb-4"></div>
      <div className="orb orb-5"></div>
      
      {/* Central glow focus */}
      <div className="focus-glow"></div>
      
      <main className="min-h-screen relative z-10">
        <Hero />
        <InfiniteCarousel />
        <Education/>
        <Experience/>
        <FeaturedProjects/> 
        <LatestBlogs/>
        <Contact/>
      </main>
      <Footer />
    </>
  );
}