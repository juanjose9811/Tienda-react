import { formatCOP } from '../utils/format';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  <button onClick={() => addToCart(product)}>Agregar al carrito</button>

  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.img} />
      <h3 style={styles.title}>{product.name}</h3>
      <p style={styles.meta}>
        {product.brand} • {product.capacityKg}kg • {product.type} • Clase {product.energyClass}
      </p>
      <p style={styles.price}>{formatCOP(product.price)}</p>
      <ul style={styles.features}>
        {product.features.map((f) => <li key={f}>{f}</li>)}
      </ul>
      <button style={styles.btn} onClick={() => addToCart(product)}>
        Agregar al carrito
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: '1px solid #eee',
    borderRadius: 8,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    background: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  img: {
    width: '100%',
    height: 180,
    objectFit: 'cover',
    borderRadius: 6,
    background: '#f8f8f8'
  },
  title: { margin: 0 },
  meta: { margin: 0, color: '#555', fontSize: 14 },
  price: { margin: '8px 0', fontWeight: 700, color: '#0d6efd' },
  features: { margin: 0, paddingLeft: 18, fontSize: 13 },
  btn: {
    padding: '10px 12px',
    borderRadius: 6,
    border: 'none',
    background: '#111',
    color: '#fff',
    cursor: 'pointer'
  }
};
