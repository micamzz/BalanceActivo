// src/componentes/GestionProductos/GestionProductos.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto';
import { ModalConfirmacion } from '../Modal/ModalConfirmacion';
import { ModalEliminar } from '../Modal/ModalEliminar';
import {
    collection,
    getDocs,
    deleteDoc,
    doc,
    addDoc,
    updateDoc
} from "firebase/firestore";
import styles from './GestionProductos.module.css';

const estadoInicialForm = {
    id: '',
    nombre: '',
    precio: '',
    stock: '',
    categoria: '',
    descripcion: '',
    imagen: '',
};

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);
    const [datosForm, setDatosForm] = useState(estadoInicialForm);
    const [imagenFile, setImagenFile] = useState(null);
    const [enviando, setEnviando] = useState(false);
    const [productoAEditar, setProductoAEditar] = useState(null);
    const [keyInputFile, setKeyInputFile] = useState(0);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mensajeModal, setMensajeModal] = useState('');
    const [productoAEliminar, setProductoAEliminar] = useState(null);

    const modoEdicion = productoAEditar !== null;

    const cargarProductos = async () => {
        const productosRef = collection(db, "productos");
        const resp = await getDocs(productosRef);
        setProductos(
            resp.docs.map((doc) => ({ ...doc.data(), idFirestore: doc.id }))
        );
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const manejarCambio = (evento) => {
        const { name, value } = evento.target;
        setDatosForm({
            ...datosForm,
            [name]: value
        });
    };

    const manejarCambioImagen = (evento) => {
        setImagenFile(evento.target.files[0]);
    };

    const manejarEditar = (producto) => {
        setProductoAEditar(producto);
        setDatosForm(producto);
    };

    const cancelarEdicion = () => {
        setProductoAEditar(null);
        setDatosForm(estadoInicialForm);
        setImagenFile(null);
        setKeyInputFile(prev => prev + 1);
    };

    const manejarEnvio = async (evento) => {
        evento.preventDefault();

        // Solo exigimos imagen si estamos creando un producto nuevo.
        // En edición, si no se elige otra imagen, se conserva la que ya tenía.
        if (!imagenFile && !productoAEditar) {
            alert('Por favor, seleccioná una imagen para el producto.');
            return;
        }

        const apiKey = '5b722f501d186f1d0ddbdd8d4526ccc5';
        let urlImagen = datosForm.imagen;

        setEnviando(true);
        try {
            if (imagenFile) {
                const formData = new FormData();
                formData.append('image', imagenFile);

                console.log('Subiendo imagen a Imgbb...');
                const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
                    method: 'POST',
                    body: formData,
                });
                const datosImgbb = await respuestaImgbb.json();

                if (datosImgbb.success) {
                    console.log('Imagen subida con éxito. URL:', datosImgbb.data.url);
                    urlImagen = datosImgbb.data.url;
                } else {
                    throw new Error('La subida de la imagen a Imgbb falló.');
                }
            }

            const productoCompleto = {
                ...datosForm,
                id: Number(datosForm.id),
                imagen: urlImagen
            };
         
            delete productoCompleto.idFirestore;

            if (productoAEditar) {
                const docRef = doc(db, "productos", productoAEditar.idFirestore);
                await updateDoc(docRef, productoCompleto);
                setMensajeModal("Producto actualizado correctamente");
            } else {
                const productosCollection = collection(db, "productos");
                await addDoc(productosCollection, productoCompleto);
                setMensajeModal("Producto agregado correctamente");
            }

            await cargarProductos();
            setDatosForm(estadoInicialForm);
            setImagenFile(null);
            setKeyInputFile(prev => prev + 1);
            setProductoAEditar(null);
            setMostrarModal(true);
        } catch (error) {
            console.error('Error en el proceso de envío:', error);
            alert('Hubo un error al guardar el producto. Por favor, intentá de nuevo.');
        } finally {
            setEnviando(false);
        }
    };

    const manejarEliminarClick = (idFirestore) => {
        setProductoAEliminar(idFirestore);
    };

    const cancelarEliminar = () => {
        setProductoAEliminar(null);
    };

    const confirmarEliminar = async () => {
        const docRef = doc(db, "productos", productoAEliminar);
        await deleteDoc(docRef);
        setProductos(productos.filter(prod => prod.idFirestore !== productoAEliminar));
        setProductoAEliminar(null);
        setMensajeModal("Producto eliminado correctamente");
        setMostrarModal(true);
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2 className={styles.titulo}>Gestión de Productos</h2>

                <div className={styles.formCard}>
                    <FormularioProducto
                        datosForm={datosForm}
                        manejarCambio={manejarCambio}
                        manejarCambioImagen={manejarCambioImagen}
                        manejarEnvio={manejarEnvio}
                        enviando={enviando}
                        modoEdicion={modoEdicion}
                        onCancelarEdicion={cancelarEdicion}
                        keyInputFile={keyInputFile}
                    />
                </div>

                <div className={styles.listaCard}>
                    <h3 className={styles.subtitulo}>Lista de Productos</h3>
                    <ul className={styles.lista}>
                        {productos.map((prod) => (
                            <li key={prod.idFirestore} className={styles.item}>
                                <span className={styles.nombre}>{prod.nombre}</span>
                                <span className={styles.precio}>${prod.precio}</span>
                                <button
                                    onClick={() => manejarEditar(prod)}
                                    className={styles.btnEditar}
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => manejarEliminarClick(prod.idFirestore)}
                                    className={styles.btnEliminar}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {mostrarModal && (
                <ModalConfirmacion
                    mensaje={mensajeModal}
                    onAceptar={() => setMostrarModal(false)}
                />
            )}
            {productoAEliminar && (
                <ModalEliminar
                    onCancelar={cancelarEliminar}
                    onConfirmar={confirmarEliminar}
                />
            )}
        </div>
    );
};
export default GestionProductos;