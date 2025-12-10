import { useCart } from '../context/CartContext';
import { formatCOP } from '../utils/format';

export default function Cart() {
  const { items, total, setQty, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return <p>Tu carrito está vacío.</p>;
  }

  return (
    <div style={styles.wrap}>
      <ul style={styles.list}>
        {items.map(item => (
          <li key={item.id} style={styles.item}>
            <img src={item.image} alt={item.name} style={styles.img} />
            <div style={styles.info}>
              <strong>{item.name}</strong>
              <span>{formatCOP(item.price)} c/u</span>
              <div style={styles.controls}>
                <button onClick={() => setQty(item.id, Math.max(item.qty - 1, 0))}>-</button>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => setQty(item.id, Math.max(parseInt(e.target.value || '1', 10), 1))}
                  style={styles.input}
                />
                <button onClick={() => setQty(item.id, item.qty + 1)}>+</button>
                <button style={styles.remove} onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            </div>
            <div style={styles.subtotal}>
              {formatCOP(item.price * item.qty)}
            </div>
          </li>
        ))}
      </ul>

      <div style={styles.summary}>
        <div style={styles.row}>
          <span>Total</span>
          <strong>{formatCOP(total)}</strong>
        </div>
        <button style={styles.checkout} onClick={clearCart}>Finalizar compra (demo)</button>
      </div>
    </div>
  );
}

const styles = {
  wrap: { display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24, alignItems: 'start' },
  list: { listStyle: 'none', margin: 0, padding: 0 },
  item: { display: 'grid', gridTemplateColumns: '120px 1fr 120px', gap: 12, padding: 12, borderBottom: '1px solid #eee' },
  img: { width: '100%', height: 100, objectFit: 'cover', borderRadius: 6, background: '#f8f8f8' },
  info: { display: 'flex', flexDirection: 'column', gap: 8 },
  controls: { display: 'flex', alignItems: 'center', gap: 8 },
  input: { width: 56, padding: '6px 8px' },
  remove: { marginLeft: 'auto', background: 'transparent', border: '1px solid #ddd', padding: '6px 8px', borderRadius: 6, cursor: 'pointer' },
  subtotal: { alignSelf: 'center', fontWeight: 700 },
  summary: { border: '1px solid #eee', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 },
  row: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  checkout: { padding: '10px 12px', borderRadius: 6, border: 'none', background: '#0d6efd', color: '#fff', cursor: 'pointer' }
};
