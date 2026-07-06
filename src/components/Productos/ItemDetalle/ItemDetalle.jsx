import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useCart } from '../../../context/CartContext';
import styles from './ItemDetalle.module.css';

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);
}

const ItemDetalle = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const { agregarAlCarrito, eliminarDelCarrito, getCantidadEnCarrito, getStockDisponible } = useCart();

  useEffect(() => {
    if (!id) return;
    setCargando(true);

    const queryId = query(
      collection(db, "productos"),
      where("id", "==", Number(id))
    );

    getDocs(queryId)
      .then((resp) => {
        if (resp.empty) {
          setProducto(null);
        } else {
          const docSnap = resp.docs[0];
          setProducto({ ...docSnap.data(), docId: docSnap.id });
        }
        setCargando(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setCargando(false);
      });
  }, [id]);

  const cantidad = producto ? getCantidadEnCarrito(producto.id) : 0;
  const stockDisponible = producto ? getStockDisponible(producto) : 0;

  const handleSumar = () => {
    if (stockDisponible <= 0) return;
    agregarAlCarrito(producto, 1);
  };

  const handleRestar = () => {
    if (cantidad <= 0) return;
    eliminarDelCarrito(producto.id);
  };

  if (cargando) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (!producto) {
    return (
      <div className={styles.notFound}>
        <h2>Producto no encontrado</h2>
        <Link to="/productos" className={styles.botonVolver}>← Volver al catálogo</Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Link to="/productos" className={styles.volver}>← Volver al catálogo</Link>

        <div className={styles.detail}>
          <div className={styles.imgWrap}>
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className={styles.img}
              onError={(e) => {
                e.target.src = 'https://placehold.co/600x450/1a1a1a/FF6B00?text=Sin+imagen';
              }}
            />
          </div>

          <div className={styles.info}>
            <h1 className={styles.nombre}>{producto.nombre}</h1>
            <p className={styles.precio}>{formatPrice(producto.precio)}</p>
            <p className={styles.descripcion}>{producto.descripcion}</p>
            <p className={styles.stockVal}>Stock: {stockDisponible} unidades</p>

            <div className={styles.selectorCantidad}>
              <button
                type="button"
                className={styles.botonCantidad}
                onClick={handleRestar}
                disabled={cantidad === 0}
              >
                −
              </button>
              <span className={styles.cantidadValor}>{cantidad}</span>
              <button
                type="button"
                className={styles.botonCantidad}
                onClick={handleSumar}
                disabled={stockDisponible === 0}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetalle;