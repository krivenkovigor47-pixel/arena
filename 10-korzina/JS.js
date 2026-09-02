$(document).ready(function() {

  MicroModal.init({
    disableFocus: true,
    disableScroll: true,
    // onShow: ,
    onClose: function(modal, element, event) {
      event.preventDefault();
      event.stopPropagation();
    },
  });

// Функция для правильного определения формы слов в зависимости от количества
  function declinationText(number, txt) {
    var cases = [2, 0, 1, 1, 1, 2];
    return txt[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]];
  }

  $widget.each(function(index, el) {
    const cartItems = $(el).find('.cart-item');
    cartItems.each(function() {
      const reviewsCount = parseInt($(this).find('.review-count').text(), 10);

      let reviewSingular = $(this).data('review-singular');
        let reviewSingularGen = $(this).data('review-singular-gen');
        let reviewPlural = $(this).data('review-plural');

        let reviewText = declinationText(reviewsCount, [reviewSingular, reviewSingularGen, reviewPlural]);
      $(this).find('.review-text').text(reviewText);
    });
  });

  $widget.each(function() {
    initAccessoriesExpander(this);
  });

  const $removeCouponBtn = $widget.find('[data-remove-coupon]');

  $removeCouponBtn.on('click', function(e) {
    e.preventDefault();

    Cart.setCoupon({coupon: ' '});
    $(this).parents('.coupon-input').find('input').val('');
    $(this).removeClass('show-btn');
  })

  EventBus.subscribe('update_items:insales:cart', function(data) {
    if (data.coupon) {
      $removeCouponBtn.addClass('show-btn')
    }
  });

  $widget.find(".js-item-delete").on("click", function() {
    $(this).parents('.cart-item:first').slideUp(300, function() {
      $(this).remove();
    });
  });

  EventBus.subscribe('delete_items:insales:cart', function(data) {
    var $emptyMessage = $widget.find('.js-cart-empty');
    var $cartForm = $widget.find('[data-cart-form]');
    if (data.order_lines.length == 0) {
      $cartForm.addClass('hidden');
      $emptyMessage.removeClass('hidden');
    }
  });

  EventBus.subscribe('add_items:insales:cart', function() {
    window.location.reload();
  });

  EventBus.subscribe('remove_items:insales:cart', function() {
    window.location.reload();
  });

  function initAccessoriesExpander(thisWidget) {
    const cartItems = Array.from(thisWidget.querySelectorAll('[data-item-id]'));

    cartItems.forEach(cartItem => {
      const accessories = cartItem.querySelector('[data-item-accessories]');
      if (!accessories) { return; }

      const accessoriesExpander = accessories.querySelector('.item-accessories__expander');
      if (!accessoriesExpander) { return; }

      const accessoryItems = accessories.querySelector('.item-accessories__items');
      if (!accessoryItems) { return; }

      // Изначально измеряем высоту скрытого элемента
      accessoryItems.style.maxHeight = 'none';
      let fullHeight = accessoryItems.scrollHeight + "px";
      accessoryItems.style.maxHeight = '0';

      accessoriesExpander.addEventListener('click', (e) => {
        e.preventDefault();

        // Переключаем класс для иконки
        const iconUp = accessories.querySelector('.icon.icon-sort-asc');
        const iconDown = accessories.querySelector('.icon.icon-sort-desc');
        if (iconUp && iconDown) {
          iconUp.classList.toggle('hidden');
          iconDown.classList.toggle('hidden');
        }

        // Анимируем раскрытие/закрытие
        if (accessoryItems.style.maxHeight === '0px') {
          accessoryItems.style.maxHeight = fullHeight;
          accessoryItems.classList.toggle('is-hidden');
        } else {
          accessoryItems.style.maxHeight = '0';
          accessoryItems.classList.toggle('is-hidden')
        }
      });
    });
  }
});

