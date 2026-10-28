import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'node:url';
import { db, runTransaction } from './db.js';
import { initializeDatabase } from './init.js';

export function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  // Ensure schema exists first
  initializeDatabase();

  runTransaction(() => {
    // 1. Clear existing seed data safely
    db.exec('DELETE FROM order_items;');
    db.exec('DELETE FROM orders;');
    db.exec('DELETE FROM cart_items;');
    db.exec('DELETE FROM products;');
    db.exec('DELETE FROM users;');

    console.log('🧹 Cleared existing tables.');

    // 2. Seed Demo Users with Secure Hashes (bcrypt, 10 rounds)
    const adminHash = bcrypt.hashSync('EcoAdmin#2026!', 10);
    const user1Hash = bcrypt.hashSync('GreenLiving#2026!', 10);
    const user2Hash = bcrypt.hashSync('EcoShopper#2026!', 10);

    const insertUser = db.prepare(`
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
    `);

    const adminUser = insertUser.run('EcoCart Administrator', 'admin@ecocart.local', adminHash, 'admin');
    const customer1 = insertUser.run('Jane Doe', 'jane.eco@example.local', user1Hash, 'customer');
    const customer2 = insertUser.run('Marcus Green', 'marcus.green@example.local', user2Hash, 'customer');

    console.log(`👤 Created 3 demo users (Admin: ${adminUser.lastInsertRowid}, Customers: ${customer1.lastInsertRowid}, ${customer2.lastInsertRowid})`);

    // 3. Seed Realistic Eco-Friendly Products
    const productsData = [
      // Category: Reusable Bottles
      {
        name: 'HydroPure Insulated Bamboo Flask (750ml)',
        slug: 'hydropure-insulated-bamboo-flask-750ml',
        description: 'Double-wall vacuum-insulated food-grade 18/8 stainless steel bottle wrapped in sustainably harvested organic bamboo. Keeps beverages cold for 24 hours or piping hot for 12 hours. Zero condensation exterior and leak-proof seal.',
        price: 34.99,
        category: 'Reusable Bottles',
        stock: 45,
        eco_score: 94,
        is_featured: 1,
        image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '70% recycled stainless steel body',
          organic_elements: 'FSC-certified renewable bamboo casing',
          packaging: '100% compostable unbleached kraft box with soy ink',
          longevity: 'Expected lifespan: 8+ years of daily use',
          single_use_elimination: 'Replaces ~1,400 single-use plastic bottles'
        })
      },
      {
        name: 'Aura Borosilicate Glass Bottle with Protective Sleeve',
        slug: 'aura-borosilicate-glass-bottle-sleeve',
        description: 'Thermal-shock resistant pure borosilicate glass flask encased in a protective non-slip food-grade silicone sleeve. Bamboo twist cap with a silicone leak-proof gasket. Non-porous and chemically inert for pure taste.',
        price: 27.50,
        category: 'Reusable Bottles',
        stock: 30,
        eco_score: 88,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% infinitely recyclable borosilicate glass',
          organic_elements: 'Natural bamboo cap with food-grade silicone seal',
          packaging: 'Recycled corrugated cardboard with water-based glue',
          longevity: 'Reusable indefinitely with proper care',
          single_use_elimination: 'Replaces ~900 disposable water bottles annually'
        })
      },
      {
        name: 'Terra Ultra-Light Recycled Titanium Canteen (800ml)',
        slug: 'terra-ultra-light-recycled-titanium-canteen',
        description: 'Engineered from aerospace-grade recycled titanium, weighing just 142g while offering unmatched structural resilience. Completely non-corrosive, hypoallergenic, and designed for backcountry exploration and daily hydration.',
        price: 54.00,
        category: 'Reusable Bottles',
        stock: 18,
        eco_score: 96,
        is_featured: 1,
        image_url: 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '90% post-industrial recycled titanium',
          organic_elements: 'Zero plastics or synthetic coatings',
          packaging: 'Minimal unbleached linen drawstring pouch',
          longevity: 'Lifetime manufacturer warranty against structural defects',
          single_use_elimination: 'Lifetime alternative to single-use canteens'
        })
      },
      {
        name: 'Nomad Collapsible Silicone Coffee Tumbler (450ml)',
        slug: 'nomad-collapsible-silicone-coffee-tumbler',
        description: 'Pocket-friendly collapsible coffee cup made from certified platinum-grade silicone. Collapses into a 5cm puck that slips effortlessly into your pocket or tote after finishing your beverage. Heat sleeve included.',
        price: 19.99,
        category: 'Reusable Bottles',
        stock: 60,
        eco_score: 84,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: 'BPA-free platinum silicone, LFGB food contact certified',
          organic_elements: 'Recyclable polypropylene collar and lid',
          packaging: 'Flat-packed recycled envelope to minimize freight volume',
          longevity: 'Rated for 3,000+ dishwasher wash cycles',
          single_use_elimination: 'Prevents ~500 disposable coffee cups yearly'
        })
      },
      {
        name: 'Glacier Recycled Steel Vacuum Growler (1000ml)',
        slug: 'glacier-recycled-steel-vacuum-growler-1000ml',
        description: 'Heavy-duty insulated growler built with 90% recycled food-grade stainless steel. Features a rugged handle, copper insulation lining for 36-hour chilling, and a wide mouth compatible with ice cubes and fruit infusions.',
        price: 42.00,
        category: 'Reusable Bottles',
        stock: 25,
        eco_score: 91,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '90% post-consumer recycled stainless steel',
          organic_elements: 'Cast steel lid with silicone gasket',
          packaging: 'Recycled honeycomb paper cushion wrapping',
          longevity: 'Impact-resistant construction with 10-year durability target',
          single_use_elimination: 'Eliminates hundreds of canned or bottled purchases'
        })
      },

      // Category: Sustainable Bags
      {
        name: 'Verde Organic Cotton Heavyweight Market Tote',
        slug: 'verde-organic-cotton-market-tote',
        description: '16oz heavyweight organic cotton canvas tote with GOTS certification. Features six internal organizer sleeves for produce bottles and glass jars, double-stitched stress points, and comfortable shoulder straps.',
        price: 24.50,
        category: 'Sustainable Bags',
        stock: 55,
        eco_score: 95,
        is_featured: 1,
        image_url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% GOTS-certified organic raw cotton canvas',
          organic_elements: 'Unbleached natural fiber with zero synthetic dyes',
          packaging: 'Recycled card hangtag tied with natural jute twine',
          longevity: 'Machine washable, tested to carry up to 25 kg load',
          single_use_elimination: 'Replaces over 700 plastic grocery bags over 3 years'
        })
      },
      {
        name: 'Seashell Recycled Ocean Plastic Daypack (22L)',
        slug: 'seashell-recycled-ocean-plastic-daypack-22l',
        description: 'Water-resistant urban backpack crafted entirely from 28 recovered ocean-bound plastic bottles (RPET). Features a padded 15-inch laptop sleeve, breathable mesh backing, and waterproof YKK zippers made from recycled nylon.',
        price: 68.00,
        category: 'Sustainable Bags',
        stock: 22,
        eco_score: 91,
        is_featured: 1,
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% RPET recycled ocean fabric and lining',
          organic_elements: 'PFC-free water repellent coating (C0 DWR)',
          packaging: 'Biodegradable cassava starch mailer bag',
          longevity: 'Reinforced bartack stitching on all anchor points',
          single_use_elimination: 'Diverts 28 discarded plastic bottles from waterways'
        })
      },
      {
        name: 'Corkwood Minimalist Crossbody Satchel',
        slug: 'corkwood-minimalist-crossbody-satchel',
        description: 'Handcrafted from FSC-certified Portuguese cork oak bark. The cork is harvested without felling trees, allowing trees to absorb 3–5x more carbon. Soft as leather, naturally waterproof, antimicrobial, and stain-resistant.',
        price: 49.99,
        category: 'Sustainable Bags',
        stock: 14,
        eco_score: 93,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: 'Organic renewable cork leather exterior',
          organic_elements: 'Organic unbleached cotton twill interior lining',
          packaging: 'Zero-plastic recycled cardboard gift presentation box',
          longevity: 'Naturally aging patina that gains character over decades',
          single_use_elimination: 'Cruelty-free botanical alternative to petroleum faux leathers'
        })
      },
      {
        name: 'JuteCraft Biodegradable Produce Bag Set (6-Pack)',
        slug: 'jutecraft-produce-bag-set-6pack',
        description: 'Breathable organic mesh and muslin bags in three versatile sizes (Small, Medium, Large). Perfect for leafy greens, grains, nuts, and root vegetables. Tare weight clearly labeled on each color-coded organic cotton tag.',
        price: 16.00,
        category: 'Sustainable Bags',
        stock: 80,
        eco_score: 98,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1610492421976-787c88e99990?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% biodegradable unbleached organic cotton & natural jute',
          organic_elements: 'Completely compostable at end of life',
          packaging: 'Minimal paper wrapper made from seed paper',
          longevity: 'Washable and reusable for 500+ supermarket visits',
          single_use_elimination: 'Saves 300+ thin plastic produce film rolls per year'
        })
      },
      {
        name: 'UrbanHemp Roll-Top Commuter Backpack (25L)',
        slug: 'urbanhemp-rolltop-commuter-backpack',
        description: 'Tough, weather-defying roll-top backpack woven from natural Himalayan hemp fibers. Hemp uses 50% less water than conventional cotton and needs no chemical pesticides. Finished with natural beeswax waterproofing.',
        price: 79.50,
        category: 'Sustainable Bags',
        stock: 12,
        eco_score: 89,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1546938576-6e6a64f317cc?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '70% pure hemp fiber, 30% recycled cotton blend',
          organic_elements: 'Non-toxic beeswax water-resistant sealant',
          packaging: 'Recycled kraft paper carton with paper tape',
          longevity: 'Hemp fibers possess 3x the tensile strength of cotton',
          single_use_elimination: 'Replaces short-lived petroleum-based nylon bags'
        })
      },

      // Category: Eco Stationery
      {
        name: 'Sprout Plantable Seed Pencils (Pack of 8)',
        slug: 'sprout-plantable-seed-pencils-pack-of-8',
        description: 'High-quality graphite drawing pencils made from sustainably harvested cedar. When the pencil becomes too short for writing, plant the stub in soil! Biodegradable green caps contain non-GMO seeds: Basil, Mint, Daisy, and Sunflower.',
        price: 14.99,
        category: 'Eco Stationery',
        stock: 75,
        eco_score: 97,
        is_featured: 1,
        image_url: 'https://images.unsplash.com/photo-1585336261026-c23f13f1eec2?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% sustainable PEFC-certified cedar wood',
          organic_elements: 'Non-GMO untreated edible herb and flower seeds',
          packaging: 'Recycled FSC card stock case printed with vegetable dye',
          longevity: 'Leaves zero waste: converts directly into living plants',
          single_use_elimination: 'Zero plastic barrel or synthetic eraser waste'
        })
      },
      {
        name: 'StonePaper Waterproof Hardcover Journal (A5)',
        slug: 'stonepaper-waterproof-hardcover-journal',
        description: 'Luxurious 192-page ruled journal made from calcium carbonate salvaged from limestone quarries. Zero trees, zero water, and zero bleach used in production. Completely waterproof, tear-resistant, and buttery-smooth to write on.',
        price: 21.99,
        category: 'Eco Stationery',
        stock: 40,
        eco_score: 93,
        is_featured: 1,
        image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '80% repurposed limestone dust, 20% recycled resin',
          organic_elements: 'Saves 1 ton of timber & 27,000L water per ton produced',
          packaging: 'Minimal paper sleeve with natural cotton ribbon bookmark',
          longevity: 'Resistant to moisture, accidental spills, and tearing',
          single_use_elimination: 'Conserves forest ecosystems compared to pulp paper'
        })
      },
      {
        name: 'WheatStraw Refillable Gel Pens (Pack of 5)',
        slug: 'wheatstraw-refillable-gel-pens-pack-of-5',
        description: 'Eco-conscious 0.5mm smooth black gel pens molded from agricultural wheat straw byproduct. Takes high-capacity universal metal refills so the outer casing never needs to be discarded.',
        price: 10.50,
        category: 'Eco Stationery',
        stock: 90,
        eco_score: 86,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '65% agricultural crop residue (wheat straw bio-composite)',
          organic_elements: 'Reduces virgin plastic consumption by 60%',
          packaging: 'Biodegradable kraft paper sleeve',
          longevity: 'Refillable cartridge system extending usage across years',
          single_use_elimination: 'Stops single-use plastic pen bodies from ending in landfills'
        })
      },
      {
        name: 'ForestGuard Recycled Kraft Notebooks (3-Pack)',
        slug: 'forestguard-recycled-kraft-notebooks-3pack',
        description: 'Trio of stitched 64-page pocket notebooks crafted from 100% post-consumer unbleached recycled paper. Thread-bound with organic cotton stitching rather than plastic wire combs or synthetic adhesive glues.',
        price: 12.00,
        category: 'Eco Stationery',
        stock: 50,
        eco_score: 94,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% post-consumer recycled paper stock',
          organic_elements: 'Thread-sewn binding with natural cotton twine',
          packaging: 'Paper belly band printed with solvent-free soy ink',
          longevity: '100% curbside recyclable and fully backyard compostable',
          single_use_elimination: 'Zero bleached virgin wood pulp used'
        })
      },
      {
        name: 'EarthTone Natural Cork Desk Pad & Mouse Mat',
        slug: 'earthtone-natural-cork-desk-pad',
        description: 'Dual-sided large executive desk mat made from high-density sustainably harvested natural cork on one side and recycled plant-felt on the reverse. Naturally insulating, anti-static, and water-repellent.',
        price: 29.99,
        category: 'Eco Stationery',
        stock: 28,
        eco_score: 90,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% natural cork and recycled PET felt base',
          organic_elements: 'Harvested without injuring cork oak trees',
          packaging: 'Rolled inside a reusable kraft cylinder',
          longevity: 'Highly resilient surface resistant to fraying and indentation',
          single_use_elimination: 'Replaces chemical PVC/polyurethane mousepads'
        })
      },

      // Category: Home Essentials
      {
        name: 'ZeroWaste Dish Care Kit (Solid Soap + Sisal Scrubber)',
        slug: 'zerowaste-dish-care-kit',
        description: 'Complete plastic-free dishwashing set featuring a concentrated cold-pressed olive & coconut oil soap block and a compostable bamboo handle brush fitted with natural sisal plant bristles.',
        price: 18.50,
        category: 'Home Essentials',
        stock: 65,
        eco_score: 97,
        is_featured: 1,
        image_url: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% botanical plant-derived surfactants and sisal fiber',
          organic_elements: 'Palm-oil free, synthetic fragrance-free, vegan',
          packaging: 'Completely plastic-free paper carton',
          longevity: 'One block replaces ~3 bottles of 500ml liquid detergent',
          single_use_elimination: 'Eliminates plastic sponge microplastics and detergent bottles'
        })
      },
      {
        name: 'Nordic Wood Swedish Dishcloths (Set of 4)',
        slug: 'nordic-wood-swedish-dishcloths-4pack',
        description: 'Iconic Scandinavian cleaning cloths composed of 70% FSC-certified wood cellulose and 30% cotton. Absorbs 20x its weight in liquid, dries fast to prevent bacterial odors, and can be machine-washed 200+ times.',
        price: 15.00,
        category: 'Home Essentials',
        stock: 85,
        eco_score: 96,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '70% plant cellulose from sustainable forests, 30% cotton',
          organic_elements: '100% biodegradable and home-compostable in 6 weeks',
          packaging: 'Recycled paper sleeve',
          longevity: 'Replaces up to 17 rolls of paper towels per individual cloth',
          single_use_elimination: 'Dramatically cuts kitchen paper towel waste'
        })
      },
      {
        name: 'PureFlame Soy Wax Amber Aromatherapy Candle (280g)',
        slug: 'pureflame-soy-wax-amber-candle',
        description: 'Hand-poured 100% natural Midwest soy wax infused with pure cedarwood and lavender botanical essential oils. Finished with a lead-free unbleached cotton wick in a reusable apothecary amber glass jar with cork lid.',
        price: 26.00,
        category: 'Home Essentials',
        stock: 35,
        eco_score: 87,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: 'Renewable carbon-neutral soybean crop wax',
          organic_elements: 'Zero paraffin, petroleum derivatives, or phthalates',
          packaging: 'Recycled cardboard box, recyclable amber glass container',
          longevity: 'Clean, soot-free 55-hour slow burn time',
          single_use_elimination: 'Glass vessel reuses as bathroom organizer or spice jar'
        })
      },
      {
        name: 'SolGlow Terracotta Solar Table Lantern',
        slug: 'solglow-terracotta-solar-table-lantern',
        description: 'Warm ambient garden and indoor table light crafted with natural unglazed earthenware clay. Top-mounted high-efficiency solar panel charges a replaceable LiFePO4 battery providing 8 hours of soft golden 2700K illumination.',
        price: 45.00,
        category: 'Home Essentials',
        stock: 20,
        eco_score: 92,
        is_featured: 1,
        image_url: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: 'Natural earthen clay and recycled aluminum housing',
          organic_elements: 'Harnesses 100% renewable solar photons for lighting',
          packaging: 'Cardboard pulp cradle protection without styrofoam',
          longevity: 'Long-life LED elements rated for 50,000 continuous hours',
          single_use_elimination: 'Zero grid electricity or alkaline battery consumption'
        })
      },
      {
        name: 'EcoBreeze Organic Bamboo Viscose Bedding Sheet Set',
        slug: 'ecobreeze-organic-bamboo-bedding-sheet-set',
        description: 'Silky 400-thread count sateen Queen sheet set woven from 100% organically grown bamboo fiber. Closed-loop chemical recovery process reclaims 99% of processing water. Hypoallergenic and naturally temperature-regulating.',
        price: 89.00,
        category: 'Home Essentials',
        stock: 15,
        eco_score: 90,
        is_featured: 0,
        image_url: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80',
        eco_factors: JSON.stringify({
          recycled_content: '100% organically certified closed-loop bamboo lyocell',
          organic_elements: 'Requires 1/3 the water of conventional cotton to cultivate',
          packaging: 'Matching reusable fabric tote bag, zero plastic polybags',
          longevity: 'Double-hemmed seams resisting pilling and shrinkage',
          single_use_elimination: 'Free from chemical formaldehydes or toxic finishing agents'
        })
      }
    ];

    const insertProduct = db.prepare(`
      INSERT INTO products (
        name, slug, description, price, category, stock,
        eco_score, eco_factors, eco_disclaimer, image_url, is_featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const p of productsData) {
      insertProduct.run(
        p.name,
        p.slug,
        p.description,
        p.price,
        p.category,
        p.stock,
        p.eco_score,
        p.eco_factors,
        'Illustrative prototype score based on material composition, packaging, and lifecycle inputs. Not an independently certified environmental lifecycle verification.',
        p.image_url,
        p.is_featured
      );
    }

    console.log(`📦 Seeded ${productsData.length} eco-friendly products across all 4 categories.`);

    // 4. Seed Simulated Demonstration Orders
    const allProducts = db.prepare('SELECT id, name, price, eco_score FROM products ORDER BY id ASC;').all();

    const insertOrder = db.prepare(`
      INSERT INTO orders (
        order_number, user_id, total_amount, status,
        shipping_name, shipping_address, shipping_city, shipping_postal_code,
        shipping_country, payment_method, payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertOrderItem = db.prepare(`
      INSERT INTO order_items (
        order_id, product_id, product_name, unit_price, quantity, subtotal, eco_score
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    // Demo Order 1 for Jane Doe
    const prod1 = allProducts[0]; // HydroPure Flask ($34.99)
    const prod2 = allProducts[5]; // Verde Tote ($24.50)
    const order1Total = prod1.price * 1 + prod2.price * 2; // 34.99 + 49.00 = 83.99

    const order1 = insertOrder.run(
      'ORD-2026-8841',
      customer1.lastInsertRowid,
      order1Total,
      'delivered',
      'Jane Doe',
      '142 Green Meadow Way',
      'Portland',
      '97201',
      'United States',
      'simulated_card',
      'paid'
    );

    insertOrderItem.run(order1.lastInsertRowid, prod1.id, prod1.name, prod1.price, 1, prod1.price * 1, prod1.eco_score);
    insertOrderItem.run(order1.lastInsertRowid, prod2.id, prod2.name, prod2.price, 2, prod2.price * 2, prod2.eco_score);

    // Demo Order 2 for Marcus Green
    const prod3 = allProducts[10]; // Plantable Pencils ($14.99)
    const prod4 = allProducts[15]; // ZeroWaste Dish Kit ($18.50)
    const order2Total = prod3.price * 2 + prod4.price * 1; // 29.98 + 18.50 = 48.48

    const order2 = insertOrder.run(
      'ORD-2026-9214',
      customer2.lastInsertRowid,
      order2Total,
      'processing',
      'Marcus Green',
      '88 Sustainable Terrace',
      'Seattle',
      '98101',
      'United States',
      'simulated_card',
      'paid'
    );

    insertOrderItem.run(order2.lastInsertRowid, prod3.id, prod3.name, prod3.price, 2, prod3.price * 2, prod3.eco_score);
    insertOrderItem.run(order2.lastInsertRowid, prod4.id, prod4.name, prod4.price, 1, prod4.price * 1, prod4.eco_score);

    // Demo persistent cart items for Jane
    const insertCart = db.prepare(`
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (?, ?, ?)
    `);

    insertCart.run(customer1.lastInsertRowid, allProducts[2].id, 1); // Titanium canteen
    insertCart.run(customer1.lastInsertRowid, allProducts[11].id, 2); // Stone paper journal

    console.log(`🛍️ Seeded 2 simulated orders (with 4 line items) and 2 demo cart items.`);
  });

  console.log('✨ Database seeding successfully finished!');
  return { success: true };
}

// Allow direct execution: node src/database/seed.js
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    seedDatabase();
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  }
}
