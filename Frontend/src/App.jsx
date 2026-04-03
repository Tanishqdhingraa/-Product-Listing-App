import { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, SlidersHorizontal, ArrowDownAZ, ArrowUpZA } from 'lucide-react';
import ProductCard from './components/ProductCard';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');

  // Example Categories derived from our mock data
  const categories = ['All', 'Electronics', 'Accessories', 'Furniture', 'Clothing', 'Groceries'];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/products', {
        params: {
          search,
          category,
          sort
        }
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional debounce for search could be implemented here
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);
    
    return () => clearTimeout(delayDebounceFn);
  }, [search, category, sort]);

  return (
    <div className="min-h-screen pb-12">
      {/* Header Area */}
      <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Vanguard Commerce</h1>
              <p className="text-sm text-gray-500 mt-1">Premium products curated for you</p>
            </div>
            
            {/* Search Bar */}
            <div className="relative w-full md:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-prime transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-prime focus:border-transparent transition-all sm:text-sm"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className="w-full md:w-64 shrink-0">
            <div className="glass-panel p-6 sticky top-32">
              <div className="flex items-center gap-2 mb-6 text-gray-900 font-semibold border-b border-gray-100 pb-4">
                <SlidersHorizontal className="h-5 w-5 text-prime" />
                <span>Filters & Sorting</span>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors text-sm font-medium ${
                        category === cat
                          ? 'bg-prime/10 text-prime'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Selection */}
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Sort By Price</h3>
                <div className="space-y-2 text-sm font-medium">
                  <label className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-50 text-gray-600 transition-colors">
                    <input
                      type="radio"
                      name="sort"
                      value=""
                      checked={sort === ''}
                      onChange={() => setSort('')}
                      className="text-prime focus:ring-prime"
                    />
                    <span>Relevance</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-50 text-gray-600 transition-colors">
                    <input
                      type="radio"
                      name="sort"
                      value="low_to_high"
                      checked={sort === 'low_to_high'}
                      onChange={() => setSort('low_to_high')}
                      className="text-prime focus:ring-prime"
                    />
                    <ArrowDownAZ className="h-4 w-4" />
                    <span>Low to High</span>
                  </label>
                  <label className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-50 text-gray-600 transition-colors">
                    <input
                      type="radio"
                      name="sort"
                      value="high_to_low"
                      checked={sort === 'high_to_low'}
                      onChange={() => setSort('high_to_low')}
                      className="text-prime focus:ring-prime"
                    />
                    <ArrowUpZA className="h-4 w-4" />
                    <span>High to Low</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <div key={n} className="glass-panel h-80 animate-pulse bg-gray-100/50"></div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-24 glass-panel">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No products found</h3>
                <p className="text-gray-500 mt-2 text-sm">Try adjusting your filters or search criteria.</p>
                <button
                  onClick={() => { setSearch(''); setCategory('All'); setSort(''); }}
                  className="mt-6 px-4 py-2 bg-prime text-white rounded-lg text-sm font-medium hover:bg-prime-light transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
