import React from 'react';
import { ArrowRight, Flame, Sparkles, Shield } from 'lucide-react';

export default function Hero({ onExploreClick, onNewClick }) {
  return (
    <div className="relative overflow-hidden bg-[#0a0a0a] border-b border-neutral-800">
      {/* Background subtle mesh or gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-neutral-800/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Heading & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/80 text-neutral-300 text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-white" />
              <span>Yangi Mavsum 2025 Kolleksiyasi</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none">
              Erkakcha Uslub. <br />
              <span className="text-neutral-500 font-extralight italic">Ortiqcha So'zsiz.</span>
            </h1>

            <p className="text-neutral-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              Oversize xudilar va qalin futbolkalardan tortib, nozik chiziqli slim-fit shim hamda klassik ko'ylaklargacha. Har bir detalda yuqori sifat va monoxrom estetika.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold text-sm tracking-wider uppercase hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Katalogni Ko'rish</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onNewClick}
                className="w-full sm:w-auto px-8 py-4 border border-neutral-700 text-white font-medium text-sm tracking-wider uppercase hover:bg-neutral-900 hover:border-neutral-500 transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Yangi Kelganlar</span>
              </button>
            </div>

            {/* Badges */}
            <div className="pt-8 border-t border-neutral-800/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">100%</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Tabiiy Paxta</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">XS - XXL</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Hamma O'lchamlar</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">24 Soat</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider">Yetkazib Berish</p>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm lg:max-w-none group">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-900 border border-neutral-800 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                  alt="Men Brand Hero Showcase"
                  className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:scale-105 transition duration-700 ease-out"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#0a0a0a]/80 backdrop-blur-md border border-neutral-800 rounded">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block">Trend To'plam</span>
                      <h4 className="text-white font-bold text-base uppercase tracking-tight">Oversize Heavyweight Xudi</h4>
                      <p className="text-xs text-neutral-400">450 GSM • Cheklangan Miqdor</p>
                    </div>
                    <span className="text-sm font-black text-white">349,000 so'm</span>
                  </div>
                </div>
              </div>

              {/* Decorative minimalist card */}
              <div className="absolute -top-4 -right-4 bg-white text-black text-xs font-black px-4 py-2 uppercase tracking-widest shadow-xl rotate-3">
                Original 2025
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
