import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './pages/Catalog';
import ProductPage from './pages/ProductPage';
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import { CartProvider, useCart } from './context/CartContext';
import { mockProducts as initialMockProducts } from './data/mockProducts';
import { Flame, ShieldCheck, Truck, RefreshCw, Sparkles } from 'lucide-react';

function HomePage({ products }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  return (
    <div>
      <Hero
        onExploreClick={() => navigate('/catalog')}
        onNewClick={() => navigate('/new')}
      />

      {/* Highlights */}
      <div className="border-b border-neutral-800 bg-[#0d0d0d] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-white">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Tezkor Yetkazish</h4>
              <p className="text-xs text-neutral-400">Toshkent bo'ylab 1 kunda, viloyatlarga 2-3 kunda.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-white">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Premium Sifat</h4>
              <p className="text-xs text-neutral-400">450 gsm og'ir paxta va yuqori darajadagi tikuv.</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-900 rounded border border-neutral-800 text-white">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider text-white">Oson Almashtirish</h4>
              <p className="text-xs text-neutral-400">O'lcham mos kelmasa 3 kunda almashtirib beriladi.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured / Trend Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-end justify-between mb-8 pb-4 border-b border-neutral-800">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold block mb-1">
              Eng ko'p sotilganlar
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-400" />
              Trend Kiyimlar
            </h2>
          </div>
          <button
            onClick={() => navigate('/catalog')}
            className="text-xs font-bold uppercase tracking-wider text-neutral-400 hover:text-white transition"
          >
            Barchasini ko'rish →
          </button>
        </div>

        {/* Top 3 items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => (
            <div
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
              className="cursor-pointer group relative aspect-[3/4] bg-neutral-900 overflow-hidden border border-neutral-800 rounded shadow-md hover:border-neutral-500 transition duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-black/85 backdrop-blur-md rounded border border-neutral-800 flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-tight line-clamp-1">{product.title}</p>
                  <p className="text-xs text-neutral-400 font-mono mt-0.5">{new Intl.NumberFormat('uz-UZ').format(product.price)} so'm</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                  className="px-3 py-1.5 bg-white text-black text-xs font-black uppercase tracking-wider hover:bg-neutral-200"
                >
                  Ko'rish
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Catalog Section on Home */}
      <div className="bg-[#0e0e0e] border-t border-neutral-800 py-12">
        <Catalog
          products={products}
          onAddToCart={(p) => navigate(`/product/${p.id}`)}
        />
      </div>
    </div>
  );
}

function MainLayout({ products, setProducts }) {
  const { cartCount, setIsCartOpen } = useCart();

  const handleAddProduct = (newProd) => {
    setProducts([newProd, ...products]);
  };

  const handleUpdateProduct = (updatedProd) => {
    setProducts(products.map(p => p.id === updatedProd.id ? updatedProd : p));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 flex flex-col font-sans">
      {/* Top Banner */}
      <div className="bg-neutral-900 border-b border-neutral-800 text-center py-2 px-4 text-xs font-medium text-neutral-300 flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-white" />
        <span>Barcha yangi to'plamga 500,000 so'mdan yuqori xaridlarga bepul yetkazib berish mavjud!</span>
      </div>

      {/* Sticky Monochromatic Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Application Routes */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage products={products} />} />
          <Route path="/catalog" element={<Catalog products={products} />} />
          <Route path="/new" element={<Catalog products={products} onlyNew={true} />} />
          <Route path="/product/:id" element={<ProductPage products={products} />} />
          <Route
            path="/admin"
            element={
              <AdminPanel
                products={products}
                onAddProduct={handleAddProduct}
                onUpdateProduct={handleUpdateProduct}
                onDeleteProduct={handleDeleteProduct}
              />
            }
          />
        </Routes>
      </main>

      {/* Clean Minimalist Monochromatic Footer */}
      <Footer />

      {/* Global Modals and Drawers */}
      <CartDrawer />
      <CheckoutModal />
    </div>
  );
}

export default function App() {
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('men_brand_products');
      return saved ? JSON.parse(saved) : initialMockProducts;
    } catch {
      return initialMockProducts;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('men_brand_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  return (
    <Router>
      <CartProvider>
        <MainLayout products={products} setProducts={setProducts} />
      </CartProvider>
    </Router>
  );
}
