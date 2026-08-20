var NORMS = {
  plasterGypsum: 8.5,        // кг/м² на 10 мм
  plasterCement: 17,         // кг/м² на 10 мм
  putty: 1.1,                // кг/м² на 1 мм
  primerDeep: 0.15,
  primerConcrete: 0.3,              // л/м² за слой
  paint: 0.15,               // л/м² за слой

  tileGluePerMm: 0.5,
  groutDensity: 1.6,
  crossPerTile: 4,
  clipPerTile: 4,
  sheetArea: 3,              // м² в листе ГКЛ 1200x2500
  sheetReserve: 1.1,
  profileStud: { 600: 1.8, 400: 2.7 },   // пог.м/м²
  screws: 15,                // шт/м² на слой
  tape: 1.2,                 // пог.м/м²
  hangers: 1.4,              // шт/м², потолок
  screed: 20,                // кг/м² на 10 мм
  selfLevel: 15,             // кг/м² на 10 мм
  brick: { 0.5: 51, 1: 102, 1.5: 153 },  // шт/м²
  mortarPerM3: 0.23,
  mortarDensity: 1800,
  blockGluePerM3: 25
};

var PACKS = {
  plaster: 30, putty: 20, primerDeep: 10, primerConcrete: 15, paint: 9,
  tileGlue: 25, grout: 2, screed: 40, selfLevel: 20, blockGlue: 25
};

