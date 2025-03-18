import React from 'react';
import { motion } from 'framer-motion';

const Shop: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-luxury-dark mb-6">
            Our Shop
          </h1>
          <div className="w-24 h-1 bg-luxury-gold mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Placeholder for products */}
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img 
                src="https://via.placeholder.com/300" 
                alt="Product"
                className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-xl font-display font-bold text-luxury-dark mb-2">Product Name</h3>
                <p className="text-gray-600 font-accent mb-3">Product description goes here.</p>
                <p className="text-luxury-gold font-medium mb-4">$9.99</p>
                <a 
                  href="https://instagram.com/your-profile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-luxury-dark text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors font-medium inline-flex items-center justify-center"
                >
                  Order on Instagram
                </a>
              </div>
            </motion.div>
          </div>
          {/* Repeat for more products */}
        </div>
      </div>
    </div>
  );
};

export default Shop; 