var QUICK = {
  plaster: function(a) {
    return [
      { n: "Штукатурка гипсовая, слой 10 мм", q: a * 8.5, u: "кг" },
      { n: "Бетоноконтакт", q: a * 0.3, u: "кг" }
    ];
  },
  putty: function(a) {
    return [
      { n: "Шпаклёвка финишная, слой 2 мм", q: a * 2.2, u: "кг" },
      { n: "Грунтовка глубокого проникновения, 2 слоя", q: a * 0.3, u: "кг" }
    ];
  },
  tile: function(a) {
    var tiles = Math.ceil(a * 1.1 / 0.18);
    return [
      { n: "Плитка 600 × 300 с запасом 10 %", q: a * 1.1, u: "м\u00B2" },
      { n: "Клей, зуб 6 мм", q: a * 3, u: "кг" },
      { n: "Грунтовка глубокого проникновения", q: a * 0.15, u: "кг" },
      { n: "Крестики", q: tiles * 4, u: "шт" }
    ];
  },
  drywall: function(a) {
    return [
      { n: "Листы ГКЛ 1200 × 2500", q: Math.ceil(a * 1.1 / 3), u: "шт" },
      { n: "Профиль стоечный, шаг 600 мм", q: a * 1.8, u: "пог.м" },
      { n: "Саморезы 25 мм", q: Math.ceil(a * 15), u: "шт" },
      { n: "Лента-серпянка", q: a * 1.2, u: "пог.м" }
    ];
  },
  floor: function(a) {
    return [
      { n: "Пескобетон, стяжка 50 мм", q: a * 100, u: "кг" },
      { n: "Грунтовка глубокого проникновения", q: a * 0.15, u: "кг" }
    ];
  },
  insulation: function(a) {
    return [
      { n: "Утеплитель с запасом 5 %", q: a * 1.05, u: "м\u00B2" },
      { n: "Объём при толщине 100 мм", q: a * 1.05 * 0.1, u: "м\u00B3" }
    ];
  },
  masonry: function(a) {
    return [
      { n: "Кирпич, кладка в полкирпича", q: Math.ceil(a * 51 * 1.05), u: "шт" },
      { n: "Кладочная смесь", q: a * 49.7, u: "кг" }
    ];
  }
};

$(function() {
  $widget.each(function(widgetIndex, thisWidget) {
    var root = $(thisWidget).find("[data-ct]")[0];
    if (!root) return;
    if (root.getAttribute("data-ct-ready")) return;
    root.setAttribute("data-ct-ready", "1");

    try {
      init(root);
    } catch (err) {
      if (window.console) window.console.error("Тизер калькулятора:", err);
    }
  });

  function init(root) {
    var NODES = {
      link: root.querySelector("[data-t-link]"),
      rows: root.querySelector("[data-t-rows]"),
      mode: root.querySelector('[data-t="mode"]'),
      area: root.querySelector('[data-t="area"]')
    };

    var baseUrl = root.getAttribute("data-url") || "/page/stroitelnyy-kalkulyator";
    var pending = false;

    function el(tag, cls, text) {
      var node = document.createElement(tag);
      if (cls) node.className = cls;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    function fmt(n) {
      return n.toFixed(1).replace(".", ",").replace(/,0$/, "");
    }

    function render() {
      var mode = NODES.mode.value;
      var raw = String(NODES.area.value).replace(",", ".");
      var area = parseFloat(raw);
      var max = parseFloat(NODES.area.getAttribute("max"));

      if (!isNaN(area) && !isNaN(max) && area > max) {
        area = max;
        NODES.area.value = max;
      }

      while (NODES.rows.firstChild) NODES.rows.removeChild(NODES.rows.firstChild);

      if (isNaN(area) || area <= 0) {
        NODES.rows.appendChild(el("div", "ct-row__empty", "Введите площадь"));
      } else {
        var frag = document.createDocumentFragment();

        QUICK[mode](area).forEach(function(r) {
          var line = el("div", "ct-row");
          line.appendChild(el("span", "ct-row__name", r.n));
          line.appendChild(el("span", "ct-row__qty", fmt(r.q) + " " + r.u));
          frag.appendChild(line);
        });

        NODES.rows.appendChild(frag);
      }

      var sep = baseUrl.indexOf("?") === -1 ? "?" : "&";
      var tail = "mode=" + mode + (isNaN(area) || area <= 0 ? "" : "&area=" + area);
      NODES.link.setAttribute("href", baseUrl + sep + tail);
    }

    root.addEventListener("input", function(e) {
      if (!e.target.classList.contains("ct-field__ctrl")) return;
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(function() {
        pending = false;
        render();
      });
    });

    root.addEventListener("change", function(e) {
      if (e.target.classList.contains("ct-field__ctrl")) render();
    });

    render();
  }
});
