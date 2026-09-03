import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'একটি চিঠি লিখুন', path: '/write' },
    { name: 'চিঠি খুলুন', path: '/open' },
    { name: 'আমাদের গল্প', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper/80 backdrop-blur-md border-b border-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="font-serif text-2xl font-bold tracking-tight text-charcoal flex items-center gap-2">
          চিঠি
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm tracking-wider transition-colors hover:text-maroon ${
                location.pathname === link.path ? 'text-maroon font-medium' : 'text-charcoal/70'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-charcoal"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-20 left-0 right-0 bg-paper border-b border-charcoal/5 p-6 flex flex-col gap-6 md:hidden shadow-lg"
          >
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-lg font-sans transition-colors ${
                  location.pathname === link.path ? 'text-maroon font-medium' : 'text-charcoal/80'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
