import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Menu, Search, X, Star, Award, Leaf, ShoppingCart, Info, Phone } from 'lucide-react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Shop from './pages/shop';
import About from './pages/about';
import Contact from './pages/contact';

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
    style={{ zIndex: 1 }}
    initial={{ opacity: 0, y: 100 }}
    animate={{ 
      opacity: [0.4, 0.7, 0.4],
      y: [0, -10, 0],
      rotate: [0, 2, 0, -2, 0],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
      repeatType: "mirror"
    }}
    loading="lazy"
  />
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isHighBandwidth, setIsHighBandwidth] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check bandwidth and preload video
  useEffect(() => {
    // Check connection speed if available
    if ('connection' in navigator && (navigator as any).connection) {
      const connection = (navigator as any).connection;
      
      // Set bandwidth based on connection type or effective type
      if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g' || 
          connection.saveData === true) {
        setIsHighBandwidth(false);
      }
      
      // Listen for changes to connection
      const updateConnectionStatus = () => {
        if (connection.effectiveType === '2g' || connection.effectiveType === 'slow-2g' || 
            connection.saveData === true) {
          setIsHighBandwidth(false);
        } else {
          setIsHighBandwidth(true);
        }
      };
      
      connection.addEventListener('change', updateConnectionStatus);
      return () => connection.removeEventListener('change', updateConnectionStatus);
    }
    
    // Add preconnect hint for faster resource loading
    const preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = '/videos/';
    document.head.appendChild(preconnect);
    
    // Preload the video file
    const videoPreload = document.createElement('link');
    videoPreload.rel = 'preload';
    videoPreload.href = '/videos/glaze.mp4';
    videoPreload.as = 'video';
    videoPreload.type = 'video/mp4';
    document.head.appendChild(videoPreload);
    
    // Cleanup function
    return () => {
      document.head.removeChild(preconnect);
      document.head.removeChild(videoPreload);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className={`fixed w-full z-50 ${isScrolled ? 'bg-white/95 shadow-lg' : 'bg-black/20 backdrop-blur-sm'} transition-all duration-500`}
        style={{ fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex items-center">
                <Link to="/" className="block">
                  <motion.img 
                    src="/IMAGES/logo.png" 
                    alt="Choco Bites" 
                    className="h-16 w-auto"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </Link>
              </div>
              
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full text-white hover:text-luxury-gold transition-colors hidden lg:flex items-center justify-center drop-shadow-md"
                  title="Search"
                  aria-label="Open search"
                >
                  <Search className="h-5 w-5" />
                </button>
                <a 
                  href="https://instagram.com/chocobites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:flex items-center justify-center text-white hover:text-luxury-gold transition-colors drop-shadow-md"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <button 
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 rounded-full bg-luxury-gold text-white hover:bg-luxury-dark transition-all duration-300 flex items-center justify-center shadow-lg relative"
                  aria-label="Open navigation menu"
                >
                  <Menu className="h-5 w-5" />
                  <span className="absolute -right-1 -top-1 h-3 w-3 bg-white rounded-full animate-pulse opacity-75 duration-1000 hidden md:block"></span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Search Modal */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl p-6 w-full max-w-2xl shadow-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-display font-medium">Search Our Products</h3>
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search for cookies, truffles, and more..."
                    className="w-full border border-gray-300 rounded-full py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-luxury-gold focus:border-transparent"
                  />
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-luxury-gold mb-3">Popular Searches</h4>
                  <div className="flex flex-wrap gap-2">
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">Dark Chocolate</button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">Salted Caramel</button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">Red Velvet</button>
                    <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm">Gift Sets</button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.5 }}
              className="fixed inset-0 bg-white/95 backdrop-blur-sm z-50"
            >
              <div className="p-6 max-w-md mx-auto h-full flex flex-col">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
                  <div>
                    <img src="/IMAGES/logo.png" alt="Choco Bites" className="h-16 w-auto" />
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close navigation menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="space-y-6 flex-1 overflow-y-auto">
                  <h3 className="text-luxury-gold text-xs uppercase tracking-wider font-semibold mb-4">Main Menu</h3>
                  <Link
                    to="/shop"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-accent text-luxury-dark hover:text-luxury-gold hover:pl-2 transition-all flex items-center space-x-2"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Shop</span>
                  </Link>
                  <Link
                    to="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-accent text-luxury-dark hover:text-luxury-gold hover:pl-2 transition-all flex items-center space-x-2"
                  >
                    <Info className="h-5 w-5" />
                    <span>About Us</span>
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-lg font-accent text-luxury-dark hover:text-luxury-gold hover:pl-2 transition-all flex items-center space-x-2"
                  >
                    <Phone className="h-5 w-5" />
                    <span>Contact Us</span>
                  </Link>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-luxury-gold text-xs uppercase tracking-wider font-semibold mb-4">Categories</h3>
                    <ul className="space-y-3">
                      <li><Link to="/shop?category=cookies" onClick={() => setIsMenuOpen(false)} className="block text-luxury-dark hover:text-luxury-gold hover:pl-2 transition-all">Cookies</Link></li>
                      <li><Link to="/shop?category=truffles" onClick={() => setIsMenuOpen(false)} className="block text-luxury-dark hover:text-luxury-gold hover:pl-2 transition-all">Truffles</Link></li>
                      <li><Link to="/shop?category=specials" onClick={() => setIsMenuOpen(false)} className="block text-luxury-dark hover:text-luxury-gold hover:pl-2 transition-all">Special Editions</Link></li>
                      <li><Link to="/shop?category=gifts" onClick={() => setIsMenuOpen(false)} className="block text-luxury-dark hover:text-luxury-gold hover:pl-2 transition-all">Gift Sets</Link></li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-auto pt-6 border-t border-gray-200">
                  <a 
                    href="https://instagram.com/chocobites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-luxury-dark hover:text-luxury-gold transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                    <span>Follow us on Instagram</span>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Routes>
          <Route path="/" element={
            <>
              {/* Hero Section */}
              <div className="relative h-screen overflow-hidden">
                <div className="absolute inset-0">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                    onError={(e) => console.error('Video error:', e)}
                    preload="auto"
                    aria-label="Chocolate production showcase video"
                    onLoadedData={() => setVideoLoaded(true)}
                    style={{ opacity: videoLoaded ? 1 : 0 }}
                    ref={(el) => {
                      if (el) {
                        el.play().catch(err => {
                          console.error("Video autoplay failed:", err);
                        });
                      }
                    }}
                  >
                    {/* Serve different quality video based on bandwidth */}
                    {isHighBandwidth ? (
                      <source src="/videos/glaze.mp4" type="video/mp4" />
                    ) : (
                      <source src="/videos/glaze-low.mp4" type="video/mp4" />
                    )}
                  </video>
                  
                  {/* Low resolution placeholder that shows until video loads */}
                  {!videoLoaded && (
                    <div 
                      className="absolute inset-0 bg-luxury-dark bg-opacity-80 animate-pulse"
                      style={{ 
                        backgroundImage: "url('/IMAGES/video-placeholder.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  )}
                </div>
                {/* Darker overlay with gradient for better visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 z-10" />
                
                {/* Floating Cookies and Cakes */}
                <FloatingImage
                  src="/IMAGES/cinimon.jpg"
                  className="w-24 h-24 md:w-32 md:h-32 top-20 left-10 rounded-full object-cover z-20"
                  delay={0}
                />
                <FloatingImage
                  src="/IMAGES/cookiee.jpg"
                  className="w-20 h-20 md:w-28 md:h-28 top-20 right-10 rounded-full object-cover z-20"
                  delay={2}
                />
                <FloatingImage
                  src="/IMAGES/cookiechip.jpg"
                  className="w-28 h-28 md:w-36 md:h-36 bottom-32 left-20 rounded-full object-cover z-20"
                  delay={4}
                />
                
                <div className="relative h-full flex items-center justify-center text-center z-20">
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
                      className="text-luxury-gold font-accent text-2xl mb-4 text-shadow"
                    >
                      Artisanal Excellence
                    </motion.p>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold text-white mb-8 leading-tight text-shadow">
                      Indulge in Moments of
                      <br />
                      Pure Delight
                    </h1>
                    <p className="text-xl text-white/90 mb-12 font-accent text-shadow">
                      Handcrafted with passion, delivered with elegance
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1, delay: 0.8 }}
                      className="space-y-4"
                    >
                      <Link to="/shop">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="inline-block bg-luxury-gold text-white px-12 py-4 rounded-full text-lg font-medium hover:bg-primary-600 transition-colors shadow-lg z-20"
                        >
                          Explore Our Collection
                        </motion.button>
                      </Link>
                      <p className="text-white/80 text-sm font-accent text-shadow">
                        Discover our range of handcrafted delights!
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              
              {/* Featured Products - Moved right after hero section */}
              <section className="py-24 bg-gradient-radial from-white to-luxury-cream/30 relative">
                <div className="absolute inset-0 bg-texture opacity-10"></div>
                
                {/* Floating Elements */}
                <FloatingImage
                  src="/IMAGES/cookiee.jpg"
                  className="w-28 h-28 top-20 right-20 rounded-full object-cover hidden lg:block"
                  delay={2}
                />
                <FloatingImage
                  src="/IMAGES/cinimon.jpg"
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
                      Featured Selections
                    </motion.p>
                    <h2 className="text-4xl font-display font-bold text-luxury-dark mb-6">
                      Taste Our Bestsellers
                    </h2>
                    <div className="w-24 h-1 bg-luxury-gold mx-auto"></div>
                    <p className="mt-6 text-gray-600 font-accent max-w-2xl mx-auto">
                      A glimpse of our most popular creations. Visit our shop to discover our full collection of handcrafted delights.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {[
                      {
                        name: "Dark Chocolate Truffle",
                        price: "$6.99",
                        description: "Rich dark chocolate with a velvety ganache center",
                        image: "/IMAGES/cookiee.jpg",
                        category: "Truffles"
                      },
                      {
                        name: "Salted Caramel Dream",
                        price: "$7.99",
                        description: "Buttery caramel with Fleur de Sel",
                        image: "/IMAGES/cinimon.jpg",
                        category: "Cookies"
                      },
                      {
                        name: "Red Velvet Royale",
                        price: "$7.99",
                        description: "Classic red velvet with cream cheese filling",
                        image: "/IMAGES/cookiechip.jpg",
                        category: "Specials"
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
                        <div className="relative h-80 mb-8 overflow-hidden rounded-xl">
                          <span className="absolute top-3 right-3 bg-luxury-gold text-white text-xs px-3 py-1 rounded-full z-10">
                            {product.category}
                          </span>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
                          
                          <Link to={`/shop?category=${product.category.toLowerCase()}`}>
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-luxury-dark px-8 py-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap cursor-pointer">
                              View Collection
                            </div>
                          </Link>
                        </div>
                        <div className="text-center">
                          <h3 className="text-xl font-display font-bold text-luxury-dark mb-2">{product.name}</h3>
                          <p className="text-gray-600 font-accent mb-3">{product.description}</p>
                          <p className="text-luxury-gold font-medium mb-4">{product.price}</p>
                          <Link 
                            to="/shop"
                            className="w-full bg-luxury-dark text-white px-6 py-3 rounded-full hover:bg-primary-600 transition-colors font-medium inline-flex items-center justify-center"
                          >
                            <ShoppingCart className="h-5 w-5 mr-2" />
                            Shop Now
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="mt-16 text-center">
                    <Link to="/shop">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center bg-luxury-gold text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary-600 transition-colors shadow-lg"
                      >
                        Explore Our Full Collection
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </motion.button>
                    </Link>
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
                        video: "/videos/4K.mp4",
                        poster: "/IMAGES/cookiee.jpg",
                        width: 480
                      },
                      {
                        icon: Award,
                        title: "Master Craftsmanship",
                        description: "Each cookie is handcrafted by our expert pâtissiers, bringing decades of artisanal expertise to your plate.",
                        video: "/videos/WE MAKE.mp4",
                        poster: "/IMAGES/cinimon.jpg",
                        width: 480
                      },
                      {
                        icon: Leaf,
                        title: "Sustainable Practice",
                        description: "Committed to eco-friendly packaging and responsible sourcing, making every indulgence guilt-free.",
                        video: "/videos/phone.mp4",
                        poster: "/IMAGES/cookiechip.jpg",
                        width: 480
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
                          {/* Video Element */}
                          <video 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            poster={item.poster}
                            muted
                            loop
                            playsInline
                            autoPlay
                            preload="auto"
                            src={item.video}
                            width={item.width}
                            ref={(el) => {
                              if (el) {
                                // Force play when mounted
                                el.play().catch(() => {
                                  console.log('Autoplay failed, trying again...');
                                  // Try again with user interaction simulation
                                  document.addEventListener('click', () => {
                                    el.play();
                                  }, { once: true });
                                });
                              }
                            }}
                            onClick={(e) => {
                              // Toggle play/pause on mobile/desktop
                              if (e.currentTarget.paused) {
                                e.currentTarget.play();
                              } else {
                                e.currentTarget.pause();
                              }
                            }}
                          />
                          
                          {/* Play indicator */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="w-16 h-16 rounded-full bg-luxury-gold/80 flex items-center justify-center">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                          
                          {/* Light overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>
                        </div>
                        
                        {/* Content card below video instead of overlaying */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-xl p-5 shadow-md">
                          <item.icon className="h-8 w-8 text-luxury-gold mb-3" />
                          <h3 className="text-xl font-display font-bold text-luxury-dark mb-2">{item.title}</h3>
                          <p className="text-gray-600 font-accent leading-relaxed">
                            {item.description}
                          </p>
                          <a 
                            href="https://instagram.com/chocobites"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-flex items-center text-luxury-gold hover:text-primary-600 transition-colors"
                          >
                            <Instagram className="h-4 w-4 mr-2" />
                            <span className="text-sm font-accent">Order now on Instagram!</span>
                          </a>
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

              {/* Quality Badge Section */}
              <section className="py-16 bg-luxury-dark text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    <div>
                      <h3 className="font-display text-xl mb-3">Artisanal Quality</h3>
                      <p className="font-accent text-white/80">Handcrafted in small batches daily</p>
                      <a 
                        href="https://instagram.com/chocobites"
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
                        href="https://instagram.com/chocobites"
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
                        href="https://instagram.com/chocobites"
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
                        className="relative bg-white p-8 rounded-2xl shadow-lg"
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
                      href="https://instagram.com/chocobites"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center bg-luxury-gold text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-primary-600 transition-colors shadow-lg"
                    >
                      <Instagram className="h-6 w-6 mr-2" />
                      Order on Instagram
                    </motion.a>
                  </div>
                </div>
              </section>
            </>
          } />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>

        {/* Footer */}
        <footer className="bg-luxury-dark text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div>
                <h3 className="font-display text-xl mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><Link to="/shop" className="text-white/80 hover:text-white transition-colors">Shop</Link></li>
                  <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About Us</Link></li>
                  <li><Link to="/contact" className="text-white/80 hover:text-white transition-colors">Contact</Link></li>
                  <li><Link to="/shop?category=gifts" className="text-white/80 hover:text-white transition-colors">Gift Sets</Link></li>
                  <li><Link to="/shop?category=specials" className="text-white/80 hover:text-white transition-colors">Specials</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-display text-xl mb-4">Connect With Us</h3>
                <a 
                  href="https://instagram.com/chocobites"
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
                  href="https://instagram.com/chocobites"
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
    </Router>
  );
}

export default App;