/**
 * Live Network & Proxy Verification Script
 */
async function check() {
  console.log('--- 1. Testing Direct Backend: http://localhost:5000/api/health ---');
  const res1 = await fetch('http://localhost:5000/api/health', {
    headers: { 'Origin': 'http://localhost:5173' }
  });
  console.log('Backend HTTP status:', res1.status);
  console.log('CORS Access-Control-Allow-Origin:', res1.headers.get('access-control-allow-origin'));
  console.log('CORS Access-Control-Allow-Credentials:', res1.headers.get('access-control-allow-credentials'));
  const body1 = await res1.json();
  console.log('Backend body:', JSON.stringify(body1));

  console.log('\n--- 2. Testing Vite Proxy: http://localhost:5173/api/health ---');
  const res2 = await fetch('http://localhost:5173/api/health');
  console.log('Vite proxy status:', res2.status);
  const body2 = await res2.json();
  console.log('Vite proxy body:', JSON.stringify(body2));

  console.log('\n--- 3. Testing Vite Dev Server Root: http://localhost:5173/ ---');
  const res3 = await fetch('http://localhost:5173/');
  console.log('Vite frontend status:', res3.status);
  const text3 = await res3.text();
  console.log('Root HTML contains <div id="root">:', text3.includes('id="root"'));
  console.log('Root HTML contains /src/main.jsx entry point:', text3.includes('/src/main.jsx'));

  console.log('\n--- 4. Testing Products API via Vite Proxy: http://localhost:5173/api/products ---');
  const res4 = await fetch('http://localhost:5173/api/products?page=1&limit=4');
  console.log('Proxy products query status:', res4.status);
  const body4 = await res4.json();
  console.log(`Fetched ${body4.products ? body4.products.length : 0} products via proxy, total count: ${body4.pagination ? body4.pagination.total : 0}`);
}

check().catch(console.error);
