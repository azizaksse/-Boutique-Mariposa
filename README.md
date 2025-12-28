# Boutique Mariposa - E-commerce Website

A modern, bilingual (FR/AR) e-commerce website for Algeria, built with React, Vite, TailwindCSS, and Supabase.

## Features

- 🛍️ Product Catalog & Categories
- 🌍 Bilingual (French / Arabic) with RTL support
- 📦 COD (Cash on Delivery) Checkout with Wilaya fee calculation
- 📱 Mobile-first "Premium Boutique" design
- ⚡ Fast performance (Vite + React)
- 🛡️ Admin Panel for managing Products, Categories, and Orders
- 📊 Facebook Pixel integration ready

## Tech Stack

- **Frontend:** React, Vite, TypeScript, TailwindCSS
- **Backend:** Supabase (Database, Auth, Storage)
- **Routing:** React Router DOM
- **Forms:** React Hook Form + Zod
- **Icons:** Lucide React

## Setup Instructions

1.  **Clone & Install**
    ```bash
    git clone <repo_url>
    cd mariposa-boutique
    npm install
    ```

2.  **Supabase Setup**
    - Create a new project on [Supabase](https://supabase.com).
    - Go to the SQL Editor and run the contents of `supabase_schema.sql`.
    - Go to Project Settings > API and copy the URL and Anon Key.

3.  **Environment Variables**
    - Copy `.env.example` to `.env`
    - Fill in your Supabase credentials:
      ```
      VITE_SUPABASE_URL=your_project_url
      VITE_SUPABASE_ANON_KEY=your_anon_key
      ```

4.  **Run Locally**
    ```bash
    npm run dev
    ```

## Admin Access

- The admin panel is located at `/admin`.
- You need to create an account in Supabase Auth (or sign up via code if enabled) to log in.
- Since the code uses `signInWithPassword`, ensure you have a user created in Supabase Auth.

## Deployment

- Build for production: `npm run build`
- Deploy the `dist` folder to Netlify, Vercel, or any static host.
- Ensure you add the Environment Variables in your hosting provider settings.
- For client-side routing on Netlify/Vercel, ensure you have a `_redirects` file or configuration to redirect all traffic to `index.html`.

## License

Private