$(document).ready(function() {
  const currentWidget = document.querySelector(widget);
  const copyButtons = currentWidget.querySelectorAll('.js-copy-url');
  const cartItems = Array.from(currentWidget.querySelectorAll('.item-title'));
  const shopTitleNode = currentWidget.querySelector('[data-shop-title]');
  const shopHostNode = currentWidget.querySelector('[data-shop-host]');
  const itemsInCartNode = currentWidget.querySelector('[data-items-in-cart]');
  const dataShareItemsNode = currentWidget.querySelector('[data-share-items]');
  const shopTitle = shopTitleNode ? shopTitleNode.getAttribute('data-shop-title') : '';
  const shopHost = shopHostNode ? shopHostNode.getAttribute('data-shop-host') : '';
  const itemsInCart = itemsInCartNode ? itemsInCartNode.getAttribute('data-items-in-cart') : '';
  const dataShareItems = dataShareItemsNode ? dataShareItemsNode.getAttribute('data-share-items') : '';

  function isMobileDevice() {
    const mobileWidthThreshold = 768;
    const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return screenWidth < mobileWidthThreshold;
  }

  function allProductName() {
    let allProductName = '';
    cartItems.forEach((cartItem) => {
      const productName = cartItem.text.trim();
      const productLink = cartItem.getAttribute('href');
      if (!productName) {
        return;
      }
      allProductName += `${productName} - ${shopHost}${productLink}\n`;
    })
    return `${itemsInCart} ${allProductName} \n`;
  }

  function copyLink(link) {
    let inputElement = document.querySelector('.shared-cart-link');
    inputElement.value = link;
    navigator.clipboard.writeText(inputElement.value);
  }
  copyButtons.forEach(function(button) {
    button.addEventListener('click', async() => {
      try {
        const data = await $.ajax({
          url: '/front_api/cart/share.json',
          method: 'POST'
        });
        const urlToCopy = data.shared_cart_link;
        const shareData = {
          text: `${dataShareItems} ${shopTitle}: \n`,
          url: urlToCopy
        };
        if (isMobileDevice()) {
          navigator.share(shareData).then(() => EventBus.publish('copy:link:insales'));
        } else {
          copyLink(urlToCopy);
          EventBus.publish('copy:link:insales');
        }
      } catch (error) {
        console.error(error);
      }
    });
  });
});

