import React from 'react';
import styles from './FormularioProducto.module.css';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen }) {
  return (
    <form className={styles.form} onSubmit={manejarEnvio}>
      <h3 className={styles.titulo}>Agregar Nuevo Producto</h3>
      <div className={styles.field}>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          placeholder="Ej: Pelota Handball"
          name="nombre"
          value={datosForm.nombre}
          onChange={manejarCambio}
        />
      </div>
      <div className={styles.field}>
        <label>Precio:</label>
        <input
          type="number"
          placeholder="Ej: 5000"
          name="precio"
          value={datosForm.precio}
          onChange={manejarCambio}
        />
      </div>
      <div className={styles.field}>
        <label>Stock:</label>
        <input
          type="number"
          placeholder="Ej: 5"
          name="stock"
          value={datosForm.stock}
          onChange={manejarCambio}
        />
      </div>
      <div className={styles.field}>
        <label>Imagen:</label>
        <input
          type="file"
          onChange={manejarCambioImagen}
        />
      </div>
      <button type="submit" className={styles.btnGuardar}>Guardar Producto</button>
    </form>
  );
}
