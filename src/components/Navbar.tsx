import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export function Navbar() {
  const { user, signOut, isAdmin } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.brand}>
          E-Commerce Store
        </Link>
        <div style={styles.menu}>
          <Link to="/" style={styles.link}>
            Products
          </Link>
          {user ? (
            <>
              <Link to="/orders" style={styles.link}>
                Orders
              </Link>
              {isAdmin && (
                <Link to="/admin" style={styles.link}>
                  Admin
                </Link>
              )}
              <Link to="/cart" style={styles.link}>
                Cart ({getCartCount()})
              </Link>
              <button onClick={handleSignOut} style={styles.button}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.link}>
                Login
              </Link>
              <Link to="/signup" style={styles.link}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#333',
    color: 'white',
    padding: '1rem 0',
    marginBottom: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  menu: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  button: {
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
