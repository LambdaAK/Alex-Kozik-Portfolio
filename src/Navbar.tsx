import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const location = useLocation();

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
    <nav className="sticky top-0 z-50 w-full bg-[#232a36]/95 backdrop-blur shadow-lg">
      <div className="max-w-7xl w-full mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Nav links */}
        <div className="hidden md:flex gap-2 flex-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.name}
                to={link.href}
                className={
                  'px-6 py-4 rounded-3xl font-medium transition text-2xl ' +
                  (isActive
                    ? 'bg-[#2d3748] text-white shadow-lg'
                    : 'text-gray-300 hover:bg-[#2d3748]/70 hover:text-white')
                }
                onClick={() => setMenuOpen(false)}
                style={{ border: 'none', outline: 'none' }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        {/* Right: Name */}
        <span className="text-2xl md:text-2xl font-extrabold text-gray-100 tracking-tight ml-8">Alex Kozik</span>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-3 rounded-lg hover:bg-[#2d3748]/70 transition ml-2"
          aria-label="Open menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg className="w-8 h-8 text-gray-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {/* Dropdown menu for mobile */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute left-0 top-0 w-full bg-[#232a36] shadow-lg animate-dropdown rounded-b-2xl"
        >
          <div className="flex flex-col gap-2 px-6 py-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={
                    'px-4 py-3 rounded-xl font-medium text-lg transition ' +
                    (isActive
                      ? 'bg-[#2d3748] text-white shadow-sm'
                      : 'text-gray-300 hover:bg-[#2d3748]/70 hover:text-white')
                  }
                  onClick={() => setMenuOpen(false)}
                  style={{ border: 'none', outline: 'none' }}
                >
                  {link.name}
                </Link>
              );
            })}
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