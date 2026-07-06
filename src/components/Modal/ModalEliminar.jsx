import styles from './ModalEliminar.module.css';

export function ModalEliminar({ onCancelar, onConfirmar }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icono}>!</div>
        <p className={styles.texto}>¿Estás segura de que querés eliminar este producto?</p>
        <div className={styles.acciones}>
          <button className={styles.btnCancelar} onClick={onCancelar}>
            Cancelar
          </button>
          <button className={styles.btnEliminar} onClick={onConfirmar}>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}