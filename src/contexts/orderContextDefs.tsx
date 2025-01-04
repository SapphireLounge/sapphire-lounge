import { createContext, useContext } from 'react';

export interface OrderItem {
  name: string;
  price: string;
  quantity: number;
}

export interface OrderContextType {
  orders: OrderItem[];
  selectedItems: string[];
  addItem: (name: string, price: string) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, delta: number) => void;
  setSelectedItems: (items: string[]) => void;
  clearAll: () => void;
}

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
