import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { products } from '../data/products';
import { 
  CheckCircleIcon, 
  SparklesIcon, 
  HeartIcon,
  ShoppingCartIcon,
  ArrowRightIcon,
  GlobeAltIcon,
  BeakerIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function Home() {
  const { addToCart, showToast } = useApp();
  
  const popularProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }, []);
  
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  
  const featuredProducts = useMemo(() => {
    return [...products]
      .sort((a, b) => b.badges.length - a.badges.length)
      .slice(0, 6);
  }, []);
  
  const totalImpact = useMemo(() => {
    return products.reduce((acc, p) => ({
      plastic: acc.plastic + p.impactMetrics.plasticSavedGrams,
      carbon: acc.carbon + p.impactMetrics.carbonOffsetKg,
      water: acc.water + p.impactMetrics.waterSavedLiters,
      trees: acc.trees + p.impactMetrics.treesSaved
    }), { plastic: 0, carbon: 0, water: 0, trees: 0 });
  }, []);
  
  const handleAdd = (product: typeof products[0]) => {
    addToCart(product);
    showToast(`${product.name} added to cart!`, 'success');
  };

  const benefits = [
    {
      icon: CheckCircleIcon,
      title: 'Checked for real sustainability',
      description: 'We look for better materials and packaging, and explain the "why" on every product page.',
    },
    {
      icon: HeartIcon,
      title: 'Fair partners',
      description: 'We prioritize brands that support fair wages, safe working conditions, and community impact.',
    },
    {
      icon: SparklesIcon,
      title: 'Learn as you shop',
      description: 'Short, practical reads to help you make smarter swaps - without the guilt.',
    },
  ];
  
  const impactStats = [
    { icon: BeakerIcon, value: `${(totalImpact.plastic / 1000).toFixed(1)}kg`, label: 'Plastic kept out', color: 'text-blue-500' },
    { icon: FireIcon, value: `${totalImpact.carbon.toFixed(0)}kg`, label: 'CO₂ reduced', color: 'text-orange-500' },
    { icon: GlobeAltIcon, value: `${(totalImpact.water / 1000).toFixed(1)}k L`, label: 'Water saved', color: 'text-cyan-500' },
    { icon: SparklesIcon, value: totalImpact.trees.toFixed(1), label: 'Trees supported', color: 'text-green-500' },
  ];

  const faqs = [
    {
      q: 'How do you choose which products to sell?',
      a: 'We start with everyday use and then prioritize better materials + packaging. Each product page explains the key badges (like "Plastic-Free" or "Low-Carbon") so you can decide confidently.',
    },
    {
      q: 'Are the impact numbers exact?',
      a: 'They are estimated totals based on the impact metrics we track per product. The goal is to give you a clear "directionally helpful" picture, and you can see what drives it on each item.',
    },
    {
      q: 'Do I need to switch everything at once?',
      a: 'No. Pick one small swap - something you already use - then build from there. Small changes add up faster than you think.',
    },
    {
      q: 'What if I\'m not sure which option to try?',
      a: 'Start with the top-rated picks on the homepage, or browse by category (Personal Care, Home & Kitchen, Fashion & Accessories, Food & Beverages) to match your routine.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-eco-green via-eco-light-green to-eco-green text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-white"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-white"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-white"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
            Small swaps, real impact
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Eco-friendly essentials,<br />picked for everyday
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Bamboo, organic cotton, and plastic-free kitchen upgrades - hand-picked for quality and impact you can actually feel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-eco-green rounded-lg font-semibold hover:bg-eco-cream transition-colors"
            >
              Shop sustainable picks
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              to="/impact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-eco-green transition-colors"
            >
              <SparklesIcon className="w-5 h-5" />
              See your impact
            </Link>
          </div>
        </div>
      </section>
      
      {/* Impact Stats Bar */}
      <section className="bg-eco-dark text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {impactStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="flex flex-col items-center">
                  <Icon className={`w-8 h-8 ${stat.color} mb-2`} />
                  <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-gray-400 text-sm mt-4">
            Estimated impact totals from items currently in the shop
          </p>
        </div>
      </section>

      {/* Popular Sustainable Choices */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-eco-dark">Top-rated everyday swaps</h2>
              <p className="text-gray-600 mt-2">What customers keep coming back for</p>
            </div>
            <Link 
              to="/products" 
              className="hidden sm:inline-flex items-center gap-2 text-eco-green font-semibold hover:underline"
            >
              View All <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <Link to={`/products/${product.id}`}>
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-semibold">
                      <StarIconSolid className="w-3 h-3" />
                      {product.rating}
                    </div>
                  </div>
                </Link>
                <div className="p-4">
                  <Link to={`/products/${product.id}`}>
                    <h3 className="font-bold text-eco-dark mb-1 line-clamp-1 group-hover:text-eco-green transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-eco-green">£{product.price.toFixed(2)}</span>
                    <button
                      onClick={() => handleAdd(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      <ShoppingCartIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* New Arrivals */}
      {newArrivals.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-block px-3 py-1 bg-blue-500 text-white text-sm font-semibold rounded-full mb-2">
                  New this week
                </span>
                <h2 className="text-3xl font-bold text-eco-dark">Fresh arrivals</h2>
              </div>
              <Link 
                to="/products" 
                className="hidden sm:inline-flex items-center gap-2 text-eco-green font-semibold hover:underline"
              >
                View All <ArrowRightIcon className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <Link to={`/products/${product.id}`}>
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      <span className="absolute top-3 left-3 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                        New
                      </span>
                    </div>
                  </Link>
                  <div className="p-4">
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-bold text-eco-dark mb-1 line-clamp-1 group-hover:text-eco-green transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {product.badges.slice(0, 2).map(badge => (
                        <span key={badge} className="px-2 py-0.5 bg-eco-cream text-eco-green text-xs rounded-full">
                          {badge}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-eco-green">£{product.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleAdd(product)}
                        className="p-2 bg-eco-cream rounded-full hover:bg-eco-green hover:text-white transition-colors"
                        aria-label={`Add ${product.name} to cart`}
                      >
                        <ShoppingCartIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-eco-dark mb-4 text-center">Most sustainable (and actually usable)</h2>
          <p className="text-gray-600 text-center mb-12">The strongest impact picks, matched with real-world quality</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  {product.isNew && (
                    <span className="absolute top-3 left-3 px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                      New
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-eco-dark mb-2 group-hover:text-eco-green transition-colors">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {product.badges.map((badge) => (
                      <span
                        key={badge}
                        className="px-2 py-0.5 bg-eco-cream text-eco-green text-xs font-medium rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-eco-green">£{product.price.toFixed(2)}</span>
                    <span className="text-sm text-eco-green font-medium">View details →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors"
            >
              Browse All Products
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose EcoSmart Section */}
      <section className="bg-eco-cream py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-eco-dark mb-12 text-center">Why EcoSmart feels easier</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-eco-green rounded-full mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-eco-dark mb-3">{benefit.title}</h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-eco-green to-eco-light-green text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for your next swap?</h2>
          <p className="text-lg mb-8 opacity-90">
            Pick one product, see the impact, and keep going at your own pace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-eco-green rounded-lg font-semibold hover:bg-eco-cream transition-colors"
            >
              Shop sustainable picks
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
            <Link
              to="/learn"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-eco-green transition-colors"
            >
              What to learn next
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-eco-dark mb-2 text-center">Quick questions</h2>
          <p className="text-gray-600 text-center mb-10">Short answers to the stuff people ask before buying.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group bg-gray-50 rounded-xl border border-gray-100 p-5"
              >
                <summary className="cursor-pointer list-none flex items-start gap-3">
                  <span className="mt-0.5 inline-flex items-center justify-center w-8 h-8 rounded-full bg-eco-cream text-eco-green font-semibold">
                    {index + 1}
                  </span>
                  <span className="font-semibold text-eco-dark">{faq.q}</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
