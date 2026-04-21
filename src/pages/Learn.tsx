import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { articles } from '../data/articles';
import { products } from '../data/products';
import { 
  ArrowRightIcon, 
  BookmarkIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  ShoppingCartIcon
} from '@heroicons/react/24/outline';
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

export default function Learn() {
  const [selectedArticleId, setSelectedArticleId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const { isBookmarked, toggleBookmark, showToast, addToCart } = useApp();

  const selectedArticle = selectedArticleId
    ? articles.find(a => a.id === selectedArticleId)
    : null;

  const categories = Array.from(new Set(articles.map(a => a.category)));
  
  const filteredArticles = useMemo(() => {
    return articles.filter(article => {
      const matchesSearch = !searchQuery || 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || article.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);
  
  const getRelatedProducts = (productIds: number[]) => {
    return products.filter(p => productIds.includes(p.id));
  };
  
  const handleBookmark = (articleId: number, articleTitle: string) => {
    toggleBookmark(articleId);
    if (isBookmarked(articleId)) {
      showToast(`"${articleTitle}" removed from bookmarks`, 'info');
    } else {
      showToast(`"${articleTitle}" bookmarked!`, 'success');
    }
  };
  
  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  if (selectedArticle) {
    const relatedArticles = articles.filter(
      a => a.id !== selectedArticle.id && selectedArticle.relatedArticleIds.includes(a.id)
    );
    const relatedProducts = getRelatedProducts(selectedArticle.relatedProductIds);

    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-eco-green to-eco-light-green text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <button
              onClick={() => setSelectedArticleId(null)}
              className="text-white hover:opacity-80 transition-opacity mb-4 flex items-center gap-2"
            >
              ← Back to Learn
            </button>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{selectedArticle.title}</h1>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold">
                    {selectedArticle.category}
                  </span>
                  <span className="flex items-center gap-1 text-sm opacity-90">
                    <ClockIcon className="w-4 h-4" />
                    {selectedArticle.readingTime} min read
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleBookmark(selectedArticle.id, selectedArticle.title)}
                className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                aria-label={isBookmarked(selectedArticle.id) ? 'Remove bookmark' : 'Bookmark article'}
              >
                {isBookmarked(selectedArticle.id) ? (
                  <BookmarkIconSolid className="w-6 h-6" />
                ) : (
                  <BookmarkIcon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none text-gray-700">
            {selectedArticle.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('#')) {
                const level = paragraph.match(/^#+/)?.[0].length || 1;
                const text = paragraph.replace(/^#+\s/, '');
                const headingClass = {
                  1: 'text-3xl font-bold mt-8 mb-4',
                  2: 'text-2xl font-bold mt-6 mb-3',
                  3: 'text-xl font-bold mt-4 mb-2',
                }[level] || 'text-lg font-bold mt-4 mb-2';
                return (
                  <h2 key={index} className={`text-eco-dark ${headingClass}`}>
                    {text}
                  </h2>
                );
              }
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 pt-8 border-t-2 border-gray-200">
              <h3 className="text-2xl font-bold text-eco-dark mb-2">Shop Related Products</h3>
              <p className="text-gray-600 mb-6">Put your knowledge into action with these eco-friendly products</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {relatedProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <Link to={`/products/${product.id}`} onClick={() => setSelectedArticleId(null)}>
                      <div className="h-32 bg-gray-200 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                      </div>
                    </Link>
                    <div className="p-3">
                      <Link 
                        to={`/products/${product.id}`} 
                        onClick={() => setSelectedArticleId(null)}
                        className="font-semibold text-eco-dark text-sm line-clamp-1 hover:text-eco-green transition-colors"
                      >
                        {product.name}
                      </Link>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-eco-green">£{product.price.toFixed(2)}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="p-1.5 bg-eco-cream rounded-full hover:bg-eco-green hover:text-white transition-colors"
                          aria-label={`Add ${product.name} to cart`}
                        >
                          <ShoppingCartIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-16 pt-8 border-t-2 border-gray-200">
              <h3 className="text-2xl font-bold text-eco-dark mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map(article => (
                  <button
                    key={article.id}
                    onClick={() => setSelectedArticleId(article.id)}
                    className="bg-white rounded-lg shadow-md p-6 text-left hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-eco-cream text-eco-green text-xs rounded-full font-medium">
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        {article.readingTime} min
                      </span>
                    </div>
                    <h4 className="font-bold text-eco-dark mb-2">{article.title}</h4>
                    <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-eco-green to-eco-light-green text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Learn About Sustainable Living</h1>
          <p className="text-lg opacity-90">Discover the knowledge you need to make environmentally responsible choices</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-eco-green transition-colors"
              aria-label="Search articles"
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
        </div>
        
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                !selectedCategory 
                  ? 'bg-eco-green text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-eco-cream'
              }`}
            >
              All Topics
            </button>
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? null : category)}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${
                  selectedCategory === category 
                    ? 'bg-eco-green text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-eco-cream'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Results count */}
        <p className="text-gray-600 mb-6">
          Showing <span className="font-semibold">{filteredArticles.length}</span> of {articles.length} articles
        </p>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map(article => (
              <div
                key={article.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block px-3 py-1 bg-eco-cream text-eco-green rounded-full text-xs font-semibold">
                      {article.category}
                    </span>
                    <button
                      onClick={() => handleBookmark(article.id, article.title)}
                      className="p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label={isBookmarked(article.id) ? 'Remove bookmark' : 'Bookmark article'}
                    >
                      {isBookmarked(article.id) ? (
                        <BookmarkIconSolid className="w-5 h-5 text-eco-green" />
                      ) : (
                        <BookmarkIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedArticleId(article.id)}
                    className="text-left w-full"
                  >
                    <h3 className="text-xl font-bold text-eco-dark mb-3 group-hover:text-eco-green transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                  </button>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {article.readingTime} min read
                    </span>
                    <button
                      onClick={() => setSelectedArticleId(article.id)}
                      className="flex items-center text-eco-green font-semibold text-sm hover:gap-2 transition-all"
                    >
                      Read More
                      <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <MagnifyingGlassIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">No articles found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or category filter</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
              className="px-6 py-3 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
