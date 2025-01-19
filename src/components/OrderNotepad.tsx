import React from 'react';
import { ClipboardList, X, Plus, Minus, Star } from 'lucide-react';
import { useDeviceType } from '../hooks/useDeviceType';

export interface OrderItem {
  name: string;
  price?: string;
  quantity: number;
}

interface OrderNotepadProps {
  className?: string;
  items: OrderItem[];
  onRemoveItem: (index: number) => void;
  onClearAll: () => void;
  onUpdateQuantity: (index: number, newQuantity: number) => void;
}

export const OrderNotepad: React.FC<OrderNotepadProps> = ({ 
  className, 
  items, 
  onRemoveItem,
  onClearAll,
  onUpdateQuantity
}) => {
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const hasItems = items.length > 0;
  const total = items.reduce((sum, item) => {
    const price = item.price ? parseFloat(item.price.replace('£', '')) : 0;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className={`bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-white/10 transition-colors hover:bg-black/50 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="text-primary-300 w-5 h-5" />
          <h2 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-300 to-accent-400">
            Order Notepad
          </h2>
        </div>
        {hasItems && (
          <button
            onClick={onClearAll}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            Clear All
          </button>
        )}
      </div>

      {!hasItems ? (
        <p className="text-gray-400 text-sm">
          Click items from the menu to add them here
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className={`bg-black/20 backdrop-blur-sm rounded-lg border border-white/5 transition-colors hover:bg-black/30 ${
                isMobile ? 'px-4 py-3 -mx-2' : 'p-3'
              }`}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <Star className="text-accent-400 flex-shrink-0 w-3 h-3" />
                    <span className="text-gray-300 break-words">{item.name}</span>
                  </div>
                  <button
                    onClick={() => onRemoveItem(index)}
                    className="text-gray-500 hover:text-red-400 transition-colors ml-2 flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      className="text-gray-400 hover:text-primary-300 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-gray-300 min-w-[1ch] text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      className="text-gray-400 hover:text-primary-300 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  {item.price && (
                    <span className="text-primary-300 min-w-[4.5ch]">
                      {item.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          {hasItems && (
            <div className="flex justify-between pt-3 border-t border-white/10">
              <span className="text-gray-300">Total</span>
              <span className="text-primary-300">£{total.toFixed(2)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderNotepad;
