import React from 'react';
import { Instagram, Send, Phone, MapPin, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-neutral-900 mt-20 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div className="space-y-4">
            <span className="text-xl font-black tracking-widest text-white uppercase">
              MEN<span className="text-neutral-500 font-light ml-1">BRAND</span>
            </span>
            <p className="text-neutral-500 leading-relaxed">
              Erkaklar uchun zamonaviy kiyimlar kolleksiyasi. Oversize xudi va t-shirtlardan tortib klassik slim-fit modellargacha.
            </p>
            <div className="flex items-center gap-4 text-white">
              <a href="https://t.me" target="_blank" rel="noreferrer" className="hover:text-neutral-400 transition" aria-label="Telegram">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-neutral-400 transition" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="tel:+998901234567" className="hover:text-neutral-400 transition" aria-label="Telefon">
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Kolleksiyalar</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer transition">Oversize Xudilar</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Slim-Fit Shimlar</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Minimalist Futbolkalar</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Klassik Ko'ylaklar</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Bomber Kurtkalar</span></li>
            </ul>
          </div>

          {/* Help & Service */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Mijozlarga Xizmat</h4>
            <ul className="space-y-2">
              <li><span className="hover:text-white cursor-pointer transition">Yetkazib berish shartlari</span></li>
              <li><span className="hover:text-white cursor-pointer transition">O'lchamlar jadvali</span></li>
              <li><span className="hover:text-white cursor-pointer transition">Qaytarish va almashtirish</span></li>
              <li><span className="hover:text-white cursor-pointer transition">To'lov turlari (Click / Payme / Naqd)</span></li>
            </ul>
          </div>

          {/* Contacts */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">Aloqa & Manzil</h4>
            <div className="space-y-2 text-neutral-500">
              <p className="flex items-center gap-2 text-neutral-400">
                <MapPin className="w-3.5 h-3.5 text-white" />
                Toshkent sh., Amir Temur shoh ko'chasi, 42
              </p>
              <p className="flex items-center gap-2 text-neutral-400">
                <Phone className="w-3.5 h-3.5 text-white" />
                +998 (90) 123-45-67
              </p>
              <p className="flex items-center gap-2 text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                Ish vaqti: 10:00 - 22:00 (Dam olishsiz)
              </p>
            </div>
          </div>

        </div>

        <div className="border-t border-neutral-900 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between text-neutral-600 text-[11px]">
          <p>© {new Date().getFullYear()} MEN BRAND. Barcha huquqlar himoyalangan.</p>
          <p className="mt-2 sm:mt-0">Premium Minimalist Erkaklar Modasi</p>
        </div>
      </div>
    </footer>
  );
}
