import { useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products, badgeDescriptions } from '../data/products';
import type { Product } from '../data/products';
import { 
  MagnifyingGlassIcon, 
  XMarkIcon,
  FunnelIcon,
  ArrowsUpDownIcon,
  ScaleIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

 const categories = ['All Products', 'Personal Care', 'Home & Kitchen', 'Fashion & Accessories', 'Food & Beverages'];
const badgeList = ['Vegan', 'Plastic-Free', 'Low-Carbon', 'Organic', 'Fair Trade'] as const;

type Sort = 'featured' | 'price-low' | 'price-high' | 'sustainable' | 'newest' | 'rating';

const sortOpts = [
  { value: 'featured' as Sort, label: 'Featured' },
  { value: 'price-low' as Sort, label: 'Price: Low to High' },
  { value: 'price-high' as Sort, label: 'Price: High to Low' },
  { value: 'sustainable' as Sort, label: 'Most Sustainable' },
  { value: 'newest' as Sort, label: 'Newest Arrivals' },
  { value: 'rating' as Sort, label: 'Highest Rated' },
];

export default function Products() {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<Sort>('featured');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  
  const { addToCart, addToCompare, removeFromCompare, isInCompare, showToast, state } = useApp();

  
  const filteredAndSortedProducts = useMemo(() => {
    
    let res = products.filter((product: Product) => {
      
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchLower) ||
        product.shortDescription.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower) ||
        product.badges.some(b => b.toLowerCase().includes(searchLower));

      
      const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;

      
      const matchesBadges = selectedBadges.length === 0 ||
        selectedBadges.every(badge => product.badges.includes(badge as typeof badgeList[number]));

      return matchesSearch && matchesCategory && matchesBadges;
    });
    
    switch (sortBy) {
      case 'price-low':
        res = [...res].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        res = [...res].sort((a, b) => b.price - a.price);
        break;
      case 'sustainable':
        res = [...res].sort((a, b) => b.badges.length - a.badges.length);
        break;
      case 'newest':
        res = [...res].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime());
        break;
      case 'rating':
        res = [...res].sort((a, b) => b.rating - a.rating);
        break;
      default:
        res = [...res].sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return b.rating - a.rating;
        });
    }
    
    return res;
  }, [searchQuery, selectedCategory, selectedBadges, sortBy]);

  
  const toggleBadge = useCallback((badge: string) => {
    setSelectedBadges(prev =>
      prev.includes(badge) ? prev.filter(b => b !== badge) : [...prev, badge]
    );
  }, []);
  
  
  const clearAllFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedCategory('All Products');
    setSelectedBadges([]);
    setSortBy('featured');
    showToast('Filters cleared', 'info');
  }, [showToast]);
  
  
  const hasActiveFilters = searchQuery || selectedCategory !== 'All Products' || selectedBadges.length > 0;
  
  
  const quickAdd = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };
  
  
  const toggleComp = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInCompare(product.id)) {
      removeFromCompare(product.id);
      showToast(`${product.name} removed from comparison`, 'info');
    } else {
      if (state.compareList.length >= 4) {
        showToast('Maximum 4 products can be compared', 'warning');
        return;
      }
      addToCompare(product);
      showToast(`${product.name} added to comparison`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-eco-green to-eco-light-green text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-lg opacity-90">Discover our curated collection of sustainable products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products, categories, or badges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-eco-green transition-colors"
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <ArrowsUpDownIcon className="w-5 h-5 text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-eco-green bg-white"
              aria-label="Sort products"
            >
              {sortOpts.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
          
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg"
          >
            <FunnelIcon className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="bg-eco-green text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {selectedBadges.length + (selectedCategory !== 'All Products' ? 1 : 0)}
              </span>
            )}
          </button>
        </div>
        
        {/* Active Filter Tags */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-gray-600">Active filters:</span>
            
            {selectedCategory !== 'All Products' && (
              <button
                onClick={() => setSelectedCategory('All Products')}
                className="inline-flex items-center gap-1 px-3 py-1 bg-eco-cream text-eco-green rounded-full text-sm font-medium hover:bg-eco-green hover:text-white transition-colors"
              >
                {selectedCategory}
                <XMarkIcon className="w-4 h-4" />
              </button>
            )}
            
            {selectedBadges.map(badge => (
              <button
                key={badge}
                onClick={() => toggleBadge(badge)}
                className="inline-flex items-center gap-1 px-3 py-1 bg-eco-cream text-eco-green rounded-full text-sm font-medium hover:bg-eco-green hover:text-white transition-colors"
              >
                {badge}
                <XMarkIcon className="w-4 h-4" />
              </button>
            ))}
            
            <button
              onClick={clearAllFilters}
              className="text-sm text-gray-500 hover:text-red-500 underline"
            >
              Clear all
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:col-span-1 ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24 bg-white lg:bg-transparent p-4 lg:p-0 rounded-lg lg:rounded-none shadow-lg lg:shadow-none">
              {/* Category Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-eco-dark mb-4 flex items-center gap-2">
                  <FunnelIcon className="w-5 h-5" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-all duration-200 ${
                        selectedCategory === category
                          ? 'bg-eco-green text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-eco-cream hover:translate-x-1'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sustainability Filter */}
              <div className="mb-8">
                <h3 className="text-lg font-bold text-eco-dark mb-4">Sustainability</h3>
                <div className="space-y-3">
                  {badgeList.map((badge) => (
                    <label 
                      key={badge} 
                      className="flex items-center cursor-pointer group"
                      title={badgeDescriptions[badge]}
                    >
                      <input
                        type="checkbox"
                        checked={selectedBadges.includes(badge)}
                        onChange={() => toggleBadge(badge)}
                        className="w-5 h-5 text-eco-green rounded focus:ring-2 focus:ring-eco-green border-gray-300"
                      />
                      <span className="ml-3 text-gray-700 group-hover:text-eco-green transition-colors">{badge}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Compare Section */}
              {state.compareList.length > 0 && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
                    <ScaleIcon className="w-5 h-5" />
                    Compare ({state.compareList.length}/4)
                  </h3>
                  <div className="space-y-2 mb-3">
                    {state.compareList.map(p => (
                      <div key={p.id} className="text-sm text-blue-700 truncate">{p.name}</div>
                    ))}
                  </div>
                  <Link
                    to="/compare"
                    className="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                  >
                    Compare Now
                  </Link>
                </div>
              )}
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-eco-dark">{filteredAndSortedProducts.length}</span> of {products.length} products
              </p>
            </div>
            
            {filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAndSortedProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Image Container */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      
                      {/* Overlay Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {product.isNew && (
                          <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                            New
                          </span>
                        )}
                        {product.stock <= 5 && (
                          <span className="px-2 py-1 bg-orange-500 text-white text-xs font-semibold rounded-full">
                            Low Stock
                          </span>
                        )}
                      </div>
                      
                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => quickAdd(e, product)}
                          className="p-2 bg-white rounded-full shadow-md hover:bg-eco-green hover:text-white transition-colors"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingCartIcon className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => toggleComp(e, product)}
                          className={`p-2 rounded-full shadow-md transition-colors ${
                            isInCompare(product.id)
                              ? 'bg-blue-500 text-white'
                              : 'bg-white hover:bg-blue-500 hover:text-white'
                          }`}
                          aria-label={`${isInCompare(product.id) ? 'Remove from' : 'Add to'} comparison`}
                        >
                          <ScaleIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5">
                      
                      <h3 className="text-lg font-bold text-eco-dark mb-1 line-clamp-1 group-hover:text-eco-green transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
                      
                      {/* Badges */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {product.badges.slice(0, 3).map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-0.5 bg-eco-cream text-eco-green text-xs font-medium rounded-full"
                          >
                            {badge}
                          </span>
                        ))}
                        {product.badges.length > 3 && (
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                            +{product.badges.length - 3}
                          </span>
                        )}
                      </div>
                      
                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-eco-green">£{product.price.toFixed(2)}</span>
                        <span className="text-sm text-eco-green font-medium group-hover:underline">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-50 rounded-xl">
                <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search query</p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-3 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
