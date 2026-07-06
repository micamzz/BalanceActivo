import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { FormularioProducto } from '../FormularioProducto/FormularioProducto';
import { ModalExito } from '../FormularioProducto/ModalExito';

const estadoInicial = {
  id: '',
  nombre: '',
  precio: '',
  stock: '',
  categoria: '',
  descripcion: '',
};

export function FormularioContainer() {
  const [datosForm, setDatosForm] = useState(estadoInicial);
  const [imagenFile, setImagenFile] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const navigate = useNavigate();

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

  const manejarEnvio = async (evento) => {
    evento.preventDefault();
    if (!imagenFile) {
      alert('Por favor, seleccioná una imagen para el producto.');
      return;
    }

    const apiKey = '5b722f501d186f1d0ddbdd8d4526ccc5';
    const formData = new FormData();
    formData.append('image', imagenFile);

    setEnviando(true);
    try {
      console.log('Subiendo imagen a Imgbb...');
      const respuestaImgbb = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: 'POST',
        body: formData,
      });
      const datosImgbb = await respuestaImgbb.json();

      if (datosImgbb.success) {
        console.log('Imagen subida con éxito. URL:', datosImgbb.data.url);
        const productoCompleto = {
          ...datosForm,
          id: Number(datosForm.id),
          imagen: datosImgbb.data.url
        };

        const productosCollection = collection(db, "productos");
        await addDoc(productosCollection, productoCompleto);
        console.log('Producto guardado en Firebase:', productoCompleto);
        setMostrarModal(true);
      } else {
        throw new Error('La subida de la imagen a Imgbb falló.');
      }
    } catch (error) {
      console.error('Error en el proceso de envío:', error);
      alert('Hubo un error al subir la imagen. Por favor, intentá de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const handleAgregarOtro = () => {
    setDatosForm(estadoInicial);
    setImagenFile(null);
    setMostrarModal(false);
  };

  const handleVerProductos = () => {
    navigate('/productos');
  };

  return (
    <>
      <FormularioProducto
        datosForm={datosForm}
        manejarCambio={manejarCambio}
        manejarEnvio={manejarEnvio}
        manejarCambioImagen={manejarCambioImagen}
        enviando={enviando}
      />
      {mostrarModal && (
        <ModalExito
          onAgregarOtro={handleAgregarOtro}
          onVerProductos={handleVerProductos}
        />
      )}
    </>
  );
}