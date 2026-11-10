import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ cartCount = 0, onOpenCart }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white transition"
              aria-label="Menyu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-1 md:flex-initial flex items-center justify-center md:justify-start">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left group cursor-pointer"
            >
              <span className="text-2xl sm:text-3xl font-black tracking-widest text-white uppercase group-hover:text-neutral-300 transition-colors">
                MEN<span className="text-neutral-500 font-light ml-1">BRAND</span>
              </span>
              <span className="block text-[10px] tracking-[0.3em] text-neutral-400 uppercase -mt-1 font-medium">
                Modern Menswear
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`text-sm tracking-wider uppercase transition-colors font-medium ${
                isActive('/') ? 'text-white border-b-2 border-white pb-1' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Asosiy
            </Link>
            <Link
              to="/catalog"
              className={`text-sm tracking-wider uppercase transition-colors font-medium ${
                isActive('/catalog') ? 'text-white border-b-2 border-white pb-1' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Katalog
            </Link>
            <Link
              to="/new"
              className={`text-sm tracking-wider uppercase transition-colors font-medium ${
                isActive('/new') ? 'text-white border-b-2 border-white pb-1' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Yangi to'plam
            </Link>
            <Link
              to="/admin"
              className={`text-xs tracking-wider uppercase px-2.5 py-1 rounded border transition-colors font-medium flex items-center gap-1.5 ${
                isActive('/admin')
                  ? 'bg-white text-black border-white'
                  : 'text-neutral-400 hover:text-white border-neutral-700 hover:border-neutral-500'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin
            </Link>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/catalog"
              className="p-2 text-neutral-400 hover:text-white transition"
              title="Qidiruv va Filtrlar"
            >
              <Search className="w-5 h-5" />
            </Link>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-200 hover:text-white transition group cursor-pointer"
              title="Xaridlar savati"
            >
              <ShoppingBag className="w-6 h-6 transition-transform group-hover:scale-105" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black font-black text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-800 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-2 text-sm uppercase tracking-wider ${
                isActive('/') ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Asosiy sahifa
            </Link>
            <Link
              to="/catalog"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-2 text-sm uppercase tracking-wider ${
                isActive('/catalog') ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Kiyimlar katalogi
            </Link>
            <Link
              to="/new"
              onClick={() => setMobileMenuOpen(false)}
              className={`block w-full text-left px-4 py-2 text-sm uppercase tracking-wider ${
                isActive('/new') ? 'bg-neutral-900 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Yangi to'plam
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left px-4 py-2 text-sm uppercase tracking-wider text-neutral-400 hover:text-white flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin Panel
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
