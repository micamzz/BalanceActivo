import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';
import { useAuth } from '../../../context/AuthContext';
import styles from './Nav.module.css';

const Nav = () => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const cerrarMenu = () => setMenuAbierto(false);

  return (
    <nav className={styles.nav}>
      <button
        className={styles.btnHamburguesa}
        onClick={() => setMenuAbierto(prev => !prev)}
        aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={menuAbierto}
      >
        <span className={menuAbierto ? `${styles.barra} ${styles.barra1Abierta}` : styles.barra}></span>
        <span className={menuAbierto ? `${styles.barra} ${styles.barra2Abierta}` : styles.barra}></span>
        <span className={menuAbierto ? `${styles.barra} ${styles.barra3Abierta}` : styles.barra}></span>
      </button>

      <ul className={menuAbierto ? `${styles.navLinks} ${styles.navLinksAbierto}` : styles.navLinks}>
        <li>
          <NavLink
            to="/"
            end
            onClick={cerrarMenu}
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
            onClick={cerrarMenu}
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
            }
          >
            Productos
          </NavLink>
        </li>

        {user && user.rol === 'admin' && (
          <li>
            <NavLink
              to="/gestion"
              onClick={cerrarMenu}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              Gestión
            </NavLink>
          </li>
        )}

        {user && user.rol === 'admin' && (
          <li>
            <NavLink
              to="/cupones"
              onClick={cerrarMenu}
              className={({ isActive }) =>
                isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink
              }
            >
              Cupones
            </NavLink>
          </li>
        )}

        {(!user || user.rol !== 'admin') && (
          <li>
            <Link to="/carrito" className={styles.cartBtn} aria-label="Ver carrito" onClick={cerrarMenu}>
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
          </li>
        )}

        {user ? (
          <li>
            <button onClick={() => { logout(); cerrarMenu(); }} className={styles.btnLogout}>
              Cerrar Sesión
            </button>
          </li>
        ) : (
          <li>
            <NavLink
              to="/login"
              onClick={cerrarMenu}
              className={({ isActive }) =>
                isActive
                  ? `${styles.navLink} ${styles.navLinkNaranja} ${styles.navLinkActive}`
                  : `${styles.navLink} ${styles.navLinkNaranja}`
              }
            >
              Iniciar Sesión
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;