var PRODUCTS = {"plaster_gypsum":[{"a":"45540878","n":"Штукатурка гипсовая KNAUF «Гольдбанд» 30 кг","p":30.0},{"a":"45540879","n":"Штукатурка гипсовая KNAUF «Ротбанд» 30 кг","p":30.0},{"a":"45540880","n":"Штукатурка гипсовая KNAUF МП 75 30 кг белый","p":30.0},{"a":"45540881","n":"Штукатурка гипсовая KNAUF МП 75 30 кг серый","p":30.0},{"a":"45540882","n":"Штукатурка гипсовая UNIS Теплон белый 30 кг","p":30.0},{"a":"45540883","n":"Штукатурка гипсовая Волма-Слой 30 кг","p":30.0}],"putty":[{"a":"45540866","n":"DANOGIPS SuperFinish шпатлевка гипсовая 28 кг/17 л (Sheetrock)","p":28.0},{"a":"45540870","n":"Шпаклевка гипсовая KNAUF Унихард 20 кг","p":20.0},{"a":"45540871","n":"Шпаклевка гипсовая KNAUF Фуген 30 кг","p":30.0},{"a":"45540872","n":"Шпаклевка для заделки швов Knauf Унифлот 5 кг","p":5.0},{"a":"45540873","n":"Шпаклевка полимерная Danogips Dano Jet 5 выравнивающая 25 кг","p":25.0},{"a":"45540874","n":"Шпаклевка связующая белая Vetonit KR 20 кг","p":20.0}],"primer_concrete":[{"a":"45540844","n":"Бетогрунт KNAUF 15 кг","p":15.0},{"a":"45540845","n":"Бетоноконтакт Ceresit СТ 19 15 кг","p":15.0},{"a":"45540846","n":"Бетоноконтакт Юнис 20 кг","p":20.0},{"a":"45540847","n":"Грунт бетоноконтакт jetbau 14 кг","p":14.0},{"a":"45540862","n":"Бетоноконтакт Старатели 20 кг","p":20.0}],"primer_deep":[{"a":"45540849","n":"Грунтовка Ceresit CT17 PRO 10 кг","p":10.0},{"a":"45540850","n":"Грунтовка KNAUF Миттельгрунд 10 кг","p":10.0},{"a":"45540851","n":"Грунтовка KNAUF Тифенгрунд 10 кг","p":10.0},{"a":"45540852","n":"Грунтовка OSCAR глубокого проникновения 10 кг","p":10.0}],"tile_glue":[{"a":"45540578","n":"Клей плиточный Ceresit CM 11 25 кг","p":25.0},{"a":"45540579","n":"Клей плиточный Ceresit CM 14 25 кг","p":25.0},{"a":"45540580","n":"Клей плиточный Ceresit CM 16 25 кг","p":25.0},{"a":"45540581","n":"Клей плиточный Litokol K17, 25 кг","p":25.0},{"a":"45540582","n":"Клей плиточный Litokol Litoflex K80, 25 кг","p":25.0},{"a":"45540583","n":"Клей плиточный Litokol Litoplus K55, 25 кг (белый)","p":25.0}],"tile_cross":[{"a":"45540593","n":"Крестики для кафеля 1,0 мм, 200 шт","p":200.0},{"a":"45540594","n":"Крестики для кафеля 1,5 мм, 200 шт","p":200.0},{"a":"45540595","n":"Крестики для кафеля 2,0 мм, 200 шт","p":200.0},{"a":"45540596","n":"Крестики для кафеля 2,5 мм, 200 шт","p":200.0}],"svp_clip":[{"a":"45540597","n":"3Д PLM Norm свп зажим (100) 1,5 мм","p":100.0},{"a":"45540598","n":"3Д PLM Norm свп зажим (100) 1 мм","p":100.0},{"a":"45540605","n":"СВП зажим 0,8 мм Slim 500 шт 3D KRESTIKI","p":500.0},{"a":"45540606","n":"СВП зажим 1,5 мм Slim 500 шт 3D KRESTIKI","p":500.0}],"svp_wedge":[{"a":"45540600","n":"Клин для кафельной плитки большой, 32 × 8 × 9 мм, 50 шт","p":50.0},{"a":"45540601","n":"Клин для кафельной плитки малый 27 × 6 × 6 мм, 100 шт","p":100.0},{"a":"45540602","n":"Клин для свп ЖЕЛТЫЙ 200 шт","p":200.0},{"a":"45540604","n":"СВП Клин 50 шт, пакет","p":50.0}],"gkl":[{"a":"45540056","n":"KNAUF ГВЛ 2500 × 1200 × 10 влагостойкий","p":null},{"a":"45540057","n":"KNAUF ГВЛ 2500 × 1200 × 12,5 влагостойкий","p":null},{"a":"45540058","n":"KNAUF ГКЛ 12,5 × 2500 × 1200 обычный","p":null},{"a":"45540059","n":"KNAUF ГКЛ 9,5 × 2500 × 1200 обычный","p":null},{"a":"45540060","n":"KNAUF ГКЛ 12,5 × 2000 × 1200 обычный","p":null},{"a":"45540061","n":"KNAUF ГКЛв 12,5 × 2000 × 1200 влагостойкий","p":null}],"profile_stud":[{"a":"45540085","n":"Профиль ПП 60 × 27 × 3000 KNAUF","p":null},{"a":"45540087","n":"Профиль ПС-2 50 × 50 × 3000 KNAUF","p":null},{"a":"45540088","n":"Профиль ПС-5 75 × 50 × 3000 KNAUF","p":null},{"a":"45540089","n":"Профиль ПС-6 100 × 50 × 3000 KNAUF","p":null}],"profile_guide":[{"a":"45540082","n":"Профиль ПН-2 50 × 40 × 3000 KNAUF","p":null},{"a":"45540083","n":"Профиль ПН-5 75 × 40 × 3000 KNAUF","p":null},{"a":"45540084","n":"Профиль ПН-6 100 × 40 × 3000 KNAUF","p":null}],"hanger":[{"a":"45540076","n":"Подвес прямой 60 × 27 антивибрационный KNAUF 0,9 мм","p":null},{"a":"45540077","n":"Прямой подвес 60 × 27 × 0,7","p":null}],"screw":[{"a":"45540392","n":"Саморез кровельный цинк. 5,5 × 25","p":null},{"a":"45540393","n":"Саморез кровельный цинк. 5,5 × 38","p":null},{"a":"45540394","n":"Саморез кровельный цинк. 5,5 × 51","p":null},{"a":"45540395","n":"Саморез кровельный цинк. 5,5 × 80","p":null},{"a":"45540396","n":"Саморез клопы 5 × 11, фосфатированный, острый","p":null},{"a":"45540397","n":"Саморез с прессшайбой 4,2 × 13 головка п/сферическая, острый","p":null}],"screed":[{"a":"45540859","n":"Пескобетон М-300 Евромикс, 40 кг","p":40.0},{"a":"45540860","n":"Пескобетон М-300 Русеан, 40 кг","p":40.0}],"self_level":[{"a":"45540863","n":"Наливной пол UNIS Горизонт Универсальный, 20 кг","p":20.0},{"a":"45540864","n":"Наливной пол Быстротвердеющий Старатели 20 кг","p":20.0},{"a":"45540865","n":"Наливной пол Волма Нивелир Экспресс 20 кг","p":20.0},{"a":"45540867","n":"Наливной пол Weber Vetonit FAST 4100 20 кг","p":20.0},{"a":"45540868","n":"Наливной пол Weber Vetonit FAST 3000, 20 кг","p":20.0},{"a":"45540869","n":"Наливной пол Weber Vetonit FAST 4000, 20 кг","p":20.0}],"insulation":[{"a":"45540117","n":"Rockwool Рок Фасад 1000 × 600 × 100 мм (1,2 м²)","p":null},{"a":"45540118","n":"Rockwool Скандик 100 мм (2,88 м²)","p":null},{"a":"45540119","n":"Rockwool Скандик 50 мм (4,76 м²)","p":null},{"a":"45540120","n":"Rockwool Рок Фасад 1000 × 600 × 50 мм (2,4 м²)","p":null},{"a":"45540131","n":"ПЕНОПЛЭКС Утеплитель экструз. 20 × 585 × 1185 20 шт","p":20.0},{"a":"45540132","n":"ПЕНОПЛЭКС Утеплитель экструз. 100 × 585 × 1185 4 шт 2,74 м²","p":4.0}],"brick":[{"a":"45540826","n":"Кирпич строительный красный полнотелый 250 × 120 × 65","p":null}],"block":[{"a":"45540821","n":"Газобетонный блок Бонолит D500 600 × 250 × 100 мм","p":null},{"a":"45540822","n":"Газобетонный блок Бонолит D500 600 × 250 × 150 мм","p":null},{"a":"45540823","n":"Газобетонный блок Бонолит D500 600 × 250 × 200 мм","p":null},{"a":"45540824","n":"Газобетонный блок Бонолит D500 600 × 250 × 50 мм","p":null},{"a":"45540825","n":"Газобетонный блок Бонолит D500 600 × 250 × 75 мм","p":null}],"block_glue":[{"a":"45540858","n":"Клей для кладки блоков Волма блок 25 кг","p":25.0}],"mortar":[{"a":"45540855","n":"Кладочная смесь М-200 Русеан 40 кг","p":40.0}],"tape":[{"a":"45540090","n":"KNAUF Дихтунгсбанд (лента для профилей) 30 мм × 30 м","p":null},{"a":"45540091","n":"KNAUF Дихтунгсбанд (лента для профилей) 50 мм × 30 м","p":null},{"a":"45540092","n":"KNAUF Дихтунгсбанд (лента для профилей) 70 мм × 30 м","p":null},{"a":"45540093","n":"KNAUF Дихтунгсбанд (лента для профилей) 95 мм × 30 м","p":null},{"a":"45540094","n":"Перфорированная лента прямая 20 × 25 м","p":null}]};

