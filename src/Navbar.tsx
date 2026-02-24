import React, { useState, useRef, useEffect } from 'react';
import { FaLinkedin, FaEnvelope, FaGithub } from 'react-icons/fa';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Education', href: '#education' },
  { name: 'Experience', href: '#experience' },
  { name: 'Awards', href: '#awards' },
  { name: 'Papers', href: '#papers' },
  { name: 'Projects', href: '#projects' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const navbarHeight = 50; // Navbar height + some padding
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/80 backdrop-blur-lg shadow-md border-b border-white/20 dark:bg-gray-950/90 dark:border-gray-800">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Left: Name */}
        <button
          onClick={() => scrollToSection('#about')}
          className="text-xl md:text-2xl font-extrabold text-gray-800 tracking-tight hover:text-blue-600 transition dark:text-gray-100 dark:hover:text-orange-400"
        >
          Alex Kozik
        </button>

        {/* Desktop Nav links */}
        <div className="hidden md:flex gap-1 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className={
                  'px-4 py-2 rounded-lg font-medium transition text-sm ' +
                  (isActive
                    ? 'bg-blue-500/10 text-blue-600 dark:bg-gray-900 dark:text-gray-100 dark:border-b-2 dark:border-orange-400'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100')
                }
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* Social icons on desktop */}
        <div className="hidden md:flex gap-3 items-center">
          <a 
            href="https://linkedin.com/in/alex-kozik" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-orange-300"
          >
            <FaLinkedin size={20} />
          </a>
          <a 
            href="mailto:alex.kozik3141@gmail.com" 
            aria-label="Email"
            className="text-gray-600 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-orange-300"
          >
            <FaEnvelope size={20} />
          </a>
          <a 
            href="https://github.com/LambdaAK" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="GitHub"
            className="text-gray-600 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-orange-300"
          >
            <FaGithub size={20} />
          </a>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition dark:hover:bg-gray-800"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X className="w-6 h-6 text-gray-800" />
          ) : (
            <Menu className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute left-0 right-0 top-full bg-white/95 backdrop-blur-lg shadow-lg border-b border-white/20 animate-dropdown dark:bg-gray-950/95 dark:border-gray-800"
        >
          <div className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className={
                    'px-4 py-3 rounded-lg font-medium text-base text-left transition ' +
                    (isActive
                      ? 'bg-blue-500/10 text-blue-600 dark:bg-orange-500/20 dark:text-orange-300'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-blue-600 dark:text-gray-200 dark:hover:bg-gray-800 dark:hover:text-orange-300')
                  }
                >
                  {link.name}
                </button>
              );
            })}
            
            {/* Social icons on mobile */}
            <div className="flex gap-4 items-center justify-start mt-4 ml-2">
              <a 
                href="https://linkedin.com/in/alex-kozik" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-orange-300"
              >
                <FaLinkedin size={24} />
              </a>
              <a 
                href="mailto:alex.kozik3141@gmail.com" 
                aria-label="Email"
                className="text-gray-600 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-orange-300"
              >
                <FaEnvelope size={24} />
              </a>
              <a 
                href="https://github.com/LambdaAK" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="GitHub"
                className="text-gray-600 hover:text-blue-600 transition dark:text-gray-300 dark:hover:text-orange-300"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdown {
          0% { transform: translateY(-10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-dropdown {
          animation: dropdown 0.2s ease;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
