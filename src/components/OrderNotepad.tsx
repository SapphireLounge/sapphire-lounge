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
    <div className={`fixed bottom-20 right-4 w-72 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/75 border rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Order Notepad
        </h2>
      </div>

      <div className="max-h-96 overflow-y-auto">
        <AnimatePresence>
          {orders.map(order => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 border-b flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <h3 className="font-medium">{order.name}</h3>
                <p className="text-sm text-muted-foreground">{order.price}</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDecreaseQuantity(order.id)}
                  className="p-1 hover:bg-accent rounded-full"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{order.quantity}</span>
                <button
                  onClick={() => handleIncreaseQuantity(order.id)}
                  className="p-1 hover:bg-accent rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteItem(order.id)}
                  className="p-1 hover:bg-accent rounded-full text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {orders.length > 0 && (
        <div className="p-4 border-t">
          <p className="text-lg font-semibold">
            Total: £{totalPrice.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
};

// Helper function to add items programmatically
export function addItemToNotepad(name: string, price: string) {
  window.dispatchEvent(new CustomEvent('addToNotepad', { detail: { name, price } }));
}
