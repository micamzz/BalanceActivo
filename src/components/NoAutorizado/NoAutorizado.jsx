import { Link } from 'react-router-dom';
import styles from './NoAutorizado.module.css';

const NoAutorizado = () => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icono}>⛔</div>
        <h2 className={styles.titulo}>No tenés autorización</h2>
        <p className={styles.texto}>No tenés permisos para acceder a esta página.</p>
        <Link to="/" className={styles.btnHome}>Ir al Inicio</Link>
      </div>
    </div>
  );
};

export default NoAutorizado;