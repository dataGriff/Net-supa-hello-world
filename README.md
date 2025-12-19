# E-Commerce Full Stack Application

A modern full-stack e-commerce application built with React TypeScript, Supabase, and Netlify.

## 🚀 Features

- **User Authentication**: Sign up, login, and secure authentication with Supabase Auth
- **Product Catalog**: Browse products with detailed information
- **Shopping Cart**: Add products to cart, update quantities, and manage items
- **Checkout System**: Complete order placement with order tracking
- **Admin Dashboard**: Manage products (Create, Read, Update, Delete) - admin-only access
- **Responsive Design**: Works on desktop and mobile devices
- **Row Level Security**: Database-level security with Supabase RLS policies

## 🛠️ Tech Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **Backend**: Supabase (PostgreSQL database, Authentication, RLS)
- **Routing**: React Router v6
- **Hosting**: Netlify
- **Task Automation**: Taskfile

## 📋 Prerequisites

- Node.js 20 or higher
- npm or yarn
- A Supabase account (free tier works)
- A Netlify account (free tier works)
- [Task](https://taskfile.dev/) (optional, for using Taskfile commands)

## 🏗️ Project Structure

```
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.tsx     # Navigation bar
│   │   └── ProtectedRoute.tsx  # Route protection wrapper
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── CartContext.tsx    # Shopping cart state
│   ├── lib/               # Utilities and configurations
│   │   └── supabase.ts    # Supabase client
│   ├── pages/             # Page components
│   │   ├── Products.tsx   # Product listing
│   │   ├── ProductDetail.tsx  # Product details
│   │   ├── Cart.tsx       # Shopping cart
│   │   ├── Checkout.tsx   # Checkout page
│   │   ├── Orders.tsx     # User orders
│   │   ├── Login.tsx      # Login page
│   │   ├── Signup.tsx     # Registration page
│   │   └── Admin.tsx      # Admin dashboard
│   ├── types/             # TypeScript types
│   │   └── index.ts       # Type definitions
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  # Database schema
├── Taskfile.yml           # Task automation
├── netlify.toml           # Netlify configuration
├── .env.example           # Environment variables template
└── package.json           # Dependencies
```

## 🚦 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Net-supa-hello-world
```

### 2. Install Dependencies

```bash
npm install
# or using Task
task install
```

### 3. Set Up Supabase

#### Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign up/login
3. Create a new project
4. Note your project URL and anon key

#### Run the Database Migration

1. In your Supabase dashboard, go to the SQL Editor
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste it into the SQL Editor and click "Run"

This will create:
- `products` table with sample products
- `orders` table for order management
- `order_items` table for order details
- `user_roles` table for admin management
- Row Level Security policies for data protection

#### Create an Admin User

After running the migration, you need to create an admin user:

1. Sign up for a regular account through the app
2. In Supabase dashboard, go to Table Editor → `user_roles`
3. Insert a new row:
   - `user_id`: (copy your user ID from `auth.users` table)
   - `role`: 'admin'

### 4. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env
# or using Task
task setup
```

Edit `.env` and add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Locally

```bash
npm run dev
# or using Task
task dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Using the Application

### As a Customer

1. **Browse Products**: View all available products on the home page
2. **View Details**: Click on a product to see detailed information
3. **Add to Cart**: Add products to your cart
4. **Sign Up/Login**: Create an account or login
5. **Checkout**: Complete your purchase
6. **View Orders**: Check your order history

### As an Admin

1. **Login**: Use an account with admin privileges
2. **Access Admin Panel**: Click "Admin" in the navigation
3. **Manage Products**:
   - Add new products
   - Edit existing products
   - Delete products
   - Update stock levels

## 🌐 Deploying to Netlify

### Option 1: Deploy via Netlify UI

1. Go to [https://netlify.com](https://netlify.com) and sign in
2. Click "Add new site" → "Import an existing project"
3. Connect to your Git provider and select your repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Add environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
6. Click "Deploy site"

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize your site
netlify init

# Deploy
netlify deploy --prod
```

### Environment Variables on Netlify

Add your environment variables in Netlify:
1. Go to Site settings → Environment variables
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

## 🔧 Available Tasks

If you have [Task](https://taskfile.dev/) installed, you can use these commands:

```bash
task install          # Install dependencies
task dev             # Start development server
task build           # Build for production
task preview         # Preview production build
task lint            # Run ESLint
task setup           # Initial setup (copy .env.example)
task clean           # Clean build artifacts
task supabase-migration  # View the Supabase migration SQL
```

## 🔒 Security Features

- **Row Level Security (RLS)**: Database-level security policies
- **Protected Routes**: Client-side route protection
- **Role-Based Access**: Admin-only pages and actions
- **Secure Authentication**: Supabase Auth with email/password

## 🎨 Customization

### Adding New Products

As an admin, you can add products through the Admin Dashboard. Alternatively, you can add them directly in Supabase:

```sql
INSERT INTO products (name, description, price, image_url, stock) VALUES
  ('Product Name', 'Description', 99.99, 'https://example.com/image.jpg', 10);
```

### Modifying the Database Schema

To add new features or modify the schema:

1. Update the SQL in `supabase/migrations/001_initial_schema.sql`
2. Run the new SQL in Supabase SQL Editor
3. Update TypeScript types in `src/types/index.ts`

## 🧪 Testing Locally

To test the full flow:

1. Start the dev server: `npm run dev`
2. Sign up for a new account
3. Browse products and add to cart
4. Complete checkout
5. View your orders
6. (If admin) Access the admin panel

## 📝 Notes

- **Email Confirmation**: Supabase sends confirmation emails by default. For local testing, you can disable this in Supabase settings → Authentication → Email Auth → "Confirm email"
- **Payment Processing**: This is a demo app. The checkout page simulates payment but doesn't process real payments.
- **Image URLs**: Sample products use Unsplash images. Replace with your own images for production.

## 🐛 Troubleshooting

### Environment Variables Not Loading

- Make sure `.env` file is in the root directory
- Restart the dev server after changing `.env`
- Environment variables must start with `VITE_`

### Supabase Connection Issues

- Verify your Supabase URL and anon key
- Check that your Supabase project is active
- Ensure RLS policies are set up correctly

### Admin Access Not Working

- Verify you've added your user to the `user_roles` table
- The `role` must be exactly 'admin'
- Try logging out and back in

### Build Errors

- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check that all dependencies are installed

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📧 Support

For issues related to:
- **Application**: Open an issue in this repository
- **Supabase**: Check [Supabase docs](https://supabase.com/docs)
- **Netlify**: Check [Netlify docs](https://docs.netlify.com/)
- **Taskfile**: Check [Taskfile docs](https://taskfile.dev/)

---

Built with ❤️ using React, TypeScript, Supabase, and Netlify
