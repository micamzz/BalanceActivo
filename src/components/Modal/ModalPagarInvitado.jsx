import { useState } from 'react';
import styles from './ModalPagarInvitado.module.css';

export function ModalPagarInvitado({ onCancelar, onConfirmar }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleConfirmar = () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Ingresá un correo electrónico válido.');
      return;
    }
    onConfirmar(email.trim());
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.titulo}>Pagar como invitado</h3>
        <p className={styles.texto}>Ingresá tu correo electrónico para recibir la confirmación de tu compra.</p>

        <input
          type="email"
          placeholder="tu@email.com"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.acciones}>
          <button className={styles.btnCancelar} onClick={onCancelar}>
            Cancelar
          </button>
          <button className={styles.btnConfirmar} onClick={handleConfirmar}>
            Confirmar compra
          </button>
        </div>
      </div>
    </div>
  );
}