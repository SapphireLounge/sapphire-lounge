import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Package, Truck } from 'lucide-react';

function Shop() {
  const products = [
    {
      id: 1,
      name: 'Premium Hookah',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1587500154541-1cafd74f0efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Modern design hookah with LED base'
    },
    {
      id: 2,
      name: 'Flavor Pack',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1557367184-663fba4b8b91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Selection of our most popular flavors'
    },
    {
      id: 3,
      name: 'Accessory Kit',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1584727638096-042c45049ebe?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Complete set of premium accessories'
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-12 bg-accent-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Shop
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Premium hookahs, accessories, and flavors delivered to your door
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {products.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="bg-accent-800/50 rounded-xl overflow-hidden border border-accent-700"
            >
              <div className="relative h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-300 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary-300">${product.price}</span>
                  <button className="bg-gradient-to-r from-primary-400 to-accent-500 px-4 py-2 rounded-lg font-semibold hover:from-primary-500 hover:to-accent-600 transition-all">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 bg-accent-800/50 rounded-xl border border-accent-700"
          >
            <ShoppingBag className="w-8 h-8 text-primary-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure Shopping</h3>
            <p className="text-gray-300">Safe and encrypted transactions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-6 bg-accent-800/50 rounded-xl border border-accent-700"
          >
            <Package className="w-8 h-8 text-primary-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
            <p className="text-gray-300">Premium selection guaranteed</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-6 bg-accent-800/50 rounded-xl border border-accent-700"
          >
            <Truck className="w-8 h-8 text-primary-300 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-300">Quick and reliable shipping</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Shop;