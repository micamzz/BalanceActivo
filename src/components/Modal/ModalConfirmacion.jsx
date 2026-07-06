import styles from './ModalConfirmacion.module.css';

export function ModalConfirmacion({ mensaje, onAceptar }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icono}>✓</div>
        <p className={styles.texto}>{mensaje}</p>
        <button className={styles.btnAceptar} onClick={onAceptar}>
          Aceptar
        </button>
      </div>
    </div>
  );
}