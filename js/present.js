document.addEventListener("DOMContentLoaded", function () {
    var CATEGORY_META = {
        gory: { label: "Горы", image: "pict/c1.jpg", gradient: "linear-gradient(135deg,#8d6e63,#d7a86e)" },
        relief: { label: "Рельеф дна океана", image: "pict/c3.jpg", gradient: "linear-gradient(135deg,#2b6ea3,#57c2c9)" },
        domiki: { label: "Климат и жильё", image: "pict/c4.jpg", gradient: "linear-gradient(135deg,#a446f8,#fea7d3)" }
    };

    var CATEGORY_SLIDES = {
        gory: [
            { title: "Что такое горы", text: "Сильно расчленённые участки суши, поднятые более чем на 500 метров над окружающей местностью." },
            { title: "Виды гор", text: "Складчатые, глыбовые (горсты и грабены) и вулканические - различаются по происхождению." },
            { title: "Горные системы мира", text: "Гималаи, Анды, Кавказ и Уральские горы - крупнейшие горные пояса планеты." },
            { title: "Горы и человек", text: "Высотная поясность определяет климат, растительность и то, как люди строят жильё в горах." }
        ],
        relief: [
            { title: "Шельф", text: "Мелководная часть подводной окраины материка - фактически продолжение суши под водой." },
            { title: "Материковый склон", text: "Резкий переход от шельфа к ложу океана, самая крутая часть подводного рельефа." },
            { title: "Ложе океана", text: "Основная часть океанического дна со срединно-океаническими хребтами и котловинами." },
            { title: "Глубоководные желоба", text: "Самые глубокие участки Мирового океана, включая Марианский жёлоб." }
        ],
        domiki: [
            { title: "Климат и жильё", text: "Тип традиционного дома почти всегда определяется климатическими условиями региона." },
            { title: "Вечная мерзлота", text: "В северных широтах дома строят на сваях, чтобы тепло здания не растапливало грунт." },
            { title: "Жильё кочевников", text: "Юрты и чумы - лёгкие переносные конструкции, удобные для степного и тундрового климата." },
            { title: "Жаркий климат", text: "Толстые глиняные стены и маленькие окна помогают домам оставаться прохладными в пустынях." }
        ]
    };

    var DECKS = [
        { id: 1, grade: 5, category: "gory", title: "Горы: рождение великанов", text: "Как горы появляются на поверхности Земли, и почему они продолжают расти даже сегодня." },
        { id: 2, grade: 5, category: "gory", title: "Складчатые и глыбовые горы", text: "Горсты образуют горные хребты, опущенные блоки - грабены. Разбираем на примерах." },
        { id: 3, grade: 5, category: "relief", title: "Что скрывает дно океана", text: "Подводные хребты образуются там, где океаническая кора продавливается под соседнюю плиту." },
        { id: 4, grade: 5, category: "domiki", title: "Дома в разном климате", text: "От снежных крыш до домов на земле - как жильё подстраивается под погоду за окном." },
        { id: 5, grade: 5, category: "gory", title: "Вулканические горы", text: "Вулканические горы образуются в результате извержений и постепенного накопления застывшей лавы." },
        { id: 6, grade: 5, category: "relief", title: "Шельф и материковый склон", text: "Мелководная часть подводной окраины материка - это продолжение суши под водой." },
        { id: 7, grade: 6, category: "gory", title: "Горы: рождение великанов", text: "Повторяем и углубляем тему: сильно расчленённые части суши, поднятые на 500 метров и выше." },
        { id: 8, grade: 6, category: "gory", title: "Складчатые горы", text: "Складчатые горы образуются при сжатии земной коры и смятии пластов пород в складки." },
        { id: 9, grade: 6, category: "relief", title: "Рельеф океанического дна", text: "Продавливание океанической коры под соседнюю плиту формирует глубоководные желоба." },
        { id: 10, grade: 6, category: "domiki", title: "Жильё и климат", text: "Дома значительно отличаются друг от друга в зависимости от температуры и осадков региона." },
        { id: 11, grade: 6, category: "domiki", title: "Дома на вечной мерзлоте", text: "В районах вечной мерзлоты дома строят на сваях, чтобы тепло здания не растапливало грунт." },
        { id: 12, grade: 6, category: "gory", title: "Горсты и грабены", text: "Горсты образуют горные хребты, а опущенные блоки между ними называются грабенами." },
        { id: 13, grade: 7, category: "gory", title: "Высотная поясность", text: "Как меняется климат и растительность при подъёме в горы - от подножия до вечных снегов." },
        { id: 14, grade: 7, category: "relief", title: "Глубоководные желоба", text: "Марианский жёлоб и другие глубочайшие точки планеты: как они появляются и чем интересны." },
        { id: 15, grade: 7, category: "domiki", title: "Жилища кочевых народов", text: "Юрты, чумы и яранги - лёгкие переносные дома, приспособленные к суровому климату." },
        { id: 16, grade: 7, category: "gory", title: "Горные системы мира", text: "Гималаи, Анды, Кавказ - сравниваем крупнейшие горные пояса Земли и их происхождение." }
    ];

    var grid = document.getElementById("decksGrid");
    var filterBar = document.getElementById("presentFilterBar");
    var searchInput = document.getElementById("presentSearch");
    var emptyMsg = document.getElementById("presentEmpty");
    var sourceNote = document.getElementById("presentSourceNote");

    var currentFilter = "all";
    var currentQuery = "";
    var visibleByGrade = {};
    var STEP = 4;
    var allDecks = [];

    function fetchPresentations() {
        return new Promise(function (resolve) {
            setTimeout(function () {
                resolve(DECKS);
            }, 550 + Math.random() * 400);
        });
    }

    function renderSkeletons(count) {
        grid.innerHTML = "";
        for (var i = 0; i < count; i++) {
            var col = document.createElement("div");
            col.className = "col-md-6 col-lg-4 mb-4";
            col.innerHTML = '<div class="deck-skeleton"></div>';
            grid.appendChild(col);
        }
    }

    function getFiltered() {
        var q = currentQuery.trim().toLowerCase();
        return allDecks.filter(function (d) {
            var matchesCat = currentFilter === "all" || d.category === currentFilter;
            var matchesQuery = q === "" || d.title.toLowerCase().includes(q) || d.text.toLowerCase().includes(q);
            return matchesCat && matchesQuery;
        });
    }

    function buildDeckCard(deck) {
        var meta = CATEGORY_META[deck.category];
        var col = document.createElement("div");
        col.className = "col-md-6 col-lg-4 mb-4 pop-in";
        col.innerHTML =
            '<div class="deck-card" data-id="' + deck.id + '">' +
            '<div class="deck-cover" style="background:' + meta.gradient + '; background-size: cover; background-position: center;">' +
            '<img src="' + meta.image + '" alt="' + meta.label + '" style="width:100%;height:100%;object-fit:cover;opacity:0.95;">' +
            '<span class="deck-slide-count">' + CATEGORY_SLIDES[deck.category].length + ' слайда</span>' +
            '</div>' +
            '<div class="deck-body">' +
            '<div class="deck-grade">' + deck.grade + ' класс · ' + meta.label + '</div>' +
            '<div class="deck-title">' + deck.title + '</div>' +
            '<div class="deck-text">' + deck.text + '</div>' +
            '<div class="deck-footer"><span class="deck-open">Открыть презентацию →</span></div>' +
            '</div></div>';
        return col;
    }

    function render() {
        var filtered = getFiltered();
        grid.innerHTML = "";

        if (!filtered.length) {
            emptyMsg.classList.remove("d-none");
            return;
        }
        emptyMsg.classList.add("d-none");

        var byGrade = {};
        filtered.forEach(function (d) {
            byGrade[d.grade] = byGrade[d.grade] || [];
            byGrade[d.grade].push(d);
        });

        Object.keys(byGrade).sort().forEach(function (grade) {
            if (!(grade in visibleByGrade)) visibleByGrade[grade] = STEP;

            var wrap = document.createElement("div");
            wrap.className = "mb-4";
            var heading = document.createElement("h1");
            heading.className = "pn1";
            heading.style.fontSize = "26px";
            heading.textContent = grade + " класс";
            wrap.appendChild(heading);

            var row = document.createElement("div");
            row.className = "row";
            byGrade[grade].slice(0, visibleByGrade[grade]).forEach(function (deck) {
                row.appendChild(buildDeckCard(deck));
            });
            wrap.appendChild(row);

            if (byGrade[grade].length > visibleByGrade[grade]) {
                var btnWrap = document.createElement("div");
                btnWrap.className = "text-center";
                btnWrap.innerHTML = '<button type="button" class="btn-blue grade-more-btn" data-grade="' + grade + '" style="margin-top:0;">Показать ещё · ' + grade + ' класс</button>';
                wrap.appendChild(btnWrap);
            }

            grid.appendChild(wrap);
        });
    }
    grid.addEventListener("click", function (e) {
        var moreBtn = e.target.closest(".grade-more-btn");
        if (moreBtn) {
            visibleByGrade[moreBtn.dataset.grade] += STEP;
            render();
            return;
        }
        var card = e.target.closest(".deck-card");
        if (card) openDeckModal(+card.dataset.id);
    });

    if (filterBar) {
        filterBar.addEventListener("click", function (e) {
            var btn = e.target.closest(".filter-btn");
            if (!btn) return;
            filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            currentFilter = btn.dataset.filter;
            visibleByGrade = {};
            render();
        });
    }

    if (searchInput) {
        searchInput.addEventListener("input", function () {
            currentQuery = searchInput.value;
            visibleByGrade = {};
            render();
        });
    }
    var deckModalEl = document.getElementById("deckModal");
    var bsDeckModal = window.bootstrap && deckModalEl ? new bootstrap.Modal(deckModalEl) : null;
    var slideIndex = 0;
    var activeDeck = null;

    function renderSlide() {
        var slides = CATEGORY_SLIDES[activeDeck.category];
        var slide = slides[slideIndex];
        document.getElementById("deckModalSlideTitle").textContent = slide.title;
        document.getElementById("deckModalSlideText").textContent = slide.text;
        document.getElementById("deckModalSlideCounter").textContent = (slideIndex + 1) + " / " + slides.length;
        document.getElementById("deckModalPrev").disabled = slideIndex === 0;
        document.getElementById("deckModalNext").disabled = slideIndex === slides.length - 1;
    }

    function openDeckModal(id) {
        activeDeck = allDecks.find(function (d) { return d.id === id; });
        if (!activeDeck) return;
        var meta = CATEGORY_META[activeDeck.category];
        slideIndex = 0;
        document.getElementById("deckModalCover").style.background = meta.gradient;
        document.getElementById("deckModalCover").innerHTML = '<img src="' + meta.image + '" alt="' + meta.label + '" style="width:100%;height:100%;object-fit:cover;border-radius:10px;">';
        document.getElementById("deckModalTitle").textContent = activeDeck.title;
        document.getElementById("deckModalGrade").textContent = activeDeck.grade + " класс";
        document.getElementById("deckModalCategory").textContent = meta.label;
        document.getElementById("deckModalIntro").textContent = activeDeck.text;
        renderSlide();

        if (bsDeckModal) {
            bsDeckModal.show();
        } else {
            deckModalEl.classList.add("show");
            deckModalEl.style.display = "block";
        }
    }
    var prevBtn = document.getElementById("deckModalPrev");
    var nextBtn = document.getElementById("deckModalNext");
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener("click", function () {
            if (slideIndex > 0) { slideIndex--; renderSlide(); }
        });
        nextBtn.addEventListener("click", function () {
            var slides = CATEGORY_SLIDES[activeDeck.category];
            if (slideIndex < slides.length - 1) { slideIndex++; renderSlide(); }
        });
    }
    renderSkeletons(6);
    fetchPresentations().then(function (data) {
        allDecks = data;
        if (sourceNote) {
            sourceNote.innerHTML = '<span class="dot-live"></span> Загружено ' + data.length + ' презентаций из базы GeoCards';
        }
        render();
    });
});
