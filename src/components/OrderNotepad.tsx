import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Minus, Trash2, ClipboardList } from 'lucide-react';
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

  const handleAddItem = useCallback((event: AddToNotepadEvent) => {
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
  }, [orders]);

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
  }, [handleAddItem]);

  const totalPrice = orders.reduce((sum, order) => 
    sum + parseFloat(order.price.replace('£', '')) * order.quantity, 0
  );

  return (
    <div className={`bg-black/40 p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-primary-300" />
          <h2 className="text-xl font-semibold text-white">Order Notepad</h2>
        </div>
        {orders.length > 0 && (
          <button
            onClick={() => {
              haptics.warning();
              setOrders([]);
            }}
            className="text-red-500 hover:text-red-400 transition-colors"
            aria-label="Clear all items"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-400 text-center py-4">Your order notepad is empty</p>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between bg-black/20 p-3 rounded-lg"
              >
                <div className="flex-1">
                  <p className="text-white">{order.name}</p>
                  <p className="text-sm text-gray-400">{order.price}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDecreaseQuantity(order.id)}
                    className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                    aria-label={`Decrease quantity of ${order.name}`}
                  >
                    <Minus className="w-4 h-4 text-gray-400" />
                  </button>
                  <span className="text-white w-6 text-center">{order.quantity}</span>
                  <button
                    onClick={() => handleIncreaseQuantity(order.id)}
                    className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                    aria-label={`Increase quantity of ${order.name}`}
                  >
                    <Plus className="w-4 h-4 text-gray-400" />
                  </button>
                  <button
                    onClick={() => {
                      haptics.warning();
                      handleDeleteItem(order.id);
                    }}
                    className="p-1 hover:bg-gray-700/50 rounded transition-colors text-red-500 hover:text-red-400"
                    aria-label={`Delete ${order.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-white font-medium">Total</span>
            <span className="text-primary-300 font-semibold">£{totalPrice.toFixed(2)}</span>
          </div>
        </>
      )}
    </div>
  );
};
