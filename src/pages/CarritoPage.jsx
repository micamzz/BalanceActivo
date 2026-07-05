import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
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

  if (carrito.length === 0) {
    return (
      <div className={styles.page}>
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos">Ver productos</Link>
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
      <button onClick={vaciarCarrito}>Vaciar carrito</button>
    </div>
  );
};

export default CarritoPage;
