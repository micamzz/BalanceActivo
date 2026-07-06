import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import ProductosPage from './pages/ProductosPage.jsx'
import ItemDetalle from './components/Productos/ItemDetalle/ItemDetalle.jsx'
import CarritoPage from './pages/CarritoPage.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { FormularioContainer } from './components/FormularioContainer/FormularioContainer';
import Gestion from './components/GestionProductos/GestionProductos.jsx'

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/producto/:id" element={<ItemDetalle />} />
           <Route path="/gestion" element={<Gestion />} /> 
          <Route path="/carrito" element={<CarritoPage />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

export default App