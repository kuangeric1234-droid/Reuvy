/* Ruevii homepage — interactions */
(function () {
  "use strict";

  /* sticky nav shadow on scroll */
  var nav = document.getElementById("nav");
  function onScroll() {
    if (window.scrollY > 8) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- command palette ---- */
  var cmdk = document.getElementById("cmdk");
  var input = document.getElementById("cmdkInput");
  var list = document.getElementById("cmdkList");

  var ITEMS = [
    { sec: "Ask Ruevii AI",  label: "Which injectors are below target this month?", hint: "AI" },
    { sec: "Ask Ruevii AI",  label: "Draft a re-book SMS for lapsed clients",       hint: "AI" },
    { sec: "Ask Ruevii AI",  label: "Summarise today’s clinical notes",             hint: "AI" },
    { sec: "Navigate",       label: "Today’s calendar",                             hint: "↵" },
    { sec: "Navigate",       label: "Open client — Mia Albescu",                    hint: "↵" },
    { sec: "Navigate",       label: "S4 drug register",                             hint: "↵" },
    { sec: "Navigate",       label: "Staff performance report",                     hint: "↵" },
    { sec: "Actions",        label: "Book new appointment",                         hint: "B" },
    { sec: "Actions",        label: "Take a payment",                               hint: "P" },
    { sec: "Actions",        label: "Raise a purchase order",                       hint: "O" },
    { sec: "Actions",        label: "Fill open slots from waitlist",                hint: "W" }
  ];

  var selected = 0;
  var filtered = ITEMS.slice();

  function render() {
    list.innerHTML = "";
    if (filtered.length === 0) {
      list.innerHTML = '<div class="cmdk-empty">No matches — try “payment”, “consent”, or “report”.</div>';
      return;
    }
    var lastSec = null;
    filtered.forEach(function (it, i) {
      if (it.sec !== lastSec) {
        var s = document.createElement("div");
        s.className = "cmdk-sec";
        s.textContent = it.sec;
        list.appendChild(s);
        lastSec = it.sec;
      }
      var el = document.createElement("div");
      el.className = "cmdk-item" + (i === selected ? " sel" : "");
      el.innerHTML = '<span class="ic"></span>' + it.label + '<span class="hint">' + it.hint + "</span>";
      el.addEventListener("mouseenter", function () { selected = i; paintSel(); });
      el.addEventListener("click", close);
      list.appendChild(el);
    });
  }

  function paintSel() {
    var items = list.querySelectorAll(".cmdk-item");
    items.forEach(function (el, i) { el.classList.toggle("sel", i === selected); });
  }

  function filter(q) {
    q = q.trim().toLowerCase();
    filtered = q ? ITEMS.filter(function (it) { return it.label.toLowerCase().indexOf(q) > -1; }) : ITEMS.slice();
    selected = 0;
    render();
  }

  function open() {
    cmdk.classList.add("open");
    cmdk.setAttribute("aria-hidden", "false");
    input.value = "";
    filter("");
    setTimeout(function () { input.focus(); }, 20);
  }
  function close() {
    cmdk.classList.remove("open");
    cmdk.setAttribute("aria-hidden", "true");
  }

  document.addEventListener("keydown", function (e) {
    var isK = (e.key === "k" || e.key === "K");
    if ((e.metaKey || e.ctrlKey) && isK) { e.preventDefault(); cmdk.classList.contains("open") ? close() : open(); return; }
    if (!cmdk.classList.contains("open")) return;
    if (e.key === "Escape") { close(); }
    else if (e.key === "ArrowDown") { e.preventDefault(); selected = Math.min(selected + 1, filtered.length - 1); paintSel(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); selected = Math.max(selected - 1, 0); paintSel(); }
    else if (e.key === "Enter") { e.preventDefault(); close(); }
  });

  input.addEventListener("input", function () { filter(input.value); });
  cmdk.querySelector("[data-close]").addEventListener("click", close);

  var heroSearch = document.getElementById("heroSearch");
  if (heroSearch) heroSearch.addEventListener("click", open);
})();
