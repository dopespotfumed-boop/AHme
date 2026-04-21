import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function Checkout() {
  const { state: { cart }, removeFromCart, updateQuantity, cartSubtotal, cartTax, cartTotal, clearCart } = useApp();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    country: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.cardNumber) {
      alert('Please fill in all required fields');
      return;
    }
    clearCart();
    setOrderPlaced(true);
  };

  const total = cartSubtotal;
  const subtotal = total;
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = cartTax;
  const finalTotal = (subtotal + shippingCost + tax).toFixed(2);

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-eco-light py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-eco-green rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-eco-dark mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been successfully placed.</p>
            <p className="text-sm text-gray-500 mb-8">
              Order confirmation has been sent to <span className="font-semibold">{formData.email}</span>
            </p>
            <div className="bg-eco-cream p-4 rounded-lg mb-8">
              <p className="text-sm text-gray-600 mb-2">Order ID:</p>
              <p className="text-2xl font-bold text-eco-green">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">Estimated delivery: 5-7 business days</p>
              <Link to="/" className="inline-block px-6 py-2 bg-eco-green text-white rounded-lg hover:bg-eco-dark transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-eco-light py-12">
      <div className="container mx-auto px-4">
        <Link to="/cart" className="flex items-center gap-2 text-eco-green hover:text-eco-dark mb-8 transition-colors">
          <ChevronLeftIcon className="w-5 h-5" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-eco-dark mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-eco-dark mb-6">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="col-span-2 sm:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="col-span-2 sm:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="col-span-2 sm:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                  <input
                    type="text"
                    name="postcode"
                    placeholder="Postcode"
                    value={formData.postcode}
                    onChange={handleInputChange}
                    className="col-span-2 sm:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-2xl font-bold text-eco-dark mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Cardholder Name"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    maxLength={16}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="cardExpiry"
                      placeholder="MM/YY"
                      value={formData.cardExpiry}
                      onChange={handleInputChange}
                      maxLength={5}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      required
                    />
                    <input
                      type="text"
                      name="cardCVV"
                      placeholder="CVV"
                      value={formData.cardCVV}
                      onChange={handleInputChange}
                      maxLength={3}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-eco-green text-white font-bold rounded-lg hover:bg-eco-dark transition-colors text-lg"
              >
                Place Order
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-2xl font-bold text-eco-dark mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Your cart is empty</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-start pb-4 border-b">
                    <div className="flex-1">
                      <p className="font-semibold text-eco-dark">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-eco-green">£{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>£{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className={shippingCost === 0 ? 'text-eco-green font-semibold' : ''}>
                  {shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (20%):</span>
                <span>£{tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 flex justify-between">
                <span className="font-bold text-lg">Total:</span>
                <span className="font-bold text-lg text-eco-green">£{finalTotal}</span>
              </div>
            </div>

            {/* Free Shipping Info */}
            {shippingCost > 0 && (
              <div className="mt-4 p-3 bg-eco-cream rounded-lg text-sm text-eco-green">
                Free shipping on orders over £50!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
