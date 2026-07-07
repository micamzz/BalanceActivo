import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ModalConfirmacion } from '../components/Modal/ModalConfirmacion';
import { ModalPagarInvitado } from '../components/Modal/ModalPagarInvitado';
import styles from './CarritoPage.module.css';

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);
}

const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, totalPrecio } = useCart();
  const { user } = useAuth();
  const [mostrarModalPago, setMostrarModalPago] = useState(false);
  const [mostrarFormInvitado, setMostrarFormInvitado] = useState(false);

  const finalizarCompra = () => {
    vaciarCarrito();
    setMostrarModalPago(true);
  };

  const handleFinalizarCompra = () => {
    if (user) {
      // Usuario logueado: mostramos el popup de una, sin pedir nada más.
      finalizarCompra();
    } else {
      // Invitado: primero pedimos el email.
      setMostrarFormInvitado(true);
    }
  };

  const handleConfirmarInvitado = (email) => {
    console.log('Compra como invitado, email:', email);
    setMostrarFormInvitado(false);
    finalizarCompra();
  };

  if (carrito.length === 0) {
    return (
      <div className={styles.page}>
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos">Ver productos</Link>

        {mostrarModalPago && (
          <ModalConfirmacion
            mensaje="¡Pago exitoso! Gracias por tu compra."
            onAceptar={() => setMostrarModalPago(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>Carrito</h1>

      <ul className={styles.lista}>
        {carrito.map(item => (
          <li key={item.id} className={styles.item}>
            <img src={item.imagen} alt={item.nombre} className={styles.img}
              onError={(e) => { e.target.src = 'https://placehold.co/80x60'; }} />
            <span className={styles.nombre}>{item.nombre}</span>
            <span>x{item.cantidad}</span>
            <span>{formatPrice(item.precio * item.cantidad)}</span>
            <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <p className={styles.total}>Total: {formatPrice(totalPrecio)}</p>

      <div className={styles.acciones}>
        <button onClick={vaciarCarrito} className={styles.btnVaciar}>Vaciar carrito</button>
        <button onClick={handleFinalizarCompra} className={styles.btnFinalizar}>
          Finalizar compra
        </button>
      </div>

      {mostrarFormInvitado && (
        <ModalPagarInvitado
          onCancelar={() => setMostrarFormInvitado(false)}
          onConfirmar={handleConfirmarInvitado}
        />
      )}

      {mostrarModalPago && (
        <ModalConfirmacion
          mensaje="¡Pago exitoso! Gracias por tu compra."
          onAceptar={() => setMostrarModalPago(false)}
        />
      )}
    </div>
  );
};

export default CarritoPage;