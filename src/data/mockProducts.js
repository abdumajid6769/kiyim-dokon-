export const mockProducts = [
  {
    id: 1,
    title: "Oversize Heavyweight Qora Xudi",
    category: "xudi",
    categoryLabel: "Xudilar",
    price: 349000,
    oldPrice: 420000,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Qora", "To'q kulrang"],
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80",
    description: "100% paxtadan ishlangan, qalin 450 gsm heavyweight oversize xudi. Ichki qismi mayin matoli, shamol o'tkazmaydi va tanaga qulay o'tiradi.",
    isNew: true,
    isPopular: true,
    stock: 15
  },
  {
    id: 2,
    title: "Slim-Fit Klassik Qora Jinsi Shim",
    category: "shim",
    categoryLabel: "Shimlar",
    price: 299000,
    oldPrice: 350000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Qora", "To'q ko'k"],
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80",
    description: "Premium elastan aralashgan paxta matodan tayyorlangan slim-fit jinsi shim. Kundalik kiyish uchun qulay va zamonaviy uslub.",
    isNew: false,
    isPopular: true,
    stock: 22
  },
  {
    id: 3,
    title: "Minimalist Oversize Oq Futbolka",
    category: "futbolka",
    categoryLabel: "Futbolkalar",
    price: 189000,
    oldPrice: 220000,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Oq", "Qora"],
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    description: "260 gsm premium zichlikdagi paxta futbolka. Minimalist ko'krak yozuvi, tushib turuvchi yelkalar, shaklini yo'qotmaydi.",
    isNew: true,
    isPopular: true,
    stock: 40
  },
  {
    id: 4,
    title: "Slim-Fit Premium Monoxrom Ko'ylak",
    category: "koylak",
    categoryLabel: "Ko'ylaklar",
    price: 279000,
    oldPrice: 320000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Qora", "Oq", "Kulrang"],
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80",
    description: "Klassik va smart-casual uslubdagi slim-fit ko'ylak. Nafas oluvchi premium paxta mato, maxsus qirqim tufayli qomatni chiroyli ko'rsatadi.",
    isNew: false,
    isPopular: false,
    stock: 18
  },
  {
    id: 5,
    title: "Oversize Qora Bomber Kurtka",
    category: "kurtka",
    categoryLabel: "Kurtkalar",
    price: 529000,
    oldPrice: 650000,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["Qora", "Zaytun"],
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80",
    description: "Suv o'tkazmaydigan neylon tashqi qobiq, issiq paxtali astar. Metall furnitura, zamonaviy erkin oversize bichim.",
    isNew: true,
    isPopular: true,
    stock: 10
  },
  {
    id: 6,
    title: "Cargo Relaxed-Fit Qora Shim",
    category: "shim",
    categoryLabel: "Shimlar",
    price: 319000,
    oldPrice: 380000,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Qora", "Xaki"],
    image: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=800&q=80",
    description: "Ko'p cho'ntakli zamonaviy street-style kargo shim. Qulay bel elastikasi va sozlanuvchi pastki qism.",
    isNew: false,
    isPopular: true,
    stock: 14
  }
];

export const categories = [
  { id: "all", label: "Barchasi" },
  { id: "xudi", label: "Xudilar" },
  { id: "futbolka", label: "Futbolkalar" },
  { id: "shim", label: "Shimlar & Jinsilar" },
  { id: "koylak", label: "Ko'ylaklar" },
  { id: "kurtka", label: "Kurtkalar" }
];

export const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
