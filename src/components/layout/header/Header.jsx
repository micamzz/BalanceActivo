import { Link } from 'react-router-dom';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        <div>
          <div className={styles.logoText}>
            Balance <span>Activo</span>
          </div>
        </div>
      </Link>
    </header>
  );
};

export default Header;
