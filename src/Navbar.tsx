import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'Education', href: '/education' },
  { name: 'Experience', href: '/experience' },
  { name: 'Resume', href: '/resume' },
  { name: 'Contact', href: '/contact' },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <nav className="sticky top-0 z-50 w-full bg-neutral-900/90 backdrop-blur border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <span className="text-xl font-bold text-blue-400">Alex Kozik</span>
        <div className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-gray-200 hover:text-blue-400 transition font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded hover:bg-neutral-800 transition"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="w-6 h-6 text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute left-0 top-0 w-full bg-neutral-900 border-b border-neutral-800 shadow-lg animate-dropdown"
        >
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-200 hover:text-blue-400 transition font-medium text-lg"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      <style>{`
        @keyframes dropdown {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-dropdown {
          animation: dropdown 0.25s ease;
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 