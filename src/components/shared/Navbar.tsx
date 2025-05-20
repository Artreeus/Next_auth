"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { signOut } from 'next-auth/react';
import { ModeToggle } from "../shared/themeButton";
import { Menu, X, Github, Linkedin, Twitter } from "lucide-react";

type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  };
};

// Calculate navbar height to use as padding for the main content
const NAVBAR_HEIGHT = {
  desktop: '80px',   // Height when not scrolled
  scrolled: '64px',  // Height when scrolled
  mobile: '70px'     // Mobile height
};

const Navbar = ({ session }: { session: UserProps | null }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activePage, setActivePage] = useState("");

  // Track scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Set active page based on current path
    const path = window.location.pathname;
    setActivePage(path);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Set initial CSS variable for navbar height
    updateNavbarHeightVariable(false);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  
  // Update CSS variable when scrolled state changes
  useEffect(() => {
    updateNavbarHeightVariable(scrolled);
  }, [scrolled]);
  
  // Update CSS variable for navbar height
  const updateNavbarHeightVariable = (isScrolled: boolean) => {
    // Set CSS variable for navbar height that can be used site-wide
    document.documentElement.style.setProperty(
      '--navbar-height', 
      isScrolled ? NAVBAR_HEIGHT.scrolled : NAVBAR_HEIGHT.desktop
    );
    
    // Also set mobile height
    document.documentElement.style.setProperty(
      '--navbar-height-mobile', 
      NAVBAR_HEIGHT.mobile
    );
  };

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuContainer = document.getElementById('mobile-menu-container');
      if (menuOpen && menuContainer && !menuContainer.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Links array for easy management
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blogs", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/dashboard", label: "Dashboard", authRequired: true }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 backdrop-blur-lg bg-[rgba(20,16,41,0.8)] shadow-lg' : 'py-4 bg-transparent'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="relative group flex items-center gap-2"
            >
              <span className={`text-xl font-bold tracking-tight ${scrolled ? 'text-white' : 'text-white'}`}>
                <span className="gradient-text">M.</span>Hasan
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              <ul className="flex">
                {navLinks
                  .filter(link => !link.authRequired || (link.authRequired && session?.user))
                  .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`relative px-4 py-2 mx-1 font-medium transition-colors group ${
                          activePage === link.href 
                            ? 'text-blue-400' 
                            : 'text-white/80 hover:text-white'
                        }`}
                      >
                        {link.label}
                        <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 ${
                          activePage === link.href 
                            ? 'bg-blue-400 scale-x-100' 
                            : 'bg-white/60 group-hover:scale-x-100'
                        }`}></span>
                      </Link>
                    </li>
                  ))}
              </ul>

              {/* Right section - Auth & Theme toggle */}
              <div className="flex items-center ml-6 gap-3">
                {session?.user ? (
                  <button
                    className="relative overflow-hidden px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 transition-all duration-300 shadow-md"
                    onClick={() => signOut()}
                  >
                    <span className="relative z-10">Logout</span>
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="relative overflow-hidden px-5 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600/80 to-purple-600/80 hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md"
                  >
                    <span className="relative z-10">Login</span>
                  </Link>
                )}
                
                <div className="border-l border-white/20 h-6 mx-2"></div>
                
                <ModeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <ModeToggle />
              <button
                className="ml-4 p-2 text-white focus:outline-none"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu-container"
        className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="absolute inset-0 bg-[rgba(13,10,28,0.95)] backdrop-blur-lg"></div>
        <div className="relative h-full w-full flex flex-col p-8">
          {/* Menu Header */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-xl font-bold text-white" onClick={() => setMenuOpen(false)}>
              <span className="gradient-text">M.</span>Hasan
            </Link>
            <button
              className="p-2 text-white focus:outline-none"
              onClick={toggleMenu}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu Links */}
          <nav className="flex-1">
            <ul className="space-y-6 text-lg">
              {navLinks
                .filter(link => !link.authRequired || (link.authRequired && session?.user))
                .map((link) => (
                  <li key={link.href} className="border-b border-white/10 pb-4">
                    <Link
                      href={link.href}
                      className={`block transition-colors ${
                        activePage === link.href
                          ? 'text-blue-400 font-medium'
                          : 'text-white/90 hover:text-white'
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="mt-auto pt-8 border-t border-white/10">
            {/* Auth Button */}
            <div className="mb-6">
              {session?.user ? (
                <button
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-red-500/80 to-red-600/80 text-white font-medium"
                  onClick={() => {
                    signOut();
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="block w-full py-3 text-center rounded-lg bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white font-medium"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-5">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Spacer div that pushes content below the navbar */}
      <div className="navbar-spacer"></div>
      
      {/* Global styles for fixing navbar overlap issues */}
      <style jsx global>{`
        :root {
          --navbar-height: ${NAVBAR_HEIGHT.desktop};
          --navbar-height-mobile: ${NAVBAR_HEIGHT.mobile};
        }
        
        /* This spacer prevents content from being hidden under the navbar */
        .navbar-spacer {
          height: var(--navbar-height);
        }
        
        /* Ensure all pages have proper padding-top to account for fixed navbar */
        main {
          padding-top: var(--navbar-height);
        }
        
        /* Handle transition of navbar height */
        @media (max-width: 768px) {
          .navbar-spacer {
            height: var(--navbar-height-mobile);
          }
          
          main {
            padding-top: var(--navbar-height-mobile);
          }
        }
        
        /* Gradient text for logo */
        .gradient-text {
          background: linear-gradient(to right, #60a5fa, #c084fc);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </>
  );
};

export default Navbar;