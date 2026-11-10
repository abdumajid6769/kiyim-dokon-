import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingBag, Check, Truck, ShieldCheck, RefreshCw, Star, Share2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

export default function ProductPage({ products }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = products.find((p) => String(p.id) === String(id));

  const [selectedSize, setSelectedSize] = useState(null);
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-28 text-center">
        <h2 className="text-2xl font-black uppercase text-white mb-4">Mahsulot topilmadi</h2>
        <p className="text-neutral-400 text-sm mb-6">Siz qidirayotgan mahsulot mavjud emas yoki o'chirilgan bo'lishi mumkin.</p>
        <button
          onClick={() => navigate('/catalog')}
          className="px-6 py-3 bg-white text-black font-bold uppercase text-xs tracking-wider"
        >
          Katalogga qaytish
        </button>
      </div>
    );
  }

  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(product.price);
  const formattedOldPrice = product.oldPrice ? new Intl.NumberFormat('uz-UZ').format(product.oldPrice) : null;

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
    }, 1200);
  };

  // Related products from the same category
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-in fade-in duration-300">

      {/* Breadcrumb & Back button */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-neutral-800 text-xs">
        <button
          onClick={() => navigate(-1)}
          className="text-neutral-400 hover:text-white transition flex items-center gap-2 uppercase tracking-wider font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ortga</span>
        </button>

        <div className="text-neutral-500 flex items-center gap-2">
          <Link to="/" className="hover:text-white transition">Asosiy</Link>
          <span>/</span>
          <Link to="/catalog" className="hover:text-white transition">Katalog</Link>
          <span>/</span>
          <span className="text-neutral-300 truncate max-w-[150px]">{product.title}</span>
        </div>
      </div>

      {/* Main Single Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Left Column: Large Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[3/4] max-h-[680px] w-full bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden group">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover object-center group-hover:scale-102 transition duration-500"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-white text-black text-xs font-black px-3 py-1 uppercase tracking-widest shadow-xl">
                Yangi To'plam 2025
              </span>
            )}
            {product.oldPrice && (
              <span className="absolute top-4 right-4 bg-red-600 text-white text-xs font-black px-3 py-1 uppercase tracking-widest shadow-xl">
                Aksiya
              </span>
            )}
          </div>
        </div>

        {/* Right Column: Information, Size Selector & Actions */}
        <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.2em] text-neutral-400 font-semibold block">
              {product.categoryLabel || product.category} • Erkaklar Kolleksiyasi
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
              {product.title}
            </h1>

            {/* Price display */}
            <div className="flex items-baseline gap-4 pt-2">
              <span className="text-3xl font-black text-white tracking-tight">
                {formattedPrice} <span className="text-sm font-normal text-neutral-400">so'm</span>
              </span>
              {formattedOldPrice && (
                <span className="text-lg text-neutral-500 line-through">
                  {formattedOldPrice} so'm
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="border-t border-neutral-800/80 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">Mahsulot Tavsifi:</h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* SIZE SELECTOR (XS, S, M, L, XL, XXL) */}
          <div className="border-t border-neutral-800/80 pt-6 space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <span>O'lchamni tanlang (Majburiy):</span>
                {sizeError && <span className="text-red-400 text-xs font-normal">Tanlanmadi!</span>}
              </label>
              <span className="text-xs text-neutral-400 font-mono">
                {selectedSize ? (
                  <>Tanlandi: <strong className="text-white">{selectedSize}</strong></>
                ) : (
                  <span className="text-amber-400">Tanlanmagan</span>
                )}
              </span>
            </div>

            {/* Size Buttons */}
            <div className="grid grid-cols-6 gap-2">
              {product.sizes?.map((size) => {
                const isSelected = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`py-3 text-xs font-mono font-bold rounded border transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-white text-black border-white shadow-lg ring-2 ring-white scale-105'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-500 hover:text-white'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>

            {sizeError && (
              <p className="text-xs text-red-400 animate-pulse pt-1">
                ⚠️ Iltimos, davom etishdan oldin kiyim o'lchamini (XS - XXL) tanlang.
              </p>
            )}
          </div>

          {/* Quantity & Add to Cart button */}
          <div className="border-t border-neutral-800/80 pt-6 space-y-4">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                Miqdor:
              </span>
              <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-sm text-neutral-400 hover:text-white"
                >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-mono text-white font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-sm text-neutral-400 hover:text-white"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-neutral-500">
                Omborda: {product.stock || 12} dona mavjud
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 rounded transition-all duration-300 cursor-pointer shadow-xl ${
                addedAnimation
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-white text-black hover:bg-neutral-200 active:scale-[0.99]'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Savatga Qo'shildi!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Savatga Qo'shish — {new Intl.NumberFormat('uz-UZ').format(product.price * quantity)} so'm</span>
                </>
              )}
            </button>
          </div>

          {/* Guarantees & Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-neutral-800/80 pt-6 text-[11px] text-neutral-400">
            <div className="flex items-center gap-2 p-2.5 rounded bg-neutral-900/50 border border-neutral-800/60">
              <Truck className="w-4 h-4 text-white flex-shrink-0" />
              <span>Tezkor yetkazish</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded bg-neutral-900/50 border border-neutral-800/60">
              <RefreshCw className="w-4 h-4 text-white flex-shrink-0" />
              <span>3 kun almashtirish</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded bg-neutral-900/50 border border-neutral-800/60">
              <ShieldCheck className="w-4 h-4 text-white flex-shrink-0" />
              <span>100% Paxta mato</span>
            </div>
          </div>

        </div>

      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-24 pt-12 border-t border-neutral-800">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-1">
                Tavsiya etiladi
              </span>
              <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight">
                O'xshash Kiyimlar
              </h3>
            </div>
            <Link to="/catalog" className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white">
              Barchasi →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={() => navigate(`/product/${p.id}`)}
                onAddToCart={() => addToCart(p, p.sizes?.[0] || 'M', 1)}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
