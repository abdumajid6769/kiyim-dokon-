import React, { useState } from 'react';
import { X, ShoppingBag, Check, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!product) return null;

  const formattedPrice = new Intl.NumberFormat('uz-UZ').format(product.price);
  const formattedOldPrice = product.oldPrice ? new Intl.NumberFormat('uz-UZ').format(product.oldPrice) : null;

  const handleAdd = () => {
    addToCart(product, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div
        className="relative w-full max-w-3xl bg-[#121212] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white bg-neutral-900/80 rounded-full transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[90vh] overflow-y-auto">
          {/* Product Image */}
          <div className="relative aspect-[3/4] bg-neutral-900">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-white text-black text-xs font-black px-2.5 py-1 uppercase tracking-wider">
                Yangi To'plam
              </span>
            )}
          </div>

          {/* Details */}
          <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                  {product.categoryLabel || product.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight mt-1">
                  {product.title}
                </h2>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-black text-white">
                  {formattedPrice} <span className="text-sm font-normal text-neutral-400">so'm</span>
                </span>
                {formattedOldPrice && (
                  <span className="text-sm text-neutral-500 line-through">
                    {formattedOldPrice} so'm
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-300 leading-relaxed font-light border-y border-neutral-800/80 py-4">
                {product.description}
              </p>

              {/* Size Selector */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                    O'lchamni Tanlang:
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    Tanlandi: <strong className="text-white">{selectedSize}</strong>
                  </span>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 text-xs font-mono font-bold rounded border transition ${
                        selectedSize === size
                          ? 'bg-white text-black border-white'
                          : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Miqdor:
                </span>
                <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm text-neutral-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono text-white font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm text-neutral-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleAdd}
                disabled={addedAnimation}
                className={`w-full py-3.5 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition cursor-pointer ${
                  addedAnimation
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Qo'shildi!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Savatga Qo'shish</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-neutral-400 pt-2 border-t border-neutral-900">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-neutral-300" />
                  Tez yetkazib berish
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                  Sifat kafolatlangan
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
