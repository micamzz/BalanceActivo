import { useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { ModalConfirmacion } from '../Modal/ModalConfirmacion';
import { ModalPagarInvitado } from '../Modal/ModalPagarInvitado';
import styles from './CarritoPage.module.css';

function formatPrice(price) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(price);
}

// Formato YYYY-MM-DD, comparable como string tal como lo guarda el <input type="date">
function hoyComoFecha() {
  const hoy = new Date();
  const anio = hoy.getFullYear();
  const mes = String(hoy.getMonth() + 1).padStart(2, '0');
  const dia = String(hoy.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, vaciarCarrito, totalPrecio } = useCart();
  const { user } = useAuth();
  const [mostrarModalPago, setMostrarModalPago] = useState(false);
  const [mostrarFormInvitado, setMostrarFormInvitado] = useState(false);

  const [codigoCupon, setCodigoCupon] = useState('');
  const [cuponAplicado, setCuponAplicado] = useState(null);
  const [errorCupon, setErrorCupon] = useState('');
  const [verificandoCupon, setVerificandoCupon] = useState(false);

  const totalConDescuento = cuponAplicado
    ? totalPrecio - (totalPrecio * cuponAplicado.descuento) / 100
    : totalPrecio;

  const aplicarCupon = async () => {
    setErrorCupon('');

    if (!codigoCupon.trim()) {
      setErrorCupon('Ingresá un código de cupón.');
      return;
    }

    setVerificandoCupon(true);
    try {
      const cuponesRef = collection(db, "coupons");
      const q = query(cuponesRef, where("codigo", "==", codigoCupon.trim().toUpperCase()));
      const resp = await getDocs(q);

      if (resp.empty) {
        setErrorCupon('El cupón no existe.');
        setCuponAplicado(null);
        return;
      }

      const cupon = resp.docs[0].data();
      const hoy = hoyComoFecha();

      if (hoy < cupon.fechaInicio || hoy > cupon.fechaFin) {
        setErrorCupon('El cupón no está vigente.');
        setCuponAplicado(null);
        return;
      }

      setCuponAplicado(cupon);
    } catch (error) {
      console.error('Error al validar el cupón:', error);
      setErrorCupon('Ocurrió un error al validar el cupón.');
    } finally {
      setVerificandoCupon(false);
    }
  };

  const quitarCupon = () => {
    setCuponAplicado(null);
    setCodigoCupon('');
    setErrorCupon('');
  };

  const finalizarCompra = () => {
    vaciarCarrito();
    quitarCupon();
    setMostrarModalPago(true);
  };

  const handleFinalizarCompra = () => {
    if (user) {
      // Usuario logueado: mostramos el popup de una, sin pedir nada más.
      finalizarCompra();
    } else {
      // Invitado: primero pedimos el email.
      setMostrarFormInvitado(true);
    }
  };

  const handleConfirmarInvitado = (email) => {
    console.log('Compra como invitado, email:', email);
    setMostrarFormInvitado(false);
    finalizarCompra();
  };

  if (carrito.length === 0) {
    return (
      <div className={styles.page}>
        <h1>Carrito</h1>
        <p>Tu carrito está vacío.</p>
        <Link to="/productos">Ver productos</Link>

        {mostrarModalPago && (
          <ModalConfirmacion
            mensaje="¡Pago exitoso! Gracias por tu compra."
            onAceptar={() => setMostrarModalPago(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <h1>Carrito</h1>

      <ul className={styles.lista}>
        {carrito.map(item => (
          <li key={item.id} className={styles.item}>
            <img src={item.imagen} alt={item.nombre} className={styles.img}
              onError={(e) => { e.target.src = 'https://placehold.co/80x60'; }} />
            <span className={styles.nombre}>{item.nombre}</span>
            <span>x{item.cantidad}</span>
            <span>{formatPrice(item.precio * item.cantidad)}</span>
            <button onClick={() => eliminarDelCarrito(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div className={styles.cuponBox}>
        {cuponAplicado ? (
          <p className={styles.cuponAplicado}>
            Cupón <strong>{cuponAplicado.codigo}</strong> aplicado (-{cuponAplicado.descuento}%)
            <button onClick={quitarCupon} className={styles.btnQuitarCupon}>Quitar</button>
          </p>
        ) : (
          <div className={styles.cuponInputRow}>
            <input
              type="text"
              placeholder="Código de cupón"
              value={codigoCupon}
              onChange={(e) => setCodigoCupon(e.target.value)}
              className={styles.cuponInput}
            />
            <button onClick={aplicarCupon} disabled={verificandoCupon} className={styles.btnAplicarCupon}>
              {verificandoCupon ? 'Verificando...' : 'Aplicar'}
            </button>
          </div>
        )}
        {errorCupon && <p className={styles.errorCupon}>{errorCupon}</p>}
      </div>

      {cuponAplicado ? (
        <>
          <p className={styles.totalTachado}>Subtotal: {formatPrice(totalPrecio)}</p>
          <p className={styles.total}>Total con descuento: {formatPrice(totalConDescuento)}</p>
        </>
      ) : (
        <p className={styles.total}>Total: {formatPrice(totalPrecio)}</p>
      )}

      <div className={styles.acciones}>
        <button onClick={vaciarCarrito} className={styles.btnVaciar}>Vaciar carrito</button>
        <button onClick={handleFinalizarCompra} className={styles.btnFinalizar}>
          Finalizar compra
        </button>
      </div>

      {mostrarFormInvitado && (
        <ModalPagarInvitado
          onCancelar={() => setMostrarFormInvitado(false)}
          onConfirmar={handleConfirmarInvitado}
        />
      )}

      {mostrarModalPago && (
        <ModalConfirmacion
          mensaje="¡Pago exitoso! Gracias por tu compra."
          onAceptar={() => setMostrarModalPago(false)}
        />
      )}
    </div>
  );
};

export default CarritoPage;