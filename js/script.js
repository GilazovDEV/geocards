document.addEventListener("DOMContentLoaded", function () {
  var nav = document.querySelector(".navbar-toggler");
  var navicon = document.querySelector(".navbar-toggler-icon");
  if (nav && navicon) {
    if (!navicon.querySelector(".bar")) {
      var bar = document.createElement("span");
      bar.className = "bar";
      navicon.appendChild(bar);
    }

    nav.addEventListener("click", function () {
      if (this.classList.contains("collapsed")) {
        navicon.classList.remove("mark-icon");
      } else {
        navicon.classList.add("mark-icon");
      }
    });
  }
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  }
  var backBtn = document.createElement("button");
  backBtn.className = "back-to-top";
  backBtn.type = "button";
  backBtn.setAttribute("aria-label", "Наверх");
  backBtn.innerHTML = "&#8593;";
  document.body.appendChild(backBtn);

  window.addEventListener("scroll", function () {
    backBtn.classList.toggle("show", window.scrollY > 500);
  });

  backBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  var rippleSelector = ".btn, .btn-blue, .btn-error, .filter-btn, .quiz-option, .grade-more-btn, .deck-card, .show-more-btn, .back-to-top";
  document.addEventListener("click", function (e) {
    var btn = e.target.closest(rippleSelector);
    if (!btn || btn.disabled) return;
    var rect = btn.getBoundingClientRect();
    var size = Math.max(rect.width, rect.height);
    var ripple = document.createElement("span");
    ripple.className = "ripple-el";
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(ripple);
    setTimeout(function () { ripple.remove(); }, 650);
  });
});
function gcConfetti() {
  var colors = ["#a446f8", "#fea7d3", "#35d07f", "#ffb703", "#57c2c9"];
  var count = 40;
  for (var i = 0; i < count; i++) {
    (function () {
      var piece = document.createElement("span");
      piece.className = "confetti-piece";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.background = colors[Math.floor(Math.random() * colors.length)];
      piece.style.animationDuration = (2 + Math.random() * 1.5) + "s";
      piece.style.transform = "rotate(" + Math.random() * 360 + "deg)";
      document.body.appendChild(piece);
      setTimeout(function () { piece.remove(); }, 4000);
    })();
  }
}
function gcToast(message) {
  var existing = document.querySelector(".toast-pop");
  if (existing) existing.remove();

  var toast = document.createElement("div");
  toast.className = "toast-pop";
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(function () {
    toast.classList.add("show");
  });

  setTimeout(function () {
    toast.classList.remove("show");
    setTimeout(function () {
      toast.remove();
    }, 300);
  }, 2200);
}