$(function () {
  var root = document.querySelector("[data-cart-actions]");
  if (!root) return;

  var form = root.closest("form") || document;
  var shop = root.getAttribute("data-shop") || "";

  function txt(node, sel) {
    var el = node.querySelector(sel);
    return el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  }

  function rows() {
    var out = [];
    form.querySelectorAll(".cart-item").forEach(function (item) {
      var qtyEl = item.querySelector(".counter-input");
      var imgEl = item.querySelector(".item-image img");
      out.push({
        img: imgEl ? imgEl.getAttribute("src") : "",
        name: txt(item, ".item-title"),
        price: txt(item, "[data-cart-item-price]"),
        qty: qtyEl ? qtyEl.value : "",
        total: txt(item, "[data-cart-item-total-price]")
      });
    });
    return out;
  }

  function total() {
    var el = form.querySelector("[data-cart-total-price]");
    return el ? el.textContent.replace(/\s+/g, " ").trim() : "";
  }

  var COLS = [560, 130, 100, 140];
  var COLS_IMG = [70, 500, 120, 95, 130];

  var ST = {
    spacer: "padding:0;height:2pt;font-size:2pt;border:none",
    doc: "font-size:13pt;font-weight:bold;padding:4pt 0 10pt 0",
    th: "font-size:11pt;font-weight:bold;padding:8pt 6pt 5pt 0;border-bottom:1pt solid #333",
    td: "font-size:12pt;padding:6pt 6pt 6pt 0;border-bottom:.5pt solid #ddd;vertical-align:top",
    total: "font-size:14pt;font-weight:bold;padding:10pt 6pt 0 0;border-top:2pt solid #000;text-align:right"
  };

  function cell(doc, row, text, style, span, width) {
    var c = doc.createElement("td");
    c.textContent = text;
    if (style) c.setAttribute("style", style);
    if (span) c.setAttribute("colspan", String(span));
    if (width) c.setAttribute("width", String(width));
    row.appendChild(c);
    return c;
  }

  function build(doc, withImg) {
    var cols = withImg ? COLS_IMG : COLS;
    var st = doc.createElement("style");
    st.textContent = "body{margin:0;padding:12mm 8mm;font-family:Arial,Helvetica,sans-serif}" +
      "table{border-collapse:collapse}@page{margin:0}";
    doc.head.appendChild(st);

    var ttl = doc.createElement("title");
    ttl.textContent = "Корзина";
    doc.head.appendChild(ttl);

    var d = new Date();
    var table = doc.createElement("table");

    var sp = doc.createElement("tr");
    table.appendChild(sp);
    cols.forEach(function (px) {
      cell(doc, sp, "\u00A0", ST.spacer + ";width:" + px + "px", null, px);
    });

    var head = doc.createElement("tr");
    table.appendChild(head);
    cell(doc, head, "Корзина от " + d.toLocaleDateString("ru-RU") + " — " + shop, ST.doc, cols.length);

    var hr = doc.createElement("tr");
    table.appendChild(hr);
    var heads = withImg
      ? ["Фото", "Наименование", "Цена", "Кол-во", "Сумма"]
      : ["Наименование", "Цена", "Кол-во", "Сумма"];
    heads.forEach(function (h, i) {
      cell(doc, hr, h, ST.th + ";width:" + cols[i] + "px", null, cols[i]);
    });

    rows().forEach(function (r) {
      var tr = doc.createElement("tr");
      table.appendChild(tr);

      if (withImg) {
        var pic = cell(doc, tr, "", ST.td + ";width:" + cols[0] + "px", null, cols[0]);
        if (r.img) {
          var im = doc.createElement("img");
          im.setAttribute("src", r.img);
          im.setAttribute("width", "54");
          im.setAttribute("style", "width:54px;height:54px;object-fit:contain");
          pic.appendChild(im);
        }
      }

      var nameW = withImg ? cols[1] : cols[0];
      cell(doc, tr, r.name, ST.td + ";width:" + nameW + "px", null, nameW);
      cell(doc, tr, r.price, ST.td);
      cell(doc, tr, r.qty, ST.td);
      cell(doc, tr, r.total, ST.td);
    });

    var ft = doc.createElement("tr");
    table.appendChild(ft);
    cell(doc, ft, "Итого", ST.total, cols.length - 1);
    cell(doc, ft, total(), ST.total);

    doc.body.appendChild(table);
  }

  function print() {
    var frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    document.body.appendChild(frame);

    var done = false;

    function fire() {
      if (done) return;
      done = true;
      try {
        frame.contentWindow.focus();
        frame.contentWindow.print();
      } catch (err) {
        if (window.console) window.console.error(err);
      }
      window.setTimeout(function () {
        if (frame.parentNode) frame.parentNode.removeChild(frame);
      }, 1500);
    }

    try {
      var fdoc = frame.contentWindow.document;
      build(fdoc, true);

      var imgs = fdoc.querySelectorAll("img");
      var left = imgs.length;

      if (!left) {
        fire();
      } else {
        imgs.forEach(function (im) {
          if (im.complete) {
            left -= 1;
            if (!left) fire();
            return;
          }
          im.addEventListener("load", function () {
            left -= 1;
            if (!left) fire();
          });
          im.addEventListener("error", function () {
            left -= 1;
            if (!left) fire();
          });
        });
        window.setTimeout(fire, 2500);
      }
    } catch (err) {
      if (window.console) window.console.error(err);
      fire();
    }
  }

  function xls() {
    var doc = document.implementation.createHTMLDocument("Корзина");
    build(doc, false);

    var html = "<!DOCTYPE html>" + doc.documentElement.outerHTML;
    var blob = new Blob(["\uFEFF" + html], { type: "application/vnd.ms-excel;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    var d = new Date();

    a.href = url;
    a.download = "Корзина " + d.toLocaleDateString("ru-RU").replace(/\./g, "-") + ".xls";
    document.body.appendChild(a);
    a.click();

    window.setTimeout(function () {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 500);
  }

  root.addEventListener("click", function (e) {
    if (e.target.closest("[data-cart-print]")) print();
    if (e.target.closest("[data-cart-xls]")) xls();
  });
});

$(function () {
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-rel-more]");
    if (!btn) return;

    var box = btn.closest("[data-rel]");
    var open = box.classList.toggle("is-open");

    btn.textContent = open ? "свернуть" : "ещё " + btn.getAttribute("data-rest");
  });
});
