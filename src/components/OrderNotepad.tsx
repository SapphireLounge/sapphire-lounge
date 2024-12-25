import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { haptics } from '../utils/haptics';

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface OrderNotepadProps {
  className?: string;
}

interface AddToNotepadEvent extends CustomEvent {
  detail: {
    name: string;
    price: string;
  };
}

declare global {
  interface WindowEventMap {
    'addToNotepad': AddToNotepadEvent;
  }
}

export const OrderNotepad: React.FC<OrderNotepadProps> = ({ className = '' }) => {
  const [orders, setOrders] = useState<OrderItem[]>(() => {
    const saved = localStorage.getItem('orderNotepad');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('orderNotepad', JSON.stringify(orders));
  }, [orders]);

  const handleAddItem = (event: AddToNotepadEvent) => {
    const { name, price } = event.detail;
    const existingOrder = orders.find(order => order.name === name);
    if (existingOrder) {
      haptics.medium();
      setOrders(orders.map(order =>
        order.name === name
          ? { ...order, quantity: order.quantity + 1 }
          : order
      ));
    } else {
      haptics.light();
      setOrders([...orders, { 
        id: `${name}-${Date.now()}`,
        name, 
        price, 
        quantity: 1 
      }]);
    }
  };

  const handleDeleteItem = (id: string) => {
    haptics.light();
    setOrders(orders.filter(order => order.id !== id));
  };

  const handleIncreaseQuantity = (id: string) => {
    haptics.light();
    setOrders(orders.map(order =>
      order.id === id
        ? { ...order, quantity: order.quantity + 1 }
        : order
    ));
  };

  const handleDecreaseQuantity = (id: string) => {
    haptics.light();
    setOrders(orders.map(order =>
      order.id === id && order.quantity > 1
        ? { ...order, quantity: order.quantity - 1 }
        : order
    ));
  };

  useEffect(() => {
    window.addEventListener('addToNotepad', handleAddItem as EventListener);
    return () => {
      window.removeEventListener('addToNotepad', handleAddItem as EventListener);
    };
  }, [orders]);

  const totalPrice = orders.reduce((sum, order) => 
    sum + parseFloat(order.price.replace('£', '')) * order.quantity, 0
  );

  return (
    <div className={`bg-neutral-900 border border-neutral-800 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5 text-primary-300" />
        Your Order
      </h3>
      <div className="space-y-2">
        <AnimatePresence>
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-between gap-2"
            >
              <div className="flex-1">
                <div className="text-sm text-neutral-300">{order.name}</div>
              </div>
              <div className="flex items-center gap-1 bg-neutral-800 rounded px-1">
                <button
                  onClick={() => handleDecreaseQuantity(order.id)}
                  className="p-1 hover:bg-neutral-700 rounded transition-colors"
                  disabled={order.quantity <= 1}
                >
                  <Minus className="w-3.5 h-3.5 text-primary-300" />
                </button>
                <span className="text-sm w-6 text-center">{order.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(order.id)}
                  className="p-1 hover:bg-neutral-700 rounded transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-primary-300" />
                </button>
              </div>
              <span className="text-primary-200 w-16 text-right">£{(parseFloat(order.price.replace('£', '')) * order.quantity).toFixed(2)}</span>
              <button
                onClick={() => handleDeleteItem(order.id)}
                className="text-neutral-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-neutral-800"
                title="Remove item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        <div className="pt-3 border-t border-neutral-800">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total</span>
            <span className="text-lg font-semibold text-primary-200">£{totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const addItemToNotepad = (name: string, price: string) => {
  const event = new CustomEvent('addToNotepad', { detail: { name, price } });
  window.dispatchEvent(event);
};
