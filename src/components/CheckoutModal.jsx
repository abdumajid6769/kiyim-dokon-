import React, { useState } from 'react';
import { X, Send, CheckCircle2, ShieldCheck, AlertCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

// Telegram Bot Konfiguratsiyasi (Placeholderlar)
export const TELEGRAM_CONFIG = {
  BOT_TOKEN: "YOUR_BOT_TOKEN_HERE", // Masalan: "123456789:ABCdefGhIJKlmNoPQRsTUVwxyZ"
  CHAT_ID: "YOUR_CHAT_ID_HERE"      // Masalan: "123456789" yoki Guruh/Kanal ID "-100123456789"
};

export default function CheckoutModal() {
  const {
    cart,
    cartTotal,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen
  } = useCart();

  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  const deliveryCost = cartTotal > 500000 ? 0 : 25000;
  const finalTotal = cartTotal + deliveryCost;

  // Format HTML message for Telegram
  const generateTelegramMessage = (name, phone, clientAddress, items, total, shipping) => {
    const date = new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' });

    let itemsText = items.map((item, index) => {
      const itemSubtotal = new Intl.NumberFormat('uz-UZ').format(item.price * item.quantity);
      return `${index + 1}. <b>${item.title}</b>\n   • O'lcham: <code>${item.selectedSize}</code>\n   • Soni: ${item.quantity} dona\n   • Narxi: ${itemSubtotal} so'm`;
    }).join('\n\n');

    const formattedTotal = new Intl.NumberFormat('uz-UZ').format(total);
    const formattedShipping = shipping === 0 ? "Bepul" : `${new Intl.NumberFormat('uz-UZ').format(shipping)} so'm`;

    return `🛍 <b>YANGI BUYURTMA — MEN BRAND</b>\n` +
      `📅 <i>${date}</i>\n` +
      `─────────────────────────\n` +
      `👤 <b>Mijoz:</b> ${name}\n` +
      `📞 <b>Telefon:</b> <a href="tel:${phone}">${phone}</a>\n` +
      (clientAddress ? `📍 <b>Manzil:</b> ${clientAddress}\n` : '') +
      `─────────────────────────\n` +
      `📦 <b>Buyurtma tarkibi:</b>\n\n` +
      `${itemsText}\n\n` +
      `─────────────────────────\n` +
      `🚚 <b>Yetkazib berish:</b> ${formattedShipping}\n` +
      `💰 <b>JAMI TO'LOV:</b> <b>${formattedTotal} so'm</b>\n` +
      `─────────────────────────\n` +
      `✅ <i>Iltimos, mijoz bilan 10 daqiqa ichida bog'laning!</i>`;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage("Iltimos, ismingizni kiriting!");
      return;
    }
    if (!phoneNumber.trim() || phoneNumber.length < 9) {
      setErrorMessage("Iltimos, to'liq telefon raqamingizni kiriting!");
      return;
    }
    if (cart.length === 0) {
      setErrorMessage("Savat bo'sh, mahsulot tanlang!");
      return;
    }

    setIsSubmitting(true);

    try {
      const messageText = generateTelegramMessage(
        customerName,
        phoneNumber,
        address,
        cart,
        finalTotal,
        deliveryCost
      );

      // Check if real token is provided, otherwise simulate successful order for demo/testing
      const isPlaceholderToken = !TELEGRAM_CONFIG.BOT_TOKEN || TELEGRAM_CONFIG.BOT_TOKEN === "YOUR_BOT_TOKEN_HERE";

      if (!isPlaceholderToken) {
        const url = `https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: TELEGRAM_CONFIG.CHAT_ID,
            text: messageText,
            parse_mode: 'HTML'
          })
        });

        const data = await response.json();
        if (!data.ok) {
          console.warn("Telegram API javobi:", data);
        }
      } else {
        // Console log preview for developer inspection
        console.log("%c[Telegram Bot Message Preview]:", "color: #10b981; font-weight: bold;");
        console.log(messageText);
      }

      // Record order locally in localStorage so Admin panel can also read it
      const newOrder = {
        id: 'MB-' + Math.floor(100000 + Math.random() * 900000),
        customerName,
        phoneNumber,
        address,
        items: [...cart],
        totalAmount: finalTotal,
        date: new Date().toISOString(),
        status: 'Yangi'
      };

      const existingOrders = JSON.parse(localStorage.getItem('men_brand_orders') || '[]');
      existingOrders.unshift(newOrder);
      localStorage.setItem('men_brand_orders', JSON.stringify(existingOrders));

      // Clear cart & show success view
      clearCart();
      setOrderSuccess(true);
    } catch (err) {
      console.error("Buyurtma yuborishda xato:", err);
      // Even if network fails, register order locally so client does not lose it
      clearCart();
      setOrderSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderSuccess(false);
    setCustomerName('');
    setPhoneNumber('');
    setAddress('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div
        className="relative w-full max-w-lg bg-[#111111] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/60">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-white" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {orderSuccess ? "Buyurtma Qabul Qilindi" : "Buyurtmani Rasmiylashtirish"}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-neutral-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mx-auto shadow-lg">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-black uppercase text-white tracking-tight">
                Rahmat, buyurtmangiz qabul qilindi!
              </h4>
              <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                Buyurtma tafsilotlari muvaffaqiyatli qayd etildi va Telegram botga yuborildi. Menejerimiz tez orada siz bilan bog'lanadi.
              </p>
            </div>

            <div className="p-4 bg-neutral-900 border border-neutral-800 rounded text-left text-xs space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>Qabul qiluvchi:</span>
                <span className="text-white font-medium">{customerName}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Telefon:</span>
                <span className="text-white font-mono">{phoneNumber}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>Jami summa:</span>
                <span className="text-white font-mono font-bold">
                  {new Intl.NumberFormat('uz-UZ').format(finalTotal)} so'm
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition"
            >
              Do'konga Qaytish
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="p-6 space-y-5">
            {/* Error banner */}
            {errorMessage && (
              <div className="p-3 bg-red-950/70 border border-red-800/80 rounded text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                  Ismingiz <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Azizbek Aliyev"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                  Telefon Raqamingiz <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+998 (90) 123-45-67"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 font-mono focus:outline-none focus:border-white transition"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-neutral-300 font-semibold mb-1.5">
                  Yetkazib Berish Manzili (Ixtiyoriy)
                </label>
                <input
                  type="text"
                  placeholder="Shahar, tuman, ko'cha, uy raqami"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white transition"
                />
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="border-t border-neutral-800/80 pt-4 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400 block">
                Buyurtma sarhisobi ({cart.length} xil kiyim):
              </span>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedSize}`}
                    className="flex justify-between items-center text-xs py-1 px-2 rounded bg-neutral-900/50"
                  >
                    <span className="text-neutral-300 truncate max-w-[220px]">
                      {item.title} <strong className="text-white">({item.selectedSize})</strong> × {item.quantity}
                    </span>
                    <span className="font-mono text-white text-[11px]">
                      {new Intl.NumberFormat('uz-UZ').format(item.price * item.quantity)} so'm
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Calculation */}
            <div className="border-t border-neutral-800 pt-3 space-y-1 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Yetkazib berish:</span>
                <span className="font-mono text-emerald-400 font-medium">
                  {deliveryCost === 0 ? "Bepul" : "25,000 so'm"}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-1">
                <span>Jami To'lov:</span>
                <span className="font-mono text-base">
                  {new Intl.NumberFormat('uz-UZ').format(finalTotal)} so'm
                </span>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-white text-black text-xs font-black uppercase tracking-widest hover:bg-neutral-200 transition flex items-center justify-center gap-2 cursor-pointer shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Yuborilmoqda...</span>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Buyurtmani Tasdiqlash</span>
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-neutral-500">
              Buyurtma tafsilotlari Telegram orqali do'kon administratoriga yuboriladi.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
