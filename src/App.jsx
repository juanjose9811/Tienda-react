import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { Routes, Route } from 'react-router-dom';

function Home() {
  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <h2>Bienvenido a Lavastore</h2>
      <p>Descubre lavadoras eficientes y confiables para tu hogar.</p>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '20px' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<ProductList />} />
        <Route path="/carrito" element={<Cart />} />
      </Routes>
    </div>
  );
}
