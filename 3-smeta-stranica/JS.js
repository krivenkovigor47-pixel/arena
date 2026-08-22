$(function () {
  $widget.each(function (i, el) {
    var root = $(el).find("[data-sm]")[0];
    if (!root || root.getAttribute("data-sm-ready")) return;
    root.setAttribute("data-sm-ready", "1");

    var tg = root.getAttribute("data-telegram") || "";
    var mx = root.getAttribute("data-max") || "";
    var wa = root.getAttribute("data-whatsapp") || "";

    function message() {
      if (typeof window.lamaEstimate === "function") {
        var e = window.lamaEstimate();
        if (e) return e;
      }
      return "Здравствуйте! Хочу прислать смету на просчёт.";
    }

    function toast(text) {
      var old = document.querySelector(".sm-toast");
      if (old) old.parentNode.removeChild(old);

      var node = document.createElement("div");
      node.className = "sm-toast";
      node.textContent = text;
      document.body.appendChild(node);

      window.setTimeout(function () {
        if (node.parentNode) node.parentNode.removeChild(node);
      }, 2600);
    }

    function copy(text, then) {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(then, then);
        return;
      }
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;left:-9999px";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      then();
    }

    function link(kind) {
      if (kind === "tg") {
        return tg.indexOf("http") === 0 ? tg : "https://t.me/" + tg.replace("@", "");
      }
      if (kind === "mx") {
        return mx.indexOf("http") === 0 ? mx : "https://max.ru/u/" + mx;
      }
      if (kind === "wa") {
        return "https://wa.me/" + wa.replace(/[^\d]/g, "") +
          "?text=" + encodeURIComponent(message());
      }
      return "";
    }

    function go(kind) {
      var url = link(kind);
      if (!url) return;

      if (kind === "wa") {
        window.open(url, "_blank", "noopener");
        return;
      }

      copy(message(), function () {
        toast("Текст скопирован — вставьте его в чат");
        window.open(url, "_blank", "noopener");
      });
    }

    root.addEventListener("click", function (e) {
      if (e.target.closest("[data-sm-tg]")) go("tg");
      if (e.target.closest("[data-sm-mx]")) go("mx");
      if (e.target.closest("[data-sm-wa]")) go("wa");
    });
  });
});
