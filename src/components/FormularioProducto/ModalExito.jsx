import styles from './ModalExito.module.css';

export function ModalExito({ onAgregarOtro, onVerProductos }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.icono}>✓</div>
        <h3 className={styles.titulo}>Producto guardado</h3>
        <p className={styles.texto}>El producto se agregó correctamente al catálogo.</p>
        <div className={styles.acciones}>
          <button className={styles.btnSecundario} onClick={onAgregarOtro}>
            Agregar otro
          </button>
          <button className={styles.btnPrimario} onClick={onVerProductos}>
            Ver productos
          </button>
        </div>
      </div>
    </div>
  );
}