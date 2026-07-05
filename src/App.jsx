import { Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import ProductosPage from './pages/ProductosPage.jsx'
import ProductoDetalle from './pages/ProductoDetalle.jsx'
import CarritoPage from './pages/CarritoPage.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { FormularioContainer } from './components/FormularioContainer/FormularioContainer';

function App() {
  return (
    <CartProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/productos" element={<ProductosPage />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/nuevo-producto" element={<FormularioContainer />} />
          <Route path="/carrito" element={<CarritoPage />} />
        </Routes>
      </Layout>
    </CartProvider>
  )
}

export default App
