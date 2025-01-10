import React from 'react';
import { X, Plus, Minus, FileText, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useOrder } from '../contexts/orderContextDefs';

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

interface RemoveFromOrderEvent extends CustomEvent {
  detail: {
    index: number;
  };
}

interface AddToOrderEvent extends CustomEvent {
  detail: {
    name: string;
    price: string;
  };
}

interface OrderUpdatedEvent extends CustomEvent {
  detail: {
    items: OrderItem[];
  };
}

declare global {
  interface WindowEventMap {
    'addToNotepad': AddToNotepadEvent;
    'removeFromOrder': RemoveFromOrderEvent;
    'addToOrder': AddToOrderEvent;
    'orderUpdated': OrderUpdatedEvent;
  }
}

export const OrderNotepad: React.FC<OrderNotepadProps> = ({ className = '' }) => {
  const { orders, removeItem, updateQuantity, clearAll } = useOrder();

  const calculateTotal = () => {
    return orders.reduce((total: number, item: OrderItem) => {
      const priceStr = item.price || '£0.00';
      const price = parseFloat(priceStr.replace(/[^0-9.]/g, '')) || 0;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  return (
    <motion.div
      className={`bg-black rounded-lg p-4 max-w-md mx-auto shadow-lg border border-neutral-900 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary-300" />
            <h2 className="text-lg font-semibold text-primary-300">Order Notepad</h2>
          </div>
          {orders.length > 0 && (
            <button
              onClick={() => {
                clearAll();
                localStorage.removeItem('orderNotepad');
              }}
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
          <div className="space-y-3">
            {orders.map((order: OrderItem, index: number) => (
              <div key={`${order.name}-${index}`} className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-gray-300 truncate">{order.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="text-neutral-400 hover:text-primary-300 transition-colors p-1 rounded hover:bg-neutral-800"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-primary-200 w-6 text-center">
                    {order.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="text-neutral-400 hover:text-primary-300 transition-colors p-1 rounded hover:bg-neutral-800"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
                <span className="text-primary-200 w-16 text-right">
                  £{((parseFloat(order.price.replace(/[^0-9.]/g, '')) || 0) * order.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeItem(index)}
                  className="text-neutral-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-neutral-800"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            <div className="pt-4 border-t border-neutral-800">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total</span>
                <span className="text-primary-300 font-bold">£{calculateTotal()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
