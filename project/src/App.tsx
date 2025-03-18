import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Menu, Search, Heart, User, X, Star, Award, Leaf } from 'lucide-react';

interface FloatingImageProps {
  src: string;
  className: string;
  delay?: number;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ src, className, delay = 0 }) => (
  <motion.img
    src={src}
    alt=""
    className={`absolute pointer-events-none ${className}`}
    initial={{ opacity: 0, y: 100 }}
    animate={{ 
      opacity: [0.4, 0.8, 0.4],
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-luxury' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <a href="/" className="block">
                <motion.img 
                  src="/IMAGES/logo.png" 
                  alt="Choco Bites" 
                  className="h-20 w-auto"
                  whileHover={{ scale: 1.1 }}
                />
              </a>
              <div className="hidden lg:flex items-center space-x-8 ml-8">
                {/* Removed 'Shop', 'About Us', and 'Contact Us' links */}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsMenuOpen(true)}
                className="p-2 rounded-full text-luxury-dark hover:bg-luxury-cream/20 transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-white/90 z-50"
          >
            <div className="p-6">
              <div className="flex justify-end items-center mb-8">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-6">
                <a href="#shop" className="block text-lg font-accent text-luxury-dark hover:text-primary-600">Shop</a>
                <a href="#about" className="block text-lg font-accent text-luxury-dark hover:text-primary-600">About Us</a>
                <a href="#contact" className="block text-lg font-accent text-luxury-dark hover:text-primary-600">Contact Us</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            poster="/IMAGES/logo.png"
            onError={(e) => console.error('Video error:', e)}
          >
            <source src="/videos/glaze.mp4" type="video/mp4" />
            
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Floating Cookies and Cakes */}
        <FloatingImage
          src="/IMAGES/cinimon.jpg"
          className="w-24 h-24 md:w-32 md:h-32 top-20 left-10 rounded-full object-cover"
          delay={0}
        />
        <FloatingImage
          src="/IMAGES/cookiee.jpg"
          className="w-20 h-20 md:w-28 md:h-28 top-20 right-10 rounded-full object-cover"
          delay={2}
        />
        <FloatingImage
          src="/IMAGES/cookiechip.jpg"
          className="w-28 h-28 md:w-36 md:h-36 bottom-32 left-20 rounded-full object-cover"
          delay={4}
        />
        
        <div className="relative h-full flex items-center justify-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-luxury-gold font-accent text-2xl mb-4"
            >
              Artisanal Excellence
            </motion.p>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-8 leading-tight">
              Indulge in Moments of
              <br />
              Pure Delight
            </h1>
            <p className="text-xl text-white/90 mb-12 font-accent">
              Handcrafted with passion, delivered with elegance
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="space-y-4"
            >
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#shop"
                className="inline-block bg-luxury-gold text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-primary-600 transition-colors shadow-luxury"
              >
                Explore Our Collection
              </motion.a>
              <p className="text-white/80 text-sm font-accent">
                Discover our range of handcrafted delights!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Product Showcase Section */}
      <section id="shop" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold text-luxury-dark mb-6">
              Featured Products
            </h2>
            <div className="w-24 h-1 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "Dark Chocolate Truffle",
                price: "$6.99",
                description: "Rich dark chocolate with a velvety ganache center",
                image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Salted Caramel Dream",
                price: "$7.99",
                description: "Buttery caramel with Fleur de Sel",
                image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Red Velvet Royale",
                price: "$7.99",
                description: "Classic red velvet with cream cheese filling",
                image: "https://images.unsplash.com/photo-1621236378699-8597faf6a176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative h-96 mb-8 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-luxury-dark px-8 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Quick View
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-display font-bold text-luxury-dark mb-2">{product.name}</h3>
                  <p className="text-gray-600 font-accent mb-3">{product.description}</p>
                  <p className="text-luxury-gold font-medium mb-4">{product.price}</p>
                  <a 
                    href="https://instagram.com/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-luxury-dark text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors font-medium inline-flex items-center justify-center"
                  >
                    <Instagram className="h-5 w-5 mr-2" />
                    Order on Instagram
                  </a>
                  <p className="mt-2 text-sm text-gray-500 font-accent">
                    DM us on Instagram to order this product!
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-texture opacity-5"></div>
        
        {/* Floating Elements */}
        <FloatingImage
          src="https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          className="w-24 h-24 top-20 left-10 rounded-full object-cover hidden lg:block"
          delay={1}
        />
        <FloatingImage
          src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          className="w-32 h-32 bottom-20 right-10 rounded-full object-cover hidden lg:block"
          delay={3}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-luxury-gold font-accent text-xl mb-4"
            >
              Our Expertise
            </motion.p>
            <h2 className="text-4xl font-display font-bold text-luxury-dark mb-6">
              Crafted with Excellence
            </h2>
            <div className="w-24 h-1 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              {
                icon: Star,
                title: "Premium Quality",
                description: "Only the finest ingredients, sourced from renowned suppliers worldwide, ensuring exceptional taste in every bite.",
                image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                icon: Award,
                title: "Master Craftsmanship",
                description: "Each cookie is handcrafted by our expert pâtissiers, bringing decades of artisanal expertise to your plate.",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                icon: Leaf,
                title: "Sustainable Practice",
                description: "Committed to eco-friendly packaging and responsible sourcing, making every indulgence guilt-free.",
                image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className="relative h-80 mb-8 overflow-hidden rounded-2xl">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <item.icon className="h-8 w-8 text-luxury-gold mb-3" />
                      <h3 className="text-xl font-display font-bold text-luxury-dark mb-2">{item.title}</h3>
                      <p className="text-gray-600 font-accent leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.description}
                      </p>
                      <a 
                        href="https://instagram.com/your-profile"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-luxury-gold hover:text-primary-600 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Instagram className="h-4 w-4 mr-2" />
                        <span className="text-sm font-accent">Order now on Instagram!</span>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 text-luxury-dark hover:text-luxury-gold transition-colors cursor-pointer group"
            >
              <span className="font-display text-lg">Discover Our Process</span>
              <div className="h-px w-12 bg-current transform group-hover:scale-x-150 transition-transform origin-left"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-gradient-radial from-white to-luxury-cream/30 relative">
        <div className="absolute inset-0 bg-texture opacity-10"></div>
        
        {/* Floating Elements */}
        <FloatingImage
          src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          className="w-28 h-28 top-20 right-20 rounded-full object-cover hidden lg:block"
          delay={2}
        />
        <FloatingImage
          src="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80"
          className="w-24 h-24 bottom-20 left-20 rounded-full object-cover hidden lg:block"
          delay={4}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-luxury-gold font-accent text-xl mb-4"
            >
              Bestselling Creations
            </motion.p>
            <h2 className="text-4xl font-display font-bold text-luxury-dark mb-6">
              Our Signature Collection
            </h2>
            <div className="w-24 h-1 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              {
                name: "Dark Chocolate Truffle",
                price: "$6.99",
                description: "Rich dark chocolate with a velvety ganache center",
                image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Salted Caramel Dream",
                price: "$7.99",
                description: "Buttery caramel with Fleur de Sel",
                image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              },
              {
                name: "Red Velvet Royale",
                price: "$7.99",
                description: "Classic red velvet with cream cheese filling",
                image: "https://images.unsplash.com/photo-1621236378699-8597faf6a176?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              }
            ].map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group"
              >
                <div className="relative h-96 mb-8 overflow-hidden rounded-xl">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                  <button className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-luxury-dark px-8 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Quick View
                  </button>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-display font-bold text-luxury-dark mb-2">{product.name}</h3>
                  <p className="text-gray-600 font-accent mb-3">{product.description}</p>
                  <p className="text-luxury-gold font-medium mb-4">{product.price}</p>
                  <a 
                    href="https://instagram.com/your-profile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-luxury-dark text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors font-medium inline-flex items-center justify-center"
                  >
                    <Instagram className="h-5 w-5 mr-2" />
                    Order on Instagram
                  </a>
                  <p className="mt-2 text-sm text-gray-500 font-accent">
                    DM us on Instagram to order this product!
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Badge Section */}
      <section className="py-16 bg-luxury-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <h3 className="font-display text-xl mb-3">Artisanal Quality</h3>
              <p className="font-accent text-white/80">Handcrafted in small batches daily</p>
              <a 
                href="https://instagram.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-luxury-gold hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4 mr-2" />
                <span className="text-sm font-accent">Order now on Instagram!</span>
              </a>
            </div>
            <div>
              <h3 className="font-display text-xl mb-3">Premium Ingredients</h3>
              <p className="font-accent text-white/80">Sourced from world-class suppliers</p>
              <a 
                href="https://instagram.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-luxury-gold hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4 mr-2" />
                <span className="text-sm font-accent">Order now on Instagram!</span>
              </a>
            </div>
            <div>
              <h3 className="font-display text-xl mb-3">Luxury Experience</h3>
              <p className="font-accent text-white/80">Delivered in signature packaging</p>
              <a 
                href="https://instagram.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center text-luxury-gold hover:text-white transition-colors"
              >
                <Instagram className="h-4 w-4 mr-2" />
                <span className="text-sm font-accent">Order now on Instagram!</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-24 bg-gradient-radial from-white to-luxury-cream/30 relative">
        <div className="absolute inset-0 bg-texture opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-luxury-gold font-accent text-xl mb-4"
            >
              Simple Ordering Process
            </motion.p>
            <h2 className="text-4xl font-display font-bold text-luxury-dark mb-6">
              How to Order
            </h2>
            <div className="w-24 h-1 bg-luxury-gold mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "1",
                title: "Visit Instagram",
                description: "Head to our Instagram profile to browse our latest creations and menu."
              },
              {
                step: "2",
                title: "Send a DM",
                description: "DM us with your cookie selection and delivery details. We'll respond within 24 hours."
              },
              {
                step: "3",
                title: "Enjoy!",
                description: "We'll confirm your order and deliver it fresh to your doorstep."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white p-8 rounded-2xl shadow-luxury"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center text-white font-bold">
                  {item.step}
                </div>
                <h3 className="text-xl font-display font-bold text-luxury-dark mb-4 text-center mt-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-accent text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://instagram.com/your-profile"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-luxury-gold text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary-600 transition-colors shadow-luxury"
            >
              <Instagram className="h-6 w-6 mr-2" />
              Order on Instagram
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-luxury-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-display text-xl mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#collections" className="text-white/80 hover:text-white transition-colors">Collections</a></li>
                <li><a href="#our-story" className="text-white/80 hover:text-white transition-colors">Our Story</a></li>
                <li><a href="#gifting" className="text-white/80 hover:text-white transition-colors">Gifting</a></li>
                <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#how-to-order" className="text-white/80 hover:text-white transition-colors">How to Order</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4">Connect With Us</h3>
              <a 
                href="https://instagram.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-luxury-gold hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6 mr-2" />
                <span className="font-accent">Follow us on Instagram</span>
              </a>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4">Contact</h3>
              <p className="text-white/80">Email: info@chocobites.com</p>
              <p className="text-white/80">Phone: (555) 123-4567</p>
            </div>
            <div>
              <h3 className="font-display text-xl mb-4">Order Now</h3>
              <a 
                href="https://instagram.com/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-luxury-gold text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
              >
                <Instagram className="h-5 w-5 mr-2" />
                Order on Instagram
              </a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-white/60">
            <p>&copy; {new Date().getFullYear()} Choco Bites. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;