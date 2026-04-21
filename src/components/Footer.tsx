import { Link } from 'react-router-dom';
import { 
  EnvelopeIcon, 
  GlobeAltIcon, 
  HeartIcon, 
  CheckCircleIcon 
} from '@heroicons/react/24/outline';

export default function Footer() {
  return (
    <footer className="bg-eco-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-eco-light-green">About EcoSmart</h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              EcoSmart is a curated e-commerce platform dedicated to helping you make environmentally responsible purchasing decisions. We believe that sustainable living should be accessible and convenient for everyone.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-eco-light-green">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-eco-light-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-eco-light-green transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/learn" className="text-gray-300 hover:text-eco-light-green transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-eco-light-green transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-eco-light-green">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#facebook" className="text-gray-300 hover:text-eco-light-green transition-colors">
                <GlobeAltIcon className="w-6 h-6" />
              </a>
              <a href="#twitter" className="text-gray-300 hover:text-eco-light-green transition-colors">
                <HeartIcon className="w-6 h-6" />
              </a>
              <a href="#instagram" className="text-gray-300 hover:text-eco-light-green transition-colors">
                <CheckCircleIcon className="w-6 h-6" />
              </a>
              <a href="#linkedin" className="text-gray-300 hover:text-eco-light-green transition-colors">
                <EnvelopeIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <p className="text-center text-gray-400 text-sm">
            &copy; 2024 EcoSmart. All rights reserved. | Committed to a sustainable future.
          </p>
        </div>
      </div>
    </footer>
  );
}
