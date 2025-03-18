import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-display font-bold text-luxury-dark mb-6">
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-luxury-gold mx-auto"></div>
        </div>
        <p className="text-lg text-gray-600 font-accent">
          Get in touch with us for any inquiries or feedback. We would love to hear from you!
        </p>
      </div>
    </div>
  );
};

export default Contact; 