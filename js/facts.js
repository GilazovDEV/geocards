document.addEventListener("DOMContentLoaded", function () {
    var FACTS = [
        { category: "mountains", label: "Горы и рельеф", text: "Эверест продолжает расти примерно на 4 мм в год из-за движения Индийской литосферной плиты." },
        { category: "mountains", label: "Горы и рельеф", text: "Самая длинная горная цепь на Земле находится под водой — это Срединно-Атлантический хребет длиной свыше 16000 км." },
        { category: "mountains", label: "Горы и рельеф", text: "Долина Смерти в Калифорнии — одно из самых низких мест суши в Западном полушарии, на 86 метров ниже уровня моря." },
        { category: "mountains", label: "Горы и рельеф", text: "Марианская впадина — самая глубокая точка мирового океана, её глубина превышает 10900 метров." },
        { category: "ocean", label: "Океаны", text: "Тихий океан настолько велик, что вмещает в себя всю сушу Земли, и ещё осталось бы место." },
        { category: "ocean", label: "Океаны", text: "Учёные исследовали дно океанов меньше, чем поверхность Луны — большая часть морского дна до сих пор не изучена." },
        { category: "ocean", label: "Океаны", text: "В Северном Ледовитом океане плотность воды и льда позволяет некоторым айсбергам существовать десятилетиями." },
        { category: "climate", label: "Климат", text: "Самая высокая температура воздуха на Земле была зафиксирована в Долине Смерти — 56,7°C в 1913 году." },
        { category: "climate", label: "Климат", text: "Станция «Восток» в Антарктиде зафиксировала рекордно низкую температуру — минус 89,2°C." },
        { category: "climate", label: "Климат", text: "На Земле ежедневно происходит около 44000 гроз, а значит — примерно 8 миллионов молний." },
        { category: "countries", label: "Страны", text: "Россия граничит с 14 государствами — больше, чем любая другая страна мира." },
        { category: "countries", label: "Страны", text: "Ватикан — самое маленькое независимое государство в мире, его площадь всего 0,44 км²." },
        { category: "countries", label: "Страны", text: "Монголия — страна с самой низкой плотностью населения среди суверенных государств." },
        { category: "space", label: "Планета", text: "Земля — единственная планета Солнечной системы, название которой не связано с греческой или римской мифологией." },
        { category: "space", label: "Планета", text: "Магнитные полюса Земли постоянно смещаются и периодически меняются местами раз в сотни тысяч лет." },
        { category: "space", label: "Планета", text: "Из-за вращения Земля немного сплюснута — экваториальный радиус больше полярного примерно на 21 км." }
    ];

    var grid = document.getElementById("factsGrid");
    var filterBar = document.getElementById("filterBar");
    var loadMoreBtn = document.getElementById("loadMoreFacts");
    var statusText = document.getElementById("factsStatus");
    var currentFilter = "all";
    var visibleCount = 4;
    var STEP = 4;

    function getFiltered() {
        if (currentFilter === "all") return FACTS;
        return FACTS.filter(function (f) { return f.category === currentFilter; });
    }

    function render() {
        var filtered = getFiltered();
        grid.innerHTML = "";
        filtered.slice(0, visibleCount).forEach(function (f) {
            var col = document.createElement("div");
            col.className = "col-md-6 col-lg-3 pop-in";
            col.innerHTML =
                '<div class="present-block fact-card">' +
                '<div class="fact-card-top">' +
                '</div>' +
                '<div class="present-category"><p>Категория: <span class="dark-blue">' + f.label + '</span></p></div>' +
                '<div class="category-text"><p>' + f.text + '</p></div>' +
                '</div>';
            grid.appendChild(col);
        });

        if (visibleCount >= filtered.length) {
            loadMoreBtn.classList.add("d-none");
            statusText.classList.remove("d-none");
        } else {
            loadMoreBtn.classList.remove("d-none");
            statusText.classList.add("d-none");
        }
    }

    filterBar.addEventListener("click", function (e) {
        var btn = e.target.closest(".filter-btn");
        if (!btn) return;
        filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        currentFilter = btn.dataset.filter;
        visibleCount = STEP;
        render();
    });

    loadMoreBtn.addEventListener("click", function () {
        visibleCount += STEP;
        render();
    });

    var randomBtn = document.getElementById("randomFactBtn");
    var randomText = document.getElementById("randomFactText");
    var randomIcon = document.getElementById("randomFactIcon");
    var lastIndex = -1;
    randomBtn.addEventListener("click", function () {
        var idx;
        do { idx = Math.floor(Math.random() * FACTS.length); } while (idx === lastIndex && FACTS.length > 1);
        lastIndex = idx;
        randomText.style.opacity = 0;
        randomIcon.style.opacity = 0;
        setTimeout(function () {
            randomText.textContent = FACTS[idx].text;
            randomIcon.textContent = FACTS[idx].icon;
            randomText.style.opacity = 1;
            randomIcon.style.opacity = 1;
        }, 150);
    });

    render();
});
