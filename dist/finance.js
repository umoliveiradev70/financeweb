export function parseAmount(raw) {
  const s = String(raw).trim().replace(/\s/g, '');
  if (!s || !/^(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(s)) return NaN;
  const n = Number(s.replace(/\./g, '').replace(',', '.'));
  return Number.isFinite(n) && n >= 0 && n <= 1e12 ? n : NaN;
}
export function convert(amount, from, to, rates) {
  if (!Number.isFinite(amount) || amount < 0) return null;
  if (from === to) return amount;
  if (!(rates[from] > 0) || !(rates[to] > 0)) return null;
  return amount * rates[from] / rates[to];
}
export function normalizeQuotes(data) {
  const result = {};
  for (const code of ['USD', 'EUR', 'GBP']) {
    const row = data[code + 'BRL'];
    if (!row || !(Number(row.bid) > 0) || !Number.isFinite(Number(row.timestamp)) || Number(row.timestamp) <= 0) throw new Error('Cotação inválida');
    result[code] = { rate: Number(row.bid), change: Number.isFinite(Number(row.pctChange)) ? Number(row.pctChange) : null, time: Number(row.timestamp) * 1000 };
  }
  const usd = result.USD;
  result.BRL = { rate: 1 / usd.rate, change: usd.change === null ? null : (1 / (1 + usd.change / 100) - 1) * 100, time: usd.time };
  return result;
}
export function normalizeHistory(data) {
  if (!Array.isArray(data)) throw new Error('Histórico inválido');
  const points = data.map(x => ({ value: Number(x.bid), time: Number(x.timestamp) * 1000 })).filter(x => x.value > 0 && Number.isFinite(x.value) && x.time > 0 && Number.isFinite(x.time)).sort((a,b) => a.time-b.time);
  if (points.length < 2) throw new Error('Histórico insuficiente');
  return points;
}
