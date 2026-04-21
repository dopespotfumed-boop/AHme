import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  XMarkIcon, 
  ShoppingCartIcon,
  ArrowLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { badgeDescriptions } from '../data/products';

export default function Compare() {
  const { 
    state, 
    removeFromCompare, 
    clearCompare, 
    addToCart, 
    showToast,
    toggleCart
  } = useApp();
  
  const { compareList } = state;
  
  const handleAddToCart = (product: typeof compareList[0]) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };
  
  if (compareList.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-gradient-to-r from-eco-green to-eco-light-green text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Compare Products</h1>
            <p className="text-lg opacity-90">Select products to compare side-by-side</p>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-eco-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <PlusIcon className="w-12 h-12 text-eco-green" />
            </div>
            <h2 className="text-2xl font-bold text-eco-dark mb-4">No Products Selected</h2>
            <p className="text-gray-600 mb-8">
              Add products to your comparison list from the product pages to see them side-by-side.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-eco-green to-eco-light-green text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Compare Products</h1>
              <p className="text-lg opacity-90">Comparing {compareList.length} products</p>
            </div>
            <div className="flex gap-3">
              <Link
                to="/products"
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                Add More
              </Link>
              <button
                onClick={clearCompare}
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left p-4 bg-gray-50 font-semibold text-eco-dark w-40">Feature</th>
                {compareList.map((product) => (
                  <th key={product.id} className="p-4 bg-gray-50 text-center">
                    <button
                      onClick={() => removeFromCompare(product.id)}
                      className="absolute top-2 right-2 p-1 bg-gray-200 rounded-full hover:bg-gray-300 transition-colors"
                      aria-label={`Remove ${product.name} from comparison`}
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Product Image */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-eco-dark">Product</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="relative">
                      <button
                        onClick={() => removeFromCompare(product.id)}
                        className="absolute -top-2 -right-2 p-1 bg-red-100 rounded-full hover:bg-red-200 transition-colors z-10"
                        aria-label={`Remove ${product.name} from comparison`}
                      >
                        <XMarkIcon className="w-4 h-4 text-red-600" />
                      </button>
                      <Link to={`/products/${product.id}`}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-32 h-32 object-cover rounded-lg mx-auto mb-3"
                        />
                        <h3 className="font-semibold text-eco-dark hover:text-eco-green transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Price */}
              <tr className="border-b bg-eco-cream/50">
                <td className="p-4 font-semibold text-eco-dark">Price</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="text-2xl font-bold text-eco-green">£{product.price.toFixed(2)}</span>
                  </td>
                ))}
              </tr>
              
              {/* Category */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-eco-dark">Category</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center text-gray-600">
                    {product.category}
                  </td>
                ))}
              </tr>
              
              {/* Rating */}
              <tr className="border-b bg-eco-cream/50">
                <td className="p-4 font-semibold text-eco-dark">Rating</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      —
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Sustainability Badges */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-eco-dark">Sustainability</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex flex-wrap justify-center gap-1">
                      {product.badges.map((badge) => (
                        <span
                          key={badge}
                          className="inline-block px-2 py-1 bg-eco-green text-white text-xs rounded-full"
                          title={badgeDescriptions[badge]}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              
              {/* Environmental Impact - Plastic */}
              <tr className="border-b bg-eco-cream/50">
                <td className="p-4 font-semibold text-eco-dark">Plastic Saved</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="font-semibold text-blue-600">
                      {product.impactMetrics.plasticSavedGrams}g
                    </span>
                  </td>
                ))}
              </tr>
              
              {/* Environmental Impact - Carbon */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-eco-dark">Carbon Offset</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="font-semibold text-orange-600">
                      {product.impactMetrics.carbonOffsetKg}kg CO₂
                    </span>
                  </td>
                ))}
              </tr>
              
              {/* Environmental Impact - Water */}
              <tr className="border-b bg-eco-cream/50">
                <td className="p-4 font-semibold text-eco-dark">Water Saved</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <span className="font-semibold text-cyan-600">
                      {product.impactMetrics.waterSavedLiters}L
                    </span>
                  </td>
                ))}
              </tr>
              
              {/* Stock Status */}
              <tr className="border-b">
                <td className="p-4 font-semibold text-eco-dark">Availability</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {product.stock <= 5 ? (
                      <span className="text-orange-600 font-semibold">Low Stock ({product.stock} left)</span>
                    ) : (
                      <span className="text-green-600 font-semibold">In Stock</span>
                    )}
                  </td>
                ))}
              </tr>
              
              {/* Add to Cart */}
              <tr>
                <td className="p-4 font-semibold text-eco-dark">Action</td>
                {compareList.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors"
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                      Add to Cart
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        
        {/* View Cart CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => toggleCart(true)}
            className="text-eco-green hover:text-eco-light-green font-semibold transition-colors"
          >
            View Cart →
          </button>
        </div>
      </div>
    </div>
  );
}
