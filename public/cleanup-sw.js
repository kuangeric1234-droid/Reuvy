// Removes any leftover service workers + caches from a prior app on this
// origin (TDSC portal, etc). Runs once on page load. Safe to keep
// indefinitely — no-op once everything is clean.
(function () {
  try {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (regs) {
        regs.forEach(function (r) {
          r.unregister();
        });
      });
    }
    if (typeof caches !== "undefined" && caches.keys) {
      caches.keys().then(function (keys) {
        keys.forEach(function (k) {
          caches.delete(k);
        });
      });
    }
  } catch (e) {
    // swallow — nothing to do if APIs unavailable
  }
})();
