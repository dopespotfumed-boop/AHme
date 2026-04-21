import { useState, useMemo, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products, badgeDescriptions } from '../data/products';
import { 
  ArrowLeftIcon, 
  ShoppingCartIcon,
  PlusIcon,
  MinusIcon,
  ScaleIcon,
  CheckIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === parseInt(id || '0'));
  const [quantity, setQuantity] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addToCart, addToCompare, removeFromCompare, isInCompare, showToast, toggleCart } = useApp();

  useEffect(() => {
    setIsAnimating(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    
    return products
      .filter(p => p.id !== product.id)
      .map(p => ({
        ...p,
        score: (p.category === product.category ? 2 : 0) +
               p.badges.filter(b => product.badges.includes(b)).length
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4);
  }, [product]);
  
  const inCompare = product ? isInCompare(product.id) : false;
  
  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    showToast(`${quantity} × ${product.name} added to cart!`, 'success');
  };
  
  const handleToggleCompare = () => {
    if (!product) return;
    if (inCompare) {
      removeFromCompare(product.id);
      showToast(`${product.name} removed from comparison`, 'info');
    } else {
      addToCompare(product);
      showToast(`${product.name} added to comparison`, 'success');
    }
  };
  
  const getStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<StarIconSolid key={i} className="w-5 h-5 text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-400" />);
      } else {
        stars.push(<StarIcon key={i} className="w-5 h-5 text-gray-300" />);
      }
    }
    return stars;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-eco-dark mb-4">Product Not Found</h1>
          <Link to="/products" className="px-6 py-3 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white product-detail-container ${isAnimating ? 'animating' : ''}`}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/products"
          className="inline-flex items-center text-eco-green hover:text-eco-light-green transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-2" />
          Back to Products
        </Link>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="w-full h-96 md:h-[500px] bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Badges overlay */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.isNew && (
                <span className="px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full">
                  New
                </span>
              )}
              {product.stock <= 5 && (
                <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                  Low Stock
                </span>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Category */}
            <span className="inline-block px-3 py-1 bg-eco-cream text-eco-green rounded-full font-semibold text-sm mb-4">
              {product.category}
            </span>
            
            <h1 className="text-3xl md:text-4xl font-bold text-eco-dark mb-4">{product.name}</h1>
            
            {/* Price */}
            <div className="mb-6">
              <span className="text-4xl font-bold text-eco-green">£{product.price.toFixed(2)}</span>
              {product.stock <= 5 && (
                <span className="ml-3 text-orange-600 font-semibold">Only {product.stock} left!</span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>
            </div>

            {/* Sustainability Badges with Tooltips */}
            <div className="mb-6">
              <h2 className="text-lg font-bold text-eco-dark mb-3">Sustainability Features</h2>
              <div className="flex flex-wrap gap-2">
                {product.badges.map((badge) => (
                  <span
                    key={badge}
                    className="group relative inline-flex items-center gap-1 px-3 py-2 bg-eco-green text-white rounded-lg cursor-help"
                    title={badgeDescriptions[badge]}
                  >
                    <CheckIcon className="w-4 h-4" />
                    {badge}
                    {/* Tooltip */}
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-eco-dark text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {badgeDescriptions[badge]}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            {/* Environmental Impact Metrics */}
            <div className="mb-6 bg-eco-cream p-4 rounded-lg">
              <h2 className="text-lg font-bold text-eco-dark mb-3">Environmental Impact (per unit)</h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-xl font-bold text-blue-600">{product.impactMetrics.plasticSavedGrams}g</p>
                  <p className="text-xs text-gray-600">Plastic Saved</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-xl font-bold text-orange-600">{product.impactMetrics.carbonOffsetKg}kg</p>
                  <p className="text-xs text-gray-600">CO₂ Offset</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-xl font-bold text-cyan-600">{product.impactMetrics.waterSavedLiters}L</p>
                  <p className="text-xs text-gray-600">Water Saved</p>
                </div>
                <div className="text-center p-2 bg-white rounded-lg">
                  <p className="text-xl font-bold text-green-600">{product.impactMetrics.treesSaved}</p>
                  <p className="text-xs text-gray-600">Trees Saved</p>
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="font-semibold text-eco-dark">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <MinusIcon className="w-5 h-5" />
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  aria-label="Increase quantity"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors text-lg"
              >
                <ShoppingCartIcon className="w-6 h-6" />
                Add to Cart
              </button>
              <button
                onClick={handleToggleCompare}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-lg font-semibold transition-colors ${
                  inCompare 
                    ? 'bg-blue-500 text-white hover:bg-blue-600' 
                    : 'border-2 border-gray-300 text-gray-700 hover:border-eco-green hover:text-eco-green'
                }`}
              >
                <ScaleIcon className="w-5 h-5" />
                {inCompare ? 'In Compare' : 'Compare'}
              </button>
            </div>
            
            {/* View Cart Link */}
            <button
              onClick={() => toggleCart(true)}
              className="w-full mt-3 text-eco-green hover:text-eco-light-green font-semibold transition-colors"
            >
              View Cart →
            </button>

            {/* Why Eco-Friendly */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-eco-dark mb-3">Why This Product is Eco-Friendly</h2>
              <p className="text-gray-700 leading-relaxed">{product.whyEcoFriendly}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <section className="bg-eco-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-eco-dark mb-8 text-center">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                to={`/products/${relatedProduct.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-40 bg-gray-200 overflow-hidden">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {relatedProduct.isNew && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-eco-dark mb-1 line-clamp-1">{relatedProduct.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <StarIconSolid className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">{relatedProduct.rating}</span>
                  </div>
                  <span className="text-xl font-bold text-eco-green">£{relatedProduct.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
