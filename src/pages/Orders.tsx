import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Order, OrderItem, Product } from '../types';

interface OrderWithItems extends Order {
  order_items: (OrderItem & { products: Product })[];
}

export function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function fetchOrders() {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            products (*)
          )
        `)
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError('Failed to load orders');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div style={styles.loading}>Loading orders...</div>;
  }

  if (error) {
    return <div style={styles.error}>{error}</div>;
  }

  if (orders.length === 0) {
    return (
      <div style={styles.container}>
        <h1>My Orders</h1>
        <div style={styles.empty}>
          <p>You haven't placed any orders yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>My Orders</h1>
      <div style={styles.orders}>
        {orders.map((order) => (
          <div key={order.id} style={styles.order}>
            <div style={styles.orderHeader}>
              <div>
                <strong>Order ID:</strong> {order.id.slice(0, 8)}
              </div>
              <div>
                <strong>Status:</strong>{' '}
                <span style={getStatusStyle(order.status)}>{order.status}</span>
              </div>
              <div>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </div>
              <div>
                <strong>Date:</strong> {new Date(order.created_at).toLocaleDateString()}
              </div>
            </div>
            <div style={styles.items}>
              <h4>Items:</h4>
              {order.order_items.map((item) => (
                <div key={item.id} style={styles.item}>
                  <img
                    src={item.products.image_url}
                    alt={item.products.name}
                    style={styles.image}
                  />
                  <div style={styles.itemDetails}>
                    <div>{item.products.name}</div>
                    <div style={styles.itemPrice}>
                      ${item.price.toFixed(2)} x {item.quantity} = $
                      {(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getStatusStyle(status: string) {
  const baseStyle = {
    padding: '0.25rem 0.5rem',
    borderRadius: '4px',
    fontWeight: 'bold',
  };

  switch (status) {
    case 'pending':
      return { ...baseStyle, backgroundColor: '#ffc107', color: '#000' };
    case 'completed':
      return { ...baseStyle, backgroundColor: '#28a745', color: '#fff' };
    case 'cancelled':
      return { ...baseStyle, backgroundColor: '#dc3545', color: '#fff' };
    default:
      return baseStyle;
  }
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
  empty: {
    textAlign: 'center' as const,
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  orders: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
    marginTop: '2rem',
  },
  order: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  orderHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
    paddingBottom: '1rem',
    borderBottom: '2px solid #eee',
    marginBottom: '1rem',
  },
  items: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
  },
  item: {
    display: 'flex',
    gap: '1rem',
    padding: '0.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
  },
  image: {
    width: '60px',
    height: '60px',
    objectFit: 'cover' as const,
    borderRadius: '4px',
  },
  itemDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'center',
  },
  itemPrice: {
    color: '#666',
    fontSize: '0.9rem',
  },
};
