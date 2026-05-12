import { Link } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.eyebrow}>Equipamiento deportivo profesional</p>
        <h1 className={styles.title}>
          Bienvenidos a<br />
          <span>Balance</span> Activo
        </h1>
        <p className={styles.subtitle}>
          Encontrá todo lo que necesitás para entrenar, enseñar y competir al máximo nivel.
          Conos, escaleras, vallas, pelotas y mucho más.
        </p>
        <div className={styles.actions}>
          <Link to="/productos" className={styles.btnPrimary}>
            Ver Productos
          </Link>
          <Link to="/carrito" className={styles.btnSecondary}>
            Mi Carrito
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
