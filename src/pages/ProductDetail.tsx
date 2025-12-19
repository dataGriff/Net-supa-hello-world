import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Product } from '../types';
import { useCart } from '../contexts/CartContext';

export function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  async function fetchProduct(productId: string) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();

      if (error) throw error;
      setProduct(data);
    } catch (err) {
      setError('Failed to load product');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`${quantity} x ${product.name} added to cart!`);
      navigate('/cart');
    }
  };

  if (loading) {
    return <div style={styles.loading}>Loading product...</div>;
  }

  if (error || !product) {
    return <div style={styles.error}>{error || 'Product not found'}</div>;
  }

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/')} style={styles.backButton}>
        ← Back to Products
      </button>
      <div style={styles.content}>
        <img src={product.image_url} alt={product.name} style={styles.image} />
        <div style={styles.details}>
          <h1>{product.name}</h1>
          <p style={styles.price}>${product.price.toFixed(2)}</p>
          <p style={styles.description}>{product.description}</p>
          <p style={styles.stock}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </p>
          {product.stock > 0 && (
            <div style={styles.actions}>
              <div style={styles.quantityControl}>
                <label htmlFor="quantity">Quantity:</label>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  style={styles.quantityInput}
                />
              </div>
              <button onClick={handleAddToCart} style={styles.addButton}>
                Add to Cart
              </button>
            </div>
          )}
        </div>
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
    textAlign: 'center' as const,
  },
  backButton: {
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    marginBottom: '2rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
  },
  details: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  price: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#28a745',
  },
  description: {
    color: '#666',
    lineHeight: '1.6',
  },
  stock: {
    color: '#666',
    fontWeight: 'bold',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    marginTop: '1rem',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  quantityInput: {
    width: '80px',
    padding: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  addButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
};
