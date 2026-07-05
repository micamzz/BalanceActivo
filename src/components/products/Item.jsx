import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Item.module.css';

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);
}

const Item = ({ product }) => {
  const { nombre, precio, categoria, imagen, id } = product;
  const { agregarAlCarrito, getStockDisponible } = useCart();
  const stockDisponible = getStockDisponible(product);

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <Link to={`/producto/${id}`} className={styles.imgLink}>
          <img
            src={imagen}
            alt={nombre}
            className={styles.img}
            onError={(e) => {
              e.target.src = 'https://placehold.co/400x300/1a1a1a/FF6B00?text=Sin+imagen';
            }}
          />
        </Link>
        {/* <span className={styles.categoria}>{categoria}</span> */}
      </div>

      <div className={styles.body}>
        <h3 className={styles.nombre}>{nombre}</h3>
        <p className={styles.precio}>{formatPrice(precio)}</p>
         <p>Stock: {stockDisponible} unidades</p>
           <Link to={`/producto/${id}`} className={styles.btnVerDetalle}>Ver detalle </Link>
        <button
          className={styles.btnAgregar}
          onClick={() => agregarAlCarrito(product)}
          disabled={stockDisponible <= 0}
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Item;