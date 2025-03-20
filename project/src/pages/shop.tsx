import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Shop Header */}
      <div className="relative py-32 bg-luxury-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-bold text-white mb-6">Our Shop</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto font-accent">
            Explore our handcrafted collection of premium chocolates and cookies
          </p>
        </div>
      </div>

      {/* Main Shop Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <button className="px-6 py-2 rounded-full bg-luxury-gold text-white hover:bg-luxury-dark transition-colors">
              All Products
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-luxury-dark hover:bg-gray-200 transition-colors">
              Truffles
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-luxury-dark hover:bg-gray-200 transition-colors">
              Cookies
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-luxury-dark hover:bg-gray-200 transition-colors">
              Gift Sets
            </button>
            <button className="px-6 py-2 rounded-full bg-gray-100 text-luxury-dark hover:bg-gray-200 transition-colors">
              Specials
            </button>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {name: "Dark Chocolate Truffle", price: "$6.99", image: "/IMAGES/cookiee.jpg", category: "Truffles"},
              {name: "Salted Caramel Dream", price: "$7.99", image: "/IMAGES/cinimon.jpg", category: "Truffles"},
              {name: "Red Velvet Royale", price: "$7.99", image: "/IMAGES/cookiechip.jpg", category: "Cookies"},
              {name: "Lemon Zest Delight", price: "$5.99", image: "/IMAGES/brownies.jpg", category: "Cookies"},
              {name: "Peanut Butter Bliss", price: "$6.49", image: "/IMAGES/butter.jpg", category: "Cookies"},
              {name: "White Chocolate Macadamia", price: "$6.99", image: "/IMAGES/cini.jpg", category: "Cookies"},
              {name: "Hazelnut Heaven", price: "$8.99", image: "/IMAGES/cookiee.jpg", category: "Truffles"},
              {name: "Premium Gift Box", price: "$24.99", image: "/IMAGES/brownies.webp", category: "Gift Sets"},
              {name: "Seasonal Special", price: "$9.99", image: "/IMAGES/brownies 2.webp", category: "Specials"},
              {name: "Chocolate Chip Classic", price: "$5.99", image: "/IMAGES/cookiechip.jpg", category: "Cookies"},
              {name: "Luxury Assortment", price: "$29.99", image: "/IMAGES/cinimon.jpg", category: "Gift Sets"},
              {name: "Birthday Collection", price: "$19.99", image: "/IMAGES/butter.jpg", category: "Gift Sets"},
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <div className="relative h-64 mb-4 overflow-hidden rounded-xl">
                  <span className="absolute top-3 right-3 bg-luxury-gold text-white text-xs px-3 py-1 rounded-full z-10">
                    {product.category}
                  </span>
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    width="300"
                    height="200"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    <button className="bg-white/90 text-luxury-dark px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                      Quick View
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-display font-bold text-luxury-dark mb-1">{product.name}</h3>
                  <p className="text-luxury-gold font-medium mb-2">{product.price}</p>
                  <a 
                    href="https://www.instagram.com/c_hoco_bites/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-luxury-dark text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-colors font-medium inline-flex items-center justify-center text-sm"
                  >
                    <Instagram className="h-4 w-4 mr-2" />
                    Order on Instagram
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-gray-600 font-accent mb-6">Can't find what you're looking for?</p>
            <a 
              href="https://www.instagram.com/c_hoco_bites/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-luxury-gold text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary-600 transition-colors shadow-lg"
            >
              <Instagram className="h-6 w-6 mr-2" />
              Contact Us for Custom Orders
            </a>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-gradient-radial from-white to-luxury-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-luxury-dark mb-6">
              Featured Collections
            </h2>
            <div className="w-24 h-1 bg-luxury-gold mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Signature Truffles",
                description: "Our award-winning selection of handcrafted truffles",
                image: "/IMAGES/cookiee.jpg"
              },
              {
                name: "Gift Boxes",
                description: "Elegant assortments perfect for any occasion",
                image: "/IMAGES/cinimon.jpg"
              },
              {
                name: "Seasonal Specials",
                description: "Limited-time offerings inspired by the seasons",
                image: "/IMAGES/cookiechip.jpg"
              }
            ].map((collection, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative h-80 overflow-hidden rounded-xl"
              >
                <img 
                  src={collection.image}
                  alt={collection.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  width="400"
                  height="300"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-2xl font-display font-bold mb-2">{collection.name}</h3>
                  <p className="text-white/80 font-accent mb-4">{collection.description}</p>
                  <button className="px-4 py-2 bg-luxury-gold text-white rounded-full text-sm font-medium hover:bg-luxury-gold/80 transition-colors">
                    Explore Collection
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Baking Process */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-display font-bold text-luxury-dark mb-6">
                Our Baking Process
              </h2>
              <div className="w-24 h-1 bg-luxury-gold mb-8"></div>
              <p className="text-gray-600 font-accent mb-6 leading-relaxed">
                Each of our creations is handcrafted using traditional techniques passed down through generations. 
                We source only the finest ingredients, from premium Belgian chocolate to locally-sourced organic dairy.
              </p>
              <p className="text-gray-600 font-accent mb-8 leading-relaxed">
                Our expert pastry chefs blend artisanal skill with innovative flavors to create chocolates and cookies 
                that are not just desserts, but experiences to savor.
              </p>
              <Link 
                to="/about"
                className="inline-flex items-center text-luxury-gold hover:text-luxury-dark transition-colors"
              >
                <span className="font-display text-lg mr-2">Learn More About Our Process</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="/IMAGES/cookiee.jpg" 
                alt="Baking Process" 
                className="w-full h-auto rounded-xl shadow-xl"
                loading="lazy"
                width="600"
                height="400"
                decoding="async"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-luxury-gold rounded-xl -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-luxury-dark rounded-xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop; 