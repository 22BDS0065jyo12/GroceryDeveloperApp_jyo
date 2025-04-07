// import { createContext } from "react";

// export const updateCartContext = createContext(null);
import { createContext, useState } from "react";

export const UpdateCartContext = createContext(null);

export const UpdateCartProvider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState([]);

  return (
    <UpdateCartContext.Provider value={{ updateCart, setUpdateCart }}>
      {children}
    </UpdateCartContext.Provider>
  );
};
