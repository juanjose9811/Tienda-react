import { useMemo, useState } from 'react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

export default function ProductList() {
  const [query, setQuery] = useState('');
  const [type, setType] = useState('Todas');
  const [sort, setSort] = useState('relevancia');

  const filtered = useMemo(() => {
    let list = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    );
    if (type !== 'Todas') list = list.filter(p => p.type === type);
    if (sort === 'precio-asc') list = [...list].sort((a, b) => a.price - b.price);
    if (sort === 'precio-desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sort === 'capacidad-desc') list = [...list].sort((a, b) => b.capacityKg - a.capacityKg);
    return list;
  }, [query, type, sort]);

  return (
    <div>
      <div style={styles.filters}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o marca"
          style={styles.input}
        />
        <select value={type} onChange={(e) => setType(e.target.value)} style={styles.select}>
          <option>Todas</option>
          <option>Carga frontal</option>
          <option>Carga superior</option>
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} style={styles.select}>
          <option value="relevancia">Ordenar por relevancia</option>
          <option value="precio-asc">Precio: menor a mayor</option>
          <option value="precio-desc">Precio: mayor a menor</option>
          <option value="capacidad-desc">Capacidad: mayor primero</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

const styles = {
  filters: { display: 'flex', gap: 12, marginBottom: 16 },
  input: { flex: 1, padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6 },
  select: { padding: '10px 12px', border: '1px solid #ddd', borderRadius: 6 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }
};
