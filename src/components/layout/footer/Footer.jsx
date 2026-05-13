import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    fetch('/data/nosotros.json')
      .then(res => res.json())
      .then(data => setEquipo(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer1}>
        <div className={styles.brand}>
          <h3>Balance <span>Activo</span></h3>
        </div>

        {/* <div className={styles.links}>
          <ul className={styles.links2}>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/productos">Catálogo</Link></li>
            <li><Link to="/carrito">Carrito</Link></li>
          </ul>
        </div> */}

        <div className={styles.equipo}>
          <h4>Nuestro Equipo</h4>
          <div className={styles.equipo1}>
            {equipo.map((persona) => (
              <div key={persona.mail} className={styles.card}>


                <div className={styles.contenedorEquipo}>
                  <img
                    src={persona.image}
                    alt={persona.nombre}
                    className={styles.avatarImg}
                    style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                </div>



                <div>
                  <p className={styles.cardNombre}>{persona.nombre} {persona.apellido}</p>
                  <p className={styles.cardRol}>{persona.rol}</p>
                  <a href={`mailto:${persona.mail}`} className={styles.cardMail}>{persona.mail}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <span> 2026 - Micaela Mazza</span>
      </div>
    </footer>
  );
};

export default Footer;
