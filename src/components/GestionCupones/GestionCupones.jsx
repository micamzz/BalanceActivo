// src/components/GestionCupones/GestionCupones.jsx
import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ModalConfirmacion } from "../Modal/ModalConfirmacion";
import { ModalEliminar } from "../Modal/ModalEliminar";
import styles from "./GestionCupones.module.css";

const estadoInicialForm = {
  codigo: "",
  descuento: "",
  fechaInicio: "",
  fechaFin: "",
};

function GestionCupones() {
  const [cupones, setCupones] = useState([]);
  const [datosForm, setDatosForm] = useState(estadoInicialForm);
  const [cuponAEditar, setCuponAEditar] = useState(null);
  const [cuponAEliminar, setCuponAEliminar] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mensajeModal, setMensajeModal] = useState("");

  const modoEdicion = cuponAEditar !== null;

  const cargarCupones = async () => {
    try {
      const response = await getDocs(collection(db, "coupons"));
      const listado = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCupones(listado);
    } catch (error) {
      console.error("Error al obtener los cupones:", error);
      alert("Ocurrió un error al cargar los cupones.");
    }
  };

  useEffect(() => {
    cargarCupones();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setDatosForm({ ...datosForm, [name]: value });
  };

  const manejarEditar = (cupon) => {
    setCuponAEditar(cupon);
    setDatosForm({
      codigo: cupon.codigo,
      descuento: cupon.descuento,
      fechaInicio: cupon.fechaInicio,
      fechaFin: cupon.fechaFin,
    });
  };

  const cancelarEdicion = () => {
    setCuponAEditar(null);
    setDatosForm(estadoInicialForm);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();

    if (!datosForm.codigo || !datosForm.descuento || !datosForm.fechaInicio || !datosForm.fechaFin) {
      alert("Completá todos los campos.");
      return;
    }

    const porcentaje = Number(datosForm.descuento);
    if (porcentaje < 1 || porcentaje > 100) {
      alert("El descuento debe estar entre 1 y 100.");
      return;
    }

    if (datosForm.fechaFin < datosForm.fechaInicio) {
      alert("La fecha de fin no puede ser anterior a la fecha de inicio.");
      return;
    }

    const cuponCompleto = {
      codigo: datosForm.codigo.trim().toUpperCase(),
      descuento: porcentaje,
      fechaInicio: datosForm.fechaInicio,
      fechaFin: datosForm.fechaFin,
    };

    try {
      if (cuponAEditar) {
        const docRef = doc(db, "coupons", cuponAEditar.id);
        await updateDoc(docRef, cuponCompleto);
        setMensajeModal("Cupón actualizado correctamente");
      } else {
        await addDoc(collection(db, "coupons"), cuponCompleto);
        setMensajeModal("Cupón creado correctamente");
      }

      await cargarCupones();
      setDatosForm(estadoInicialForm);
      setCuponAEditar(null);
      setMostrarModal(true);
    } catch (error) {
      console.error(error);
      alert("Error al guardar el cupón.");
    }
  };

  const manejarEliminarClick = (cupon) => {
    setCuponAEliminar(cupon);
  };

  const cancelarEliminar = () => {
    setCuponAEliminar(null);
  };

  const confirmarEliminar = async () => {
    try {
      await deleteDoc(doc(db, "coupons", cuponAEliminar.id));
      setCuponAEliminar(null);
      setMensajeModal("Cupón eliminado correctamente");
      setMostrarModal(true);
      await cargarCupones();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el cupón.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h2 className={styles.titulo}>Administración de Cupones</h2>

        <form className={styles.form} onSubmit={manejarEnvio}>
          <h3 className={styles.subtituloForm}>
            {modoEdicion ? "Editar Cupón" : "Crear Cupón"}
          </h3>

          <div className={styles.field}>
            <label>Código</label>
            <input
              type="text"
              name="codigo"
              placeholder="Ej: VERANO10"
              value={datosForm.codigo}
              onChange={manejarCambio}
            />
          </div>

          <div className={styles.fila}>
            <div className={styles.field}>
              <label>Válido desde</label>
              <input
                type="date"
                name="fechaInicio"
                value={datosForm.fechaInicio}
                onChange={manejarCambio}
              />
            </div>
            <div className={styles.field}>
              <label>Válido hasta</label>
              <input
                type="date"
                name="fechaFin"
                value={datosForm.fechaFin}
                onChange={manejarCambio}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label>Descuento %</label>
            <input
              type="number"
              name="descuento"
              placeholder="Ej: 10"
              min="1"
              max="100"
              value={datosForm.descuento}
              onChange={manejarCambio}
            />
          </div>

          <div className={styles.acciones}>
            <button type="submit" className={styles.btnGuardar}>
              {modoEdicion ? "Guardar cambios" : "Crear cupón"}
            </button>
            {modoEdicion && (
              <button type="button" className={styles.btnCancelar} onClick={cancelarEdicion}>
                Cancelar edición
              </button>
            )}
          </div>
        </form>

        <div className={styles.listaCard}>
          <h3 className={styles.subtitulo}>Listado de Cupones</h3>

          {cupones.length ? (
            <div className={styles.tablaWrapper}>
              <table className={styles.tabla}>
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Desde</th>
                    <th>Hasta</th>
                    <th>Descuento</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cupones.map((cupon) => (
                    <tr key={cupon.id}>
                      <td>{cupon.codigo}</td>
                      <td>{cupon.fechaInicio}</td>
                      <td>{cupon.fechaFin}</td>
                      <td>{cupon.descuento}%</td>
                      <td className={styles.tdAcciones}>
                        <button
                          onClick={() => manejarEditar(cupon)}
                          className={styles.btnEditar}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => manejarEliminarClick(cupon)}
                          className={styles.btnEliminarTabla}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className={styles.vacio}>No hay cupones activos todavía.</p>
          )}
        </div>
      </div>

      {mostrarModal && (
        <ModalConfirmacion
          mensaje={mensajeModal}
          onAceptar={() => setMostrarModal(false)}
        />
      )}

      {cuponAEliminar && (
        <ModalEliminar
          mensaje={`¿Estás segura de que querés eliminar el cupón "${cuponAEliminar.codigo}"?`}
          onCancelar={cancelarEliminar}
          onConfirmar={confirmarEliminar}
        />
      )}
    </div>
  );
}

export default GestionCupones;