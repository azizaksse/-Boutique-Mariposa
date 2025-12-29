-- =====================================================
-- Supabase Storage Setup for Boutique Mariposa
-- =====================================================
-- This script creates storage buckets and policies for
-- product and category images
-- =====================================================

-- Create products storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Create categories storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('categories', 'categories', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- =====================================================
-- Storage Policies for Products Bucket
-- =====================================================

-- Allow public read access to products bucket
CREATE POLICY "Public Access for Products"
ON storage.objects FOR SELECT
USING (bucket_id = 'products');

-- Allow authenticated users to upload to products bucket
CREATE POLICY "Authenticated users can upload products"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'products' AND auth.role() = 'authenticated');

-- Allow authenticated users to update products
CREATE POLICY "Authenticated users can update products"
ON storage.objects FOR UPDATE
USING (bucket_id = 'products' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete products
CREATE POLICY "Authenticated users can delete products"
ON storage.objects FOR DELETE
USING (bucket_id = 'products' AND auth.role() = 'authenticated');

-- =====================================================
-- Storage Policies for Categories Bucket
-- =====================================================

-- Allow public read access to categories bucket
CREATE POLICY "Public Access for Categories"
ON storage.objects FOR SELECT
USING (bucket_id = 'categories');

-- Allow authenticated users to upload to categories bucket
CREATE POLICY "Authenticated users can upload categories"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'categories' AND auth.role() = 'authenticated');

-- Allow authenticated users to update categories
CREATE POLICY "Authenticated users can update categories"
ON storage.objects FOR UPDATE
USING (bucket_id = 'categories' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete categories
CREATE POLICY "Authenticated users can delete categories"
ON storage.objects FOR DELETE
USING (bucket_id = 'categories' AND auth.role() = 'authenticated');
