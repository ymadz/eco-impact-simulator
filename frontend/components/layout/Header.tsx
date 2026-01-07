'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/simulator', label: 'Calculator' },
  { href: '/chemistry', label: 'Chemistry' },
  { href: '/limits', label: 'Limits' },
  { href: '/drrr', label: 'Safety' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl">
      <nav className="bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-full px-4 py-2 shadow-lg shadow-black/5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-gray-900 pl-2">
            <Leaf className="h-5 w-5 text-green-600" />
            <span className="hidden sm:inline text-sm">Eco-Impact</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-full transition-all text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/simulator"
            className="hidden md:flex bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
          >
            Get Started
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white/80 backdrop-blur-md border border-gray-200/50 rounded-2xl px-4 py-3 shadow-lg shadow-black/5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-2 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all text-sm font-medium"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/simulator"
            className="block mt-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full text-sm font-medium text-center transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
}
