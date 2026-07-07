import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import ProductosPage from './pages/ProductosPage.jsx'
import ItemDetalle from './components/Productos/ItemDetalle/ItemDetalle.jsx'
import CarritoPage from './pages/CarritoPage.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Gestion from './components/GestionProductos/GestionProductos.jsx'
import Login from './components/Login/Login.jsx'
import Registro from './components/Registro/Registro.jsx'

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
            <Route path="/gestion" element={<Gestion />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
          </Routes>
        </Layout>
      </CartProvider>
    </AuthProvider>
  )
}

export default App