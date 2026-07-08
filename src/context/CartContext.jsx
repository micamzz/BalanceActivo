import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

function getClaveCarrito(uid) {
  return `carrito_${uid || 'invitado'}`;
}

function cargarCarritoGuardado(uid) {
  try {
    const guardado = localStorage.getItem(getClaveCarrito(uid));
    return guardado ? JSON.parse(guardado) : [];
  } catch (error) {
    console.error('Error al leer el carrito guardado:', error);
    return [];
  }
}

export function CartProvider({ children }) {
  const { user } = useAuth();
  const uid = user ? user.uid : null;

  const [carrito, setCarrito] = useState(() => cargarCarritoGuardado(uid));

  // Cada vez que cambia el usuario (login, logout, o cambio de cuenta),
  // cargamos el carrito guardado de ESE usuario en particular.
  useEffect(() => {
    setCarrito(cargarCarritoGuardado(uid));
  }, [uid]);

  // Cada vez que el carrito cambia, lo guardamos bajo la clave del usuario actual.
  useEffect(() => {
    localStorage.setItem(getClaveCarrito(uid), JSON.stringify(carrito));
  }, [carrito, uid]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito(prev => {
      const existe = prev.find(item => item.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  const eliminarDelCarrito = (id) => {
  setCarrito(prev => {
    return prev.map(item =>
      item.id === id
        ? { ...item, cantidad: item.cantidad - 1 }
        : item
    ).filter(item => item.cantidad > 0);
  });
};

  const vaciarCarrito = () => setCarrito([]);

  const getCantidadEnCarrito = (id) => {
    const item = carrito.find(item => item.id === id);
    return item ? item.cantidad : 0;
  };

  const getStockDisponible = (producto) => {
    const cantidadEnCarrito = getCantidadEnCarrito(producto.id);
    return producto.stock - cantidadEnCarrito;
  };

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const totalPrecio = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  return (
    <CartContext.Provider value={{
      carrito,
      agregarAlCarrito,
      eliminarDelCarrito,
      vaciarCarrito,
      totalItems,
      totalPrecio,
      getCantidadEnCarrito,
      getStockDisponible,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}