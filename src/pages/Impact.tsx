import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  SparklesIcon,
  GlobeAltIcon,
  BeakerIcon,
  FireIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function Impact() {
  const { cartImpact, cartItemCount } = useApp();
  
  const score = useMemo(() => {
    return (
      cartImpact.plasticSavedGrams * 0.1 +
      cartImpact.carbonOffsetKg * 10 +
      cartImpact.waterSavedLiters * 0.01 +
      cartImpact.treesSaved * 100
    );
  }, [cartImpact]);
  
  const impactLevel = useMemo(() => {
    if (impactScore === 0) return { level: 'Getting Started', color: 'gray', message: 'Add items to your cart to see your positive impact!' };
    if (impactScore < 50) return { level: 'Eco Explorer', color: 'blue', message: 'Great start! Every small action makes a difference.' };
    if (impactScore < 150) return { level: 'Green Guardian', color: 'green', message: 'You\'re making a real difference for our planet!' };
    if (impactScore < 300) return { level: 'Earth Champion', color: 'emerald', message: 'Amazing! Your choices are creating lasting change.' };
    return { level: 'Sustainability Hero', color: 'eco-green', message: 'You\'re a true sustainability champion! Keep inspiring others.' };
  }, [impactScore]);
  
  const impactMetrics = [
    {
      icon: BeakerIcon,
      label: 'Plastic Saved',
      value: cartImpact.plasticSavedGrams,
      unit: 'grams',
      description: 'Less plastic pollution in our oceans and landfills',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: FireIcon,
      label: 'Carbon Offset',
      value: cartImpact.carbonOffsetKg,
      unit: 'kg CO₂',
      description: 'Reduced greenhouse gas emissions',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      icon: GlobeAltIcon,
      label: 'Water Saved',
      value: cartImpact.waterSavedLiters,
      unit: 'liters',
      description: 'Precious water resources conserved',
      color: 'bg-cyan-500',
      bgColor: 'bg-cyan-50',
    },
    {
      icon: SparklesIcon,
      label: 'Trees Saved',
      value: cartImpact.treesSaved,
      unit: 'trees',
      description: 'Forests protected for future generations',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
  ];
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-eco-green to-eco-light-green text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Your Environmental Impact</h1>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            See the positive difference you're making by choosing sustainable products
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Impact Level Card */}
        <div className="bg-eco-cream rounded-2xl p-8 mb-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-eco-green rounded-full mb-4">
            <SparklesIcon className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-eco-dark mb-2">{impactLevel.level}</h2>
          <p className="text-gray-600 text-lg mb-4">{impactLevel.message}</p>
          <div className="flex items-center justify-center gap-2 text-eco-green">
            <span className="font-semibold">{cartItemCount} items in cart</span>
          </div>
        </div>
        
        {/* Impact Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div 
                key={metric.label}
                className={`${metric.bgColor} rounded-xl p-6 text-center transition-transform hover:scale-105`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${metric.color} rounded-full mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-eco-dark mb-1">
                  {typeof metric.value === 'number' && metric.value % 1 !== 0 
                    ? metric.value.toFixed(2) 
                    : metric.value}
                </p>
                <p className="text-sm text-gray-600 mb-2">{metric.unit}</p>
                <h3 className="font-semibold text-eco-dark mb-1">{metric.label}</h3>
                <p className="text-xs text-gray-500">{metric.description}</p>
              </div>
            );
          })}
        </div>
        
        {/* Equivalencies Section */}
        {impactScore > 0 && (
          <div className="bg-white border-2 border-eco-cream rounded-xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-eco-dark mb-6 text-center">What Your Impact Means</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <p className="text-4xl mb-2">🚗</p>
                <p className="font-semibold text-eco-dark">
                  {(cartImpact.carbonOffsetKg * 4).toFixed(1)} km
                </p>
                <p className="text-sm text-gray-600">of driving emissions offset</p>
              </div>
              <div className="text-center p-4">
                <p className="text-4xl mb-2">🚿</p>
                <p className="font-semibold text-eco-dark">
                  {Math.round(cartImpact.waterSavedLiters / 50)} showers
                </p>
                <p className="text-sm text-gray-600">worth of water saved</p>
              </div>
              <div className="text-center p-4">
                <p className="text-4xl mb-2">🛍️</p>
                <p className="font-semibold text-eco-dark">
                  {Math.round(cartImpact.plasticSavedGrams / 5)} bags
                </p>
                <p className="text-sm text-gray-600">of plastic bags avoided</p>
              </div>
            </div>
          </div>
        )}
        
        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-eco-dark mb-4">Ready to Increase Your Impact?</h3>
          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Every sustainable product you choose contributes to a healthier planet. 
            Explore our collection and make a difference today.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-8 py-4 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors"
          >
            Browse Products
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
