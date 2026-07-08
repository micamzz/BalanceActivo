import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import ProductosPage from './pages/ProductosPage.jsx'
import ItemDetalle from './components/Productos/ItemDetalle/ItemDetalle.jsx'
import CarritoPage from './pages/CarritoPage.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Gestion from './components/GestionProductos/GestionProductos.jsx'
import GestionCupones from './components/GestionCupones/GestionCupones.jsx'
import Login from './components/Login/Login.jsx'
import Registro from './components/Registro/Registro.jsx'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx'
import NoAutorizado from './components/NoAutorizado/NoAutorizado.jsx'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<ProductosPage />} />
            <Route path="/producto/:id" element={<ItemDetalle />} />
            <Route path="/carrito" element={<CarritoPage />} />
            <Route
              path="/gestion"
              element={
                <ProtectedRoute rolesPermitidos={['admin']}>
                  <Gestion />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cupones"
              element={
                <ProtectedRoute rolesPermitidos={['admin']}>
                  <GestionCupones />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/no-autorizado" element={<NoAutorizado />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  )
}

export default App