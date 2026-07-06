import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { ItemList } from '../ItemList/ItemList.jsx';
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
          return { ...doc.data(), docId: doc.id };
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
      <ItemList productos={productos} />
    </section>
  );
};

export default ItemListContainer;