import React, { useState, useCallback } from 'react';
import { OrderContext, OrderItem, OrderContextType } from './orderContextDefs';

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const addItem = useCallback((name: string, price: string) => {
    setOrders(prev => [...prev, { name, price, quantity: 1 }]);
    setSelectedItems(prev => [...prev, name]);
  }, []);

  const removeItem = useCallback((index: number) => {
    setOrders(prev => {
      const newOrders = [...prev];
      const removedItem = newOrders[index];
      newOrders.splice(index, 1);
      setSelectedItems(prev => prev.filter(item => item !== removedItem.name));
      return newOrders;
    });
  }, []);

  const updateQuantity = useCallback((index: number, delta: number) => {
    setOrders(prev => {
      const newOrders = [...prev];
      const item = newOrders[index];
      if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
      }
      return newOrders;
    });
  }, []);

  const clearAll = useCallback(() => {
    setOrders([]);
    setSelectedItems([]);
  }, []);

  const value: OrderContextType = {
    orders,
    selectedItems,
    addItem,
    removeItem,
    updateQuantity,
    setSelectedItems,
    clearAll,
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
