-- Seed Categories
INSERT INTO categories (name_fr, name_ar, slug, image) VALUES
('Coffrets Cadeaux', 'علب هدايا', 'coffrets-cadeaux', '/products/577065491_1392773052858755_8581221638271002659_n.jpg'),
('Montres & Accessoires', 'ساعات وإكسسوارات', 'montres-accessoires', '/products/594067945_1395149809287746_3105109334085061566_n.jpg'),
('Parfums', 'عطور', 'parfums', '/products/595690264_1395797702556290_7934707841311875150_n.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Seed Products
WITH cats AS (SELECT id, slug FROM categories)
INSERT INTO products (name_fr, name_ar, slug, description_fr, description_ar, price, old_price, category_id, images, featured, stock) VALUES
-- Coffrets
('Coffret Cadeau Prestige', 'علبة هدايا فاخرة', 'coffret-prestige', 'Un magnifique coffret cadeau pour toutes les occasions.', 'علبة هدايا رائعة لجميع المناسبات.', 4500, 5500, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/577065491_1392773052858755_8581221638271002659_n.jpg', '/products/593622443_1394290112707049_5521390838049995874_n.jpg'], true, 10),
('Coffret Élégance', 'علبة الأناقة', 'coffret-elegance', 'Ensemble élégant et raffiné.', 'مجموعة أنيقة وراقية.', 3800, 4800, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/594151784_1398143662321694_8994175036544004615_n.jpg'], true, 15),
('Pack Surprise', 'حزمة المفاجأة', 'pack-surprise', 'Le cadeau parfait pour surprendre vos proches.', 'الهدية المثالية لمفاجأة أحبائك.', 2900, 3500, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/594411656_1395149802621080_6975751905709291921_n.jpg'], false, 20),
('Coffret Luxe', 'علبة فاخرة', 'coffret-luxe', 'Coffret haut de gamme.', 'علبة من الطراز الرفيع.', 5200, 6000, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/594999489_1395149792621081_946846984272299866_n.jpg'], true, 5),

-- Montres & Accessoires
('Montre Classique', 'ساعة كلاسيكية', 'montre-classique', 'Montre au design intemporel.', 'ساعة بتصميم خالد.', 3500, 4200, (SELECT id FROM cats WHERE slug = 'montres-accessoires'), ARRAY['/products/594067945_1395149809287746_3105109334085061566_n.jpg'], true, 12),
('Ensemble Accessoires', 'طقم إكسسوارات', 'ensemble-accessoires', 'Ensemble complet pour un look parfait.', 'طقم كامل لمظهر مثالي.', 2500, 3000, (SELECT id FROM cats WHERE slug = 'montres-accessoires'), ARRAY['/products/595660919_1395149795954414_7418656366095910303_n.jpg'], false, 18),
('Montre Sport', 'ساعة رياضية', 'montre-sport', 'Pour un style décontracté et sportif.', 'لأسلوب غير رسمي ورياضي.', 2800, 3400, (SELECT id FROM cats WHERE slug = 'montres-accessoires'), ARRAY['/products/596042821_1397461199056607_4428601718205048649_n.jpg'], false, 10),
('Bracelet Orné', 'سوار مزخرف', 'bracelet-orne', 'Bracelet délicat et brillant.', 'سوار رقيق ولامع.', 1500, 1900, (SELECT id FROM cats WHERE slug = 'montres-accessoires'), ARRAY['/products/597226231_1401622121973848_1108481544322113140_n.jpg'], false, 25),

-- Parfums & Autres
('Parfum Floral', 'عطر زهري', 'parfum-floral', 'Une fragrance douce et fleurie.', 'عطر ناعم وزهري.', 4200, 5000, (SELECT id FROM cats WHERE slug = 'parfums'), ARRAY['/products/595690264_1395797702556290_7934707841311875150_n.jpg'], true, 8),
('Coffret Parfum', 'علبة عطر', 'coffret-parfum', 'Le cadeau idéal pour elle.', 'الهدية المثالية لها.', 5500, 6500, (SELECT id FROM cats WHERE slug = 'parfums'), ARRAY['/products/597367001_1403751178427609_4164190190203869139_n.jpg'], true, 6),
('Essence Pure', 'جوهر خالص', 'essence-pure', 'Un parfum intense et durable.', 'عطر قوي ويدوم طويلاً.', 3900, 4600, (SELECT id FROM cats WHERE slug = 'parfums'), ARRAY['/products/597689344_1403751125094281_2515371019614509854_n.jpg'], false, 15),

-- More generic items mapped to remaining images
('Article Cadeau 1', 'منتج هدية 1', 'article-cadeau-1', 'Description du produit.', 'وصف المنتج.', 2000, NULL, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/598333465_1402297111906349_6646680579957732708_n.jpg'], false, 20),
('Article Cadeau 2', 'منتج هدية 2', 'article-cadeau-2', 'Description du produit.', 'وصف المنتج.', 2200, NULL, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/599244374_1404383005031093_6280835735765469965_n.jpg'], false, 20),
('Article Cadeau 3', 'منتج هدية 3', 'article-cadeau-3', 'Description du produit.', 'وصف المنتج.', 2400, NULL, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/600137131_1402764631859597_7952363950831721416_n.jpg'], false, 20),
('Article Cadeau 4', 'منتج هدية 4', 'article-cadeau-4', 'Description du produit.', 'وصف المنتج.', 2600, NULL, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/604792515_1411706084298785_4498558043306832404_n.jpg'], false, 20),
('Article Cadeau 5', 'منتج هدية 5', 'article-cadeau-5', 'Description du produit.', 'وصف المنتج.', 2800, NULL, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/605411085_1409100911225969_4676343564863594443_n.jpg'], false, 20),
('Article Cadeau 6', 'منتج هدية 6', 'article-cadeau-6', 'Description du produit.', 'وصف المنتج.', 3000, NULL, (SELECT id FROM cats WHERE slug = 'coffrets-cadeaux'), ARRAY['/products/605528464_1409820334487360_5715826939334771451_n.jpg'], false, 20);
