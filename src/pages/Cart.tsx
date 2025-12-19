import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div style={styles.container}>
        <div style={styles.empty}>
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/')} style={styles.shopButton}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Shopping Cart</h1>
      <div style={styles.content}>
        <div style={styles.items}>
          {cart.map((item) => (
            <div key={item.product.id} style={styles.item}>
              <img src={item.product.image_url} alt={item.product.name} style={styles.image} />
              <div style={styles.itemDetails}>
                <h3>{item.product.name}</h3>
                <p style={styles.price}>${item.product.price.toFixed(2)}</p>
              </div>
              <div style={styles.quantityControl}>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  style={styles.quantityButton}
                >
                  -
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= item.product.stock}
                  style={styles.quantityButton}
                >
                  +
                </button>
              </div>
              <div style={styles.itemTotal}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
              <button
                onClick={() => removeFromCart(item.product.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div style={styles.summary}>
          <h2>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div style={styles.summaryTotal}>
            <span>Total:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} style={styles.checkoutButton}>
            Proceed to Checkout
          </button>
          <button onClick={clearCart} style={styles.clearButton}>
            Clear Cart
          </button>
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
  shopButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '1rem 2rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
  content: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    gap: '2rem',
    marginTop: '2rem',
  },
  items: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '1rem',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  image: {
    width: '100px',
    height: '100px',
    objectFit: 'cover' as const,
    borderRadius: '4px',
  },
  itemDetails: {
    flex: 1,
  },
  price: {
    color: '#666',
  },
  quantityControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center' as const,
  },
  itemTotal: {
    fontWeight: 'bold',
    minWidth: '80px',
    textAlign: 'right' as const,
  },
  removeButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  summary: {
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    height: 'fit-content',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
    borderBottom: '1px solid #eee',
  },
  summaryTotal: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 0',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    borderTop: '2px solid #333',
    marginTop: '1rem',
  },
  checkoutButton: {
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
  clearButton: {
    width: '100%',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '0.5rem',
  },
};
