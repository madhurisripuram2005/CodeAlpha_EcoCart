/**
 * EcoCart 120 Additional Sustainable Products Dataset
 * Target Distribution:
 * 1. Reusable Bottles & Drinkware: 15
 * 2. Sustainable Bags & Accessories: 15
 * 3. Eco-Friendly Stationery: 15
 * 4. Home & Kitchen Essentials: 20
 * 5. Personal Care & Reusable Products: 15
 * 6. Sustainable Fashion: 15
 * 7. Gardening & Outdoor Products: 15
 * 8. Travel & Lifestyle: 10
 * Total: 120 items
 * Prices in realistic INR (₹199 - ₹3,999)
 */

export const newProducts120 = [
  // =========================================================================
  // 1. Reusable Bottles & Drinkware (15 products)
  // =========================================================================
  {
    name: 'PureCopper Hand-Hammered Ayurvedic Bottle (900ml)',
    slug: 'purecopper-hand-hammered-ayurvedic-bottle-900ml',
    description: '100% pure certified copper water vessel crafted by traditional artisans. Natural antimicrobial properties enrich drinking water according to ancient Ayurvedic wellness traditions.',
    price: 1299,
    category: 'Reusable Bottles & Drinkware',
    stock: 55,
    eco_score: 96,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% infinitely recyclable virgin and repurposed copper',
      organic_elements: 'Natural unlacquered patina interior',
      packaging: 'Plastic-free recycled handmade cotton rag box',
      longevity: 'Lifetime heirloom grade vessel (25+ years)',
      single_use_elimination: 'Eliminates ~2,200 PET bottles over lifetime'
    }
  },
  {
    name: 'AeroFlask Ultralight Titanium Thermal Tumbler (500ml)',
    slug: 'aeroflask-ultralight-titanium-thermal-tumbler-500ml',
    description: 'Grade 1 aerospace titanium travel mug with vacuum insulation. Weighs under 180 grams with zero metallic taste and extreme drop resistance.',
    price: 2499,
    category: 'Reusable Bottles & Drinkware',
    stock: 32,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Zero plastic liner; 99.4% pure titanium alloy',
      organic_elements: 'Silicone food-grade removable seal ring',
      packaging: 'Zero-bleach unprinted corrugated craft shell',
      longevity: 'Virtually indestructible; 15+ years lifespan',
      single_use_elimination: 'Replaces ~1,800 disposable paper takeaway cups'
    }
  },
  {
    name: 'ZenBrew Double-Wall Borosilicate Tea Infuser Bottle',
    slug: 'zenbrew-double-wall-borosilicate-tea-infuser-bottle',
    description: 'Thermal shock resistant borosilicate glass with a 304 stainless steel detachable steeping basket and natural bamboo twist cap.',
    price: 999,
    category: 'Reusable Bottles & Drinkware',
    stock: 40,
    eco_score: 92,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Lead-free laboratory grade borosilicate glass',
      organic_elements: 'Sustainably harvested bamboo outer cap',
      packaging: 'Molded bagasse pulp protective sleeve',
      longevity: '6+ years with replaceable silicone gaskets',
      single_use_elimination: 'Replaces ~1,000 single-use plastic bottled teas'
    }
  },
  {
    name: 'TerraGrip Ceramic-Lined Insulated Travel Mug (380ml)',
    slug: 'terragrip-ceramic-lined-insulated-travel-mug-380ml',
    description: 'Combines the heat retention of double-wall stainless steel with a smooth German ceramic interior coating that preserves delicate espresso flavors.',
    price: 1199,
    category: 'Reusable Bottles & Drinkware',
    stock: 48,
    eco_score: 91,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '80% recycled 304 food-grade stainless steel',
      organic_elements: 'Mineral ceramic interior baked without PTFE/PFOA',
      packaging: 'Compostable unbleached cardboard box',
      longevity: 'Designed for 7+ years of daily commute use',
      single_use_elimination: 'Saves ~750 disposable coffee cups annually'
    }
  },
  {
    name: 'EcoFlex Collapsible Silicone Pocket Cup (350ml)',
    slug: 'ecoflex-collapsible-silicone-pocket-cup-350ml',
    description: 'Folds flat down to 1.5 inches to slide into pockets or daypacks. LFGB-certified European food silicone with an insulated heat sleeve.',
    price: 499,
    category: 'Reusable Bottles & Drinkware',
    stock: 65,
    eco_score: 89,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Post-consumer recycled polypropylene collar',
      organic_elements: 'BPA-free platinum cured non-porous silicone',
      packaging: 'Minimal paper card wrap printed with algae ink',
      longevity: 'Rated for over 5,000 fold cycles (5+ years)',
      single_use_elimination: 'Eliminates 500+ wax-lined disposable paper cups'
    }
  },
  {
    name: 'GlacierTrail Wide-Mouth Chug Canteen (1000ml)',
    slug: 'glaciertrail-wide-mouth-chug-canteen-1000ml',
    description: 'Heavy-duty 1-liter trail flask with powder-coated anti-scratch exterior and paracord carrying strap for backcountry hydration.',
    price: 1499,
    category: 'Reusable Bottles & Drinkware',
    stock: 38,
    eco_score: 93,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '90% recycled food-grade 18/8 stainless steel',
      organic_elements: 'Natural rubber leak-proof seal ring',
      packaging: '100% FSC-certified unvarnished cardboard',
      longevity: '10+ years rugged outdoor expedition resilience',
      single_use_elimination: 'Eliminates over 3,000 plastic water bottles'
    }
  },
  {
    name: 'Heritage Clay Terracotta Water Carafe with Tumbler (1200ml)',
    slug: 'heritage-clay-terracotta-water-carafe-with-tumbler-1200ml',
    description: 'Traditional unglazed natural earthenware carafe that cools drinking water naturally through gentle micro-porous evaporative cooling.',
    price: 699,
    category: 'Reusable Bottles & Drinkware',
    stock: 28,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural locally mined non-toxic riverbed clay',
      organic_elements: 'Unglazed, chemical-free and zero microplastics',
      packaging: 'Recycled corrugated shock packaging wrapped in jute',
      longevity: 'Naturally biodegradable at end of life with zero microplastics',
      single_use_elimination: 'Replaces electric refrigeration and PET bottles'
    }
  },
  {
    name: 'Solari Stainless Steel Straw & Tumbler Set (Pack of 4)',
    slug: 'solari-stainless-steel-straw-and-tumbler-set-pack-of-4',
    description: 'Set of four stackable satin-finish stainless steel drinking tumblers with curved metal straws and natural sisal cleaning brushes.',
    price: 799,
    category: 'Reusable Bottles & Drinkware',
    stock: 50,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% 304 food-grade rustproof stainless steel',
      organic_elements: 'Plant-based sisal fiber cleaning bristle brush',
      packaging: 'GOTS-certified unbleached cotton drawstring pouch',
      longevity: 'Indefinite reusable service life (15+ years)',
      single_use_elimination: 'Prevents ~4,000 single-use plastic straws and cups'
    }
  },
  {
    name: 'BambooShield Sport Hydro Bottle with Flip Spout (650ml)',
    slug: 'bambooshield-sport-hydro-bottle-with-flip-spout-650ml',
    description: 'Ergonomic fitness bottle featuring a rapid-flow flip straw spout and a protective outer bamboo fiber wrap providing slip-free gym grip.',
    price: 899,
    category: 'Reusable Bottles & Drinkware',
    stock: 44,
    eco_score: 90,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '75% recycled stainless steel body',
      organic_elements: 'Renewable moso bamboo exterior composite',
      packaging: 'Recycled paper cylinder tube',
      longevity: 'Built for 6+ years daily athletics and commuting',
      single_use_elimination: 'Diverts ~1,200 single-use sports beverage bottles'
    }
  },
  {
    name: 'Nordic Minimalist Stoneware Teapot with Wood Handle (800ml)',
    slug: 'nordic-minimalist-stoneware-teapot-with-wood-handle-800ml',
    description: 'Handcrafted matte finish ceramic teapot with heat-resistant ash wood overhead handle and precision drip-free pour spout.',
    price: 1899,
    category: 'Reusable Bottles & Drinkware',
    stock: 22,
    eco_score: 93,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Natural earthen clay fired in low-emission kilns',
      organic_elements: 'Sustainably sourced ash wood handle with beeswax seal',
      packaging: 'Cornstarch bioplastic foam and kraft outer carton',
      longevity: 'High durability heirloom ceramics (15+ years)',
      single_use_elimination: 'Eliminates plastic-sealed instant tea sachets'
    }
  },
  {
    name: 'Veloce Bike Cage Vacuum Bottle with Push Valve (600ml)',
    slug: 'veloce-bike-cage-vacuum-bottle-with-push-valve-600ml',
    description: 'Designed specifically to snap into standard bicycle bottle cages. Keeps electrolyte drinks ice cold for 18 hours during intense endurance rides.',
    price: 1099,
    category: 'Reusable Bottles & Drinkware',
    stock: 35,
    eco_score: 91,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '85% recycled stainless steel dual wall',
      organic_elements: 'Silicone mouth nozzle; 100% BPA/BPS free',
      packaging: 'Kraft hangtag printed with soy-based inks',
      longevity: 'Engineered for 8+ years of cycling vibrations',
      single_use_elimination: 'Replaces ~900 single-use sports drink bottles'
    }
  },
  {
    name: 'PureInfuse Crystal Quartz Wellness Bottle (550ml)',
    slug: 'pureinfuse-crystal-quartz-wellness-bottle-550ml',
    description: 'Double-walled glass canteen with an enclosed chamber housing natural raw rose quartz and amethyst stones, keeping water charged and cold.',
    price: 1699,
    category: 'Reusable Bottles & Drinkware',
    stock: 25,
    eco_score: 88,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'High-purity borosilicate lead-free glass',
      organic_elements: 'Ethically mined natural uncut raw gemstones',
      packaging: 'Velvet-lined recycled rigid paper cylinder box',
      longevity: 'Designed for mindful long-term daily use (6+ years)',
      single_use_elimination: 'Diverts ~1,100 plastic wellness water bottles'
    }
  },
  {
    name: 'Kanteen Slim Double-Seal Shaker with Whisk Ball (700ml)',
    slug: 'kanteen-slim-double-seal-shaker-with-whisk-ball-700ml',
    description: 'Odorless non-staining stainless steel protein shaker cup with electropolished interior, leak-tight screw cap, and surgical steel agitator ball.',
    price: 1149,
    category: 'Reusable Bottles & Drinkware',
    stock: 42,
    eco_score: 92,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% food grade non-porous 18/8 stainless steel',
      organic_elements: 'Natural silicone leak prevention gasket',
      packaging: '100% post-consumer cardboard container',
      longevity: 'Will not crack or retain odors like plastic shakers (7+ years)',
      single_use_elimination: 'Replaces cheap brittle plastic gym shaker bottles'
    }
  },
  {
    name: 'Alpine Thermal Food Flask with Folding Spoon (500ml)',
    slug: 'alpine-thermal-food-flask-with-folding-spoon-500ml',
    description: 'Insulated wide-mouth soup and stew container that keeps meals steaming hot for 10 hours. Includes a magnetized folding stainless steel spoon inside cap.',
    price: 1399,
    category: 'Reusable Bottles & Drinkware',
    stock: 30,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '88% recycled stainless steel construction',
      organic_elements: 'Toxin-free silicone vacuum pressure release button',
      packaging: 'Recycled corrugated cardboard without plastic film',
      longevity: 'Engineered for 10+ years office and outdoor lunch usage',
      single_use_elimination: 'Eliminates hundreds of single-use takeout containers'
    }
  },
  {
    name: 'Artisan Brass Chai Tumbler Set with Serving Tray (Set of 2)',
    slug: 'artisan-brass-chai-tumbler-set-with-serving-tray-set-of-2',
    description: 'Traditional solid brass handcrafted Indian cutting chai glasses with tin lining (kalai) and matching engraved brass holding saucer.',
    price: 1599,
    category: 'Reusable Bottles & Drinkware',
    stock: 20,
    eco_score: 97,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Virgin brass and reclaimed metal alloy casting',
      organic_elements: 'Pure food-safe tin lining applied by hand',
      packaging: 'Handmade lokta paper box tied with jute twine',
      longevity: 'Multigenerational heirloom quality (50+ years)',
      single_use_elimination: 'Replaces thousands of roadside disposable paper/plastic cups'
    }
  },

  // =========================================================================
  // 2. Sustainable Bags & Accessories (15 products)
  // =========================================================================
  {
    name: 'TerraJute Structured Market Shopper with Leather Handles',
    slug: 'terrajute-structured-market-shopper-with-leather-handles',
    description: 'High-density golden jute fiber tote with plant-tanned eco-leather handles and reinforced water-resistant plant-laminated interior lining.',
    price: 799,
    category: 'Sustainable Bags & Accessories',
    stock: 60,
    eco_score: 95,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural biodegradable golden jute fiber',
      organic_elements: 'Vegetable-tanned chemical-free leather straps',
      packaging: 'Zero packaging; recycled paper brand loop',
      longevity: 'Reinforced stress points rated for 15kg load (5+ years)',
      single_use_elimination: 'Replaces ~800 single-use plastic grocery bags'
    }
  },
  {
    name: 'Korku Vegan Cork Crossbody Saddle Bag',
    slug: 'korku-vegan-cork-crossbody-saddle-bag',
    description: 'Waterproof, velvety soft cork oak bark harvested without cutting down trees in Portugal. Features antique brass hardware and organic cotton lining.',
    price: 2199,
    category: 'Sustainable Bags & Accessories',
    stock: 26,
    eco_score: 96,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'FSC-certified renewable Portuguese cork fabric',
      organic_elements: 'GOTS organic cotton canvas inner lining',
      packaging: 'Compostable cassava-starch mailer bag',
      longevity: 'Naturally stain-resistant and supple for 8+ years',
      single_use_elimination: 'Cruelty-free alternative to petroleum-derived pleather'
    }
  },
  {
    name: 'Upcycled Denim Heritage Commuter Backpack (22L)',
    slug: 'upcycled-denim-heritage-commuter-backpack-22l',
    description: 'Handcrafted from post-consumer discarded denim jeans collected from landfills. Padded 15-inch laptop sleeve and reclaimed seatbelt shoulder straps.',
    price: 2699,
    category: 'Sustainable Bags & Accessories',
    stock: 24,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Diverts 3 pairs of denim jeans and scrap seatbelts',
      organic_elements: 'Unbleached natural cotton inner reinforcements',
      packaging: 'Shipped in recycled newspaper parcel wrap',
      longevity: 'Heavyweight double-stitched denim durable for 10+ years',
      single_use_elimination: 'Saves 4,500 liters of water vs manufacturing new denim'
    }
  },
  {
    name: 'HempCraft Padded Laptop Sleeve (13-14 Inch)',
    slug: 'hempcraft-padded-laptop-sleeve-13-14-inch',
    description: 'Ultra-tough natural industrial hemp canvas exterior with shock-absorbing recycled felt padding and durable YKK metal zipper.',
    price: 999,
    category: 'Sustainable Bags & Accessories',
    stock: 45,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Recycled post-consumer PET fleece padding',
      organic_elements: '100% pesticide-free wild Himalayan hemp fiber',
      packaging: 'Cardboard sleeve with cotton cord loop',
      longevity: 'Hemp fibers strengthen with age and washing (6+ years)',
      single_use_elimination: 'Replaces synthetic petroleum foam neoprene sleeves'
    }
  },
  {
    name: 'EcoMesh Organic Cotton Produce Pouches (Set of 6)',
    slug: 'ecomesh-organic-cotton-produce-pouches-set-of-6',
    description: 'Color-coded breathable mesh drawstring bags with tare weight tags stitched on. Ideal for farmer market fruits, vegetables, and bulk grains.',
    price: 499,
    category: 'Sustainable Bags & Accessories',
    stock: 75,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Zero plastic; 100% GOTS unbleached cotton',
      organic_elements: 'Natural wooden cinch beads on cotton cord',
      packaging: 'Zero packaging; bound with a seed-paper band',
      longevity: 'Machine washable, reusable for 500+ grocery trips',
      single_use_elimination: 'Diverts ~600 single-use plastic produce bags annually'
    }
  },
  {
    name: 'Piñatex Pineapple Leather Bifold Minimalist Wallet',
    slug: 'pinatex-pineapple-leather-bifold-minimalist-wallet',
    description: 'Made from agricultural byproduct pineapple leaf fibers. Slim RFID-blocking profile with 6 card slots and full currency compartment.',
    price: 1499,
    category: 'Sustainable Bags & Accessories',
    stock: 35,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Harvested from pineapple waste farming residues',
      organic_elements: 'No additional land, water, or fertilizer required',
      packaging: 'Recycled kraft gift envelope with wax seal',
      longevity: 'Water-resistant and tensile for 6+ years',
      single_use_elimination: 'Replaces resource-intensive animal leather'
    }
  },
  {
    name: 'Khadi Canvas Overnight Weekender Duffle (35L)',
    slug: 'khadi-canvas-overnight-weekender-duffle-35l',
    description: 'Heavyweight hand-spun cotton canvas duffle bag with antique brass rivets, detachable shoulder strap, and internal zippered passport pouch.',
    price: 2899,
    category: 'Sustainable Bags & Accessories',
    stock: 18,
    eco_score: 96,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Handloomed khadi cotton supporting rural artisan weavers',
      organic_elements: 'Plant dyes extracted from pomegranate rinds and indigo',
      packaging: 'Reusable cotton laundry pouch wrapper',
      longevity: 'Heavy-gauge canvas engineered for 12+ years of travel',
      single_use_elimination: 'Zero polyester or nylon synthetic microfibers'
    }
  },
  {
    name: 'SariCraft Upcycled Silk Patchwork Tote Bag',
    slug: 'saricraft-upcycled-silk-patchwork-tote-bag',
    description: 'Vibrant, one-of-a-kind reversible shopping tote sewn from vintage repurposed silk saris by women artisan cooperatives in Rajasthan.',
    price: 649,
    category: 'Sustainable Bags & Accessories',
    stock: 50,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% upcycled vintage silk textile remnants',
      organic_elements: 'Double-layered quilted kantha stitching for strength',
      packaging: 'Biodegradable handmade paper tag',
      longevity: 'Washable and durable for 5+ years everyday carry',
      single_use_elimination: 'Diverts textile waste from Indian municipal landfills'
    }
  },
  {
    name: 'UrbanCommute Recycled Ocean Plastic Messenger Bag',
    slug: 'urbancommute-recycled-ocean-plastic-messenger-bag',
    description: 'Weatherproof cross-body messenger crafted from 16 intercepted ocean-bound plastic bottles. Includes padded tablet sleeve and magnetic fidlock buckle.',
    price: 1999,
    category: 'Sustainable Bags & Accessories',
    stock: 30,
    eco_score: 92,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% rPET certified post-consumer ocean plastic',
      organic_elements: 'Water-based PFC-free water repellent coating',
      packaging: 'Recycled poly-mailer made from industrial waste',
      longevity: 'Heavy-duty ripstop weave rated for 8+ years',
      single_use_elimination: 'Directly cleans coastal waterways of plastic debris'
    }
  },
  {
    name: 'Cocomat Coconut Fiber Sunglass Protective Case',
    slug: 'cocomat-coconut-fiber-sunglass-protective-case',
    description: 'Rigid protective eyewear case molded from compressed natural coconut coir and natural tree rubber resin. Includes microfiber cleaning cloth.',
    price: 449,
    category: 'Sustainable Bags & Accessories',
    stock: 55,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Agricultural coconut processing byproduct',
      organic_elements: 'Natural latex binder; zero petrochemical resin',
      packaging: 'Recycled card sleeve with soy printing',
      longevity: 'Crush-resistant protective shell (6+ years)',
      single_use_elimination: 'Replaces brittle plastic snap cases'
    }
  },
  {
    name: 'BioFold Tyvek Tear-Proof Expandable Passport Wallet',
    slug: 'biofold-tyvek-tear-proof-expandable-passport-wallet',
    description: 'Ultralight waterproof travel document organizer crafted from 100% recyclable flash-spun high-density polyethylene fibers.',
    price: 599,
    category: 'Sustainable Bags & Accessories',
    stock: 40,
    eco_score: 88,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% recyclable closed-loop polymer material',
      organic_elements: 'Non-toxic, chemical-resistant construction',
      packaging: 'Recycled envelope pouch',
      longevity: 'Untearable fibers endure 5+ years of rough handling',
      single_use_elimination: 'Zero animal byproducts or toxic tanning baths'
    }
  },
  {
    name: 'Wanderer Organic Cotton Waxed Roll-Top Backpack (25L)',
    slug: 'wanderer-organic-cotton-waxed-roll-top-backpack-25l',
    description: 'All-weather adventure pack made from heavy 16oz organic cotton duck canvas treated with paraffin-free beeswax water-repellent wax.',
    price: 3499,
    category: 'Sustainable Bags & Accessories',
    stock: 15,
    eco_score: 95,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'GOTS certified organic cotton duck canvas',
      organic_elements: 'Natural local beeswax and pine rosin water-resistant coating',
      packaging: 'Organic cotton dust bag that doubles as a grocery tote',
      longevity: 'Easily re-waxable for decades of outdoor exploration',
      single_use_elimination: '100% microplastic-free natural fiber construction'
    }
  },
  {
    name: 'EcoSling Compact Hemp Hip Pack & Crossbody',
    slug: 'ecosling-compact-hemp-hip-pack-and-crossbody',
    description: 'Hands-free waist and shoulder sling for city exploration. Dual zippered compartments with internal key tether and breathable mesh back.',
    price: 899,
    category: 'Sustainable Bags & Accessories',
    stock: 42,
    eco_score: 93,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '70% pure Himalayan hemp blended with 30% organic cotton',
      organic_elements: 'Natural untreated fibers with zero formaldehyde wash',
      packaging: 'Cardboard hangtag tied with natural cord',
      longevity: 'Double-needle flat-felled seam construction (7+ years)',
      single_use_elimination: 'Zero toxic PVC or synthetic petroleum backing'
    }
  },
  {
    name: 'TerraCord Braided Reusable Lunch Carrier Bag',
    slug: 'terracord-braided-reusable-lunch-carrier-bag',
    description: 'Chic macrame braided lunch bag made from unbleached cotton rope with a sturdy wooden bottom base to keep tiffin boxes upright.',
    price: 549,
    category: 'Sustainable Bags & Accessories',
    stock: 48,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural uncombed cotton rope',
      organic_elements: 'Reclaimed teak wood base offcuts',
      packaging: 'Biodegradable kraft paper sleeve',
      longevity: 'Hand-washable and resilient for 6+ years',
      single_use_elimination: 'Eliminates disposable plastic lunch bags'
    }
  },
  {
    name: 'CanvasCraft Foldable Pocket Shopping Bag with Clip (Pack of 3)',
    slug: 'canvascraft-foldable-pocket-shopping-bag-with-clip-pack-of-3',
    description: 'Packs into an attached 3-inch pouch with carabiner clip. Sturdy ripstop organic cotton carrying up to 18kg of groceries with ease.',
    price: 699,
    category: 'Sustainable Bags & Accessories',
    stock: 65,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% certified organic cotton lightweight ripstop',
      organic_elements: 'Lead-free non-toxic water-based color dyes',
      packaging: 'Seed paper band that sprouts basil when planted',
      longevity: 'Over 1,000 grocery store shopping trips per bag',
      single_use_elimination: 'Diverts ~1,500 polyethylene supermarket bags'
    }
  },

  // =========================================================================
  // 3. Eco-Friendly Stationery (15 products)
  // =========================================================================
  {
    name: 'SproutSeeds Plantable Wildflower Seed Pencils (Set of 10)',
    slug: 'sproutseeds-plantable-wildflower-seed-pencils-set-of-10',
    description: 'Graphite pencils made from recycled newspaper with biodegradable seed capsules containing marigold, basil, tomato, and daisy seeds in the end.',
    price: 349,
    category: 'Eco-Friendly Stationery',
    stock: 80,
    eco_score: 98,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1585336261026-418071839957?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Zero wood; 100% recycled newsprint paper barrels',
      organic_elements: 'Non-GMO untreated heirloom seed capsules',
      packaging: '100% recycled paperboard sliding box',
      longevity: 'Transforms into living flowers and herbs when stub is planted',
      single_use_elimination: 'Replaces virgin cedar wood logging for stationery'
    }
  },
  {
    name: 'HathiHeritage Elephant Dung Recycled Hardcover Journal (A5)',
    slug: 'hathiheritage-elephant-dung-recycled-hardcover-journal-a5',
    description: 'Handmade acid-free paper crafted from elephant dung and recycled cotton rags. 100% odor-free, luxurious textured 120gsm unruled sketch pages.',
    price: 599,
    category: 'Eco-Friendly Stationery',
    stock: 45,
    eco_score: 99,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% elephant fiber sanitized through natural boiling',
      organic_elements: 'Cotton rag fibers; zero bleach, acids, or chemicals',
      packaging: 'Recycled paper belly-band',
      longevity: 'Archival quality paper preserves sketches for 100+ years',
      single_use_elimination: 'Zero trees felled; supports wildlife conservation'
    }
  },
  {
    name: 'BambooCraft Refillable Rollerball Pen with Brass Piston',
    slug: 'bamboocraft-refillable-rollerball-pen-with-brass-piston',
    description: 'Turned moso bamboo body with knurled brass grip and standard international ink cartridge converter. Smooth German 0.5mm ceramic rollerball tip.',
    price: 699,
    category: 'Eco-Friendly Stationery',
    stock: 35,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Machined solid brass inner mechanism',
      organic_elements: 'FSC-certified renewable natural bamboo casing',
      packaging: 'Recycled kraft sliding box with molded paper tray',
      longevity: 'Refillable indefinitely from bottled ink (15+ years)',
      single_use_elimination: 'Eliminates thousands of disposable plastic ballpoint pens'
    }
  },
  {
    name: 'TerraNotes Stone Paper Waterproof Spiral Notebook (160 Pages)',
    slug: 'terranotes-stone-paper-waterproof-spiral-notebook-160-pages',
    description: 'Made from repurposed limestone quarry waste and non-toxic resin. Silk-smooth, completely tear-proof, bleed-proof, and waterproof writing paper.',
    price: 499,
    category: 'Eco-Friendly Stationery',
    stock: 50,
    eco_score: 93,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '80% calcium carbonate limestone quarry tailings',
      organic_elements: 'Manufactured without water, acid, bleach, or trees',
      packaging: 'Minimal paper label band',
      longevity: 'Impervious to rain, coffee spills, and heavy wear (10+ years)',
      single_use_elimination: 'Saves 2,000 liters of fresh water per notebook'
    }
  },
  {
    name: 'Cocodesk Minimalist Coconut Shell Desk Organizer Set',
    slug: 'cocodesk-minimalist-coconut-shell-desk-organizer-set',
    description: 'Set of 3 hand-carved coconut shell bowls polished with cold-pressed coconut oil. Perfect for holding paperclips, pens, coins, and keys.',
    price: 549,
    category: 'Eco-Friendly Stationery',
    stock: 38,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Upcycled discarded agricultural coconut shells',
      organic_elements: 'Finished purely with edible virgin coconut oil',
      packaging: 'Recycled shredded kraft nest inside a carton',
      longevity: 'Naturally resilient hardwood-like shell (10+ years)',
      single_use_elimination: 'Replaces injection-molded acrylic plastic desk trays'
    }
  },
  {
    name: 'NeemWood Ergonomic 30cm Drafting Ruler with Brass Inlay',
    slug: 'neemwood-ergonomic-30cm-drafting-ruler-with-brass-inlay',
    description: 'Solid antibacterial Indian neem wood ruler featuring metric and imperial scales precision laser-etched alongside a polished brass drawing edge.',
    price: 299,
    category: 'Eco-Friendly Stationery',
    stock: 60,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585336261026-418071839957?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Solid certified sustainably pruned neem timber',
      organic_elements: 'Natural linseed oil finish with zero toxic varnishes',
      packaging: 'Parchment paper sleeve',
      longevity: 'Will never shatter or warp like plastic rulers (15+ years)',
      single_use_elimination: '100% biodegradable timber alternative to acrylic'
    }
  },
  {
    name: 'LoktaScript Himalayan Handcrafted Envelopes & Letterhead (20 Pack)',
    slug: 'loktascript-himalayan-handcrafted-envelopes-and-letterhead-20-pack',
    description: 'Ethically made from the regenerative bark of the high-altitude Lokta bush. Naturally resistant to humidity, silverfish, and paper decay.',
    price: 449,
    category: 'Eco-Friendly Stationery',
    stock: 40,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Lokta bush regenerates within 5 years of harvest',
      organic_elements: 'Dried naturally under Himalayan mountain sunshine',
      packaging: 'Bound in wild hemp twine with botanical pressed flower',
      longevity: 'Historical Lokta documents endure over 1,000 years',
      single_use_elimination: 'Empowers rural Himalayan cottage cooperatives'
    }
  },
  {
    name: 'VerdeInk Vegan Non-Toxic Calligraphy Drawing Ink (60ml)',
    slug: 'verdeink-vegan-non-toxic-calligraphy-drawing-ink-60ml',
    description: 'Deep carbon-black archival calligraphy ink made from soot and natural plant gum arabic. Contains zero shellac or toxic heavy metals.',
    price: 399,
    category: 'Eco-Friendly Stationery',
    stock: 35,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Recycled clear amber glass dropper bottle with cork cap',
      organic_elements: 'Plant-derived acacia gum arabic binder',
      packaging: '100% recycled craft cylinder packaging',
      longevity: 'Lightfast archival formulation remains bold for decades',
      single_use_elimination: 'Diverts disposable plastic ink cartridges'
    }
  },
  {
    name: 'ScribePocket Recycled Leather Refillable Field Journal (A6)',
    slug: 'scribepocket-recycled-leather-refillable-field-journal-a6',
    description: 'Compact pocket notebook bound in bonded recycled leather offcuts. Elastic band closure, back storage accordion pocket, and 80-page dotted refill.',
    price: 649,
    category: 'Eco-Friendly Stationery',
    stock: 48,
    eco_score: 92,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% post-industrial repurposed leather shavings',
      organic_elements: 'FSC-certified chlorine-free recycled inner paper',
      packaging: 'Kraft envelope wrap with soy ink graphics',
      longevity: 'Refillable notebook cover designed for 10+ years',
      single_use_elimination: 'Prevents discarding entire notebook covers'
    }
  },
  {
    name: 'BloomTape Biodegradable Kraft Paper Packaging Tape (50m)',
    slug: 'bloomtape-biodegradable-kraft-paper-packaging-tape-50m',
    description: 'Water-activated heavy-duty fiberglass-reinforced gummed paper tape. Creates a tamper-evident, 100% recyclable bond on parcel boxes.',
    price: 299,
    category: 'Eco-Friendly Stationery',
    stock: 70,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585336261026-418071839957?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Natural unbleached kraft paper with potato starch adhesive',
      organic_elements: 'Solvent-free water-activated cornstarch glue',
      packaging: 'No shrink wrap; packed in recycled paper sleeve',
      longevity: 'High tensile strength seal withstands up to 25kg parcels',
      single_use_elimination: 'Replaces miles of non-recyclable plastic BOPP tape'
    }
  },
  {
    name: 'EcoStitch Hand-Sewn Organic Cotton Pencil Case',
    slug: 'ecostitch-hand-sewn-organic-cotton-pencil-case',
    description: 'Flat-bottom zippered pouch crafted from heavy 12oz unbleached organic cotton canvas with antique brass zipper and woven pull tab.',
    price: 349,
    category: 'Eco-Friendly Stationery',
    stock: 52,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% GOTS certified chemical-free organic cotton',
      organic_elements: 'Dyed using natural myrobalan and madder root extracts',
      packaging: 'Recycled card stock hangtag',
      longevity: 'Machine washable and sturdy for 8+ years',
      single_use_elimination: 'Zero toxic PVC or vinyl plastic materials'
    }
  },
  {
    name: 'CharcoalPure Compressed Willow Sketching Charcoal Set',
    slug: 'charcoalpure-compressed-willow-sketching-charcoal-set',
    description: 'Assorted artist sticks crafted by slow-baking sustainably pruned willow twigs in sealed oxygen-free kiln ovens. Rich, velvety, blendable blacks.',
    price: 249,
    category: 'Eco-Friendly Stationery',
    stock: 40,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% sustainable willow coppice cuttings',
      organic_elements: 'Completely unadulterated pure carbon willow',
      packaging: 'Slide-top recyclable tin box',
      longevity: 'Zero synthetic binders or chemical petro-dyes',
      single_use_elimination: 'Fully natural, compostable art medium'
    }
  },
  {
    name: 'TerraStamp Wooden Rubber Date Stamp with Soy Ink Pad',
    slug: 'terrastamp-wooden-rubber-date-stamp-with-soy-ink-pad',
    description: 'Vintage-style adjustable date stamper crafted from reclaimed beechwood and natural vulcanized rubber. Includes refillable non-toxic black felt ink pad.',
    price: 499,
    category: 'Eco-Friendly Stationery',
    stock: 30,
    eco_score: 93,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Reclaimed workshop beechwood offcuts',
      organic_elements: 'Natural tree-tapped rubber embossing head',
      packaging: 'Kraft cardboard display box',
      longevity: 'Mechanically tested for over 25,000 clean impressions',
      single_use_elimination: 'Replaces plastic self-inking disposable stampers'
    }
  },
  {
    name: 'Plantable Seed Paper Sticky Notes (Set of 3 Pads)',
    slug: 'plantable-seed-paper-sticky-notes-set-of-3-pads',
    description: 'Repositionable adhesive memo notes embedded with butterfly-friendly wildflower seeds. Features water-based solvent-free adhesive backing.',
    price: 399,
    category: 'Eco-Friendly Stationery',
    stock: 65,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585336261026-418071839957?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% post-consumer cotton rag and scrap paper',
      organic_elements: 'Seeds: Sweet Alyssum, Cornflower, and Black-Eyed Susan',
      packaging: 'Compostable glassine envelope',
      longevity: 'Notes sprout into real flowers within 7-14 days of planting',
      single_use_elimination: 'Zero toxic synthetic glue residues'
    }
  },
  {
    name: 'Artisan Solid Copper Paperweight & Pen Rest',
    slug: 'artisan-solid-copper-paperweight-and-pen-rest',
    description: 'Substantial 350g forged solid copper desk sculpture with precision-milled dual grooves to cradle fountain pens and prevent drafting scrolls from curling.',
    price: 899,
    category: 'Eco-Friendly Stationery',
    stock: 25,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% repurposed plumbing and electrical grade copper',
      organic_elements: 'Raw brushed copper develops natural living patina',
      packaging: 'Recycled wood wool nest inside a cardboard gift box',
      longevity: 'Permanent desk heirloom (100+ years lifespan)',
      single_use_elimination: 'Zero plastic resin or synthetic paperweights'
    }
  },

  // =========================================================================
  // 4. Home & Kitchen Essentials (20 products)
  // =========================================================================
  {
    name: 'BeePure Organic Beeswax Food Storage Wraps (Pack of 5)',
    slug: 'beepure-organic-beeswax-food-storage-wraps-pack-of-5',
    description: 'Natural alternative to plastic cling wrap. GOTS organic cotton infused with pure golden beeswax, jojoba oil, and sustainably harvested tree dammar rosin.',
    price: 699,
    category: 'Home & Kitchen Essentials',
    stock: 70,
    eco_score: 97,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% organic cotton and ethically harvested beeswax',
      organic_elements: 'Naturally antibacterial jojoba oil preserves produce freshness',
      packaging: 'Recycled paper envelope packaging with wax seal',
      longevity: 'Wash with cold water; re-waxable and lasts 150+ uses',
      single_use_elimination: 'Diverts over 100 meters of PVC cling wrap per wrap'
    }
  },
  {
    name: 'CastHeritage Pre-Seasoned Heavy Dutch Oven with Lid (4.5L)',
    slug: 'castheritage-pre-seasoned-heavy-dutch-oven-with-lid-4.5l',
    description: 'Heirloom cast iron casserole pot seasoned with 100% cold-pressed organic flaxseed oil. Superior heat retention with zero Teflon/PFOA nonstick chemicals.',
    price: 2799,
    category: 'Home & Kitchen Essentials',
    stock: 22,
    eco_score: 98,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1584990347449-399042b03730?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% recycled scrap iron cast in high-temp electric kilns',
      organic_elements: 'Chemical-free seasoning using pure edible flaxseed oil',
      packaging: 'Sturdy recycled corrugated box with paper honeycomb padding',
      longevity: 'Multi-generational lifetime performance (50+ years)',
      single_use_elimination: 'Eliminates disposable aluminum foil and flaky non-stick pans'
    }
  },
  {
    name: 'CocoScrub Natural Coconut Coir Dish Scrubber Pads (Pack of 6)',
    slug: 'cocoscrub-natural-coconut-coir-dish-scrubber-pads-pack-of-6',
    description: 'Tough, grease-cutting kitchen cleaning sponges bound with natural tree rubber. Won’t scratch delicate cookware and naturally resists mildew odors.',
    price: 299,
    category: 'Home & Kitchen Essentials',
    stock: 85,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Repurposed agricultural coconut husk fiber',
      organic_elements: 'Natural sap rubber binder; zero synthetic polyurethane',
      packaging: '100% compostable paper belly band',
      longevity: 'Each pad endures 6-8 weeks of heavy scrubbing',
      single_use_elimination: 'Replaces microplastic-shedding green polyester sponges'
    }
  },
  {
    name: 'BambooMaster Slotted & Solid Kitchen Cooking Utensil Set (6 Pcs)',
    slug: 'bamboomaster-slotted-and-solid-kitchen-cooking-utensil-set-6-pcs',
    description: 'Hand-carved organic moso bamboo spatula, risotto spoon, slotted turner, salad fork, and tongs. Heat-safe, smooth finish, and gentle on cookware.',
    price: 649,
    category: 'Home & Kitchen Essentials',
    stock: 55,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% sustainably harvested organic timber bamboo',
      organic_elements: 'Polished with natural food-grade walnut oil',
      packaging: 'Unbleached cardboard gift box with twine tie',
      longevity: 'Will not crack or leach toxins when heated (8+ years)',
      single_use_elimination: 'Replaces toxic black plastic nylon cooking spoons'
    }
  },
  {
    name: 'TerraClay Traditional Hand-Thrown Unglazed Curd Pot (1.5L)',
    slug: 'terraclay-traditional-hand-thrown-unglazed-curd-pot-1.5l',
    description: 'Handmade terracotta pot that sets thick, natural, creamy yogurt through gentle moisture absorption. Imparts a sweet earthy aroma to dishes.',
    price: 499,
    category: 'Home & Kitchen Essentials',
    stock: 35,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural, unadulterated river silt and clay',
      organic_elements: 'Unglazed porous surface enhances natural fermentation',
      packaging: 'Cushioned with natural coconut coir and paper shreds',
      longevity: 'Completely biodegradable into soil at end of life',
      single_use_elimination: 'Diverts hundreds of single-use plastic yogurt tubs'
    }
  },
  {
    name: 'BentoPure 3-Tier Stainless Steel Tiffin Lunch Box',
    slug: 'bentopure-3-tier-stainless-steel-tiffin-lunch-box',
    description: 'Iconic stackable lunch container with clamping side brackets and folding overhead handle. Food-grade 304 steel holds gravies, rice, and snacks.',
    price: 999,
    category: 'Home & Kitchen Essentials',
    stock: 45,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% food-grade stainless steel with zero lead soldering',
      organic_elements: 'Plastic-free airtight mechanical pressure seals',
      packaging: 'Recycled corrugated cardboard box',
      longevity: 'Virtually indestructible; 20+ years of daily office lunches',
      single_use_elimination: 'Eliminates plastic lunch containers and disposable wrap'
    }
  },
  {
    name: 'EcoDry Foldable Bamboo Countertop Dish Rack',
    slug: 'ecodry-foldable-bamboo-countertop-dish-rack',
    description: 'Natural moisture-resistant bamboo dish drying rack. Holds up to 14 large dinner plates plus glassware and folds flat in seconds for storage.',
    price: 1199,
    category: 'Home & Kitchen Essentials',
    stock: 32,
    eco_score: 93,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Solid fast-growing bamboo with natural silica protection',
      organic_elements: 'Zero plastic coating, synthetic sealers, or chrome',
      packaging: 'Flat-pack recyclable kraft carton saving transport emissions',
      longevity: 'Resistant to warping and stains (7+ years)',
      single_use_elimination: 'Replaces rust-prone PVC-coated wire dish drainers'
    }
  },
  {
    name: 'PureLoofah Natural Egyptian Fiber Kitchen Sponges (Pack of 4)',
    slug: 'pureloofah-natural-egyptian-fiber-kitchen-sponges-pack-of-4',
    description: 'Grown on vines and dried in the sun. Dense natural luffa plant fibers expand in warm water to scrub dishes, sinks, and countertops without scratching.',
    price: 249,
    category: 'Home & Kitchen Essentials',
    stock: 90,
    eco_score: 100,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% whole dried Luffa aegyptiaca fruit',
      organic_elements: 'Completely unbleached and plant-based',
      packaging: 'Tied with a simple natural jute string',
      longevity: '100% home compostable in garden compost after 2-3 months',
      single_use_elimination: '100% zero-microplastic kitchen washing'
    }
  },
  {
    name: 'Artisan Brass Kansa Bronze Dinner Thali Set (6 Pieces)',
    slug: 'artisan-brass-kansa-bronze-dinner-thali-set-6-pieces',
    description: 'Authentic 78% copper and 22% tin bell-metal thali dining set. Includes dinner plate, 2 katoris, dessert bowl, tumbler, and handcrafted brass spoon.',
    price: 3499,
    category: 'Home & Kitchen Essentials',
    stock: 18,
    eco_score: 97,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% pure kansa bronze hand-hammered by traditional smiths',
      organic_elements: 'Alkalizing food contact metal praised in Ayurvedic nutrition',
      packaging: 'Handmade lokta gift box with cloth wrapping',
      longevity: 'Multigenerational heirloom quality (50+ years)',
      single_use_elimination: 'Replaces disposable dining plates and plastic dinnerware'
    }
  },
  {
    name: 'NeemWood Antibacterial Handcrafted Cutting Board (Large)',
    slug: 'neemwood-antibacterial-handcrafted-cutting-board-large',
    description: 'Reversible end-grain chopping board cut from a single slab of mature Indian neem wood with deep juice groove and brass hanging ring.',
    price: 899,
    category: 'Home & Kitchen Essentials',
    stock: 40,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Sustainably harvested agricultural neem wood',
      organic_elements: 'Natural nimbin oils provide inherent antibacterial defense',
      packaging: 'Zero plastic; wrapped in unbleached craft paper',
      longevity: 'Self-healing hardwood endures decades of knife work',
      single_use_elimination: 'Eliminates plastic microfibers shed by plastic cutting boards'
    }
  },
  {
    name: 'AquaZero Natural Pumice Kitchen Degreaser Stick (Pack of 2)',
    slug: 'aquazero-natural-pumice-kitchen-degreaser-stick-pack-of-2',
    description: '100% volcanic pumice stone that erases stubborn baked-on carbon, rust, and limescale from ovens, grill grates, and cast iron without chemicals.',
    price: 349,
    category: 'Home & Kitchen Essentials',
    stock: 55,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural inert volcanic mineral stone',
      organic_elements: 'Chemical-free cleaning power activated by plain water',
      packaging: 'Recycled card sleeve',
      longevity: 'Wears down slowly with zero chemical fume off-gassing',
      single_use_elimination: 'Eliminates toxic aerosol oven cleaning chemical sprays'
    }
  },
  {
    name: 'AromaPure Terracotta Slow Stovetop Coffee Brewer',
    slug: 'aromapure-terracotta-slow-stovetop-coffee-brewer',
    description: 'Artisanal clay pour-over cone and carafe that brews rich, aromatic filter coffee with velvety mouthfeel and balanced acidity.',
    price: 849,
    category: 'Home & Kitchen Essentials',
    stock: 28,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Earthen clay mined from clean non-industrial river beds',
      organic_elements: 'Natural mineral retention; zero plastic or metallic flavor',
      packaging: 'Corrugated shock absorbent carton',
      longevity: 'High thermal durability for daily coffee rituals (10+ years)',
      single_use_elimination: 'Eliminates plastic Nespresso/Keurig coffee pods'
    }
  },
  {
    name: 'EcoSpark Natural Solid Dish Washing Soap Bar with Ramekin (200g)',
    slug: 'ecospark-natural-solid-dish-washing-soap-bar-with-ramekin-200g',
    description: 'Zero-waste dish soap block concentrated with cold-pressed coconut oil and lime essential oil. Comes with a hand-thrown ceramic drainage dish.',
    price: 399,
    category: 'Home & Kitchen Essentials',
    stock: 65,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Saponified pure coconut oil with natural citric acid',
      organic_elements: 'Free from synthetic SLS, palm oil, parabens, and phosphates',
      packaging: 'Recycled cardboard box and reusable ceramic dish',
      longevity: 'One block replaces up to 3 plastic liquid dish soap bottles',
      single_use_elimination: 'Eliminates bulky plastic dish detergent bottles'
    }
  },
  {
    name: 'Stainless Steel Reusable Tea Strainer Ball with Drip Tray',
    slug: 'stainless-steel-reusable-tea-strainer-ball-with-drip-tray',
    description: 'Fine micro-mesh stainless steel infuser ball with twist-lock latch and chain clip. Perfectly steeps loose leaf green, black, and herbal teas.',
    price: 249,
    category: 'Home & Kitchen Essentials',
    stock: 80,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% 304 food-grade stainless steel',
      organic_elements: 'Micro-etched perforations contain fine tea dust',
      packaging: 'Cardboard hangcard printed with vegetable ink',
      longevity: 'Rust-proof and dishwasher safe for 15+ years',
      single_use_elimination: 'Eliminates microplastic-shedding synthetic tea bags'
    }
  },
  {
    name: 'HempLinen Reusable Bread & Bakery Storage Bag',
    slug: 'hemplinen-reusable-bread-and-bakery-storage-bag',
    description: 'Heavy unbleached hemp and flax linen drawstring loaf pouch. Keeps artisanal sourdough crusts crisp while retaining interior crumb softness.',
    price: 499,
    category: 'Home & Kitchen Essentials',
    stock: 45,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '55% wild European hemp blended with 45% natural flax linen',
      organic_elements: 'Naturally breathable fabric deters mold spores',
      packaging: 'Seed paper band that blooms when planted',
      longevity: 'Machine washable and durable for 500+ bakery trips',
      single_use_elimination: 'Replaces plastic bakery bread bags and twist ties'
    }
  },
  {
    name: 'BakeMat Platinum Silicone Non-Stick Baking Sheet (Set of 2)',
    slug: 'bakemat-platinum-silicone-non-stick-baking-sheet-set-of-2',
    description: 'Reinforced woven fiberglass and platinum food silicone baking mats. Oven safe up to 250°C for baking cookies, roasting vegetables, and candy making.',
    price: 799,
    category: 'Home & Kitchen Essentials',
    stock: 40,
    eco_score: 92,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'LFGB certified non-toxic food-grade platinum silicone',
      organic_elements: 'BPA, BPS, and phthalate-free baking surface',
      packaging: 'Recycled cardboard rolling cylinder',
      longevity: 'Rated for over 3,000 oven baking cycles (8+ years)',
      single_use_elimination: 'Replaces disposable parchment paper and aluminum foil'
    }
  },
  {
    name: 'Heritage Stone Pestle & Mortar (Kharal) Hand-Carved Granite',
    slug: 'heritage-stone-pestle-and-mortar-kharal-hand-carved-granite',
    description: 'Traditional solid black granite spice grinding bowl. Crushes whole cardamom, peppercorns, garlic, and fresh pesto to release aromatic oils.',
    price: 1399,
    category: 'Home & Kitchen Essentials',
    stock: 25,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Single solid block of naturally quarried granite stone',
      organic_elements: 'Unpolished interior maximizes friction grinding',
      packaging: 'Heavy-duty recycled carton with paper wool cushioning',
      longevity: 'Virtually indestructible; heirloom lifespan of 100+ years',
      single_use_elimination: 'Replaces pre-packaged, preservative-laden store pastes'
    }
  },
  {
    name: 'Solari Stainless Steel Airtight Food Storage Canisters (Set of 3)',
    slug: 'solari-stainless-steel-airtight-food-storage-canisters-set-of-3',
    description: 'Stackable kitchen pantry jars with silicone-gasket clamp lids and clear tempered glass peek windows. Keeps lentils, spices, and tea airtight.',
    price: 1499,
    category: 'Home & Kitchen Essentials',
    stock: 30,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% 304 food-grade stainless steel',
      organic_elements: 'Toxin-free silicone vacuum latch rings',
      packaging: '100% recycled paperboard partition box',
      longevity: 'Will never crack or discolor from turmeric (15+ years)',
      single_use_elimination: 'Eliminates plastic pantry storage containers'
    }
  },
  {
    name: 'PureCider Organic Apple Cider Vinegar Cleaner Concentrate (500ml)',
    slug: 'purecider-organic-apple-cider-vinegar-cleaner-concentrate-500ml',
    description: 'Plant-powered multi-surface cleaning concentrate infused with organic lemon and eucalyptus oils. Dilutes to make 5 full spray bottles of cleaner.',
    price: 399,
    category: 'Home & Kitchen Essentials',
    stock: 60,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Recycled amber glass bottle with metal screw top',
      organic_elements: '100% naturally fermented non-GMO orchard apple vinegar',
      packaging: 'Compostable paper shipping sleeve',
      longevity: 'Concentrated formula reduces transport carbon footprint by 80%',
      single_use_elimination: 'Diverts 5 single-use plastic spray cleaner bottles'
    }
  },
  {
    name: 'Woodland Hand-Carved Teak Wood Butter & Cheese Spreader Set (4 Pcs)',
    slug: 'woodland-hand-carved-teak-wood-butter-and-cheese-spreader-set-4-pcs',
    description: 'Smooth organic teak wood butter and jam knives handcrafted from reclaimed furniture wood scraps. Safe for non-stick surfaces and warm toast.',
    price: 349,
    category: 'Home & Kitchen Essentials',
    stock: 50,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% upcycled teak wood carpentry offcuts',
      organic_elements: 'Sealed with food-grade pure coconut and beeswax blend',
      packaging: 'Recycled kraft card with hemp twine',
      longevity: 'Durable natural hardwood (8+ years)',
      single_use_elimination: 'Zero plastic disposable cutlery waste'
    }
  },

  // =========================================================================
  // 5. Personal Care & Reusable Products (15 products)
  // =========================================================================
  {
    name: 'EcoBristle Charcoal Infused Bamboo Toothbrushes (Family Pack of 4)',
    slug: 'ecobristle-charcoal-infused-bamboo-toothbrushes-family-pack-of-4',
    description: 'Ergonomic moso bamboo toothbrush handles with castor oil based soft bristles infused with activated charcoal for natural stain removal.',
    price: 349,
    category: 'Personal Care & Reusable Products',
    stock: 90,
    eco_score: 98,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% compostable organic moso bamboo handle',
      organic_elements: 'Bio-based castor bean oil bristles (zero petroleum nylon)',
      packaging: 'Individual plastic-free unbleached kraft paper boxes',
      longevity: 'Dentist recommended 3-month cycle; handle composts in garden',
      single_use_elimination: 'Prevents 4 plastic toothbrushes from entering oceans'
    }
  },
  {
    name: 'PureSafety All-Metal Double Edge Safety Razor with 10 Blades',
    slug: 'puresafety-all-metal-double-edge-safety-razor-with-10-blades',
    description: 'Heavyweight matte chrome-finish brass razor that delivers a barber-grade close shave without irritation, ingrown hairs, or plastic waste.',
    price: 799,
    category: 'Personal Care & Reusable Products',
    stock: 40,
    eco_score: 97,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1508746829417-e6f548d8d6ed?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% solid zinc alloy and machined brass construction',
      organic_elements: 'Zero plastic components or lubricating chemical strips',
      packaging: 'Recycled card box with blade bank for safe recycling',
      longevity: 'Built to last a lifetime (25+ years)',
      single_use_elimination: 'Eliminates hundreds of multi-blade plastic cartridge heads'
    }
  },
  {
    name: 'AyurTongue 100% Pure Copper Ayurvedic Tongue Scraper',
    slug: 'ayurtongue-100-percent-pure-copper-ayurvedic-tongue-scraper',
    description: 'Traditional oral detox scraper with thick blunt edges and flexible comfort handles. Removes morning toxins and freshens breath naturally.',
    price: 249,
    category: 'Personal Care & Reusable Products',
    stock: 85,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% pure virgin and repurposed copper',
      organic_elements: 'Natural antibacterial properties inhibit bacterial growth',
      packaging: 'Unbleached handmade paper sleeve',
      longevity: 'Lifetime oral wellness tool (20+ years)',
      single_use_elimination: 'Replaces disposable plastic tongue cleaner picks'
    }
  },
  {
    name: 'TerraPad Washable Organic Cotton Makeup Remover Pads (Set of 12)',
    slug: 'terrapad-washable-organic-cotton-makeup-remover-pads-set-of-12',
    description: 'Triple-layered velvety soft bamboo velvet and organic cotton rounds. Includes a mesh cotton laundry bag for effortless machine washing.',
    price: 499,
    category: 'Personal Care & Reusable Products',
    stock: 60,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '70% organic bamboo fiber and 30% GOTS organic cotton',
      organic_elements: 'Unbleached, fragrance-free and hypoallergenic',
      packaging: 'Cotton drawstring storage pouch',
      longevity: 'Each pad endures over 500 wash cycles (3+ years)',
      single_use_elimination: 'Replaces over 2,000 disposable cotton balls per set'
    }
  },
  {
    name: 'NeemRoot Handcrafted Detangling Wooden Hair Comb',
    slug: 'neemroot-handcrafted-detangling-wooden-hair-comb',
    description: 'Wide-tooth hair comb saw-cut from seasoned Indian neem wood. Glides smoothly through wet or dry hair without static, frizz, or hair breakage.',
    price: 249,
    category: 'Personal Care & Reusable Products',
    stock: 75,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural sustainably pruned mature neem timber',
      organic_elements: 'Medicinal neem properties control dandruff and scalp itching',
      packaging: 'Parchment paper envelope',
      longevity: 'Sturdy wooden teeth won’t snap like plastic combs (8+ years)',
      single_use_elimination: 'Zero static, petroleum-free alternative to plastic combs'
    }
  },
  {
    name: 'AlumPure Natural Mineral Crystal Deodorant Block (100g)',
    slug: 'alumpure-natural-mineral-crystal-deodorant-block-100g',
    description: '100% pure potassium alum mineral stone harvested from natural mineral deposits. Prevents body odor for 24 hours without clogging pores or staining clothes.',
    price: 299,
    category: 'Personal Care & Reusable Products',
    stock: 50,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural mined potassium alum crystal',
      organic_elements: 'Free from aluminum chlorohydrate, parabens, and perfumes',
      packaging: 'Packed in a polished cork protective storage travel tub',
      longevity: 'A single crystal block lasts over 12 months of daily use',
      single_use_elimination: 'Eliminates plastic roll-on containers and aerosol cans'
    }
  },
  {
    name: 'SudsBotanica Cold-Pressed Organic Shampoo Bar (100g)',
    slug: 'sudsbotanica-cold-pressed-organic-shampoo-bar-100g',
    description: 'Solid concentrated shampoo formulated with shikakai, amla, bhringraj, and virgin coconut oil. Rich foamy lather that cleanses without stripping natural scalp oils.',
    price: 349,
    category: 'Personal Care & Reusable Products',
    stock: 65,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Saponified plant oils and Ayurvedic botanical extracts',
      organic_elements: 'Free from sulfates, silicones, artificial colorants, and palm oil',
      packaging: 'Recycled paper box with vegetable wax coating',
      longevity: 'Equal to 3 full 250ml bottles of liquid shampoo',
      single_use_elimination: 'Saves 3 plastic shampoo bottles per bar'
    }
  },
  {
    name: 'EcoCup Medical-Grade Reusable Menstrual Cup with Pouch',
    slug: 'ecocup-medical-grade-reusable-menstrual-cup-with-pouch',
    description: 'Ultra-soft European medical-grade silicone menstrual cup. 12-hour leak-proof protection with ribbed base and flexible stem for effortless removal.',
    price: 699,
    category: 'Personal Care & Reusable Products',
    stock: 45,
    eco_score: 99,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% biocompatible medical platinum-cured silicone',
      organic_elements: 'Hypoallergenic, free from bleach, BPA, and latex',
      packaging: 'GOTS certified organic cotton breathable storage pouch',
      longevity: 'Reusable for up to 8-10 years with boiling sterilization',
      single_use_elimination: 'Diverts over 2,400 plastic-lined pads and tampons'
    }
  },
  {
    name: 'BathPure Natural Sisal Body Exfoliating Soap Saver Pouch',
    slug: 'bathpure-natural-sisal-body-exfoliating-soap-saver-pouch',
    description: 'Woven agave sisal plant fiber pouch that holds soap bars and scraps. Produces rich, invigorating lather while gently buffing away dead skin cells.',
    price: 199,
    category: 'Personal Care & Reusable Products',
    stock: 80,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural unbleached agave sisal fiber',
      organic_elements: 'Wooden bead drawstring closure; 100% biodegradable',
      packaging: 'Zero packaging; paper card hangtag',
      longevity: 'Machine washable, lasts over 1 year of daily bathing',
      single_use_elimination: 'Replaces synthetic polyethylene plastic shower poofs'
    }
  },
  {
    name: 'DentFresh Natural Mineral Toothpaste Tablets (120 Tabs)',
    slug: 'dentfresh-natural-mineral-toothpaste-tablets-120-tabs',
    description: 'Chewable toothpaste bits flavored with English peppermint and enriched with nano-hydroxyapatite to remineralize enamel without fluoride.',
    price: 399,
    category: 'Personal Care & Reusable Products',
    stock: 55,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Refillable amber glass jar with aluminum screw cap',
      organic_elements: 'Microcrystalline cellulose, xylitol, and natural mint oil',
      packaging: 'Shipped in plastic-free compostable pouch refills',
      longevity: 'Provides 2 full months of twice-daily dental brushing',
      single_use_elimination: 'Eliminates unrecyclable multilayer plastic/aluminum tubes'
    }
  },
  {
    name: 'KansaWand Ayurvedic Facial Massage Tool with Teak Handle',
    slug: 'kansawand-ayurvedic-facial-massage-tool-with-teak-handle',
    description: 'Sacred copper and tin bronze dome fitted to a carved teak wood handle. Promotes lymphatic drainage, balances facial pH, and relieves muscle tension.',
    price: 999,
    category: 'Personal Care & Reusable Products',
    stock: 30,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Pure bell metal bronze alloy crafted by master smiths',
      organic_elements: 'Hand-finished teak wood with cold-pressed coconut oil',
      packaging: 'Handmade paper storage box with velvet interior',
      longevity: 'Lifetime wellness tool passed down across generations',
      single_use_elimination: 'Replaces battery-operated plastic vibrating face rollers'
    }
  },
  {
    name: 'BambooSwab Biodegradable Cotton Ear Buds (Pack of 200)',
    slug: 'bambooswab-biodegradable-cotton-ear-buds-pack-of-200',
    description: 'Sturdy natural bamboo stems with soft 100% organic cotton tips. 100% compostable and marine safe, perfect for hygiene, makeup, and crafts.',
    price: 199,
    category: 'Personal Care & Reusable Products',
    stock: 95,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% renewable fast-growing bamboo sticks',
      organic_elements: 'GOTS certified unbleached organic cotton tips',
      packaging: 'Recycled slide-out kraft paperboard box',
      longevity: 'Fully composts in home compost within 4-6 months',
      single_use_elimination: 'Eliminates plastic stick cotton swabs that pollute shorelines'
    }
  },
  {
    name: 'SilkDent Compostable Pure Mulberry Silk Dental Floss (30m)',
    slug: 'silkdent-compostable-pure-mulberry-silk-dental-floss-30m',
    description: 'Natural peace silk floss coated in candelilla plant wax and spearmint essential oil. Encased in a reusable stainless steel dispenser with cutter.',
    price: 349,
    category: 'Personal Care & Reusable Products',
    stock: 60,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural ahimsa cruelty-free mulberry silk thread',
      organic_elements: 'Plant-derived candelilla wax and organic spearmint oil',
      packaging: 'Refillable mini glass/metal dispenser with zero plastic',
      longevity: '30 meters of floss (approx 100 days of flossing)',
      single_use_elimination: 'Diverts petroleum nylon and Teflon floss strands'
    }
  },
  {
    name: 'TerraGua Sha Natural Jade Facial Sculpting Stone',
    slug: 'terragua-sha-natural-jade-facial-sculpting-stone',
    description: 'Authentic polished green jade stone carved with contoured curves to sculpt cheekbones, release jaw tension, and boost micro-circulation.',
    price: 649,
    category: 'Personal Care & Reusable Products',
    stock: 42,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% authentic certified natural xiuyan jade mineral',
      organic_elements: 'Hand-polished with natural oils without chemical glaze',
      packaging: 'Recycled card envelope with protective felt wrap',
      longevity: 'Non-porous mineral structure lasts indefinitely (20+ years)',
      single_use_elimination: 'Replaces chemical anti-aging sheet masks'
    }
  },
  {
    name: 'AyurOil Organic Cold-Pressed Sesame Hair Oil (200ml)',
    slug: 'ayuroil-organic-cold-pressed-sesame-hair-oil-200ml',
    description: 'Deeply nourishing hair food infused with amla, brahmi, and hibiscus in virgin black sesame oil. Promotes healthy roots, luster, and scalp relaxation.',
    price: 499,
    category: 'Personal Care & Reusable Products',
    stock: 50,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% post-consumer recycled green glass bottle',
      organic_elements: 'Certified organic cold-pressed Ayurvedic botanicals',
      packaging: 'Metal screw cap; 100% recyclable glass container',
      longevity: 'High nutrient stability without artificial preservatives',
      single_use_elimination: 'Replaces petroleum mineral oil hair serums'
    }
  },

  // =========================================================================
  // 6. Sustainable Fashion (15 products)
  // =========================================================================
  {
    name: 'KhadiClassic Handspun Organic Cotton Kurta Shirt',
    slug: 'khadiclassic-handspun-organic-cotton-kurta-shirt',
    description: 'Breathable, featherlight mandarin collar shirt crafted on traditional wooden handlooms from indigenous rain-fed cotton. Dyed with natural indigo.',
    price: 1699,
    category: 'Sustainable Fashion',
    stock: 35,
    eco_score: 98,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% zero-carbon manual handloom and charkha spin',
      organic_elements: 'True vegetable indigo dye and coconut shell buttons',
      packaging: 'Handmade cotton pouch packaging',
      longevity: 'Softens with each wash, durable for 7+ years',
      single_use_elimination: 'Consumes 85% less water than industrial cotton mills'
    }
  },
  {
    name: 'Bambuso Breathable Bamboo Fiber Everyday Socks (Pack of 3)',
    slug: 'bambuso-breathable-bamboo-fiber-everyday-socks-pack-of-3',
    description: 'Cushioned crew socks made from viscose bamboo. Naturally thermoregulating, blister-resistant, and odor-free for all-day walking comfort.',
    price: 499,
    category: 'Sustainable Fashion',
    stock: 70,
    eco_score: 93,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '80% bamboo viscose, 18% organic cotton, 2% elastane',
      organic_elements: 'Closed-loop solvent processing; OEKO-TEX certified',
      packaging: 'Recycled cardboard hanger sleeve',
      longevity: 'Reinforced heel and toe knit prevents holes for 2+ years',
      single_use_elimination: 'Replaces fast-fashion synthetic polyester socks'
    }
  },
  {
    name: 'HempDenim Relaxed Fit Sustainable Jeans',
    slug: 'hempdenim-relaxed-fit-sustainable-jeans',
    description: 'Heavyweight 13oz denim woven from 60% regenerative hemp and 40% organic cotton. Finished with stone washing that uses zero hazardous potassium permanganate.',
    price: 2999,
    category: 'Sustainable Fashion',
    stock: 25,
    eco_score: 95,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Regenerative industrial hemp requiring zero pesticides',
      organic_elements: 'Natural copper buttons and unbleached pocket lining',
      packaging: 'Recycled kraft parcel wrap',
      longevity: 'High tensile hemp strength endures 10+ years of hard wear',
      single_use_elimination: 'Saves ~6,000 liters of water compared to conventional denim'
    }
  },
  {
    name: 'AhimsaPeace Handwoven Non-Violent Silk Scarf',
    slug: 'ahimsapeace-handwoven-non-violent-silk-scarf',
    description: 'Eri peace silk scarf woven from cocoons left behind after silk moths naturally emerge and fly away. Dyed with gentle madder root botanical extracts.',
    price: 1899,
    category: 'Sustainable Fashion',
    stock: 20,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% cruelty-free Eri wild silk harvested without killing silkworms',
      organic_elements: 'Hand-dyed using organic botanical plant extracts',
      packaging: 'Lokta handmade paper presentation box',
      longevity: 'Wool-like thermal warmth with decades-long durability',
      single_use_elimination: 'Ethical alternative to boiling-process conventional silk'
    }
  },
  {
    name: 'Korku Casual Cork Sole Sandals with Organic Cotton Straps',
    slug: 'korku-casual-cork-sole-sandals-with-organic-cotton-straps',
    description: 'Anatomically contoured footbed molded from natural cork and tree latex. Provides arch support with durable recycled rubber tread outsole.',
    price: 1799,
    category: 'Sustainable Fashion',
    stock: 30,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Portuguese cork oak granules and recycled tire rubber tread',
      organic_elements: '100% organic cotton canvas upper cross straps',
      packaging: 'Unprinted recycled shoe carton',
      longevity: 'Resoleable construction designed for 5+ summer seasons',
      single_use_elimination: 'Zero toxic EVA foam or PVC synthetic soles'
    }
  },
  {
    name: 'LinumRelaxed 100% Pure French Flax Linen Trousers',
    slug: 'linumrelaxed-100-percent-pure-french-flax-linen-trousers',
    description: 'Airy, relaxed-fit drawstring trousers tailored from Normandy flax linen. Moisture-wicking and breezy for tropical summers and casual lounging.',
    price: 2499,
    category: 'Sustainable Fashion',
    stock: 28,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural European flax requiring only natural rainfall',
      organic_elements: 'Real corozo tagua nut buttons and cotton drawstring',
      packaging: 'Fabric dust bag sewn from factory cutting scraps',
      longevity: 'Linen fibers grow softer and stronger with every wash cycle',
      single_use_elimination: 'Zero synthetic polyester microplastic shedding'
    }
  },
  {
    name: 'EcoFleece Recycled Ocean Bottle Zip Pullover',
    slug: 'ecofleece-recycled-ocean-bottle-zip-pullover',
    description: 'Ultra-warm quarter-zip fleece jacket woven entirely from 28 recycled plastic bottles. Anti-pilling brushed exterior with zippered chest pocket.',
    price: 2299,
    category: 'Sustainable Fashion',
    stock: 32,
    eco_score: 91,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% certified GRS recycled post-consumer PET bottles',
      organic_elements: 'Microfiber-catch washing bag included with every jacket',
      packaging: 'Compostable polybag made from potato starch',
      longevity: 'Heavy-duty YKK zipper and anti-pill knit (8+ years)',
      single_use_elimination: 'Keeps 28 plastic beverage bottles out of landfills'
    }
  },
  {
    name: 'TerraTread Upcycled Tire Sole Casual Loafers',
    slug: 'terratread-upcycled-tire-sole-casual-loafers',
    description: 'Slip-on casual shoes featuring outsoles cut directly from discarded truck tires. Breathable organic cotton canvas upper and cushioned cork insole.',
    price: 1999,
    category: 'Sustainable Fashion',
    stock: 24,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Direct upcycling of discarded rubber vehicle tires',
      organic_elements: 'GOTS organic cotton canvas and natural latex glue',
      packaging: 'Recycled cardboard box',
      longevity: 'Tire rubber outsoles deliver over 50,000 steps of durability',
      single_use_elimination: 'Prevents toxic tire burning in urban landfills'
    }
  },
  {
    name: 'HempShade Wide Brim Sun Hat with Chin Cord',
    slug: 'hempshade-wide-brim-sun-hat-with-chin-cord',
    description: 'UPF 50+ UV-protective sun hat handcrafted from pure woven Himalayan hemp canvas. Floatable, breathable, and equipped with adjustable wooden toggle cord.',
    price: 899,
    category: 'Sustainable Fashion',
    stock: 45,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural organic hemp canvas',
      organic_elements: 'Chemical-free natural UV barrier provided by hemp fiber',
      packaging: 'Packaged flat in unbleached paper envelope',
      longevity: 'Crushable and washable for 8+ years of gardening and travel',
      single_use_elimination: 'Replaces synthetic petroleum nylon sun hats'
    }
  },
  {
    name: 'NettleKnit Wild Himalayan Nettle Fiber Beanie',
    slug: 'nettleknit-wild-himalayan-nettle-fiber-beanie',
    description: 'Thermal winter watch cap knitted from wild stinging nettle (Allo) fibers and organic wool. Hollow fibers trap body heat naturally.',
    price: 799,
    category: 'Sustainable Fashion',
    stock: 35,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Wild harvested regenerative nettle bark fibers',
      organic_elements: 'Blended with cruelty-free Himalayan shepherd wool',
      packaging: 'Cardboard hangtag tied with wool yarn',
      longevity: 'Stronger than cotton; retains shape for 10+ winters',
      single_use_elimination: 'Zero acrylic or petroleum synthetic fibers'
    }
  },
  {
    name: 'BotanicaPrint Organic Cotton Kimono Lounge Robe',
    slug: 'botanicaprint-organic-cotton-kimono-lounge-robe',
    description: 'Lightweight unisex dressing gown block-printed by hand using carved teak wooden blocks and plant-derived natural pigments in Bagru.',
    price: 2199,
    category: 'Sustainable Fashion',
    stock: 22,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% certified organic long-staple cotton cambric',
      organic_elements: 'Plant dyes: harda, alum, iron rust paste, and madder',
      packaging: 'Cotton fabric envelope matching kimono print',
      longevity: 'Authentic heirloom craft textile resilient for 8+ years',
      single_use_elimination: 'Preserves traditional 400-year-old artisan printing lineage'
    }
  },
  {
    name: 'CocoBelt Vegetable-Tanned Vegan Apple Leather Belt',
    slug: 'cocobelt-vegetable-tanned-vegan-apple-leather-belt',
    description: 'Crafted from AppleSkin bio-leather made from apple orchard juice residues in Northern Italy. Solid brushed antique brass buckle.',
    price: 1299,
    category: 'Sustainable Fashion',
    stock: 38,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '50% repurposed agricultural apple peel and core waste',
      organic_elements: 'Lead-free solid brass buckle with satin finish',
      packaging: 'Recycled card box with paper shavings',
      longevity: 'Tensile strength comparable to animal hide (6+ years)',
      single_use_elimination: 'Zero toxic chrome tanning wastewater'
    }
  },
  {
    name: 'PureKala Rain-Fed Organic Cotton Everyday T-Shirt',
    slug: 'purekala-rain-fed-organic-cotton-everyday-t-shirt',
    description: 'Ultra-soft crewneck tee knitted from heirloom non-hybrid Kala cotton grown exclusively on monsoon rains without synthetic pesticides.',
    price: 799,
    category: 'Sustainable Fashion',
    stock: 65,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% indigenous rain-fed non-GMO Kala cotton',
      organic_elements: 'Naturally unbleached off-white ecru fabric',
      packaging: 'Compostable cassava-starch garment bag',
      longevity: 'Pre-shrunk 180gsm jersey retains shape through 200+ washes',
      single_use_elimination: 'Saves 2,700 liters of irrigation water per t-shirt'
    }
  },
  {
    name: 'TerraShawl Pure Merino Wool Hand-Knitted Wrap',
    slug: 'terrashawl-pure-merino-wool-hand-knitted-wrap',
    description: 'Luxurious thermal stole hand-knitted from non-mulesed Himalayan Merino sheep wool. Natural self-cleaning lanolin repels water and stains.',
    price: 2799,
    category: 'Sustainable Fashion',
    stock: 16,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% responsibly sourced non-mulesed Merino fleece',
      organic_elements: 'Zero synthetic softeners or chemical mothproofing',
      packaging: 'Handmade paper box with cedar wood moth repellent ring',
      longevity: 'Heirloom wrap lasting decades with simple airing out',
      single_use_elimination: 'Zero petroleum acrylic synthetic knitwear'
    }
  },
  {
    name: 'BambooBreeze Relaxed Sleepwear Pajama Set',
    slug: 'bamboobreeze-relaxed-sleepwear-pajama-set',
    description: 'Silky smooth, cooling notch-collar pajama shirt and drawstring pants. Thermo-regulating bamboo fabric keeps body 3 degrees cooler on warm nights.',
    price: 2399,
    category: 'Sustainable Fashion',
    stock: 26,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '95% organic bamboo lyocell and 5% natural elastane',
      organic_elements: 'Dyed using non-toxic low-impact water-soluble dyes',
      packaging: 'Matching bamboo fabric drawstring pouch',
      longevity: 'Silky softness endures through 300+ delicate wash cycles',
      single_use_elimination: 'Replaces petrochemical polyester satin sleepwear'
    }
  },

  // =========================================================================
  // 7. Gardening & Outdoor Products (15 products)
  // =========================================================================
  {
    name: 'TerraSprout Biodegradable Coconut Coir Seedling Pots (Pack of 20)',
    slug: 'terrasprout-biodegradable-coconut-coir-seedling-pots-pack-of-20',
    description: 'Porous nursery starter pots pressed from natural coconut husk fibers. Plant directly into the ground without root transplant shock.',
    price: 349,
    category: 'Gardening & Outdoor Products',
    stock: 75,
    eco_score: 99,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural repurposed agricultural coconut husks',
      organic_elements: 'Enriches soil with organic matter as pots biodegrade',
      packaging: 'Recycled cardboard sleeve band',
      longevity: 'Decomposes naturally in garden soil within 4-6 months',
      single_use_elimination: 'Diverts 20 single-use plastic seedling starter trays'
    }
  },
  {
    name: 'SolariGlow Solar Powered Glass Jar Garden Lantern',
    slug: 'solariglow-solar-powered-glass-jar-garden-lantern',
    description: 'Weatherproof mason jar with integrated monocrystalline solar lid and high-efficiency warm LED fairy lights. Automatically illuminates for 8 hours at dusk.',
    price: 699,
    category: 'Gardening & Outdoor Products',
    stock: 45,
    eco_score: 95,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Recycled glass vessel with stainless steel hanging bail',
      organic_elements: 'Powered purely by clean sunlight; zero grid electricity',
      packaging: 'Recycled corrugated box with paper straw cushioning',
      longevity: 'High-cycle NiMH rechargeable battery replaceable after 5 years',
      single_use_elimination: 'Zero disposable alkaline battery waste'
    }
  },
  {
    name: 'AquaSpike Terracotta Self-Watering Plant Stakes (Pack of 4)',
    slug: 'aquaspike-terracotta-self-watering-plant-stakes-pack-of-4',
    description: 'Porous terracotta clay cones that accept standard recycled wine or glass bottles to deliver continuous slow-drip root hydration for up to 10 days.',
    price: 499,
    category: 'Gardening & Outdoor Products',
    stock: 60,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural earthenware terracotta clay',
      organic_elements: 'Passive moisture release via capillary soil physics',
      packaging: 'Recycled molded pulp tray inside carton',
      longevity: 'Indefinite lifespan with periodic warm water rinsing (10+ years)',
      single_use_elimination: 'Upcycles discarded glass beverage bottles into garden systems'
    }
  },
  {
    name: 'HeritageForged Carbon Steel Garden Hand Trowel',
    slug: 'heritageforged-carbon-steel-garden-hand-trowel',
    description: 'Heavy-duty forged carbon steel garden spade blade welded to a solid ash wood handle with engraved depth markers and leather hanging loop.',
    price: 599,
    category: 'Gardening & Outdoor Products',
    stock: 40,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% high-grade forged automotive spring steel',
      organic_elements: 'FSC-certified ash timber sealed with boiled linseed oil',
      packaging: 'Cardboard hangcard printed with vegetable inks',
      longevity: 'Resists bending against dense rocks and roots (20+ years)',
      single_use_elimination: 'Eliminates flimsy stamped plastic garden hand tools'
    }
  },
  {
    name: 'VermiRich Organic Enriched Vermicompost Fertilizer Kit (5kg)',
    slug: 'vermirich-organic-enriched-vermicompost-fertilizer-kit-5kg',
    description: 'Microbe-rich organic bio-fertilizer processed by earthworms from cow dung and neem leaves. Restores depleted garden soil biology naturally.',
    price: 399,
    category: 'Gardening & Outdoor Products',
    stock: 50,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585670210693-e7fdd16b142e?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% recycled farm organic waste transformed by worms',
      organic_elements: 'Chemical-free; rich in humic acids and beneficial mycorrhizae',
      packaging: 'Heavy duty unbleached natural jute gunny sack',
      longevity: 'Builds living, resilient topsoil structure indefinitely',
      single_use_elimination: 'Replaces chemical nitrogen/phosphorus fertilizers'
    }
  },
  {
    name: 'HeirloomDesi Indigenous Organic Kitchen Garden Seed Kit (12 Varieties)',
    slug: 'heirloomdesi-indigenous-organic-kitchen-garden-seed-kit-12-varieties',
    description: 'Collection of 12 native open-pollinated heirloom vegetable and herb seeds: Country Tomato, Palak, Methi, Ridge Gourd, Brinjal, and Sweet Basil.',
    price: 449,
    category: 'Gardening & Outdoor Products',
    stock: 80,
    eco_score: 100,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1585336261026-418071839957?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Zero GMOs; 100% open-pollinated traditional seeds',
      organic_elements: 'Seeds can be saved year after year for food sovereignty',
      packaging: 'Recycled paper seed packets inside a reusable tin box',
      longevity: 'High germination rate tested above 85%',
      single_use_elimination: 'Promotes homegrown organic nutrition with zero food miles'
    }
  },
  {
    name: 'CedarNest Handcrafted Outdoor Bird House & Roosting Box',
    slug: 'cedarnest-handcrafted-outdoor-bird-house-and-roosting-box',
    description: 'Naturally weather-resistant FSC cedar nesting box with a 28mm brass entrance hole ideal for sparrows, chickadees, and finches. Clean-out side door.',
    price: 899,
    category: 'Gardening & Outdoor Products',
    stock: 25,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Untreated cedar wood naturally repels rot and insects',
      organic_elements: 'No chemical paints, glues, or synthetic finishes',
      packaging: 'Recycled cardboard box with kraft nesting paper',
      longevity: 'Solid 18mm timber walls endure outdoor weather for 10+ years',
      single_use_elimination: 'Provides safe shelter restoring urban avian biodiversity'
    }
  },
  {
    name: 'AquaCatch Heavy-Duty Rainwater Collection Diverter Spout',
    slug: 'aquacatch-heavy-duty-rainwater-collection-diverter-spout',
    description: 'Universal gutter downspout attachment that filters roof rainwater directly into storage rain barrels while bypassing leaves and large debris.',
    price: 799,
    category: 'Gardening & Outdoor Products',
    stock: 35,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% recycled UV-stabilized polypropylene resin',
      organic_elements: 'Removable stainless steel leaf filtration mesh',
      packaging: 'Recycled card box',
      longevity: 'Engineered for over 15 years of seasonal monsoon storms',
      single_use_elimination: 'Harvests thousands of liters of free chlorine-free rainwater'
    }
  },
  {
    name: 'NeemShield Organic Botanical Pest Repellent Spray (500ml Ready-to-Use)',
    slug: 'neemshield-organic-botanical-pest-repellent-spray-500ml',
    description: 'Cold-pressed virgin neem oil emulsion formulated with Karanja seed oil. Protects plants against aphids, mealybugs, and powdery mildew safely.',
    price: 349,
    category: 'Gardening & Outdoor Products',
    stock: 65,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% recycled HDPE spray bottle with reusable trigger',
      organic_elements: 'Biodegradable botanical oils safe for bees and earthworms',
      packaging: 'Cardboard shipping wrap',
      longevity: 'Non-toxic broad-spectrum bio-pesticide',
      single_use_elimination: 'Eliminates neurotoxic chemical organophosphate sprays'
    }
  },
  {
    name: 'TerraJute Heavy-Duty Horticultural Garden Twine (100m Spool)',
    slug: 'terrajute-heavy-duty-horticultural-garden-twine-100m-spool',
    description: '3-ply natural untreated jute cord for tying tomato vines, staking climbing beans, and bundling pruning branches. Soft on plant stems.',
    price: 249,
    category: 'Gardening & Outdoor Products',
    stock: 85,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% biodegradable golden jute plant fibers',
      organic_elements: 'Zero plastic synthetic filaments; composts right in garden bed',
      packaging: 'Center-pull ball with recycled paper wrapper',
      longevity: 'Strong 15kg tensile strength holds through full growing season',
      single_use_elimination: 'Replaces plastic cable zip ties and polypropylene twine'
    }
  },
  {
    name: 'BokashiFerment Indoor Kitchen Countertop Composter (10L)',
    slug: 'bokashiferment-indoor-kitchen-countertop-composter-10l',
    description: 'Airtight anaerobic kitchen waste fermenter with liquid fertilizer drain tap. Safely processes cooked food, dairy, and scraps with zero odor or fruit flies.',
    price: 1599,
    category: 'Gardening & Outdoor Products',
    stock: 28,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1584990347449-399042b03730?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% post-consumer recycled plastic body',
      organic_elements: 'Includes 1kg bag of inoculated EM wheat bran microbes',
      packaging: 'Cardboard box with zero styrofoam',
      longevity: 'Airtight silicone seal lasts 10+ years',
      single_use_elimination: 'Diverts ~250kg of household food waste from methane-producing landfills'
    }
  },
  {
    name: 'HeritageZinc Hand-Hammered Metal Watering Can (4 Litres)',
    slug: 'heritagezinc-hand-hammered-metal-watering-can-4-litres',
    description: 'Hot-dip galvanized steel watering can with removable brass shower rose sprinkler and balanced dual handle for smooth pouring control.',
    price: 1299,
    category: 'Gardening & Outdoor Products',
    stock: 30,
    eco_score: 95,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% rustproof galvanized sheet steel and solid brass rose',
      organic_elements: 'Plastic-free; won’t crack under ultraviolet outdoor sun',
      packaging: 'Unbleached kraft carton',
      longevity: 'Heavy-gauge steel durable for 20+ years of garden care',
      single_use_elimination: 'Replaces brittle UV-degraded plastic watering cans'
    }
  },
  {
    name: 'RootBreathe Fabric Aeration Grow Bags (Pack of 5, 5-Gallon)',
    slug: 'rootbreathe-fabric-aeration-grow-bags-pack-of-5-5-gallon',
    description: 'Breathable non-woven geotextile plant containers with reinforced webbed handles. Air-prunes root systems to prevent root circling and root rot.',
    price: 599,
    category: 'Gardening & Outdoor Products',
    stock: 65,
    eco_score: 94,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Fabric felt made from recycled PET plastic water bottles',
      organic_elements: 'BPA-free; promotes superior root zone oxygenation',
      packaging: 'Compact cardboard sleeve',
      longevity: 'Washable and reusable for 6+ vegetable growing seasons',
      single_use_elimination: 'Replaces heavy cracked plastic nursery pots'
    }
  },
  {
    name: 'BambooGrove Natural Bee & Pollinator Insect Hotel',
    slug: 'bamboogrove-natural-bee-and-pollinator-insect-hotel',
    description: 'Shelter house packed with varied diameter hollow bamboo canes and pine cones. Provides nesting chambers for solitary mason bees, lacewings, and ladybugs.',
    price: 749,
    category: 'Gardening & Outdoor Products',
    stock: 35,
    eco_score: 98,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Natural FSC pine frame and renewable bamboo hollow reeds',
      organic_elements: 'Untreated natural materials free from chemical wood sealers',
      packaging: 'Recycled kraft box',
      longevity: 'Durable roof shingles protect pollinators for 5+ seasons',
      single_use_elimination: 'Restores essential native pollinator populations in gardens'
    }
  },
  {
    name: 'Artisan Terracotta Hand-Pressed Seedling Plant Markers (Set of 10)',
    slug: 'artisan-terracotta-hand-pressed-seedling-plant-markers-set-of-10',
    description: 'Rustic reusable clay garden stakes. Write plant names with pencil or chalk, and simply wipe clean with a damp cloth each new planting season.',
    price: 299,
    category: 'Gardening & Outdoor Products',
    stock: 55,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural kiln-baked terracotta clay',
      organic_elements: 'Earthy unglazed finish receptive to standard graphite',
      packaging: 'Jute bag with recycled card tag',
      longevity: 'Weatherproof clay endures outdoors for many years',
      single_use_elimination: 'Replaces disposable white plastic garden plant stakes'
    }
  },

  // =========================================================================
  // 8. Travel & Lifestyle (10 products)
  // =========================================================================
  {
    name: 'NomadZero Bamboo Cutlery & Straw Travel Pouch Set',
    slug: 'nomadzero-bamboo-cutlery-and-straw-travel-pouch-set',
    description: 'Compact travel kit with fork, knife, spoon, chopsticks, bamboo straw, and sisal cleaner roll-up inside an organic cotton travel case with clip.',
    price: 399,
    category: 'Travel & Lifestyle',
    stock: 80,
    eco_score: 98,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% FSC certified moso bamboo utensils',
      organic_elements: 'GOTS organic cotton canvas washable carrying roll',
      packaging: 'Zero packaging; paper band with soy printing',
      longevity: 'Washable and reusable for thousands of on-the-go meals',
      single_use_elimination: 'Eliminates disposable plastic spoons, forks, and straws'
    }
  },
  {
    name: 'SolariPower Rugged Waterproof Solar Power Bank (10,000mAh)',
    slug: 'solaripower-rugged-waterproof-solar-power-bank-10000mah',
    description: 'IP67 shockproof portable battery pack with dual USB ports and built-in solar panel for emergency outdoor top-ups. Includes integrated LED flashlight.',
    price: 1899,
    category: 'Travel & Lifestyle',
    stock: 35,
    eco_score: 93,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Recycled polycarbonate casing with silicone bumper edges',
      organic_elements: 'Harnesses renewable solar energy off the grid',
      packaging: '100% plastic-free unbleached cardboard box',
      longevity: 'High-density lithium polymer cell rated for 1,000+ charge cycles',
      single_use_elimination: 'Reduces reliance on non-renewable grid charging'
    }
  },
  {
    name: 'Wanderer Natural Cork Passport Holder & Travel Wallet',
    slug: 'wanderer-natural-cork-passport-holder-and-travel-wallet',
    description: 'Ultralight travel document sleeve crafted from silky Portuguese cork bark. Dedicated slots for passport, boarding pass, 4 cards, and travel currency.',
    price: 699,
    category: 'Travel & Lifestyle',
    stock: 45,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'FSC-certified sustainable cork oak bark fabric',
      organic_elements: 'Natural water and stain-repellent cork surface',
      packaging: 'Recycled card envelope with string clasp',
      longevity: 'Durable, flexible, and age-resistant for 8+ years',
      single_use_elimination: 'Vegan cruelty-free alternative to animal leather'
    }
  },
  {
    name: 'EcoSip Collapsible Silicone Travel Kettle (600ml)',
    slug: 'ecosip-collapsible-silicone-travel-kettle-600ml',
    description: 'Food-grade silicone electric travel kettle with 304 stainless steel heating base. Collapses down to 3 inches for hotel room tea and coffee.',
    price: 1499,
    category: 'Travel & Lifestyle',
    stock: 28,
    eco_score: 91,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'BPA-free European LFGB certified food-grade silicone',
      organic_elements: 'Dual voltage 110V/220V worldwide energy efficiency',
      packaging: 'Recycled cardboard box with cotton storage bag',
      longevity: 'Tested for over 3,000 boil cycles (6+ years)',
      single_use_elimination: 'Avoids hotel plastic coffee pods and disposable cups'
    }
  },
  {
    name: 'TerraTags Biodegradable Bamboo Luggage Tags (Set of 2)',
    slug: 'terratags-biodegradable-bamboo-luggage-tags-set-of-2',
    description: 'Precision laser-engraved bamboo baggage tags with stainless steel wire loop cables. Conceals personal privacy contact card behind a wooden flap.',
    price: 349,
    category: 'Travel & Lifestyle',
    stock: 65,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1585336261026-418071839957?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural moso bamboo laminate',
      organic_elements: 'Braided stainless steel cable with screw lock clasp',
      packaging: 'Recycled kraft card with soy printing',
      longevity: 'Weatherproof and impact-resistant for airport baggage systems',
      single_use_elimination: 'Eliminates sticky single-use paper airline tags'
    }
  },
  {
    name: 'PackPure Organic Cotton Travel Laundry & Shoe Bags (Set of 4)',
    slug: 'packpure-organic-cotton-travel-laundry-and-shoe-bags-set-of-4',
    description: 'Assorted drawstring travel packing organizers with embroidered icons: Dirty Laundry, Shoes, Clean Clothes, and Tech Cables.',
    price: 599,
    category: 'Travel & Lifestyle',
    stock: 50,
    eco_score: 96,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% GOTS certified unbleached organic cotton',
      organic_elements: 'Cotton rope cinch with zero plastic toggles',
      packaging: 'Bound in a reusable cotton pouch',
      longevity: 'Machine washable through hundreds of journeys',
      single_use_elimination: 'Replaces plastic hotel laundry bags and ziplock bags'
    }
  },
  {
    name: 'AquaPure UV-C Self-Cleaning Insulated Water Bottle (600ml)',
    slug: 'aquapure-uv-c-self-cleaning-insulated-water-bottle-600ml',
    description: 'Cap features a deep UV-C LED that neutralizes 99.9% of bacteria and viruses in 90 seconds. Keeps water cold for 24 hours without smelly bottle buildup.',
    price: 2499,
    category: 'Travel & Lifestyle',
    stock: 22,
    eco_score: 94,
    is_featured: 1,
    image_url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Double-wall 18/8 food-grade stainless steel',
      organic_elements: 'Mercury-free solid-state UV-C LED purification',
      packaging: 'Recycled paper cylinder tube',
      longevity: 'USB-C rechargeable cap runs for 30 days per charge (7+ years)',
      single_use_elimination: 'Drink safely from international taps without buying plastic bottles'
    }
  },
  {
    name: 'CampPure Biodegradable Multi-Use Wilderness Camp Soap (250ml)',
    slug: 'camppure-biodegradable-multi-use-wilderness-camp-soap-250ml',
    description: 'Concentrated unscented castile soap formulated for wilderness trekking. Safe for washing dishes, hiking gear, body, and hair in outdoor environments.',
    price: 349,
    category: 'Travel & Lifestyle',
    stock: 55,
    eco_score: 99,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: 'Recycled aluminum travel bottle with leak-proof cap',
      organic_elements: 'Saponified organic olive and coconut oils; zero sulfates',
      packaging: 'Paper label printed with water-based ink',
      longevity: 'Ultra-concentrated: 2-3 drops wash a full camping mess kit',
      single_use_elimination: 'Completely biodegradable in soil without harming wildlife'
    }
  },
  {
    name: 'AeroRest Organic Buckwheat Hull Ergonomic Travel Neck Pillow',
    slug: 'aerorest-organic-buckwheat-hull-ergonomic-travel-neck-pillow',
    description: 'U-shaped travel pillow filled with breathable natural organic buckwheat hulls that conform precisely to neck contours. Removable washable cotton cover.',
    price: 999,
    category: 'Travel & Lifestyle',
    stock: 32,
    eco_score: 97,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% natural organic buckwheat milling hulls',
      organic_elements: 'Unbleached GOTS organic cotton velvet outer cover',
      packaging: 'Shipped in a drawstring cotton travel case',
      longevity: 'Buckwheat hulls never go flat like foam (10+ years)',
      single_use_elimination: 'Zero toxic polyurethane or memory foam chemicals'
    }
  },
  {
    name: 'TerraMat Foldable Pocket-Size Waterproof Picnic Blanket',
    slug: 'terramat-foldable-pocket-size-waterproof-picnic-blanket',
    description: 'Ultra-compact outdoor ground sheet crafted from recycled ocean plastic ripstop with puncture-resistant PU coating and weighted corner pockets.',
    price: 799,
    category: 'Travel & Lifestyle',
    stock: 45,
    eco_score: 92,
    is_featured: 0,
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    eco_factors: {
      recycled_content: '100% rPET recycled plastic bottles',
      organic_elements: 'PFC-free water-resistant coating',
      packaging: 'Built-in attached pocket storage pouch',
      longevity: 'Tear-resistant ripstop withstands rough dirt and sand (6+ years)',
      single_use_elimination: 'Replaces disposable plastic tarp sheets'
    }
  }
];
