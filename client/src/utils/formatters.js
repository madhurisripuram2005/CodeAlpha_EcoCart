/**
 * EcoCart Formatting Utilities
 * Standardizes currency formatting to Indian Rupees (₹) and numbers across the application.
 */

export function formatINR(amount) {
  const numeric = typeof amount === 'number' ? amount : parseFloat(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(numeric);
}

export function formatNumber(num) {
  const numeric = typeof num === 'number' ? num : parseInt(num, 10) || 0;
  return new Intl.NumberFormat('en-IN').format(numeric);
}
