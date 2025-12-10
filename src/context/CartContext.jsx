import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: [] // cada item será { id, name, price, qty, image }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return action.payload || initialState;
    case 'ADD': {
      const exists = state.items.find(i => i.id === action.payload.id);
      const items = exists
        ? state.items.map(i =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...state.items, { ...action.payload, qty: 1 }];
      return { ...state, items };
    }
    case 'REMOVE': {
      const items = state.items.filter(i => i.id !== action.payload);
      return { ...state, items };
    }
    case 'SET_QTY': {
      const { id, qty } = action.payload;
      const items = state.items
        .map(i => (i.id === id ? { ...i, qty } : i))
        .filter(i => i.qty > 0);
      return { ...state, items };
    }
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // cargar carrito desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) dispatch({ type: 'INIT', payload: JSON.parse(saved) });
  }, []);

  // guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state));
  }, [state]);

  const total = useMemo(
    () => state.items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [state.items]
  );

  const count = useMemo(
    () => state.items.reduce((sum, i) => sum + i.qty, 0),
    [state.items]
  );

  const value = {
    items: state.items,
    total,
    count,
    addToCart: (product) => dispatch({ type: 'ADD', payload: product }),
    removeFromCart: (id) => dispatch({ type: 'REMOVE', payload: id }),
    setQty: (id, qty) => dispatch({ type: 'SET_QTY', payload: { id, qty } }),
    clearCart: () => dispatch({ type: 'CLEAR' })
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
