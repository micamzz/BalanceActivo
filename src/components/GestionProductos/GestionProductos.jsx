// src/componentes/GestionProductos/GestionProductos.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioContainer } from '../FormularioContainer/FormularioContainer';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore"; // Funcion delete
import styles from './GestionProductos.module.css';

const GestionProductos = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "productos");

            const resp = await getDocs(productosRef);
            setProductos(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        fetchProductos();
    }, []);

    const handleDelete = async (id) => {
        const confirmacion = window.confirm("¿Está seguro de que desea eliminar este producto?");
        if (confirmacion) {
            const docRef = doc(db, "productos", id);
            await deleteDoc(docRef);
            // Actualizamos el estado local para reflejar el cambio en la UI inmediatamente.
            setProductos(productos.filter(prod => prod.id !== id));
            alert("Producto eliminado.");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h2 className={styles.titulo}>Gestión de Productos</h2>

                <div className={styles.formCard}>
                    <FormularioContainer />
                </div>

                <div className={styles.listaCard}>
                    <h3 className={styles.subtitulo}>Lista de Productos</h3>
                    <ul className={styles.lista}>
                        {productos.map((prod) => (
                            <li key={prod.id} className={styles.item}>
                                <span className={styles.nombre}>{prod.nombre}</span>
                                <span className={styles.precio}>${prod.precio}</span>
                                <button
                                    onClick={() => handleDelete(prod.id)}
                                    className={styles.btnEliminar}
                                >
                                    Eliminar
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
export default GestionProductos;