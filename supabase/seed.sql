-- Seed data for local development
-- This file is run after migrations when using `supabase db reset`

-- Insert sample products
INSERT INTO products (name, description, price, image_url, stock) VALUES
  ('Laptop Pro', 'High-performance laptop for professionals', 1299.99, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', 15),
  ('Wireless Mouse', 'Ergonomic wireless mouse with precision tracking', 29.99, 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400', 50),
  ('Mechanical Keyboard', 'RGB mechanical keyboard with cherry switches', 149.99, 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400', 30),
  ('USB-C Hub', '7-in-1 USB-C hub with HDMI and card readers', 49.99, 'https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400', 40),
  ('Monitor 27"', '4K UHD monitor with HDR support', 399.99, 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400', 20),
  ('Webcam HD', '1080p webcam with auto-focus and noise cancellation', 79.99, 'https://images.unsplash.com/photo-1588443212223-ac92043093cb?w=400', 25);
