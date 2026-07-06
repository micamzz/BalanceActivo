// src/componentes/Gestion/Gestion.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { FormularioContainer } from
    '../FormularioContainer/FormularioContainer';
import { collection, getDocs } from "firebase/firestore";

const Gestion = () => {
    const [productos, setProductos] = useState([]);
    
    const estadoInicialForm = {
        nombre: "",
        categoria: "",
        precio: 0,
        stock: 0,
        imagen: ""
    };

    useEffect(() => {
        const fetchProductos = async () => {
            const productosRef = collection(db, "Productos Deportivos"); //

            const resp = await getDocs(productosRef);
            setProductos(
                resp.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            );
        };
        fetchProductos();
        
    }, [productos]);


    return (
        <div><h2>Gestión de Productos</h2>
            <hr />
            <FormularioProducto datosForm={estadoInicialForm} />
            <hr />
            <h3>Lista de Productos</h3>
            <ul>
                {productos.map((prod) => (
                    <li key={prod.id}>
                        {prod.nombre} - ${prod.precio}
                        {/*acá agregaremos los botones de acción */}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Gestion;