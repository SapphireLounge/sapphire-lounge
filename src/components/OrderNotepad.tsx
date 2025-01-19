import React from 'react';
import { ClipboardList, Plus, Minus, Trash2 } from 'lucide-react';
import { motion, PanInfo } from 'framer-motion';
import { useDeviceType } from '../hooks/useDeviceType';
import { useHaptics } from '../hooks/useHaptics';

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
  const { triggerHaptic } = useHaptics();
  const hasItems = items.length > 0;
  const total = items.reduce((sum, item) => {
    const price = item.price ? parseFloat(item.price.replace('£', '')) : 0;
    return sum + (price * item.quantity);
  }, 0);

  const handleDrag = (dragX: number): number => {
    return Math.min(Math.abs(dragX) / 100, 1);
  };

  const handleDragEnd = async (info: PanInfo, index: number) => {
    const threshold = 100; // Pixels to trigger delete
    if (Math.abs(info.offset.x) >= threshold) {
      triggerHaptic();
      onRemoveItem(index);
    }
  };

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
        <div className="space-y-2">
          {items.map((item, index) => (
            <div key={`${item.name}-${index}`} className="relative overflow-hidden rounded-lg -mx-3">
              {/* Delete Background */}
              <motion.div 
                initial={{ opacity: 0 }}
                className="absolute inset-0 bg-red-500 rounded-lg flex items-center justify-between px-4"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                animate={{
                  opacity: 0
                }}
              >
                <Trash2 className="w-4 h-4 text-white" />
                <Trash2 className="w-4 h-4 text-white" />
              </motion.div>
              
              {/* Item Content */}
              <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.9}
                dragTransition={{ 
                  bounceStiffness: 300,
                  bounceDamping: 30 
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 40
                }}
                onDrag={(event, { offset }) => {
                  if (!event.currentTarget) return;
                  const parent = (event.currentTarget as HTMLElement).parentElement;
                  if (!parent) return;
                  
                  const background = parent.querySelector('div:first-child') as HTMLElement | null;
                  if (!background) return;
                  
                  const opacity = handleDrag(offset.x);
                  background.style.opacity = opacity.toString();
                }}
                onDragEnd={(_, info) => handleDragEnd(info, index)}
                className={`relative bg-black/80 rounded-lg border border-white/5 transition-all duration-200 ${
                  isMobile ? 'px-4 py-2' : 'px-4 py-3'
                }`}
              >
                <div className="flex items-center justify-between w-full gap-3">
                  <div className="flex items-center flex-1 min-w-0">
                    <span className="text-gray-300 text-sm truncate">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.quantity > 1) {
                          onUpdateQuantity(index, item.quantity - 1);
                        }
                      }}
                      className="text-gray-400 hover:text-primary-300 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-gray-300 text-sm min-w-[1ch] text-center">{item.quantity}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateQuantity(index, item.quantity + 1);
                      }}
                      className="text-gray-400 hover:text-primary-300 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                    {item.price && (
                      <span className="text-primary-300 text-sm min-w-[4ch] ml-2">
                        {item.price}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      )}

      {hasItems && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">Total</span>
            <span className="text-primary-300">£{total.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderNotepad;
