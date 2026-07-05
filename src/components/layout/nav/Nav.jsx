import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import styles from './Nav.module.css';

const Nav = () => {
  const { totalItems } = useCart();

  return (
    <nav className={styles.nav}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/productos"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Productos
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/nuevo-producto"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Nuevo Producto
          </NavLink>
        </li>
      </ul>

      <Link to="/carrito" className={styles.cartBtn} aria-label="Ver carrito">
        <svg
          className={styles.cartIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span>Carrito</span>
        {totalItems > 0 && (
          <span className={styles.badge}>{totalItems}</span>
        )}
      </Link>
    </nav>
  );
};

export default Nav;
