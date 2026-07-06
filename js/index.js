document.addEventListener("DOMContentLoaded", function () {
    var numbers = document.querySelectorAll(".static-h1");
    if (!numbers.length) return;

    function animateNumber(item) {
        var end = +item.dataset.max;
        var start = 0;
        var duration = 1400;
        var startTime = null;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var progress = Math.min((timestamp - startTime) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            item.textContent = Math.floor(eased * (end - start) + start);
            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                item.textContent = end;
            }
        }
        requestAnimationFrame(step);
    }

    if ("IntersectionObserver" in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        numbers.forEach(function (item) {
            observer.observe(item);
        });
    } else {
        numbers.forEach(animateNumber);
    }
});
