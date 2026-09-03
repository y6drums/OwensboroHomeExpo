/* ==========================================================================
   Owensboro Home Expo — site behaviour
   Vanilla JS, no dependencies. Every module bails out safely if its
   markup isn't present on the current page.
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  /* --- Mobile navigation ------------------------------------------------- */
  function initNav() {
    var toggle = $('.nav__toggle');
    var menu = $('#nav-menu');
    if (!toggle || !menu) return;

    function close() {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', function () {
      var open = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });

    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 1000) close();
    });
  }

  /* --- Scroll reveal ----------------------------------------------------- */
  function initReveal() {
    var items = $$('.reveal');
    if (!items.length) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min(i % 4, 3) * 70 + 'ms';
      io.observe(el);
    });
  }

  /* --- Countdown --------------------------------------------------------- */
  function initCountdown() {
    var root = $('[data-countdown]');
    if (!root || !window.EXPO || !window.EXPO.startsAt) return;

    var target = new Date(window.EXPO.startsAt).getTime();
    if (isNaN(target)) return;

    var out = {
      days:  $('[data-cd="days"]', root),
      hours: $('[data-cd="hours"]', root),
      mins:  $('[data-cd="mins"]', root)
    };

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function tick() {
      var diff = target - Date.now();
      if (diff <= 0) {
        root.innerHTML = '<p class="countdown__live">The show floor is open — come see us at the ' +
          'Owensboro Convention Center.</p>';
        return;
      }
      var mins  = Math.floor(diff / 60000);
      var days  = Math.floor(mins / 1440);
      var hours = Math.floor((mins % 1440) / 60);
      if (out.days)  out.days.textContent  = String(days);
      if (out.hours) out.hours.textContent = pad(hours);
      if (out.mins)  out.mins.textContent  = pad(mins % 60);
    }

    tick();
    setInterval(tick, 30000);
  }

  /* --- Logo optical balance ---------------------------------------------
     Fitting every logo into one fixed box makes a square badge look tiny
     beside a wide wordmark, because the box only constrains height. Scaling
     each mark to roughly equal AREA evens out the perceived weight instead.
     Runs off natural dimensions, so a newly added logo needs no hand-tuning
     (SVGs report their viewBox ratio — which is why they all need one). */
  var LOGO_AREA  = 9500;  /* target px^2 for every mark */
  var LOGO_H_MIN = 34;
  var LOGO_H_MAX = 92;
  var LOGO_W_MAX = 205;

  function balanceLogo(img) {
    var nw = img.naturalWidth, nh = img.naturalHeight;
    if (!nw || !nh) return;

    var ratio = nw / nh;
    var h = Math.sqrt(LOGO_AREA / ratio);
    var w = h * ratio;

    /* Very wide wordmarks would run past the card, so width wins there. */
    if (w > LOGO_W_MAX) { w = LOGO_W_MAX; h = w / ratio; }

    img.style.height = Math.round(Math.max(LOGO_H_MIN, Math.min(LOGO_H_MAX, h))) + 'px';
    img.style.width = 'auto';
  }

  function balanceLogos(scope) {
    $$('.vendor__logo img', scope || document).forEach(function (img) {
      if (img.complete && img.naturalWidth) balanceLogo(img);
      else img.addEventListener('load', function () { balanceLogo(img); }, { once: true });
    });
  }

  /* Exposed so the home page's inline preview script can reuse it. */
  window.HomeExpo = window.HomeExpo || {};
  window.HomeExpo.balanceLogos = balanceLogos;

  /* --- Vendor directory -------------------------------------------------- */
  function initVendors() {
    var grid = $('#vendor-grid');
    if (!grid || !window.VENDORS) return;

    var search = $('#vendor-search');
    var chipWrap = $('#vendor-chips');
    var countEl = $('#vendor-count');
    var activeCat = 'all';

    var globe = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 0 20a15.3 15.3 0 0 1 0-20"/></svg>';
    var phoneIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>';

    function esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
    }

    /* Build category chips from the data */
    if (chipWrap) {
      var used = [];
      window.VENDORS.forEach(function (v) {
        if (used.indexOf(v.category) === -1) used.push(v.category);
      });
      used.sort();

      var html = '<button type="button" class="chip" data-cat="all" aria-pressed="true">All exhibitors</button>';
      used.forEach(function (c) {
        html += '<button type="button" class="chip" data-cat="' + esc(c) + '" aria-pressed="false">' + esc(c) + '</button>';
      });
      chipWrap.innerHTML = html;

      chipWrap.addEventListener('click', function (e) {
        var btn = e.target.closest('.chip');
        if (!btn) return;
        activeCat = btn.dataset.cat;
        $$('.chip', chipWrap).forEach(function (c) {
          c.setAttribute('aria-pressed', c === btn ? 'true' : 'false');
        });
        render();
      });
    }

    function card(v) {
      var links = '';
      if (v.website) {
        links += '<a href="' + esc(v.website) + '" target="_blank" rel="noopener noreferrer">' + globe +
                 'Website<span class="sr-only"> for ' + esc(v.name) + ' (opens in a new tab)</span></a>';
      }
      if (v.phone) {
        links += '<a href="tel:' + esc(v.phone.replace(/[^0-9+]/g, '')) + '">' + phoneIcon + esc(v.phone) + '</a>';
      }
      if (v.booth) {
        links += '<span class="vendor__booth">Booth ' + esc(v.booth) + '</span>';
      }

      var logo = v.logo
        ? '<div class="vendor__logo"><img src="' + esc(v.logo) + '" alt="' + esc(v.name) +
          ' logo" loading="lazy" decoding="async"></div>'
        : '';

      return '<article class="vendor">' +
        logo +
        '<span class="vendor__tag">' + esc(v.category) + '</span>' +
        '<h2 class="vendor__name">' + esc(v.name) + '</h2>' +
        '<p class="vendor__desc">' + esc(v.blurb) + '</p>' +
        (links ? '<div class="vendor__links">' + links + '</div>' : '') +
        '</article>';
    }

    function render() {
      var q = (search && search.value || '').trim().toLowerCase();

      var list = window.VENDORS.filter(function (v) {
        if (activeCat !== 'all' && v.category !== activeCat) return false;
        if (!q) return true;
        return (v.name + ' ' + v.category + ' ' + v.blurb).toLowerCase().indexOf(q) !== -1;
      });

      list.sort(function (a, b) {
        if (!!b.featured !== !!a.featured) return b.featured ? 1 : -1;
        return a.name.localeCompare(b.name);
      });

      if (countEl) {
        countEl.textContent = list.length === window.VENDORS.length
          ? 'Showing all ' + list.length + ' exhibitors'
          : 'Showing ' + list.length + ' of ' + window.VENDORS.length + ' exhibitors';
      }

      grid.innerHTML = list.length
        ? list.map(card).join('')
        : '<div class="empty-state" style="grid-column:1/-1"><h3>No exhibitors match that search</h3>' +
          '<p>Try a different term, or clear the filters to see the full list.</p></div>';

      balanceLogos(grid);
    }

    if (search) {
      var t;
      search.addEventListener('input', function () {
        clearTimeout(t);
        t = setTimeout(render, 130);
      });
    }

    render();
  }

  /* --- Gallery + lightbox ------------------------------------------------ */
  function initGallery() {
    var grid = $('#gallery-grid');
    if (!grid || !window.GALLERY) return;

    var shots = window.GALLERY;

    function esc(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    grid.innerHTML = shots.map(function (g, i) {
      return '<button type="button" class="shot" data-i="' + i + '">' +
             '<img src="' + esc(g.thumb || g.src) + '" alt="' + esc(g.alt) +
             '" loading="lazy" decoding="async">' +
             '<span class="shot__cap">' + esc(g.cap || '') + '</span></button>';
    }).join('');

    /* Lightbox */
    var box = $('#lightbox');
    var boxImg = $('#lightbox-img');
    var boxCap = $('#lightbox-cap');
    var boxNum = $('#lightbox-count');
    var idx = 0;
    var lastFocus = null;

    function show() {
      var g = shots[idx];
      if (!g) return;
      boxImg.src = g.src;
      boxImg.alt = g.alt || '';
      boxCap.textContent = g.cap || '';
      if (boxNum) boxNum.textContent = (idx + 1) + ' of ' + shots.length;
    }

    function openBox(i) {
      if (!box || !shots[i]) return;
      idx = i;
      lastFocus = document.activeElement;
      show();
      box.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      var close = $('.lightbox__close', box);
      if (close) close.focus();
    }

    function step(d) {
      if (!shots.length) return;
      idx = (idx + d + shots.length) % shots.length;
      show();
    }

    function closeBox() {
      if (!box) return;
      box.classList.remove('is-open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    grid.addEventListener('click', function (e) {
      var btn = e.target.closest('.shot[data-i]');
      if (btn) openBox(parseInt(btn.dataset.i, 10));
    });

    if (box) {
      box.addEventListener('click', function (e) {
        if (e.target === box || e.target.closest('.lightbox__close')) return closeBox();
        if (e.target.closest('.lightbox__nav--prev')) return step(-1);
        if (e.target.closest('.lightbox__nav--next')) return step(1);
      });
      document.addEventListener('keydown', function (e) {
        if (!box.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeBox();
        if (e.key === 'ArrowLeft') step(-1);
        if (e.key === 'ArrowRight') step(1);
      });
    }
  }

  /* --- FAQ accordion ----------------------------------------------------- */
  function initFaq() {
    $$('.faq__q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        btn.setAttribute('aria-expanded', open ? 'false' : 'true');
        if (panel) panel.classList.toggle('is-open', !open);
      });
    });
  }

  /* --- Forms ------------------------------------------------------------- */
  function initForms() {
    $$('form[data-endpoint]').forEach(function (form) {
      var endpoint = form.dataset.endpoint;
      var statusEl = $('.form-status', form);
      var submitBtn = form.querySelector('[type="submit"]');
      var successPanel = document.getElementById(form.dataset.success || '');

      function setStatus(kind, msg) {
        if (!statusEl) return;
        statusEl.className = 'form-status is-shown form-status--' + kind;
        statusEl.textContent = msg;
        statusEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      function clearErrors() {
        $$('[aria-invalid="true"]', form).forEach(function (el) { el.removeAttribute('aria-invalid'); });
        $$('.error-msg', form).forEach(function (el) { el.classList.remove('is-shown'); });
      }

      /* Native validation, surfaced inline rather than via browser bubbles */
      function validate() {
        clearErrors();
        var firstBad = null;
        var seenRadioGroups = {};

        $$('input, select, textarea', form).forEach(function (el) {
          if (el.type === 'hidden' || el.disabled || el.name === '_gotcha') return;

          /* A radio group is one control — only report it against its first member. */
          if (el.type === 'radio') {
            if (seenRadioGroups[el.name]) return;
            seenRadioGroups[el.name] = true;
          }

          if (el.checkValidity()) return;
          el.setAttribute('aria-invalid', 'true');

          var msg = document.getElementById(el.id + '-error');
          if (msg) {
            msg.textContent = el.validity.valueMissing
              ? (msg.dataset.requiredMsg || el.dataset.requiredMsg || 'This field is required.')
              : el.validationMessage;
            msg.classList.add('is-shown');
          }
          if (!firstBad) firstBad = el;
        });
        if (firstBad) {
          firstBad.focus();
          firstBad.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return !firstBad;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!validate()) return;

        var fd = new FormData(form);

        /* Honeypot — silently succeed for bots */
        if (fd.get('_gotcha')) return;

        var payload = {};
        fd.forEach(function (value, key) {
          if (key === '_gotcha') return;
          if (payload[key] !== undefined) {
            payload[key] = [].concat(payload[key], value);
          } else {
            payload[key] = value;
          }
        });

        if (submitBtn) {
          submitBtn.setAttribute('aria-busy', 'true');
          submitBtn.dataset.label = submitBtn.textContent;
          submitBtn.textContent = 'Sending…';
        }
        if (statusEl) statusEl.classList.remove('is-shown');

        fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
          .then(function (res) {
            return res.json().catch(function () { return {}; })
              .then(function (body) { return { ok: res.ok, body: body }; });
          })
          .then(function (r) {
            if (!r.ok) throw new Error(r.body && r.body.error || 'Request failed');
            if (successPanel) {
              form.style.display = 'none';
              successPanel.classList.add('is-shown');
              successPanel.setAttribute('tabindex', '-1');
              successPanel.focus();
              successPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
              setStatus('ok', 'Thanks — your message is on its way. We’ll be in touch shortly.');
              form.reset();
            }
          })
          .catch(function () {
            setStatus('error',
              'Sorry — something went wrong sending that. Please try again, or email us directly at adam@greenriverbia.com.');
          })
          .finally(function () {
            if (submitBtn) {
              submitBtn.removeAttribute('aria-busy');
              if (submitBtn.dataset.label) submitBtn.textContent = submitBtn.dataset.label;
            }
          });
      });

      /* Clear a field's error as soon as the visitor fixes it */
      function clearFieldError(el) {
        if (!el || !el.checkValidity || !el.checkValidity()) return;
        var group = el.type === 'radio' && el.name
          ? $$('input[name="' + el.name + '"]', form)
          : [el];
        group.forEach(function (member) {
          member.removeAttribute('aria-invalid');
          var msg = document.getElementById(member.id + '-error');
          if (msg) msg.classList.remove('is-shown');
        });
      }

      form.addEventListener('input', function (e) { clearFieldError(e.target); });
      form.addEventListener('change', function (e) { clearFieldError(e.target); });
    });
  }

  /* --- Footer year ------------------------------------------------------- */
  function initYear() {
    $$('[data-current-year]').forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* --- Boot -------------------------------------------------------------- */
  function boot() {
    initNav();
    initReveal();
    initCountdown();
    initVendors();
    initGallery();
    initFaq();
    initForms();
    initYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
