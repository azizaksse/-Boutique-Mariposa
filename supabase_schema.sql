-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories Table
create table if not exists categories (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name_fr text not null,
  name_ar text not null,
  slug text not null unique,
  image text
);

-- Products Table
create table if not exists products (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name_fr text not null,
  name_ar text not null,
  slug text not null,
  description_fr text,
  description_ar text,
  price numeric not null,
  old_price numeric,
  images text[] default array[]::text[],
  category_id uuid references categories(id) on delete set null,
  stock integer default 0,
  featured boolean default false
);

-- Orders Table
create table if not exists orders (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  full_name text not null,
  phone text not null,
  wilaya text not null,
  commune text not null,
  address text not null,
  delivery_method text not null,
  delivery_fee numeric not null,
  total numeric not null,
  status text default 'new',
  items jsonb not null,
  notes text
);

-- Messages Table
create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text not null,
  message text not null
);

-- Storage Buckets (Handle conflict if exists)
insert into storage.buckets (id, name, public) 
values ('products', 'products', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('categories', 'categories', true)
on conflict (id) do nothing;

-- RLS Policies

-- Categories
alter table categories enable row level security;
create policy "Public categories are viewable by everyone" on categories for select using (true);
create policy "Public can insert categories" on categories for insert with check (true);
create policy "Public can update categories" on categories for update using (true);
create policy "Public can delete categories" on categories for delete using (true);

-- Products
alter table products enable row level security;
create policy "Public products are viewable by everyone" on products for select using (true);
create policy "Public can insert products" on products for insert with check (true);
create policy "Public can update products" on products for update using (true);
create policy "Public can delete products" on products for delete using (true);

-- Orders
alter table orders enable row level security;
create policy "Public can create orders" on orders for insert with check (true);
create policy "Public can view all orders" on orders for select using (true);
create policy "Public can update orders" on orders for update using (true);

-- Messages
alter table messages enable row level security;
create policy "Public can create messages" on messages for insert with check (true);
create policy "Public can view messages" on messages for select using (true);

-- Seed Data
insert into categories (name_fr, name_ar, slug) values
('Montres', 'ساعات', 'montres'),
('Parfums', 'عطور', 'parfums'),
('Sacs', 'حقائب', 'sacs'),
('Accessoires', 'أكسسوارات', 'accessoires')
on conflict (slug) do nothing;
