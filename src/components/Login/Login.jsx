
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setEnviando(true);

    login(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Usuario logueado:", user);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error en el login:", errorCode, errorMessage);
        setError(traducirError(errorCode) || errorMessage);
      })
      .finally(() => {
        setEnviando(false);
      });
  };

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.titulo}>Iniciar Sesión</h2>

        <div className={styles.field}>
          <label>Correo electrónico:</label>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.btnIngresar} disabled={enviando}>
          {enviando ? 'Ingresando...' : 'Ingresar'}
        </button>

        <p className={styles.linkTexto}>
          ¿No tenés una cuenta? <Link to="/registro" className={styles.link}>Registrate aquí</Link>
        </p>
      </form>
    </div>
  );
};

// Traduce los códigos de error más comunes de Firebase Auth a mensajes en español
function traducirError(codigo) {
  switch (codigo) {
    case 'auth/invalid-email':
      return 'El correo electrónico no es válido.';
    case 'auth/user-not-found':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos.';
    case 'auth/wrong-password':
      return 'Correo o contraseña incorrectos.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Probá de nuevo más tarde.';
    default:
      return null;
  }
}

export default Login;