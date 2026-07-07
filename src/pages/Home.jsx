import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Home.module.css';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className={styles.hero}>

    
      <div className={styles.contenido}>

        <p className={styles.eyebrow}>Equipamiento deportivo profesional</p>
        {user && (
          <p className={styles.saludo}>¡Hola, {user.email}!</p>
        )}
        <h1 className={styles.title}>
          Bienvenidos a<br />
          <span>Balance</span> Activo
        </h1>
        <p className={styles.subtitle}>
          Encontrá todo lo que necesitás para entrenar, enseñar y competir al máximo nivel.
          Conos, escaleras, vallas, pelotas y mucho más.
        </p>
        <div className={styles.actions}>
          <Link to="/productos" className={`${styles.botonVerProductos} ${styles.boton}`}>
            Ver Productos
          </Link>
          <Link to="/carrito" className={`${styles.botonVerCarrito} ${styles.boton}`}>
            Mi Carrito
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Home;