// For a future sale, update the two UTC timestamps and the offer text in both
// index.html and braw-to-mp4.html. Keep the data-black-friday attributes and
// the hidden attribute on each notice so this scheduler controls visibility.
// Current announcement: November 23 through November 30, 2026 (CET).
const announcementStarts = Date.parse('2026-11-22T23:00:00Z');
const saleEnds = Date.parse('2026-11-30T23:00:00Z');
let saleTimer;
function updateSaleNotice() {
  clearTimeout(saleTimer);
  const now = Date.now();
  document.querySelectorAll('[data-black-friday]').forEach((notice) => {
    notice.hidden = now < announcementStarts || now >= saleEnds;
  });
  const nextChange = now < announcementStarts ? announcementStarts : saleEnds;
  if (now < nextChange) {
    saleTimer = setTimeout(updateSaleNotice, Math.min(nextChange - now, 2147483647));
  }
}
document.addEventListener('visibilitychange', updateSaleNotice);
updateSaleNotice();
