import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatCOP } from '../utils/format';

export default function Navbar() {
  const { count, total } = useCart();
  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.link}>Lavastore</Link>
      </div>
      <div style={styles.menu}>
        <Link to="/catalogo" style={styles.link}>Catálogo</Link>
        <Link to="/carrito" style={styles.link}>
          Carrito ({count}) — {formatCOP(total)}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px', borderBottom: '1px solid #eee', position: 'sticky', top: 0, background: '#fff', zIndex: 10 },
  brand: { fontWeight: 700, fontSize: 18 },
  menu: { display: 'flex', gap: 16 },
  link: { textDecoration: 'none', color: '#111' }
};
