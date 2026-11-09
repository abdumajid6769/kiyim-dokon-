import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(product.price);
  const formattedOldPrice = product.oldPrice ? new Intl.NumberFormat('uz-UZ').format(product.oldPrice) : null;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group flex flex-col bg-neutral-950 border border-neutral-800/80 rounded overflow-hidden hover:border-neutral-500 transition-all duration-300 cursor-pointer shadow-md"
    >
      {/* Product Image Area */}
      <div className="relative aspect-[3/4] bg-neutral-900 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-white text-black text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              Yangi
            </span>
          )}
          {product.oldPrice && (
            <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded shadow">
              Aksiya
            </span>
          )}
        </div>

        {/* Quick action overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/product/${product.id}`);
            }}
            className="p-3 bg-white text-black rounded-full hover:bg-neutral-200 transition-transform transform translate-y-2 group-hover:translate-y-0"
            title="Batafsil ko'rish"
          >
            <Eye className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) {
                onAddToCart(product);
              } else {
                navigate(`/product/${product.id}`);
              }
            }}
            className="p-3 bg-neutral-900 text-white border border-neutral-700 rounded-full hover:bg-black transition-transform transform translate-y-2 group-hover:translate-y-0"
            title="Savatga qo'shish"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-3 bg-[#0d0d0d]">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 block mb-1">
            {product.categoryLabel || product.category}
          </span>
          <h3 className="text-sm font-semibold text-white tracking-wide group-hover:text-neutral-300 transition-colors line-clamp-1">
            {product.title}
          </h3>
        </div>

        {/* Available Sizes preview */}
        <div className="flex flex-wrap gap-1 items-center">
          <span className="text-[10px] text-neutral-500 mr-1 uppercase font-medium">O'lcham:</span>
          {product.sizes?.map((size) => (
            <span
              key={size}
              className="text-[10px] px-1.5 py-0.5 bg-neutral-900 text-neutral-300 border border-neutral-800 rounded font-mono"
            >
              {size}
            </span>
          ))}
        </div>

        {/* Price and Cart Button */}
        <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between">
          <div>
            <span className="text-base font-black text-white tracking-tight">
              {formattedPrice} <span className="text-xs font-normal text-neutral-400">so'm</span>
            </span>
            {formattedOldPrice && (
              <span className="block text-xs text-neutral-500 line-through">
                {formattedOldPrice} so'm
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onAddToCart) {
                onAddToCart(product);
              } else {
                navigate(`/product/${product.id}`);
              }
            }}
            className="px-3 py-1.5 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors flex items-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Savat</span>
          </button>
        </div>
      </div>
    </div>
  );
}
