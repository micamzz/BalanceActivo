import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import Item from './Item';
import styles from './ItemListContainer.module.css';

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productosRef = collection(db, "productos");

    getDocs(productosRef)
      .then((resp) => {
        const data = resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        setProductos(data);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner} />
        <p>Cargando productos...</p>
      </div>
    );
  }

   if(error) 
        return <p> Error : {error}</p>

  return (
    <section className={styles.section}>
      <h2 className={styles.titulo}>Nuestros Productos</h2>
      <div className={styles.grid}>
        {productos.map((product) => (
          <Item key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ItemListContainer;