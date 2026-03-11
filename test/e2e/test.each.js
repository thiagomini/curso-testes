import { test } from 'node:test';

const PRINTF_PLACEHOLDER = /%%|%[sdifj#]/g;
const OBJECT_PLACEHOLDER = /\$([a-zA-Z_][a-zA-Z0-9_]*)/g;

function formatTitle(name, row, index) {
  if (Array.isArray(row)) {
    let argIndex = 0;
    return name.replace(PRINTF_PLACEHOLDER, (match) => {
      if (match === '%%') return '%';
      if (match === '%#') return String(index);
      const value = row[argIndex++];
      if (match === '%d' || match === '%i')
        return parseInt(value, 10).toString();
      if (match === '%f') return parseFloat(value).toString();
      if (match === '%j') return JSON.stringify(value);
      return String(value);
    });
  }
  return name.replace(OBJECT_PLACEHOLDER, (match, key) =>
    Object.prototype.hasOwnProperty.call(row, key) ? String(row[key]) : match,
  );
}

test.each = (table) => (name, fn, options) => {
  table.forEach((row, index) => {
    const title = formatTitle(name, row, index);
    const args = Array.isArray(row) ? row : [row];
    options !== undefined
      ? test(title, options, () => fn(...args))
      : test(title, () => fn(...args));
  });
};
