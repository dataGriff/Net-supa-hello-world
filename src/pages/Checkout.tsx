import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';

export function Checkout() {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (!user) {
        throw new Error('You must be logged in to checkout');
      }

      // Create order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: getCartTotal(),
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart and redirect
      clearCart();
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      setError('Failed to place order. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/')} style={styles.button}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Checkout</h1>
      {error && <div style={styles.error}>{error}</div>}
      <div style={styles.content}>
        <div style={styles.orderSummary}>
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div key={item.product.id} style={styles.item}>
              <div>
                {item.product.name} x {item.quantity}
              </div>
              <div>${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div style={styles.total}>
            <strong>Total:</strong>
            <strong>${getCartTotal().toFixed(2)}</strong>
          </div>
        </div>
        <div style={styles.form}>
          <h2>Payment Information</h2>
          <p style={styles.note}>
            Note: This is a demo application. No real payment processing occurs.
          </p>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="cardName">Cardholder Name</label>
              <input
                id="cardName"
                type="text"
                required
                style={styles.input}
                placeholder="John Doe"
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                required
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                pattern="[0-9\s]{13,19}"
              />
            </div>
            <div style={styles.row}>
              <div style={styles.formGroup}>
                <label htmlFor="expiry">Expiry Date</label>
                <input
                  id="expiry"
                  type="text"
                  required
                  style={styles.input}
                  placeholder="MM/YY"
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="cvv">CVV</label>
                <input
                  id="cvv"
                  type="text"
                  required
                  style={styles.input}
                  placeholder="123"
                  pattern="[0-9]{3,4}"
                />
              </div>
            </div>
            <button type="submit" disabled={loading} style={styles.submitButton}>
              {loading ? 'Processing...' : 'Place Order'}
            </button>
          </form>
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
  empty: {
    textAlign: 'center' as const,
    padding: '4rem 2rem',
  },
  button: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  error: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
  },
  orderSummary: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 'fit-content',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.75rem 0',
    borderBottom: '1px solid #eee',
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 0',
    fontSize: '1.2rem',
    borderTop: '2px solid #333',
    marginTop: '1rem',
  },
  form: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  note: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
    padding: '1rem',
    borderRadius: '4px',
    marginBottom: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '0.5rem',
    marginBottom: '1rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  input: {
    padding: '0.75rem',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '1rem',
  },
};
