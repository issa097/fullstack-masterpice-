// OrderContext.js
import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  const setOrderData = (data) => {
    setCartData(data);
  };

  return (
    <OrderContext.Provider value={{ cartData, setOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};
