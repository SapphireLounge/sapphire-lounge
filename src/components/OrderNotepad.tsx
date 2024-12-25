import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { haptics } from '../utils/haptics';

interface OrderItem {
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

  useEffect(() => {
    const handleAddItem = async (event: AddToNotepadEvent) => {
      const { name, price } = event.detail;
      const existingOrder = orders.find(order => order.name === name);
      if (existingOrder) {
        await haptics.medium();
        setOrders(orders.map(order =>
          order.name === name
            ? { ...order, quantity: order.quantity + 1 }
            : order
        ));
      } else {
        await haptics.light();
        setOrders([...orders, { name, price, quantity: 1 }]);
      }
    };

    const handleRemoveItem = async (index: number) => {
      await haptics.medium();
      const existingOrder = orders[index];
      if (existingOrder && existingOrder.quantity > 1) {
        setOrders(orders.map((order, i) =>
          i === index
            ? { ...order, quantity: order.quantity - 1 }
            : order
        ));
      } else {
        setOrders(orders.filter((_, i) => i !== index));
      }
    };

    const handleDeleteItem = async (index: number) => {
      await haptics.heavy();
      setOrders(orders.filter((_, i) => i !== index));
    };

    window.addEventListener('addToNotepad', handleAddItem as EventListener);
    return () => window.removeEventListener('addToNotepad', handleAddItem as EventListener);
  }, [orders]);

  const saveOrders = (orders: OrderItem[]) => {
    localStorage.setItem('orderNotepad', JSON.stringify(orders));
  };

  const clearAll = () => {
    haptics.light(); // Light feedback for clearing
    setOrders([]);
    localStorage.removeItem('orderNotepad');
  };

  const calculateTotal = () => {
    return orders.reduce((total, item) => {
      const price = parseFloat(item.price.replace('£', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <div 
      className={`bg-black rounded-lg p-4 max-w-md mx-auto shadow-lg border border-neutral-900 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-primary-300" />
          <h2 className="text-lg font-semibold text-primary-300">Your Order</h2>
        </div>
        {orders.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm text-red-400 hover:text-red-300 transition-colors flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-neutral-500 text-sm text-center py-2">Click items from the menu to add them here</p>
      ) : (
        <div className="flex flex-col">
          <AnimatePresence>
            {orders.map((order, index) => (
              <motion.div
                key={order.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 text-sm bg-neutral-900 p-2 rounded-lg border border-neutral-800 mb-3 last:mb-0"
              >
                <span className="flex-1 text-primary-100">{order.name}</span>
                <div className="flex items-center gap-2 bg-neutral-800 rounded-md px-1">
                  <button
                    onClick={() => handleRemoveItem(index)}
                    className="p-1 hover:bg-neutral-700 rounded transition-colors disabled:opacity-50"
                    disabled={order.quantity <= 1}
                  >
                    <Minus className="w-3.5 h-3.5 text-primary-300" />
                  </button>
                  <span className="w-6 text-center text-primary-200">{order.quantity}</span>
                  <button
                    onClick={() => handleAddItem({ detail: { name: order.name, price: order.price } } as AddToNotepadEvent)}
                    className="p-1 hover:bg-neutral-700 rounded transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5 text-primary-300" />
                  </button>
                </div>
                <span className="text-primary-200 w-16 text-right">£{(parseFloat(order.price.replace('£', '')) * order.quantity).toFixed(2)}</span>
                <button
                  onClick={() => handleDeleteItem(index)}
                  className="text-neutral-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-neutral-800"
                  title="Remove item"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          <div className="pt-3 border-t border-neutral-800">
            <div className="flex justify-between items-center text-sm">
              <span className="font-medium text-primary-300">Total:</span>
              <span className="font-semibold text-primary-200">£{calculateTotal()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const addItemToNotepad = (name: string, price: string) => {
  const event = new CustomEvent('addToNotepad', { detail: { name, price } });
  window.dispatchEvent(event);
};
