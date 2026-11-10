import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { categories, allSizes } from '../data/mockProducts';

export default function Catalog({
  products = [],
  onAddToCart,
  initialCategory = 'all',
  onlyNew = false
}) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedSize, setSelectedSize] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(700000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (selectedSize !== 'all' && !item.sizes?.includes(selectedSize)) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = item.title?.toLowerCase().includes(query);
        const matchDesc = item.description?.toLowerCase().includes(query);
        if (!matchTitle && !matchDesc) return false;
      }
      if (onlyNew && !item.isNew) {
        return false;
      }
      if (item.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return 0;
    });
  }, [products, selectedCategory, selectedSize, searchQuery, sortBy, maxPrice, onlyNew]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSize('all');
    setSearchQuery('');
    setSortBy('default');
    setMaxPrice(700000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block mb-1">
            {onlyNew ? "Eksklyuziv Kolleksiya" : "To'liq Kolleksiya"}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black uppercase text-white tracking-tight">
            {onlyNew ? "Yangi Kelganlar" : "Kiyimlar Katalogi"}
          </h2>
          <p className="text-neutral-400 text-sm mt-1">
            Topildi: <span className="text-white font-bold">{filteredProducts.length}</span> ta mahsulot
          </p>
        </div>

        {/* Sort & Search Top bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded px-3 pl-9 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-400 transition"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 rounded px-3 py-2 focus:outline-none focus:border-neutral-500 cursor-pointer"
          >
            <option value="default">Saralash: Standart</option>
            <option value="price-asc">Narx: Arzondan qimmatga</option>
            <option value="price-desc">Narx: Qimmatdan arzonga</option>
            <option value="newest">Eng yangilari</option>
          </select>

          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="md:hidden flex items-center gap-1.5 px-3 py-2 bg-neutral-900 border border-neutral-800 text-xs text-white rounded hover:bg-neutral-800"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filtrlar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* Filters Sidebar */}
        <div className={`lg:block ${showMobileFilters ? 'block' : 'hidden'} space-y-8 bg-[#0e0e0e] lg:bg-transparent p-5 lg:p-0 rounded border lg:border-none border-neutral-800`}>

          <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
            <span className="text-xs uppercase tracking-widest text-neutral-300 font-bold flex items-center gap-2">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filtrlar
            </span>
            <button
              onClick={resetFilters}
              className="text-xs text-neutral-500 hover:text-white flex items-center gap-1 transition"
            >
              <RotateCcw className="w-3 h-3" /> Tozalash
            </button>
          </div>

          {/* Categories Filter */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3">Toifalar</h4>
            <div className="space-y-1.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition flex justify-between items-center ${
                    selectedCategory === cat.id
                      ? 'bg-white text-black font-bold'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <span>{cat.label}</span>
                  {selectedCategory === cat.id && <span className="text-[10px] uppercase">✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Sizes Filter */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">O'lcham (Size)</h4>
              {selectedSize !== 'all' && (
                <button onClick={() => setSelectedSize('all')} className="text-[10px] text-neutral-500 hover:text-white">
                  Hammasi
                </button>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedSize('all')}
                className={`py-2 text-xs font-mono font-bold rounded border transition ${
                  selectedSize === 'all'
                    ? 'bg-white text-black border-white'
                    : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                }`}
              >
                Barchasi
              </button>
              {allSizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 text-xs font-mono font-bold rounded border transition ${
                    selectedSize === size
                      ? 'bg-white text-black border-white'
                      : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">Maksimal Narx</h4>
              <span className="text-xs font-bold text-white font-mono">
                {new Intl.NumberFormat('uz-UZ').format(maxPrice)} so'm
              </span>
            </div>
            <input
              type="range"
              min="150000"
              max="700000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-white bg-neutral-800 h-1.5 rounded cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-neutral-500 mt-1 font-mono">
              <span>150k so'm</span>
              <span>700k so'm</span>
            </div>
          </div>

          <div className="p-4 rounded bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 space-y-2">
            <p className="font-semibold text-white uppercase text-[11px] tracking-wide">✓ 100% Sifat Kafolati</p>
            <p className="text-[11px] leading-relaxed">Har bir kiyim jo'natilishdan oldin sifat nazoratidan o'tkaziladi.</p>
          </div>

        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 border border-dashed border-neutral-800 rounded p-8">
              <p className="text-lg text-white font-bold mb-2">Hech narsa topilmadi</p>
              <p className="text-sm text-neutral-400 mb-6">Filtrlarga mos kiyim topilmadi. Qayta urinib ko'ring.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition"
              >
                Filtrlarni tozalash
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={onAddToCart}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
