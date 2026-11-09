import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Package, ShoppingBag, DollarSign, Check, X, Eye, RefreshCw, AlertCircle } from 'lucide-react';
import { allSizes, categories } from '../data/mockProducts';

export default function AdminPanel({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [activeAdminTab, setActiveAdminTab] = useState('products'); // 'products' | 'orders'
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('xudi');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [selectedSizes, setSelectedSizes] = useState(['XS', 'S', 'M', 'L', 'XL']);
  const [stock, setStock] = useState('15');
  const [isNew, setIsNew] = useState(true);

  // Load orders from localStorage
  const loadOrders = () => {
    try {
      const stored = localStorage.getItem('men_brand_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      } else {
        setOrders([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const resetForm = () => {
    setTitle('');
    setCategory('xudi');
    setPrice('');
    setOldPrice('');
    setImage('');
    setDescription('');
    setSelectedSizes(['XS', 'S', 'M', 'L', 'XL']);
    setStock('15');
    setIsNew(true);
    setEditingProduct(null);
  };

  const handleOpenAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (prod) => {
    setEditingProduct(prod);
    setTitle(prod.title || '');
    setCategory(prod.category || 'xudi');
    setPrice(prod.price ? String(prod.price) : '');
    setOldPrice(prod.oldPrice ? String(prod.oldPrice) : '');
    setImage(prod.image || '');
    setDescription(prod.description || '');
    setSelectedSizes(prod.sizes || ['M']);
    setStock(prod.stock ? String(prod.stock) : '10');
    setIsNew(prod.isNew ?? true);
    setIsModalOpen(true);
  };

  const handleToggleSize = (size) => {
    if (selectedSizes.includes(size)) {
      if (selectedSizes.length === 1) return; // Kamida 1 ta o'lcham bo'lishi kerak
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !image) {
      alert("Iltimos, mahsulot nomi, narxi va rasmini kiriting!");
      return;
    }

    const catObj = categories.find(c => c.id === category);

    const productData = {
      id: editingProduct ? editingProduct.id : Date.now(),
      title,
      category,
      categoryLabel: catObj ? catObj.label : category,
      price: Number(price),
      oldPrice: oldPrice ? Number(oldPrice) : null,
      image,
      description: description || "Zamonaviy erkaklar kiyimi. Yuqori sifatli mato.",
      sizes: selectedSizes,
      stock: Number(stock) || 10,
      isNew: Boolean(isNew)
    };

    if (editingProduct) {
      onUpdateProduct(productData);
    } else {
      onAddProduct(productData);
    }

    setIsModalOpen(false);
    resetForm();
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    const updated = orders.map((ord) =>
      ord.id === orderId ? { ...ord, status: newStatus } : ord
    );
    setOrders(updated);
    localStorage.setItem('men_brand_orders', JSON.stringify(updated));
  };

  const handleDeleteOrder = (orderId) => {
    if (!window.confirm("Buyurtmani ro'yxatdan o'chirmoqchimisiz?")) return;
    const updated = orders.filter((o) => o.id !== orderId);
    setOrders(updated);
    localStorage.setItem('men_brand_orders', JSON.stringify(updated));
  };

  // Calculations for Admin Stats
  const totalRevenue = orders.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalStockCount = products.reduce((acc, curr) => acc + (curr.stock || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-neutral-800 gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-neutral-500">Boshqaruv Paneli</span>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight">MEN BRAND — ADMIN</h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition flex items-center gap-2 ${
              activeAdminTab === 'products'
                ? 'bg-white text-black border-white'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Kiyimlar ({products.length})</span>
          </button>

          <button
            onClick={() => { setActiveAdminTab('orders'); loadOrders(); }}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded border transition flex items-center gap-2 ${
              activeAdminTab === 'orders'
                ? 'bg-white text-black border-white'
                : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Buyurtmalar ({orders.length})</span>
          </button>

          {activeAdminTab === 'products' && (
            <button
              onClick={handleOpenAddModal}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded flex items-center gap-1.5 transition shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Yangi Kiyim Qo'shish</span>
            </button>
          )}
        </div>
      </div>

      {/* Metrics / Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg">
          <div className="flex justify-between items-center text-neutral-400 text-xs uppercase tracking-wider">
            <span>Katalogdagi Kiyimlar</span>
            <Package className="w-4 h-4 text-white" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{products.length} <span className="text-xs text-neutral-400 font-normal">ta model</span></p>
          <p className="text-[11px] text-neutral-500 mt-1">Ombordagi umumiy qoldiq: {totalStockCount} dona</p>
        </div>

        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg">
          <div className="flex justify-between items-center text-neutral-400 text-xs uppercase tracking-wider">
            <span>Tushgan Buyurtmalar</span>
            <ShoppingBag className="w-4 h-4 text-white" />
          </div>
          <p className="text-2xl font-black text-white mt-2">{orders.length} <span className="text-xs text-neutral-400 font-normal">ta buyurtma</span></p>
          <p className="text-[11px] text-neutral-500 mt-1">Yangi kelganlar: {orders.filter(o => o.status === 'Yangi').length} ta</p>
        </div>

        <div className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg">
          <div className="flex justify-between items-center text-neutral-400 text-xs uppercase tracking-wider">
            <span>Umumiy Aylanma</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-emerald-400 font-mono mt-2">
            {new Intl.NumberFormat('uz-UZ').format(totalRevenue)} <span className="text-xs text-neutral-400 font-sans">so'm</span>
          </p>
          <p className="text-[11px] text-neutral-500 mt-1">Mijozlar buyurtmalari asosida</p>
        </div>
      </div>

      {/* PRODUCTS TAB */}
      {activeAdminTab === 'products' && (
        <div className="bg-[#111111] border border-neutral-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Do'konda mavjud kiyimlar</h3>
            <span className="text-xs text-neutral-400">Jami: {products.length} ta mahsulot</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-neutral-900/80 text-neutral-400 uppercase tracking-wider border-b border-neutral-800 text-[11px]">
                <tr>
                  <th className="py-3 px-4">Rasm & Nomi</th>
                  <th className="py-3 px-4">Toifa</th>
                  <th className="py-3 px-4">Narxi</th>
                  <th className="py-3 px-4">O'lchamlar</th>
                  <th className="py-3 px-4">Qoldiq</th>
                  <th className="py-3 px-4 text-right">Amallar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/80">
                {products.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-900/40 transition">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-12 h-14 object-cover rounded bg-neutral-950 flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-white text-xs">{prod.title}</p>
                        {prod.isNew && (
                          <span className="text-[10px] bg-white text-black font-extrabold px-1.5 py-0.2 rounded uppercase">
                            Yangi
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-neutral-300 font-medium">
                      {prod.categoryLabel || prod.category}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white">
                      {new Intl.NumberFormat('uz-UZ').format(prod.price)} so'm
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {prod.sizes?.map((s) => (
                          <span key={s} className="px-1.5 py-0.5 bg-neutral-900 border border-neutral-800 text-[10px] font-mono rounded">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-neutral-300">
                      {prod.stock || 10} dona
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(prod)}
                        className="p-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition"
                        title="Tahrirlash"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`"${prod.title}" kiyimini o'chirmoqchimisiz?`)) {
                            onDeleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 bg-neutral-800 hover:bg-red-900/80 text-neutral-400 hover:text-red-200 rounded transition"
                        title="O'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ORDERS TAB */}
      {activeAdminTab === 'orders' && (
        <div className="bg-[#111111] border border-neutral-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">Kelgan buyurtmalar</h3>
            <button
              onClick={loadOrders}
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Yangilash
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-16 text-neutral-500">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 mb-2" />
              <p className="text-sm">Hozircha buyurtmalar yo'q.</p>
              <p className="text-xs">Do'kondan yangi buyurtma berilganda bu yerda paydo bo'ladi.</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-800">
              {orders.map((order) => (
                <div key={order.id} className="p-5 hover:bg-neutral-900/40 transition space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-800/60 pb-3">
                    <div>
                      <span className="font-mono text-xs font-bold text-white bg-neutral-800 px-2 py-0.5 rounded">
                        #{order.id}
                      </span>
                      <span className="text-xs text-neutral-500 ml-3">
                        {new Date(order.date).toLocaleString('uz-UZ')}
                      </span>
                    </div>

                    {/* Status badges & selector */}
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                        className={`text-xs font-bold uppercase rounded px-2.5 py-1 border transition cursor-pointer ${
                          order.status === 'Yangi'
                            ? 'bg-blue-950 text-blue-300 border-blue-800'
                            : order.status === 'Yetkazilmoqda'
                            ? 'bg-amber-950 text-amber-300 border-amber-800'
                            : order.status === 'Bajarildi'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-neutral-800 text-neutral-300 border-neutral-700'
                        }`}
                      >
                        <option value="Yangi">Status: Yangi</option>
                        <option value="Yetkazilmoqda">Status: Yetkazilmoqda</option>
                        <option value="Bajarildi">Status: Bajarildi</option>
                        <option value="Bekor qilindi">Status: Bekor qilindi</option>
                      </select>

                      <button
                        onClick={() => handleDeleteOrder(order.id)}
                        className="p-1.5 text-neutral-500 hover:text-red-400"
                        title="Buyurtmani o'chirish"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Customer details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 block">Mijoz:</span>
                      <span className="font-bold text-white">{order.customerName}</span>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Telefon:</span>
                      <a href={`tel:${order.phoneNumber}`} className="font-mono text-white underline">
                        {order.phoneNumber}
                      </a>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Manzil:</span>
                      <span className="text-neutral-300">{order.address || "Ko'rsatilmagan"}</span>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="bg-neutral-950 p-3 rounded border border-neutral-800/80 space-y-1">
                    <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                      Buyurtma tarkibi:
                    </span>
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-neutral-300">
                        <span>• {item.title} (O'lcham: <strong className="text-white">{item.selectedSize}</strong>) × {item.quantity}</span>
                        <span className="font-mono font-medium text-white">
                          {new Intl.NumberFormat('uz-UZ').format(item.price * item.quantity)} so'm
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-neutral-800 pt-2 mt-2 flex justify-between font-bold text-xs text-white">
                      <span>Jami To'lov:</span>
                      <span className="font-mono text-emerald-400">
                        {new Intl.NumberFormat('uz-UZ').format(order.totalAmount)} so'm
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-[#141414] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95">
            <div className="p-5 border-b border-neutral-800 flex justify-between items-center bg-neutral-900/60">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white">
                {editingProduct ? "Kiyimni Tahrirlash" : "Yangi Kiyim Qo'shish"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[85vh] overflow-y-auto text-xs">
              <div>
                <label className="block uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  Kiyim Nomi *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Oversize Qora Xudi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                    Toifa *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white focus:outline-none focus:border-white"
                  >
                    {categories.filter(c => c.id !== 'all').map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                    Ombor Qoldig'i (dona)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                    Narxi (so'm) *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="349000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                    Eski narxi (so'm, aksiya uchun)
                  </label>
                  <input
                    type="number"
                    placeholder="420000"
                    value={oldPrice}
                    onChange={(e) => setOldPrice(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  Rasm Havolasi (URL) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white placeholder-neutral-500 font-mono text-[11px]"
                />
              </div>

              {/* Size Multi-Select (XS - XXL) */}
              <div>
                <label className="block uppercase tracking-wider text-neutral-300 font-semibold mb-2">
                  Mavjud O'lchamlar (XS - XXL):
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {allSizes.map((size) => {
                    const isSelected = selectedSizes.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => handleToggleSize(size)}
                        className={`py-2 text-xs font-mono font-bold rounded border transition ${
                          isSelected
                            ? 'bg-white text-black border-white'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider text-neutral-300 font-semibold mb-1">
                  Tavsifi & Matosi
                </label>
                <textarea
                  rows="3"
                  placeholder="100% paxta, zamonaviy erkin bichim..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-800 rounded p-2.5 text-white placeholder-neutral-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isNew"
                  checked={isNew}
                  onChange={(e) => setIsNew(e.target.checked)}
                  className="accent-white w-4 h-4 cursor-pointer"
                />
                <label htmlFor="isNew" className="text-neutral-300 uppercase font-semibold cursor-pointer">
                  "Yangi To'plam" (New Arrival) nishoni bilan chiqarish
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-neutral-800 text-neutral-300 rounded hover:bg-neutral-900"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-white text-black font-bold uppercase rounded hover:bg-neutral-200 transition"
                >
                  {editingProduct ? "Saqlash" : "Qo'shish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
