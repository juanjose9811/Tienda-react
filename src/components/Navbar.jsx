// Navbar principal.
// - Muestra enlaces de navegación.
// - Muestra contador y total del carrito.
// - Muestra estado de autenticación y permite salir.

import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatCOP } from '../utils/format';

export default function Navbar() {
  const { count, total } = useCart();
  const { isAuthenticated, currentUser, logout } = useAuth();

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
        {isAuthenticated ? (
          <div style={styles.user}>
            <span style={styles.greet}>Hola, {currentUser?.name}</span>
            <button onClick={logout} style={styles.btn}>Salir</button>
          </div>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/registro" style={styles.link}>Registro</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '12px 20px',
    borderBottom: '1px solid #eee',
    position: 'sticky',
    top: 0,
    background: '#fff',
    zIndex: 10
  },
  brand: { fontWeight: 700, fontSize: 18 },
  menu: { display: 'flex', gap: 16, alignItems: 'center' },
  link: { textDecoration: 'none', color: '#111' },
  user: { display: 'flex', gap: 10, alignItems: 'center' },
  greet: { color: '#555' },
  btn: {
    padding: '6px 8px',
    borderRadius: 6,
    border: '1px solid #ddd',
    background: '#fff',
    cursor: 'pointer'
  }
};
