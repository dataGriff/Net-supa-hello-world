import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError('Failed to load products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return <div style={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <h1>Our Products</h1>
      <div style={styles.grid}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image_url} alt={product.name} style={styles.image} />
            <div style={styles.cardBody}>
              <h3>{product.name}</h3>
              <p style={styles.description}>{product.description}</p>
              <div style={styles.footer}>
                <span style={styles.price}>${product.price.toFixed(2)}</span>
                <span style={styles.stock}>Stock: {product.stock}</span>
              </div>
              <div style={styles.actions}>
                <Link to={`/products/${product.id}`} style={styles.detailButton}>
                  View Details
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  style={{
                    ...styles.addButton,
                    ...(product.stock === 0 ? styles.addButtonDisabled : {}),
                  }}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
  },
  loading: {
    textAlign: 'center' as const,
    padding: '2rem',
    fontSize: '1.2rem',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '1rem',
    borderRadius: '4px',
    margin: '1rem auto',
    maxWidth: '600px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    overflow: 'hidden',
    transition: 'transform 0.2s',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover' as const,
  },
  cardBody: {
    padding: '1rem',
  },
  description: {
    color: '#666',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  price: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#28a745',
  },
  stock: {
    color: '#666',
    fontSize: '0.9rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  detailButton: {
    flex: 1,
    padding: '0.5rem',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center' as const,
    textDecoration: 'none',
    display: 'block',
  },
  addButton: {
    flex: 1,
    padding: '0.5rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
};