var TIPS = {
  plaster: [
    ["Маяки по лазеру", "Шаг между маяками делайте на 20 см меньше длины правила. Иначе правило проваливается между ними и стена выходит волной."],
    ["Гипс не любит воду", "В санузле и на неотапливаемой даче гипсовая штукатурка со временем наберёт влагу и потеряет прочность."],
    ["Толщина за один проход", "Гипсовую кладут слоем до 50 мм за раз. Толще нанесёте — пойдут трещины при высыхании."],
    ["Бетоноконтакт только на гладкое", "На бетон и монолит он обязателен, на пористую кладку берут состав глубокого проникновения."],
    ["Углы съедают материал", "На откосы, углы и примыкания уходит до 15 % сверх площади стен. Закладывайте отдельно."],
    ["Раствор живёт 40 минут", "Мешайте столько, сколько успеете выработать. Подливать воду в схватившийся нельзя."]
  ],
  putty: [
    ["Грунт между слоями", "Шпаклёвка по непрогрунтованной штукатурке отдаёт воду в основание и трескается."],
    ["Тонкий слой лучше толстого", "Два прохода по миллиметру дают ровнее, чем один в два. И шлифовать меньше."],
    ["Свет сбоку при шлифовке", "Поставьте лампу почти вплотную к стене — тени покажут все ямы, которые днём не видно."],
    ["Финиш только на сухое", "Штукатурка сохнет 5–7 суток. Зашпаклюете раньше — получите пятна и отслоение."],
    ["Пыль убрать до грунта", "Грунтовка по пыли склеивает пыль, а не основание. Обеспыльте пылесосом."],
    ["Запас на переделку", "Первый раз почти всегда шлифуют лишнего и добавляют слой. Берите на 15 % больше."]
  ],
  tile: [
    ["Слой не тоньше плиты", "Керамогранит 15 мм требует гребёнку 15 мм и больше. При тонком слое под плиткой пустоты."],
    ["Одна партия", "Плитка из разных партий отличается оттенком и калибром. На стене это видно сразу."],
    ["Клей живёт 20 минут", "Замешивайте столько, сколько успеете выработать. Воду в схватившийся раствор не подливают."],
    ["Простукивайте укладку", "Пустота под плиткой в тёплом полу приводит к отслоению за один сезон."],
    ["Крестики вынимают вовремя", "Оставленный в схватившемся клее крестик потом не достать."],
    ["Грунт обязателен", "Пористое основание тянет воду из клея, и сцепление падает вдвое."]
  ],
  drywall: [
    ["Шаг под нагрузку", "Под навесную мебель и телевизор ставьте стойки через 400 мм и закладные из фанеры."],
    ["Зазор снизу", "Оставляйте 10 мм от пола. Стяжка и лист двигаются по-разному, без зазора картон порвёт."],
    ["Саморез впотай на 1 мм", "Глубже — рвёт картон. Мельче — шляпка вылезет через шпаклёвку."],
    ["Швы вразбежку", "При двух слоях стыки второго смещают на полшага. Совпали — трещина пойдёт насквозь."],
    ["Влагостойкий не водостойкий", "ГКЛВ в душевой без гидроизоляции всё равно разрушится."],
    ["Дайте листу отлежаться", "Сутки в помещении перед монтажом, иначе после закрепления поведёт."]
  ],
  floor: [
    ["Стяжка от 30 мм", "Тоньше пескобетон рассыпается. Для тонкого выравнивания нужен наливной состав."],
    ["Грунт против пыления", "Непрогрунтованное основание вытянет воду из смеси, стяжка станет слабой по всей толщине."],
    ["Сантиметр — неделя сушки", "Стяжка 50 мм сохнет около месяца. Финиш раньше поднимет покрытие."],
    ["Меряйте лазером", "Перепад проверяют минимум в пяти точках. На глаз ошибка в два-три сантиметра обычна."],
    ["От 50 мм армируйте", "Толстая стяжка без сетки или фибры трескается по диагонали от углов."],
    ["Не ходить трое суток", "Ранняя нагрузка оставляет следы, которые потом видно через ламинат."]
  ],
  insulation: [
    ["Пароизоляция изнутри", "Плёнка ставится со стороны тёплого помещения. Перепутаете — вата наберёт влагу за сезон."],
    ["Два слоя вразбежку", "Два по 50 мм со смещением швов работают лучше одного слоя 100 мм."],
    ["Вата встаёт враспор", "Плита входит с натягом 10–20 мм. Щель — мостик холода, пересжатие — потеря свойств."],
    ["ЭППС не для мансарды", "Он горит и не даёт конструкции сохнуть. В деревянной кровле только каменная вата."],
    ["Крепёж с термоголовкой", "Через обычный металлический дюбель уходит заметная часть тепла."],
    ["Кровлю утепляют толще", "Через крышу уходит больше всего тепла. 200 мм — норма, а не перестраховка."]
  ],
  masonry: [
    ["Первый ряд решает всё", "Ошибка в первом ряду умножается на всю высоту стены."],
    ["Кирпич смачивают", "Сухой керамический вытягивает воду из раствора, и шов теряет прочность."],
    ["Газобетон только на клей", "Шов 2–3 мм вместо десяти убирает мостик холода."],
    ["Армируйте каждый четвёртый ряд", "Сетка в шов, обязательно под проёмами и над ними."],
    ["Не выше полутора метров в день", "Погоните — нижние ряды поплывут под весом верхних."],
    ["Перевязка обязательна", "Вертикальные швы соседних рядов не должны совпадать."]
  ]
};

var MODE_TITLES = {
  plaster: "Штукатурка стен",
  putty: "Шпаклёвка и грунтовка",
  tile: "Плитка, клей и затирка",
  drywall: "Гипсокартон и каркас",
  floor: "Пол: стяжка и выравнивание",
  insulation: "Утепление",
  masonry: "Кладка"
};

