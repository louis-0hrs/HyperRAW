// For each sale, add its UTC announcement and end times here and matching
// hidden data-sale notices in index.html and braw-to-mp4.html.
const sales = {
  singlesDay: { start: Date.parse('2026-11-06T23:00:00Z'), end: Date.parse('2026-11-12T12:00:00Z') },
  blackFriday: { start: Date.parse('2026-11-22T23:00:00Z'), end: Date.parse('2026-11-30T23:00:00Z') }
};
let saleTimer;
function updateSaleNotice() {
  clearTimeout(saleTimer);
  const now = Date.now();
  document.querySelectorAll('[data-sale]').forEach((notice) => {
    const sale = sales[notice.dataset.sale];
    notice.hidden = !sale || now < sale.start || now >= sale.end;
  });
  const nextChange = Object.values(sales)
    .flatMap((sale) => [sale.start, sale.end])
    .filter((time) => time > now)
    .sort((a, b) => a - b)[0];
  if (nextChange !== undefined) {
    saleTimer = setTimeout(updateSaleNotice, Math.min(nextChange - now, 2147483647));
  }
}
document.addEventListener('visibilitychange', updateSaleNotice);
updateSaleNotice();
