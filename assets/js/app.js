/* =============================================================================
   Three small behaviours, all additive. With JavaScript off the pages read as
   prose: both languages show, every chapter shows, every fold is open.
   ========================================================================== */
(function () {
  'use strict';
  document.documentElement.classList.add('js');

  /* ---------------------------------------------------------- language --- */
  var KEY = 'gems-pitch-lang';
  var root = document.documentElement;

  function setLang(l) {
    root.setAttribute('data-lang', l);
    root.setAttribute('lang', l === 'zh' ? 'zh-Hant' : 'en');
    try { localStorage.setItem(KEY, l); } catch (e) {}
    Array.prototype.forEach.call(document.querySelectorAll('[data-lang-btn]'), function (b) {
      b.textContent = l === 'zh' ? 'English' : '中文';
      b.setAttribute('aria-label', l === 'zh' ? 'Switch to English' : '切換到中文');
    });
    // the thumb has to be re-measured: the labels changed width
    window.requestAnimationFrame(placeThumbs);
  }

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  setLang(saved === 'en' || saved === 'zh' ? saved : 'zh');

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-lang-btn]');
    if (!b) return;
    setLang(root.getAttribute('data-lang') === 'zh' ? 'en' : 'zh');
  });

  /* -------------------------------------------------- segmented control --- */
  function placeThumbs() {
    Array.prototype.forEach.call(document.querySelectorAll('.seg__track'), function (track) {
      var thumb = track.querySelector('.seg__thumb');
      var on = track.querySelector('.seg__btn[aria-selected="true"]');
      if (!thumb || !on) return;
      thumb.style.width = on.offsetWidth + 'px';
      thumb.style.transform = 'translateX(' + (on.offsetLeft - 5) + 'px)';
      track.classList.add('has-thumb');
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-rail]'), function (rail) {
    var track = rail.querySelector('.seg__track');
    if (!track) return;
    var btns = Array.prototype.slice.call(track.querySelectorAll('.seg__btn'));
    var thumb = document.createElement('span');
    thumb.className = 'seg__thumb';
    track.insertBefore(thumb, track.firstChild);

    function show(i, focus) {
      btns.forEach(function (b, j) {
        b.setAttribute('aria-selected', j === i ? 'true' : 'false');
        b.setAttribute('tabindex', j === i ? '0' : '-1');
        var p = document.getElementById(b.getAttribute('aria-controls'));
        if (!p) return;
        if (j === i) {
          p.hidden = false;
          p.classList.add('is-in');
          window.setTimeout(function () { p.classList.remove('is-in'); }, 600);
        } else {
          p.hidden = true;
        }
      });
      if (focus) btns[i].focus();
      placeThumbs();
    }

    btns.forEach(function (b, i) {
      b.addEventListener('click', function () { show(i, false); });
      b.addEventListener('keydown', function (e) {
        var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        show((i + d + btns.length) % btns.length, true);
      });
    });

    var start = Math.max(0, btns.findIndex(function (b) { return b.getAttribute('aria-selected') === 'true'; }));
    show(start, false);
  });

  window.addEventListener('resize', placeThumbs);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeThumbs);

  /* ------------------------------------------------- deep link into a tab -- */
  function openFor(hash) {
    if (!hash || hash.length < 2) return;
    var el = document.getElementById(hash.slice(1));
    if (!el) return;
    var panel = el.closest('.panel');
    if (panel && panel.hidden) {
      var btn = document.querySelector('[aria-controls="' + panel.id + '"]');
      if (btn) btn.click();
    }
    var fold = el.closest('details.fold');
    if (fold) fold.open = true;
    window.requestAnimationFrame(function () { el.scrollIntoView({ block: 'start' }); });
  }
  openFor(window.location.hash);
  window.addEventListener('hashchange', function () { openFor(window.location.hash); });
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href').length > 1) openFor(a.getAttribute('href'));
  });
}());
