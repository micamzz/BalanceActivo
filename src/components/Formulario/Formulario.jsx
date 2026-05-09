import { useState } from 'react';
import styles from './Formulario.module.css';

const Formulario = () => {
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.nombre || !form.email || !form.mensaje) {
      setError('Por favor completá todos los campos.');
      return;
    }
    setEnviado(true);
    setForm({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.titulo}>¿Tenés alguna consulta?</h2>
        <p className={styles.subtitulo}>
          Completá el formulario y nos comunicamos a la brevedad.
        </p>

        {enviado ? (
          <div className={styles.exito}>
            <span>✅</span>
            <p>¡Mensaje enviado! Te respondemos pronto.</p>
            <button className={styles.btnVolver} onClick={() => setEnviado(false)}>
              Enviar otro mensaje
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {error && <p className={styles.errorMsg}>{error}</p>}

            <div className={styles.field}>
              <label htmlFor="nombre">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Tu nombre"
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                autoComplete="off"
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="mensaje">Mensaje</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={4}
                placeholder="¿En qué podemos ayudarte?"
              />
            </div>

            <button type="submit" className={styles.btnEnviar}>
              Enviar Consulta
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default Formulario;