$(function() {
  $widget.each(function(widgetIndex, thisWidget) {
    var root = $(thisWidget).find("[data-wiz]")[0];
    if (!root) return;
    if (root.getAttribute("data-wiz-ready")) return;
    root.setAttribute("data-wiz-ready", "1");

    try {
      init(root);
    } catch (err) {
      if (window.console) window.console.error("Калькулятор:", err);
    }
  });

  function init(root) {
    var TOTAL_STEPS = 3;
    var step = 1;

    var prices = {};
    var priceNode = root.querySelector("[data-wiz-prices]");
    if (priceNode) {
      priceNode.textContent.trim().split("\n").forEach(function(line) {
        var parts = line.split("=");
        if (parts.length !== 2) return;
        var key = parts[0].trim();
        var val = parseFloat(parts[1].replace(",", ".").trim());
        if (key && !isNaN(val)) prices[key] = val;
      });
    }

    var NODES = {
      rows: root.querySelector("[data-wiz-rows]"),
      scope: root.querySelector("[data-wiz-scope]"),
      goods: root.querySelector("[data-wiz-goods]"),
      tips: root.querySelector("[data-wiz-tips]"),
      total: root.querySelector("[data-wiz-total]"),
      totalValue: root.querySelector("[data-wiz-total-value]"),
      prev: root.querySelector("[data-wiz-prev]"),
      next: root.querySelector("[data-wiz-next]")
    };

    var fieldCache = {};

    function mode() {
      var checked = root.querySelector('input[name="wiz-mode"]:checked');
      return checked ? checked.value : "walls";
    }

    function field(m, name) {
      var key = m + "." + name;
      if (fieldCache[key] === undefined) {
        fieldCache[key] = root.querySelector('[data-calc-panel="' + m + '"] [data-f="' + name + '"]');
      }
      return fieldCache[key];
    }

    function clamp(el, v) {
      var mn = parseFloat(el.getAttribute("min"));
      var mx = parseFloat(el.getAttribute("max"));
      if (!isNaN(mn) && v < mn) v = mn;
      if (!isNaN(mx) && v > mx) v = mx;
      return v;
    }

    function num(m, name) {
      var el = field(m, name);
      if (!el) return 0;

      var raw = String(el.value).trim();
      if (raw === "") raw = String(el.getAttribute("data-default") || "").trim();

      var v = parseFloat(raw.replace(",", "."));
      return isNaN(v) ? 0 : clamp(el, v);
    }

    function str(m, name) {
      var el = field(m, name);
      return el ? el.value : "";
    }

    function fmt(n, digits) {
      var d = typeof digits === "number" ? digits : 1;
      return n.toFixed(d).replace(".", ",").replace(/,0$/, "");
    }

    function money(n) {
      return Math.round(n).toLocaleString("ru-RU") + " \u20BD";
    }

    function row(key, name, qty, unit, packSize, packName) {
      if (!qty || qty <= 0) return null;
      var packs = packSize ? Math.ceil(qty / packSize) : null;
      var priceBase = packs !== null ? packs : qty;
      return {
        key: key, name: name, qty: qty, unit: unit,
        packs: packs, packName: packName,
        cost: prices[key] ? prices[key] * priceBase : 0
      };
    }

  var CALC = {

    plaster: function() {
      var area = num("plaster", "length") * num("plaster", "height") - num("plaster", "openings");
      if (area < 0) area = 0;

      var rows = [];
      var mm = num("plaster", "plasterMm");

      if (mm > 0) {
        rows.push(row("plaster_gypsum", "Штукатурка гипсовая",
          area * (NORMS.plasterGypsum / 10) * mm, "кг", PACKS.plaster, "мешок 30 кг"));
      }

      if (str("plaster", "bc") !== "no") {
        rows.push(row("primer_concrete", "Бетоноконтакт",
          area * NORMS.primerConcrete, "кг", PACKS.primerConcrete, "ведро 15 кг"));
      }

      return { scope: "Площадь стен " + fmt(area) + " м\u00B2", rows: rows };
    },

    putty: function() {
      var area = num("putty", "length") * num("putty", "height") - num("putty", "openings");
      if (area < 0) area = 0;

      var rows = [];
      var mm = num("putty", "puttyMm");
      var layers = num("putty", "primerLayers");

      if (mm > 0) {
        rows.push(row("putty", "Шпаклёвка финишная",
          area * NORMS.putty * mm, "кг", PACKS.putty, "мешок 20 кг"));
      }

      if (layers > 0) {
        rows.push(row("primer_deep", "Грунтовка глубокого проникновения",
          area * NORMS.primerDeep * layers, "кг", PACKS.primerDeep, "канистра 10 кг"));
      }

      return { scope: "Площадь стен " + fmt(area) + " м\u00B2", rows: rows };
    },

    tile: function() {
      var area = num("tile", "length") * num("tile", "height");
      var a = num("tile", "tileA");
      var b = num("tile", "tileB");
      var h = num("tile", "tileH");
      var joint = num("tile", "joint");
      var notch = num("tile", "notch");
      var reserve = parseFloat(str("tile", "layout")) || 1.1;
      var rows = [];
      var areaWithReserve = area * reserve;
      var tiles = 0;

      if (a > 0 && b > 0) {
        var tileArea = (a / 1000) * (b / 1000);
        tiles = Math.ceil(areaWithReserve / tileArea);
        rows.push(row("tile", "Плитка", areaWithReserve, "м\u00B2", null, null));
        rows.push(row("tile_pcs", "\u2014 это примерно", tiles, "шт", null, null));
      }

      rows.push(row("tile_glue", "Клей плиточный",
        area * notch * NORMS.tileGluePerMm, "кг", PACKS.tileGlue, "мешок 25 кг"));

      var tilePrimer = num("tile", "primerLayers");
      if (tilePrimer > 0) {
        rows.push(row("primer_deep", "Грунтовка глубокого проникновения",
          area * NORMS.primerDeep * tilePrimer, "кг", PACKS.primerDeep, "канистра 10 кг"));
      }

      var lvl = str("tile", "leveling");
      if (tiles > 0 && lvl === "cross") {
        rows.push(row("tile_cross", "Крестики для плитки",
          Math.ceil(tiles * NORMS.crossPerTile), "шт", 200, "упаковка 200 шт"));
      }
      if (tiles > 0 && lvl === "svp") {
        var clips = Math.ceil(tiles * NORMS.clipPerTile);
        rows.push(row("svp_clip", "Зажимы СВП", clips, "шт", 100, "упаковка 100 шт"));
        rows.push(row("svp_wedge", "Клинья СВП",
          Math.ceil(clips / 4), "шт", 50, "упаковка 50 шт"));
      }

      return { scope: "Укладка " + fmt(area) + " м\u00B2, запас " +
        Math.round((reserve - 1) * 100) + " %", rows: rows };
    },

    drywall: function() {
      var dwL = num("drywall", "length");
      var dwH = num("drywall", "height");
      var area = dwL * dwH;
      var perimeter = (dwL + dwH) * 2;
      var kind = str("drywall", "kind");
      var stepMm = str("drywall", "step");
      var layers = parseInt(str("drywall", "layers"), 10) || 1;
      var rows = [];

      rows.push(row("gkl", "Лист ГКЛ 1200\u00D72500",
        Math.ceil(area * layers * NORMS.sheetReserve / NORMS.sheetArea), "шт", null, null));

      rows.push(row("profile_stud",
        kind === "ceiling" ? "Профиль потолочный ПП 60\u00D727" : "Профиль стоечный ПС",
        area * (NORMS.profileStud[stepMm] || 2), "пог.м", null, null));

      rows.push(row("profile_guide", "Профиль направляющий ПН",
        perimeter, "пог.м", null, null));

      if (kind === "ceiling") {
        rows.push(row("hanger", "Подвес прямой",
          Math.ceil(area * NORMS.hangers), "шт", null, null));
      }

      rows.push(row("screw", "Саморез по металлу 25 мм",
        Math.ceil(area * NORMS.screws * layers), "шт", null, null));

      rows.push(row("tape", "Лента-серпянка", area * NORMS.tape, "пог.м", null, null));

      return { scope: (kind === "ceiling" ? "Потолок " : "Стена ") + fmt(area) +
        " м\u00B2, слоёв обшивки: " + layers, rows: rows };
    },

    floor: function() {
      var area = num("floor", "area");
      var mm = num("floor", "mm");
      var kind = str("floor", "kind");
      var layers = num("floor", "primerLayers");
      var rows = [];
      var perMm = (kind === "self" ? NORMS.selfLevel : NORMS.screed) / 10;

      rows.push(row(
        kind === "self" ? "self_level" : "screed",
        kind === "self" ? "Наливной пол" : "Пескобетон для стяжки",
        area * perMm * mm, "кг",
        kind === "self" ? PACKS.selfLevel : PACKS.screed,
        kind === "self" ? "мешок 20 кг" : "мешок 40 кг"));

      if (layers > 0) {
        rows.push(row("primer_deep", "Грунтовка глубокого проникновения",
          area * NORMS.primerDeep * layers, "кг", PACKS.primerDeep, "канистра 10 кг"));
      }

      return { scope: fmt(area) + " м\u00B2, слой " + fmt(mm, 0) + " мм", rows: rows };
    },

    insulation: function() {
      var area = num("insulation", "length") * num("insulation", "height");
      var mm = num("insulation", "mm");
      var packArea = num("insulation", "packArea");
      var reserve = 1 + num("insulation", "reserve") / 100;
      var rows = [];
      var areaWithReserve = area * reserve;

      rows.push(row("insulation", "Утеплитель", areaWithReserve, "м\u00B2", null, null));
      rows.push(row("insulation_m3", "\u2014 объём",
        areaWithReserve * (mm / 1000), "м\u00B3", null, null));

      if (packArea > 0) {
        rows.push(row("insulation_pack", "\u2014 упаковок",
          Math.ceil(areaWithReserve / packArea), "шт", null, null));
      }

      return { scope: fmt(area) + " м\u00B2, толщина " + fmt(mm, 0) + " мм", rows: rows };
    },

    masonry: function() {
      var area = num("masonry", "length") * (num("masonry", "count") || 1) * num("masonry", "height")
        - num("masonry", "openings");
      if (area < 0) area = 0;
      var kind = str("masonry", "kind");
      var reserve = 1 + num("masonry", "reserve") / 100;
      var rows = [];

      if (kind === "brick") {
        var t = str("masonry", "thickness");
        var wallM = t === "0.5" ? 0.12 : (t === "1" ? 0.25 : 0.38);
        rows.push(row("brick", "Кирпич одинарный",
          Math.ceil(area * (NORMS.brick[t] || 51) * reserve), "шт", null, null));
        rows.push(row("mortar", "Кладочная смесь",
          area * wallM * NORMS.mortarPerM3 * NORMS.mortarDensity, "кг", 40, "мешок 40 кг"));
      } else {
        var blockMm = num("masonry", "blockMm");
        var volume = area * (blockMm / 1000);
        var blockVol = 0.6 * 0.25 * (blockMm / 1000);
        rows.push(row("block", "Газобетонный блок",
          Math.ceil(volume / blockVol * reserve), "шт", null, null));
        rows.push(row("block_m3", "\u2014 объём", volume, "м\u00B3", null, null));
        rows.push(row("block_glue", "Клей для кладки блоков",
          volume * NORMS.blockGluePerM3, "кг", PACKS.blockGlue, "мешок 25 кг"));
      }

      return { scope: "Кладка " + fmt(area) + " м\u00B2", rows: rows };
    }
  };

    function el(tag, cls, text) {
      var node = document.createElement(tag);
      if (cls) node.className = cls;
      if (text !== undefined) node.textContent = text;
      return node;
    }

    function render() {
      var m = mode();
      var result = CALC[m]();
      var rows = result.rows.filter(Boolean);
      var scopeNode = NODES.scope;
      var rowsNode = NODES.rows;
      var totalNode = NODES.total;

      if (rowsNode) {
        while (rowsNode.firstChild) rowsNode.removeChild(rowsNode.firstChild);
      }

      if (!rows.length) {
        if (scopeNode) scopeNode.textContent = "";
        if (rowsNode) {
          rowsNode.appendChild(el("div", "wiz__empty",
            "Заполните размеры выше \u2014 здесь появится список материалов."));
        }
        if (totalNode) totalNode.hidden = true;
        renderGoods([]);
        return;
      }

      if (scopeNode) scopeNode.textContent = result.scope;

      var total = 0;

      var frag = document.createDocumentFragment();

      rows.forEach(function(r) {
        var isSub = r.name.indexOf("\u2014") === 0;
        var line = el("div", "wiz-row" + (isSub ? " wiz-row_sub" : ""));

        line.appendChild(el("span", "wiz-row__name", r.name));
        line.appendChild(el("span", "wiz-row__qty", fmt(r.qty) + " " + r.unit));
        line.appendChild(el("span", "wiz-row__pack",
          r.packs !== null ? r.packs + " \u00D7 " + r.packName : ""));
        line.appendChild(el("span", "wiz-row__cost", r.cost ? money(r.cost) : "\u2014"));

        frag.appendChild(line);
        total += r.cost;
      });

      if (rowsNode) rowsNode.appendChild(frag);

      renderGoods(rows);

      if (totalNode) {
        var valueNode = NODES.totalValue;
        if (total > 0) {
          if (valueNode) valueNode.textContent = money(total);
          totalNode.hidden = false;
        } else {
          if (valueNode) valueNode.textContent = "";
          totalNode.hidden = true;
        }
      }
    }

    function renderGoods(rows) {
      var box = NODES.goods;
      if (!box) return;

      while (box.firstChild) box.removeChild(box.firstChild);

      var any = false;
      var gfrag = document.createDocumentFragment();

      rows.forEach(function(r) {
        var list = PRODUCTS[r.key];
        if (!list || !list.length || r.name.indexOf("\u2014") === 0) return;

        any = true;

        var group = el("div", "goods__group");
        group.appendChild(el("div", "goods__need",
          r.name + " \u2014 " + fmt(r.qty) + " " + r.unit));

        list.forEach(function(it, i) {
          var a = document.createElement("a");
          a.className = "goods__item" + (i > 2 ? " is-extra" : "");
          a.setAttribute("href", "/search?q=" + encodeURIComponent(it.a));

          a.appendChild(el("span", "goods__name", it.n));

          var need = "";
          if (it.p && r.qty > 0) {
            need = Math.ceil(r.qty / it.p) + " \u00D7 " + fmt(it.p, 0) + " " + r.unit;
          }
          a.appendChild(el("span", "goods__packs", need));

          group.appendChild(a);
        });

        if (list.length > 3) {
          var more = el("button", "goods__more", "Показать все " + list.length);
          more.setAttribute("type", "button");
          more.setAttribute("data-goods-more", "");
          group.appendChild(more);
        }

        gfrag.appendChild(group);
      });

      box.appendChild(gfrag);

      if (any) {
        box.insertBefore(el("div", "goods__title", "Подходящие товары"), box.firstChild);
      }
    }

    var tipOffset = {};
    var modal = root.querySelector("[data-wiz-modal]");
    var modalFrame = root.querySelector("[data-wiz-modal-frame]");
    var modalTitle = root.querySelector("[data-wiz-modal-title]");

    function videos(m) {
      var raw = (root.getAttribute("data-video-" + m) || "").trim();
      if (!raw) return [];

      return raw.split(/[\r\n]+/).map(function (line) {
        var p = line.split("|").map(function (x) { return x.trim(); });
        var name, url, cover;

        if (p.length === 1) {
          name = "Смотреть видео";
          url = p[0];
          cover = "";
        } else {
          name = p[0];
          url = p[1];
          cover = p[2] || "";
        }

        if (!cover) cover = autoCover(url);
        return url ? { name: name, url: url, cover: cover } : null;
      }).filter(Boolean).slice(0, 3);
    }

    function autoCover(raw) {
      var yt = String(raw).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/|youtube\.com\/embed\/)([\w-]{6,})/);
      return yt ? "https://i.ytimg.com/vi/" + yt[1] + "/hqdefault.jpg" : "";
    }

    function embedUrl(raw) {
      if (!raw) return "";
      if (raw.indexOf("/embed/") !== -1 || raw.indexOf("video_ext") !== -1) return raw;

      var yt = raw.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/);
      if (yt) return "https://www.youtube.com/embed/" + yt[1] + "?autoplay=1";

      var rt = raw.match(/rutube\.ru\/video\/([\w-]+)/);
      if (rt) return "https://rutube.ru/play/embed/" + rt[1];

      var vk = raw.match(/video(-?\d+)_(\d+)/);
      if (vk) return "https://vk.com/video_ext.php?oid=" + vk[1] + "&id=" + vk[2] + "&hd=2";

      return raw;
    }

    function closeModal() {
      while (modalFrame.firstChild) modalFrame.removeChild(modalFrame.firstChild);
      modal.hidden = true;
      document.body.style.overflow = "";
    }

    function openModal(url, name) {
      var src = embedUrl(url);
      if (!src) return;

      while (modalFrame.firstChild) modalFrame.removeChild(modalFrame.firstChild);

      var frame = document.createElement("iframe");
      frame.setAttribute("src", src);
      frame.setAttribute("allow", "autoplay; encrypted-media; fullscreen; picture-in-picture");
      frame.setAttribute("allowfullscreen", "");
      frame.setAttribute("frameborder", "0");

      modalFrame.appendChild(frame);
      modalTitle.textContent = name || "";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
    }

    function videoCard(v) {
      var card = el("button", "wiz__tip wiz__tip_video");
      card.setAttribute("type", "button");
      card.setAttribute("data-video-url", v.url);
      card.setAttribute("data-video-name", v.name);

      var shot = el("span", "wiz__tip-shot");

      if (v.cover) {
        var img = document.createElement("img");
        img.setAttribute("src", v.cover);
        img.setAttribute("alt", "");
        img.setAttribute("loading", "lazy");
        img.className = "wiz__tip-cover";
        img.addEventListener("error", function () {
          shot.classList.add("is-plain");
          if (img.parentNode) img.parentNode.removeChild(img);
        });
        shot.appendChild(img);
      } else {
        shot.classList.add("is-plain");
      }

      var play = el("span", "wiz__tip-play");
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("viewBox", "0 0 24 24");
      svg.setAttribute("width", "22");
      svg.setAttribute("height", "22");
      var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("fill", "currentColor");
      path.setAttribute("d", "M8.6 5.4c0-.8.9-1.3 1.6-.9l8.2 5.7c.6.4.6 1.4 0 1.8l-8.2 5.7c-.7.5-1.6 0-1.6-.9V5.4z");
      svg.appendChild(path);
      play.appendChild(svg);
      shot.appendChild(play);

      card.appendChild(shot);
      card.appendChild(el("span", "wiz__tip-name", v.name));
      card.appendChild(el("span", "wiz__tip-text", "Короткий ролик, как это делают на объекте"));

      return card;
    }

    function renderTips() {
      var box = NODES.tips;
      if (!box) return;

      var m = mode();
      var pool = TIPS[m];
      var vids = videos(m);

      if (!pool || !pool.length) return;

      if (tipOffset[m] === undefined) {
        tipOffset[m] = Math.floor(Math.random() * pool.length);
      }

      while (box.firstChild) box.removeChild(box.firstChild);

      var frag = document.createDocumentFragment();
      var used = 0;

      for (var i = 0; i < 3; i++) {
        if (vids[i]) {
          frag.appendChild(videoCard(vids[i]));
          continue;
        }

        var t = pool[(tipOffset[m] + used) % pool.length];
        used += 1;

        var card = el("div", "wiz__tip");
        card.appendChild(el("div", "wiz__tip-name", t[0]));
        card.appendChild(el("div", "wiz__tip-text", t[1]));
        frag.appendChild(card);
      }

      box.appendChild(frag);
      tipOffset[m] = (tipOffset[m] + used) % pool.length;
    }

    var panels = root.querySelectorAll(".wiz__panel");
    var onlyFields = root.querySelectorAll('[data-calc-panel="masonry"] [data-only]');
    var steps = root.querySelectorAll("[data-wiz-step]");
    var dots = root.querySelectorAll("[data-wiz-dot]");

    function showPanel() {
      var m = mode();

      panels.forEach(function(p) {
        p.classList.toggle("is-active", p.getAttribute("data-calc-panel") === m);
      });

      var kind = str("masonry", "kind");
      onlyFields.forEach(function(el) {
        el.style.display = el.getAttribute("data-only") === kind ? "" : "none";
      });
    }

    function isMobile() {
      return window.matchMedia("(max-width: 767px)").matches;
    }

    function showStep(n) {
      step = Math.min(Math.max(n, 1), TOTAL_STEPS);

      steps.forEach(function(el) {
        el.classList.toggle("is-current", el.getAttribute("data-wiz-step") === String(step));
      });

      dots.forEach(function(el) {
        el.classList.toggle("is-done", parseInt(el.getAttribute("data-wiz-dot"), 10) <= step);
      });

      if (step === TOTAL_STEPS && isMobile() && root.scrollIntoView) {
        root.scrollIntoView({ behavior: "smooth", block: "start" });
      }

      var prev = NODES.prev;
      var next = NODES.next;
      if (prev) prev.disabled = step === 1;
      if (next) {
        next.disabled = step === TOTAL_STEPS;
        next.textContent = step === TOTAL_STEPS - 1 ? "Показать расчёт" : "Далее";
      }
    }

    root.addEventListener("change", function(e) {
      if (e.target.name === "wiz-mode") {
        showPanel();
        renderTips();
        render();
        if (isMobile()) showStep(2);
        return;
      }
      if (e.target.classList.contains("f__ctrl")) {
        var v = parseFloat(String(e.target.value).replace(",", "."));
        if (!isNaN(v)) {
          var c = clamp(e.target, v);
          if (c !== v) e.target.value = c;
        }
        showPanel();
        render();
      }
    });

    var pending = false;

    root.addEventListener("input", function(e) {
      if (!e.target.classList.contains("f__ctrl")) return;

      var v = parseFloat(String(e.target.value).replace(",", "."));
      var mx = parseFloat(e.target.getAttribute("max"));

      if (!isNaN(v) && !isNaN(mx) && v > mx) e.target.value = mx;

      if (pending) return;
      pending = true;

      window.requestAnimationFrame(function() {
        pending = false;
        render();
      });
    });

    root.addEventListener("click", function(e) {
      if (e.target.closest("[data-wiz-next]")) showStep(step + 1);
      if (e.target.closest("[data-wiz-prev]")) showStep(step - 1);
      if (e.target.closest("[data-wiz-print]")) printReport();
      if (e.target.closest("[data-wiz-csv]")) downloadExcel();

      var vcard = e.target.closest("[data-video-url]");
      if (vcard) {
        openModal(vcard.getAttribute("data-video-url"), vcard.getAttribute("data-video-name"));
      }

      if (e.target.closest("[data-wiz-modal-x]")) closeModal();
      if (e.target === modal) closeModal();

      var more = e.target.closest("[data-goods-more]");
      if (more) {
        var grp = more.closest(".goods__group");
        var open = grp.classList.toggle("is-open");
        more.textContent = open
          ? "Свернуть"
          : "Показать все " + grp.querySelectorAll(".goods__item").length;
      }
    });

    var REPORT_CSS = [
      "body{margin:0;padding:12mm 8mm;font-family:Arial,Helvetica,sans-serif}",
      "table{border-collapse:collapse}",
      "@page{margin:0;size:landscape}"
    ].join("");

    var COLS = [620, 120, 100, 110, 120, 110];

    var ST = {
      spacer: "padding:0;height:2pt;font-size:2pt;border:none",
      doc: "font-size:13pt;font-weight:bold;padding:4pt 0 2pt 0",
      job: "font-size:15pt;font-weight:bold;padding:10pt 0 2pt 0",
      jobSum: "font-size:15pt;font-weight:bold;text-align:right;padding:10pt 0 2pt 0",
      sect: "font-size:12pt;font-weight:bold;padding:12pt 4pt 5pt 0;border-bottom:1pt solid #333",
      th: "font-size:12pt;font-weight:bold;padding:12pt 4pt 5pt 4pt;border-bottom:1pt solid #333",
      td: "font-size:12pt;padding:5pt 4pt;vertical-align:top",
      note: "font-size:10pt;color:#555;padding:14pt 0 0 0;line-height:1.45"
    };

    function estimateRows() {
      var m = mode();
      var result = CALC[m]();
      var out = [];

      result.rows.filter(Boolean).forEach(function(r) {
        if (r.name.indexOf("\u2014") === 0) return;

        var list = PRODUCTS[r.key];
        var pick = list && list.length ? list[0] : null;

        if (pick && pick.p && r.qty > 0) {
          out.push({
            name: pick.n + " (нужно " + fmt(r.qty) + " " + r.unit + ")",
            art: pick.a,
            qty: Math.ceil(r.qty / pick.p),
            unit: "шт",
            cost: r.cost
          });
        } else {
          out.push({ name: r.name, art: "", qty: r.qty, unit: r.unit, cost: r.cost });
        }
      });

      return { mode: m, scope: result.scope, rows: out };
    }

    function tr(doc, table) {
      var row = doc.createElement("tr");
      table.appendChild(row);
      return row;
    }

    function td(doc, row, text, style, span, width) {
      var c = doc.createElement("td");
      c.textContent = text;
      if (style) c.setAttribute("style", style);
      if (span) c.setAttribute("colspan", String(span));
      if (width) c.setAttribute("width", String(width));
      row.appendChild(c);
      return c;
    }

    function buildEstimate(doc) {
      var data = estimateRows();
      var company = root.getAttribute("data-company") || "";
      var d = new Date();
      var date = d.toLocaleDateString("ru-RU") + " " + d.toLocaleTimeString("ru-RU").slice(0, 5);
      var total = 0;
      var hasCost = false;

      data.rows.forEach(function(r) {
        total += r.cost;
        if (r.cost) hasCost = true;
      });

      var st = doc.createElement("style");
      st.textContent = REPORT_CSS;
      doc.head.appendChild(st);

      var ttl = doc.createElement("title");
      ttl.textContent = "Смета на материалы";
      doc.head.appendChild(ttl);

      var table = doc.createElement("table");
      table.setAttribute("cellspacing", "0");
      table.setAttribute("border", "0");

      var spacer = tr(doc, table);
      COLS.forEach(function(px) {
        td(doc, spacer, "\u00A0", ST.spacer + ";width:" + px + "px", null, px);
      });

      td(doc, tr(doc, table), "Смета от " + date + " — " + company, ST.doc, 6);

      var rj = tr(doc, table);
      td(doc, rj, MODE_TITLES[data.mode] || "", ST.job, 5);
      td(doc, rj, hasCost ? String(Math.round(total)) : "", ST.jobSum);

      td(doc, tr(doc, table), data.scope, ST.td, 6);

      var rh = tr(doc, table);
      var heads = ["Основные товары", "Код товара", "Цена", "Количество", "Ед. измерения", "Сумма"];
      heads.forEach(function(h, i) {
        var base = i === 0 ? ST.sect : ST.th;
        td(doc, rh, h, base + ";width:" + COLS[i] + "px", null, COLS[i]);
      });

      data.rows.forEach(function(r) {
        var row = tr(doc, table);
        td(doc, row, r.name, ST.td + ";width:" + COLS[0] + "px", null, COLS[0]);
        td(doc, row, r.art, ST.td);
        td(doc, row, r.cost ? String(Math.round(r.cost / r.qty)) : "", ST.td);
        td(doc, row, fmt(r.qty), ST.td);
        td(doc, row, r.unit, ST.td);
        td(doc, row, r.cost ? String(Math.round(r.cost)) : "", ST.td);
      });

      td(doc, tr(doc, table),
        "Смета ориентировочная, составлена по усреднённым нормам расхода. " +
        "Точный расход указан на упаковке конкретного товара и зависит от " +
        "основания, толщины слоя и способа нанесения. Не является " +
        "коммерческим предложением.", ST.note, 6);

      doc.body.appendChild(table);
    }

    function downloadExcel() {
      var doc = document.implementation.createHTMLDocument("Смета");
      buildEstimate(doc);

      var html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
      var blob = new Blob(["\uFEFF" + html], {
        type: "application/vnd.ms-excel;charset=utf-8"
      });
      var url = URL.createObjectURL(blob);
      var a = document.createElement("a");
      var d = new Date();

      a.href = url;
      a.download = "Смета от " + d.toLocaleDateString("ru-RU").replace(/\./g, "-") + ".xls";
      document.body.appendChild(a);
      a.click();

      window.setTimeout(function() {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 500);
    }

    function estimateText() {
      var data = estimateRows();
      var company = root.getAttribute("data-company") || "";
      var lines = [];

      lines.push("Смета с сайта " + company);
      lines.push(MODE_TITLES[data.mode] || "");
      lines.push(data.scope);
      lines.push("");

      data.rows.forEach(function(r) {
        lines.push("- " + r.name + " — " + fmt(r.qty) + " " + r.unit);
      });

      lines.push("");
      lines.push("Прошу проверить расчёт и посчитать стоимость с доставкой.");

      var text = lines.join("\n");
      return text.length > 1500 ? text.slice(0, 1490) + "..." : text;
    }

    window.lamaEstimate = estimateText;



    function printReport() {
      var frame = document.createElement("iframe");
      frame.setAttribute("aria-hidden", "true");
      frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
      document.body.appendChild(frame);

      try {
        buildEstimate(frame.contentWindow.document);
        frame.contentWindow.focus();
        frame.contentWindow.print();
      } catch (err) {
        if (window.console) window.console.error("Калькулятор, смета:", err);
      }

      window.setTimeout(function() {
        if (frame.parentNode) frame.parentNode.removeChild(frame);
      }, 1500);
    }

    (function () {
      var params = new URLSearchParams(window.location.search);
      var m = params.get("mode");
      var area = params.get("area");
      if (!m || !CALC[m]) return;

      var radio = root.querySelector('input[name="wiz-mode"][value="' + m + '"]');
      if (!radio) return;
      radio.checked = true;

      if (area) {
        var el = field(m, "area");
        if (el) el.value = area;
      }
    })();

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal && !modal.hidden) closeModal();
    });

    showPanel();
    renderTips();
    render();
    if (isMobile()) showStep(1);

    var resizeTimer = null;

    window.addEventListener("resize", function() {
      if (resizeTimer) window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(onResize, 150);
    }, { passive: true });

    function onResize() {
      if (isMobile()) {
        showStep(step);
      } else {
        steps.forEach(function(el) {
          el.classList.remove("is-current");
        });
      }
    }
  }
});
