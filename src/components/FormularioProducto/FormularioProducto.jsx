import React from 'react';
import styles from './FormularioProducto.module.css';

export function FormularioProducto({ datosForm, manejarCambio, manejarEnvio, manejarCambioImagen, enviando = false }) {
  return (
    <form className={styles.form} onSubmit={manejarEnvio}>
      <h3 className={styles.titulo}>Agregar Nuevo Producto</h3>
      <div className={styles.fila}>
        <div className={styles.field}>
          <label>ID:</label>
          <input
            type="number"
            placeholder="Ej: 1"
            name="id"
            value={datosForm.id}
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
      </div>
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
        <label>Categoría:</label>
        <input
          type="text"
          placeholder="Ej: Conos y Señalización"
          name="categoria"
          value={datosForm.categoria}
          onChange={manejarCambio}
        />
      </div>
      <div className={styles.field}>
        <label>Descripción:</label>
        <textarea
          placeholder="Ej: Set de 10 conos tortuga de PVC flexible..."
          name="descripcion"
          value={datosForm.descripcion}
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
      <button type="submit" className={styles.btnGuardar} disabled={enviando}>
        {enviando ? 'Guardando...' : 'Guardar Producto'}
      </button>
    </form>
  );
}