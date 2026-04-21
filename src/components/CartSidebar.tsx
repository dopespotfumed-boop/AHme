import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { 
  XMarkIcon, 
  PlusIcon, 
  MinusIcon, 
  TrashIcon,
  ShoppingBagIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

export default function CartSidebar() {
  const { 
    state, 
    toggleCart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    showToast,
    cartItemCount,
    cartSubtotal,
    cartTax,
    cartTotal,
    cartImpact
  } = useApp();
  
  const sidebarRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    if (state.isCartOpen) {
      closeButtonRef.current?.focus();
      
      document.body.style.overflow = 'hidden';
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          toggleCart(false);
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = '';
      };
    }
  }, [state.isCartOpen, toggleCart]);
  
  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id);
    showToast(`${name} removed from cart`, 'info');
  };
  
  const handleClearCart = () => {
    clearCart();
    showToast('Cart cleared', 'info');
  };
  
  if (!state.isCartOpen) return null;
  
  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={() => toggleCart(false)}
        aria-hidden="true"
      />
      
      <div
        ref={sidebarRef}
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col animate-slide-in-right"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-eco-dark flex items-center gap-2">
            <ShoppingBagIcon className="w-6 h-6 text-eco-green" />
            Your Cart ({cartItemCount})
          </h2>
          <button
            ref={closeButtonRef}
            onClick={() => toggleCart(false)}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close cart"
          >
            <XMarkIcon className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        
        {state.cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <ShoppingBagIcon className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
            <p className="text-gray-500 mb-6">Start adding eco-friendly products to make a difference!</p>
            <Link
              to="/products"
              onClick={() => toggleCart(false)}
              className="px-6 py-3 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {state.cart.map((item) => (
                <div 
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <Link 
                    to={`/products/${item.product.id}`}
                    onClick={() => toggleCart(false)}
                    className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </Link>
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/products/${item.product.id}`}
                      onClick={() => toggleCart(false)}
                      className="font-semibold text-eco-dark hover:text-eco-green transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-eco-green font-bold mt-1">
                      £{item.product.price.toFixed(2)}
                    </p>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        aria-label={`Decrease quantity of ${item.product.name}`}
                      >
                        <MinusIcon className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold" aria-label={`Quantity: ${item.quantity}`}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                        aria-label={`Increase quantity of ${item.product.name}`}
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                        className="p-1 rounded-full text-red-500 hover:bg-red-50 transition-colors ml-auto"
                        aria-label={`Remove ${item.product.name} from cart`}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 bg-eco-cream border-t border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <SparklesIcon className="w-5 h-5 text-eco-green" />
                <h3 className="font-semibold text-eco-dark">Your Environmental Impact</h3>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="bg-white p-2 rounded-lg text-center">
                  <p className="font-bold text-eco-green">{cartImpact.plasticSavedGrams}g</p>
                  <p className="text-gray-600 text-xs">Plastic Saved</p>
                </div>
                <div className="bg-white p-2 rounded-lg text-center">
                  <p className="font-bold text-eco-green">{cartImpact.carbonOffsetKg.toFixed(1)}kg</p>
                  <p className="text-gray-600 text-xs">CO₂ Offset</p>
                </div>
                <div className="bg-white p-2 rounded-lg text-center">
                  <p className="font-bold text-eco-green">{cartImpact.waterSavedLiters}L</p>
                  <p className="text-gray-600 text-xs">Water Saved</p>
                </div>
                <div className="bg-white p-2 rounded-lg text-center">
                  <p className="font-bold text-eco-green">{cartImpact.treesSaved.toFixed(2)}</p>
                  <p className="text-gray-600 text-xs">Trees Saved</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>£{cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (20%)</span>
                  <span>£{cartTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-eco-dark pt-2 border-t">
                  <span>Total</span>
                  <span>£{cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <button
                className="w-full py-3 bg-eco-green text-white rounded-lg font-semibold hover:bg-eco-light-green transition-colors mb-2"
              >
                <Link to="/checkout" onClick={() => toggleCart(false)} className="block">
                  Proceed to Checkout
                </Link>
              </button>
              
              <button
                onClick={handleClearCart}
                className="w-full py-2 text-gray-600 hover:text-red-500 transition-colors text-sm"
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
