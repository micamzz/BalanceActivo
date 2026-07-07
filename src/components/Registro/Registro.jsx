// src/components/Registro/Registro.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Registro.module.css';

const Registro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setEnviando(true);

    try {
      await signup(email, password);
      // Firebase ya gestiona el estado de sesión automáticamente
      navigate('/');
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo electrónico ya está registrado. Si ya tenés una cuenta, iniciá sesión.');
      } else if (error.code === 'auth/weak-password') {
        setError('La contraseña debe tener al menos 6 caracteres.');
      } else if (error.code === 'auth/invalid-email') {
        setError('El correo electrónico no es válido.');
      } else {
        setError('Ocurrió un error al registrar el usuario. Verificá los datos e intentá nuevamente.');
        console.error("Error en el registro:", error.message);
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.titulo}>Crear una nueva cuenta</h2>

        <div className={styles.field}>
          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.field}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Mínimo 6 caracteres"
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.btnRegistrarse} disabled={enviando}>
          {enviando ? 'Creando cuenta...' : 'Registrarse'}
        </button>

        <p className={styles.linkTexto}>
          ¿Ya tenés una cuenta? <Link to="/login" className={styles.link}>Iniciá sesión aquí</Link>
        </p>
      </form>
    </div>
  );
};

export default Registro;