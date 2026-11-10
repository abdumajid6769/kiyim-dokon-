import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    setIsCheckoutOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const formattedTotal = new Intl.NumberFormat('uz-UZ').format(cartTotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#111] border-l border-neutral-800 text-white flex flex-col shadow-2xl">

          {/* Header */}
          <div className="p-6 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-white" />
              <h2 className="text-sm font-bold uppercase tracking-wider">Xaridlar Savati</h2>
              <span className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full font-mono">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <ShoppingBag className="w-12 h-12 text-neutral-600 mx-auto stroke-[1]" />
                <p className="text-sm font-medium text-neutral-300">Savatingiz hozircha bo'sh</p>
                <p className="text-xs text-neutral-500">O'zingizga ma'qul kiyimlarni tanlab savatga qo'shing.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-6 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider hover:bg-neutral-200"
                >
                  Xarid qilish
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.id}-${item.selectedSize}`}
                  className="flex gap-4 p-3 bg-neutral-900/60 border border-neutral-800/80 rounded"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-24 object-cover rounded bg-neutral-950 flex-shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="text-xs font-bold uppercase text-white line-clamp-1">{item.title}</h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.selectedSize)}
                          className="text-neutral-500 hover:text-red-400 transition"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
                        <span>O'lcham: <strong className="text-white">{item.selectedSize}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-800 rounded bg-neutral-950">
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 text-xs font-mono font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold font-mono text-white">
                        {new Intl.NumberFormat('uz-UZ').format(item.price * item.quantity)} so'm
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-neutral-800 bg-[#0c0c0c] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Oraliq jami:</span>
                  <span className="font-mono text-white">{formattedTotal} so'm</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Yetkazib berish:</span>
                  <span className="font-mono text-emerald-400 font-bold">
                    {cartTotal > 500000 ? "Bepul" : "25,000 so'm"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Jami to'lov:</span>
                  <span className="font-mono">
                    {new Intl.NumberFormat('uz-UZ').format(
                      cartTotal + (cartTotal > 500000 ? 0 : 25000)
                    )} so'm
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-neutral-200 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Buyurtma Berish</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={clearCart}
                  className="w-full py-2 text-neutral-500 hover:text-white text-[11px] uppercase tracking-wider transition"
                >
                  Savatni tozalash
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
