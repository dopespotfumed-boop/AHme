export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-eco-green to-eco-light-green text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About EcoSmart</h1>
          <p className="text-lg opacity-90">Our mission to make sustainable living accessible to everyone</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-eco-dark mb-6">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            EcoSmart is dedicated to making sustainable living accessible and convenient for everyone. We believe that environmental responsibility shouldn't be complicated or expensive. Our mission is to curate the best eco-friendly products and provide educational resources to help you make informed, sustainable choices.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            We work directly with verified sustainable brands to ensure that every product in our collection meets rigorous environmental and ethical standards. By shopping with EcoSmart, you're not just making a purchase—you're voting for a more sustainable future.
          </p>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-eco-dark mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-eco-cream p-6 rounded-lg">
              <h3 className="text-xl font-bold text-eco-green mb-3">Sustainability</h3>
              <p className="text-gray-700">
                We prioritize environmental impact in every decision we make, from product selection to packaging to shipping methods.
              </p>
            </div>
            <div className="bg-eco-cream p-6 rounded-lg">
              <h3 className="text-xl font-bold text-eco-green mb-3">Transparency</h3>
              <p className="text-gray-700">
                We believe in complete transparency about our products, partners, and practices. You deserve to know exactly what you're buying.
              </p>
            </div>
            <div className="bg-eco-cream p-6 rounded-lg">
              <h3 className="text-xl font-bold text-eco-green mb-3">Education</h3>
              <p className="text-gray-700">
                Knowledge is power. We provide educational content to help you understand sustainability and make better choices.
              </p>
            </div>
            <div className="bg-eco-cream p-6 rounded-lg">
              <h3 className="text-xl font-bold text-eco-green mb-3">Accessibility</h3>
              <p className="text-gray-700">
                Sustainable products should be accessible to everyone. We work to offer quality eco-friendly options at reasonable prices.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-eco-dark mb-6">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-eco-green text-white p-8 rounded-lg">
              <div className="text-4xl font-bold mb-2">20+</div>
              <p className="text-lg">Verified Sustainable Brands</p>
            </div>
            <div className="bg-eco-light-green text-white p-8 rounded-lg">
              <div className="text-4xl font-bold mb-2">500+</div>
              <p className="text-lg">Eco-Friendly Products</p>
            </div>
            <div className="bg-eco-green text-white p-8 rounded-lg">
              <div className="text-4xl font-bold mb-2">10K+</div>
              <p className="text-lg">Happy Customers</p>
            </div>
          </div>
        </section>

        <section className="bg-eco-cream p-8 rounded-lg">
          <h2 className="text-3xl font-bold text-eco-dark mb-6">Our Commitment</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            We're committed to continuous improvement and accountability. Every year, we review our practices and work to reduce our environmental footprint. We partner with environmental organizations and stay updated on the latest sustainability research to ensure our standards remain among the best in the industry.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Together, we can create a more sustainable world. Thank you for being part of the EcoSmart community and for choosing to shop responsibly.
          </p>
        </section>
      </div>
    </div>
  );
}
